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
  <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800 p-4 md:p-10" dir="rtl">
  <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl">
    
    {/* Bouton Retour */}
    <div className="mb-4">
      <Link href="/home">
        <button className="px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition flex items-center gap-2">
          <i className="fas fa-arrow-left"></i> العودة للمنتجات
        </button>
      </Link>
    </div>

    <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">سلة المشتريات</h1>

    {cart.length === 0 ? (
      <p className="text-center text-white/70 text-lg">السلة فارغة حالياً</p>
    ) : (
      <>
        <ul className="space-y-6">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white/20 rounded-2xl p-4 md:p-6 shadow-lg transition hover:scale-[1.02]"
            >
              <div className="flex items-start md:items-center gap-4 w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-white">{item.name}</h3>

                  {/* Display options if exist */}
                  {item.options && item.options.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                      {item.options.map((opt, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/30 backdrop-blur-md rounded-full text-sm text-white/90 font-medium shadow-sm"
                        >
                          {opt}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-white/80 mt-2">
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

                  <p className="text-teal-300 font-bold mt-2">{item.price * item.qty} درهم</p>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-4 md:mt-0 px-4 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition flex-shrink-0"
              >
                <i className="fas fa-trash"></i>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8 text-center">
          <h2 className="text-2xl md:text-3xl text-white font-bold">
            المجموع الكلي: {total} درهم
          </h2>

          <Link href="/checkout">
            <button className="mt-4 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold shadow-lg transition-transform hover:scale-105">
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
