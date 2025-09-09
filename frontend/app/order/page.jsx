"use client";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext"; // Si tu veux récupérer commandes locales
import Link from "next/link";

export default function OrdersPage() {
  // Exemple : commandes mockées
  const orders = [
    {
      id: 1,
      items: [
        { name: "بيتزا مارغريتا", qty: 1, price: 80 },
        { name: "مشروب غازي", qty: 2, price: 15 },
      ],
      total: 110,
      status: "En cours",
      phone: "065XXXXXXX",
      address: "Rabat, Maroc",
    },
    {
      id: 2,
      items: [
        { name: "سلطة صحية", qty: 1, price: 40 },
      ],
      total: 40,
      status: "Livrée",
      phone: "066XXXXXXX",
      address: "Casablanca, Maroc",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800 p-8 text-white" dir="rtl">
      <h1 className="text-4xl font-bold text-center mb-10">طلباتي</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-start px-2 pt-2 mb-2">
  <Link href="/">
    <button className="px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition flex items-center gap-2">
      <i className="fas fa-arrow-left"></i> العودة
    </button>
  </Link>
</div>
        {orders.map(order => (
          <div key={order.id} className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">طلب رقم #{order.id}</h2>
            <ul className="mb-4 space-y-2">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{item.name} x {item.qty}</span>
                  <span>{item.price * item.qty} درهم</span>
                </li>
              ))}
            </ul>
            <p className="font-bold mb-2">المجموع الكلي: {order.total} درهم</p>
            <p className="mb-2">الحالة: <span className={`font-semibold ${order.status === "Livrée" ? "text-green-400" : "text-yellow-300"}`}>{order.status}</span></p>
            <p className="mb-2">رقم الهاتف: {order.phone}</p>
            <p className="mb-4">العنوان: {order.address}</p>
            <Link href={`/order/${order.id}`} className="px-4 py-2 bg-teal-400 rounded-full hover:bg-teal-500 transition">
              التفاصيل
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
