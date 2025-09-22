"use client";

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function ConfirmationPage() {
  const { cart, clearCart } = useContext(CartContext);
  const router = useRouter();
  const [showAnimation, setShowAnimation] = useState(true);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleBackHome = () => {
    clearCart();
    router.push("/");
  };

  // Faire disparaître l'animation après 2 secondes
  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-10 flex items-center justify-center" dir="rtl">
      <div className="max-w-2xl w-full bg-black/60 backdrop-blur-xl border border-yellow-400/30 rounded-3xl p-8 shadow-2xl text-center relative overflow-hidden">
        
        {/* Confetti ou animation de confirmation */}
        {showAnimation && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-full animate-pulse bg-yellow-400/20 rounded-3xl"></div>
          </div>
        )}

        <h1 className="text-4xl font-black text-yellow-400 mb-6 drop-shadow-lg">✅ تم تأكيد الطلب</h1>
        <p className="text-yellow-400/80 mb-6">شكراً لك على طلبك! إليك ملخص الطلب:</p>

        <ul className="mb-6 space-y-2 text-yellow-400 font-semibold">
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between bg-white/10 backdrop-blur-md rounded-xl px-4 py-2">
              <span>{item.name} × {item.qty}</span>
              <span>{(item.price * item.qty).toFixed(2)} درهم</span>
            </li>
          ))}
        </ul>

        <p className="text-xl font-bold text-teal-300 mb-6">المجموع الكلي: {total.toFixed(2)} درهم</p>

        <button
          onClick={handleBackHome}
          className="px-8 py-3 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white rounded-full font-bold shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          العودة للرئيسية
        </button>
      </div>
    </div>
  );
}
