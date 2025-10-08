import { NextResponse } from "next/server";
import axios from "axios";
import dbConnect from "../../lib/dbConnect";
import Order from "../../models/Order";

const drivers = [
  { name: "Driver1", phone: "+212649667097" },
  { name: "Driver2", phone: "+212696377875" },
];

let currentDriverIndex = 0;

export async function POST(req) {
  const { customerName, customerPhone, items } = await req.json();

  await dbConnect();

  const order = new Order({
    customerName,
    customerPhone,
    items,
    driverIndex: currentDriverIndex,
    status: "pending",
  });
  await order.save();

  const driver = drivers[currentDriverIndex];
  currentDriverIndex = (currentDriverIndex + 1) % drivers.length;

  try {
    await axios.post(
      `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: driver.phone,
        type: "interactive",
        interactive: {
          type: "button",
          body: {
            text: `Nouvelle commande 🛍️\nClient: ${customerName}\nTéléphone: ${customerPhone}\nProduits: ${items.join(", ")}\nAcceptez-vous cette commande ?`,
          },
          action: {
            buttons: [
              { type: "reply", reply: { id: "accept_order", title: "✅ Accepter" } },
              { type: "reply", reply: { id: "decline_order", title: "❌ Refuser" } },
            ],
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({ success: true, message: "Commande envoyée au livreur", driver: driver.name });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return NextResponse.json({ success: false, error: "Échec de l'envoi WhatsApp" }, { status: 500 });
  }
}
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const customerPhone = searchParams.get("customerPhone"); // récupéré depuis localStorage côté client
    
    if (!customerPhone) {
      return NextResponse.json({ success: false, error: "Numéro client manquant" }, { status: 400 });
    }
    
    await dbConnect();
    
    const orders = await Order.find({ customerPhone }).sort({ createdAt: -1 }); // trier par date descendante
    console.log(orders);
    return NextResponse.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}