import { NextResponse } from "next/server";
import axios from "axios";
import dbConnect from "../../lib/dbConnect";
import Order from "../../models/Order";

const VERIFY_TOKEN = "azedineyassine";

const drivers = [
  { name: "Driver1", phone: "+212649667097" },
  { name: "Driver2", phone: "+212696377875" },
];

// ✅ Vérification du webhook
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode && token === VERIFY_TOKEN) {
    console.log("✅ Webhook vérifié !");
    return new Response(challenge, { status: 200 });
  } else {
    return new Response("Erreur de vérification", { status: 403 });
  }
}

// 📩 Réception messages WhatsApp
export async function POST(req) {
  try {
    const data = await req.json();

    if (data.entry && data.entry[0].changes[0].value.messages) {
      const message = data.entry[0].changes[0].value.messages[0];

      if (message.type === "interactive" && message.interactive.button_reply) {
        const replyId = message.interactive.button_reply.id;
        const from = message.from; // numéro du livreur

        await dbConnect();

        // On récupère la commande la plus récente en attente
        const order = await Order.findOne({ status: "pending" }).sort({ createdAt: -1 });

        if (!order) {
          console.log("⚠️ Aucune commande en attente trouvée.");
          return NextResponse.json({ success: false });
        }

        // Si le livreur accepte la commande
        if (replyId === "accept_order") {
          console.log(`✅ Le livreur ${from} a accepté la commande.`);

          // Ajouter son numéro dans acceptedBy
          if (!order.acceptedBy) order.acceptedBy = [];
          if (!order.acceptedBy.includes(from)) {
            order.acceptedBy.push(from);
          }

          order.status = "accepted";
          order.driverPhone = from;
          await order.save();

          console.log("🟢 Commande mise à jour avec succès !");
        }

        // Si le livreur refuse la commande
        if (replyId === "decline_order") {
          console.log(`❌ Le livreur ${from} a refusé la commande.`);

          // Ajouter son numéro dans refusedBy
          if (!order.refusedBy) order.refusedBy = [];
          if (!order.refusedBy.includes(from)) {
            order.refusedBy.push(from);
          }

          // Passer au prochain livreur
          order.driverIndex = (order.driverIndex + 1) % drivers.length;
          const nextDriver = drivers[order.driverIndex];

          console.log(`➡️ Envoi de la commande au prochain livreur : ${nextDriver.name}`);

          // Envoi au prochain livreur
          await axios.post(
            `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`,
            {
              messaging_product: "whatsapp",
              to: nextDriver.phone,
              type: "interactive",
              interactive: {
                type: "button",
                body: {
                  text: `Nouvelle commande 🛍️\nClient: ${order.customerName}\nTéléphone: ${order.customerPhone}\nProduits: ${order.items.join(
                    ", "
                  )}\nAcceptez-vous cette commande ?`,
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

          await order.save();
          console.log("📦 Commande mise à jour et renvoyée au prochain livreur.");
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur Webhook:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
