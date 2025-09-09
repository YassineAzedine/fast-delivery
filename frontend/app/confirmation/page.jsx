"use client";

import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const { cart, clearCart } = useContext(CartContext);
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleBackHome = () => {
    clearCart(); // vider le panier après confirmation
    router.push("/"); // retourner à l'accueil
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800 p-10" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl text-center">
        <h1 className="text-4xl font-bold text-white mb-6">✅ تم تأكيد الطلب</h1>
        <p className="text-white/80 mb-6">شكراً لك على طلبك! إليك ملخص الطلب:</p>

        <ul className="mb-6 space-y-2 text-white">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>{item.name} x {item.qty}</span>
              <span>{item.price * item.qty} درهم</span>
            </li>
          ))}
        </ul>

        <p className="text-xl font-bold text-teal-300 mb-6">المجموع الكلي: {total} درهم</p>

        <button
          onClick={handleBackHome}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold shadow-lg"
        >
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
}
