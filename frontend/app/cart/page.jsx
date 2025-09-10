"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CartContext } from "../context/CartContext";


export default function CartPage() {
    const router = useRouter();
  const { cart, removeFromCart, updateQty } = useContext(CartContext);
  const floatingShapesRef = useRef(null);
  const [showCheckoutAnimation, setShowCheckoutAnimation] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = total > 100 ? 0 : 15;
  const finalTotal = total + deliveryFee;

  // Floating shapes animation
  useEffect(() => {
    const shapes = floatingShapesRef.current;
    if (!shapes) return;

    // Clear existing shapes
    shapes.innerHTML = '';

    // Create floating shapes
    for (let i = 0; i < 8; i++) {
      const shape = document.createElement('div');
      const size = Math.random() * 60 + 20;
      const isCircle = Math.random() > 0.5;
      
      shape.className = `absolute opacity-10 ${isCircle ? 'rounded-full' : 'rounded-2xl rotate-45'} bg-white`;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.animation = `float ${6 + Math.random() * 8}s infinite ease-in-out`;
      shape.style.animationDelay = `${Math.random() * 6}s`;
      
      shapes.appendChild(shape);
    }

    // Add keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      @keyframes slideIn {
        from { opacity: 0; transform: translateX(30px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes bounceIn {
        0% { opacity: 0; transform: scale(0.3); }
        50% { opacity: 1; transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { transform: scale(1); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      .slide-in {
        animation: slideIn 0.5s ease-out forwards;
      }
      .bounce-in {
        animation: bounceIn 0.6s ease-out forwards;
      }
      .pulse-animation {
        animation: pulse 2s infinite;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const increment = (id, currentQty) => updateQty(id, currentQty + 1);
  const decrement = (id, currentQty) => {
    if (currentQty > 1) updateQty(id, currentQty - 1);
  };

  const handleCheckout = () => {
    setShowCheckoutAnimation(true);
    setTimeout(() => {
      setShowCheckoutAnimation(false);
      // Navigate to checkout
    }, 2000);
  };

  return (
  <div className="min-h-screen overflow-x-hidden relative" dir="rtl">
  {/* Background */}
  <div className="fixed inset-0 -z-10">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800"></div>
    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20"></div>
  </div>

  <div className="max-w-5xl mx-auto p-4 md:p-2">
    {/* Header */}
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl mb-8">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-3 px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-full transition-all duration-300 transform hover:scale-105 border border-white/30"
        >
          <span className="text-xl">←</span>
          <span className="font-medium">العودة للمنتجات</span>
        </button>
        {cart.length > 0 && (
          <div className="text-white/80 text-sm bg-white/20 px-4 py-2 rounded-full">
            {cart.length} عنصر في السلة
          </div>
        )}
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-center text-white drop-shadow-2xl mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
        سلة المشتريات 🛒
      </h1>
    </div>

    {cart.length === 0 ? (
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl text-center">
        <div className="text-8xl mb-6">🛒</div>
        <h2 className="text-3xl font-bold text-white mb-4">السلة فارغة حالياً</h2>
        <p className="text-white/70 text-lg mb-8">أضف بعض المنتجات الرائعة لتبدأ طلبك</p>
        <Link href="/home">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-full shadow-xl transition-all duration-300 transform hover:scale-105">
            تصفح المنتجات 🍽️
          </button>
        </Link>
      </div>
    ) : (
      <>
        {/* Cart Items */}
        <div className="space-y-6 mb-8">
          {cart.map((item, index) => (
            <div
              key={item.id}
              className="slide-in bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transition-all duration-500 hover:shadow-3xl hover:shadow-purple-500/25 hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                {/* Image + Quantity */}
                <div className="relative flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 rounded-2xl object-cover shadow-lg border-4 border-white/30"
                  />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {item.qty}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.selectedSize && (
                          <span className="px-3 py-1 bg-blue-500/30 backdrop-blur-md rounded-full text-sm text-blue-200 font-medium border border-blue-400/30">
                            📏 {item.selectedSize}
                          </span>
                        )}
                        {item.selectedExtras?.map((extra, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-500/30 backdrop-blur-md rounded-full text-sm text-green-200 font-medium border border-green-400/30"
                          >
                            {extra === "Frites" ? "🍟 " : "➕ "} {extra}
                          </span>
                        ))}
                        {item.selectedSauce && (
                          <span className="px-3 py-1 bg-orange-500/30 backdrop-blur-md rounded-full text-sm text-orange-200 font-medium border border-orange-400/30">
                            🥫 {item.selectedSauce}
                          </span>
                        )}
                        {item.selectedDrink && (
                          <span className="px-3 py-1 bg-blue-500/30 backdrop-blur-md rounded-full text-sm text-blue-200 font-medium border border-blue-400/30">
                            🥤 {item.selectedDrink}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-bold text-white mb-2">
                        {(item.price * item.qty).toFixed(2)} <span className="text-lg text-purple-200">درهم</span>
                      </div>
                      <div className="text-white/60 text-sm">
                        {item.price.toFixed(2)} درهم × {item.qty}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-white/20 backdrop-blur-lg rounded-full px-6 py-3 border border-white/30">
                      <button
                        onClick={() => decrement(item.id, item.qty)}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 transform hover:scale-110"
                        disabled={item.qty <= 1}
                      >
                        −
                      </button>
                      <span className="text-white font-bold text-xl min-w-[3rem] text-center">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => increment(item.id, item.qty)}
                        className="w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 transform hover:scale-110"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="flex items-center gap-2 px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-200 rounded-full transition-all duration-300 transform hover:scale-105 border border-red-400/30"
                    >
                      <span className="text-lg">🗑️</span>
                      <span className="font-medium">إزالة</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bounce-in bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">ملخص الطلب 📊</h2>
          
          <div className="space-y-4 mb-2">
            {/* <div className="flex justify-between items-center py-3 border-b border-white/20">
              <span className="text-white/80 text-lg">المجموع الفرعي:</span>
              <span className="text-white font-bold text-xl">{total} درهم</span>
            </div> */}

            <div className="flex justify-between items-center py-3 border-b border-white/20">
              <span className="text-white/80 text-lg">
                رسوم التوصيل:
                {total >= 100 && <span className="text-green-300 text-sm mr-2">15 DH</span>}
              </span>
              {/* <span className={`font-bold text-xl ${deliveryFee === 0 ? 'text-green-300' : 'text-white'}`}>
                {deliveryFee === 0 ? 'مجاني' : `${deliveryFee} درهم`}
              </span> */}
            </div>

            <div className="flex justify-between items-center py-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-xl px-6">
              <span className="text-white font-bold text-2xl">المجموع النهائي:</span>
              <span className="text-white font-black text-3xl">{finalTotal} درهم</span>
            </div>
          </div>

          <div className="text-center">
            <Link href="/checkout">
              <button 
                onClick={handleCheckout}
                className={`px-12 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 mx-auto ${showCheckoutAnimation ? 'pulse-animation' : ''}`}
              >
                <span className="text-2xl">✅</span>
                <span>إتمام الطلب</span>
                <span className="text-2xl">🎉</span>
              </button>
            </Link>
            <p className="text-white/60 text-sm mt-3">توصيل سريع وآمن إلى باب منزلك</p>
          </div>
        </div>
      </>
    )}
  </div>
</div>

  );
}