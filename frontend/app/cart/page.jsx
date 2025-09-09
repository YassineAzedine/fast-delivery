"use client";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const increment = (id, currentQty) => updateQty(id, currentQty + 1);
  const decrement = (id, currentQty) => {
    if (currentQty > 1) updateQty(id, currentQty - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800 p-10" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl">
        {/* Bouton Retour */}
        <div className="mb-4">
          <Link href="/home">
            <button className="px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition flex items-center gap-2">
              <i className="fas fa-arrow-left"></i> العودة للمنتجات
            </button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-white text-center mb-8">سلة المشتريات</h1>

        {cart.length === 0 ? (
          <p className="text-center text-white/70 text-lg">السلة فارغة حالياً</p>
        ) : (
          <>
            <ul className="space-y-6">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between bg-white/20 rounded-2xl p-4 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                      <div className="flex items-center gap-2 text-white/80">
                        <span>الكمية:</span>
                        <button
                          onClick={() => decrement(item.id, item.qty)}
                          className="px-2 py-1 bg-white/20 text-white rounded-md hover:bg-white/30 transition"
                        >
                          -
                        </button>
                        <span className="px-3">{item.qty}</span>
                        <button
                          onClick={() => increment(item.id, item.qty)}
                          className="px-2 py-1 bg-white/20 text-white rounded-md hover:bg-white/30 transition"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-teal-300 font-bold">{item.price * item.qty} درهم</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="px-3 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-8 text-center">
              <h2 className="text-2xl text-white font-bold">
                المجموع الكلي: {total} درهم
              </h2>

              <Link href="/checkout">
                <button className="mt-4 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold shadow-lg">
                  إتمام الطلب ✅
                </button>
              </Link>
            </div>
          </>
        )}
      </div>

      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />
    </div>
  );
}
