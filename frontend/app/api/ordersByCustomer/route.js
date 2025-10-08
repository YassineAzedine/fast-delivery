// pages/api/ordersByCustomer.js
import { NextResponse } from "next/server";
import dbConnect from "../../lib/dbConnect";
import Order from "../../models/Order";

export async function GET(req) {

    console.log("GET /api/ordersByCustomer called");
    
  try {
    const { searchParams } = new URL(req.url);
    const customerPhone = searchParams.get("customerPhone"); // récupéré depuis localStorage côté client
console.log(customerPhone);

    if (!customerPhone) {
      return NextResponse.json({ success: false, error: "Numéro client manquant" }, { status: 400 });
    }

    await dbConnect();

    const orders = await Order.find({ customerPhone }).sort({ createdAt: -1 }).limit(1);; // trier par date descendante

    return NextResponse.json({ success: true, orders });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
