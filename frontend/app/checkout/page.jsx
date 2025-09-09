"use client";
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cash"); // "cash" ou "online"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("السلة فارغة!");
      return;
    }

    // Ici tu peux envoyer les données au backend ou gérer le paiement en ligne
    console.log("Commande confirmée :", { formData, paymentMethod, cart });


    router.push("/confirmation"); // Page confirmation
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800 p-10" dir="rtl">
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 shadow-xl">
        <div className="flex justify-start mb-4">
    <Link href="/cart">
      <button className="px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition flex items-center gap-2">
        <i className="fas fa-arrow-left"></i> الرجوع للسلة
      </button>
    </Link>
  </div>
        <h1 className="text-3xl font-bold text-white text-center mb-6">إتمام الطلب</h1>

        {cart.length === 0 ? (
          <p className="text-white text-center">السلة فارغة حالياً</p>
        ) : (
          <>
            {/* Résumé du panier */}
            <ul className="mb-6 space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between text-white">
                  <span>{item.name} x {item.qty}</span>
                  <span>{item.price * item.qty} درهم</span>
                </li>
              ))}
            </ul>
            <h2 className="text-xl text-teal-300 font-bold mb-6">المجموع الكلي: {total} درهم</h2>

            {/* Formulaire utilisateur */}
         <form onSubmit={handleSubmit} className="space-y-6">

  {/* Nom */}
  <div className="relative">
    <input
      type="text"
      name="firstName"
      placeholder=" "
      value={formData.firstName}
      onChange={handleChange}
      required
      className="peer w-full px-4 py-3 rounded-xl bg-white/20 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
    />
    <label className="absolute left-4 top-3 text-white/70 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70 peer-placeholder-shown:text-base peer-focus:top-[-8px] peer-focus:text-sm peer-focus:text-teal-400">
      الاسم
    </label>
  </div>



  {/* رقم الهاتف */}
  <div className="relative">
    <input
      type="tel"
      name="phone"
      placeholder=" "
      value={formData.phone}
      onChange={handleChange}
      required
      className="peer w-full px-4 py-3 rounded-xl bg-white/20 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
    />
    <label className="absolute left-4 top-3 text-white/70 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70 peer-placeholder-shown:text-base peer-focus:top-[-8px] peer-focus:text-sm peer-focus:text-teal-400">
      رقم الهاتف
    </label>
  </div>

  {/* Méthode de paiement */}
  <div className="flex gap-6 mt-2 text-white font-semibold">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="payment"
        value="cash"
        checked={paymentMethod === "cash"}
        onChange={() => setPaymentMethod("cash")}
        className="accent-teal-400"
      />
      الدفع عند التسليم
    </label>
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="payment"
        value="online"
        checked={paymentMethod === "online"}
        onChange={() => setPaymentMethod("online")}
        className="accent-teal-400"
      />
      الدفع أونلاين
    </label>
  </div>

  {/* Formulaire carte si paiement en ligne */}
  {paymentMethod === "online" && (
    <div className="space-y-4 mt-4">
      <div className="relative">
        <input
          type="text"
          name="cardNumber"
          placeholder=" "
          value={formData.cardNumber}
          onChange={handleChange}
          required
          className="peer w-full px-4 py-3 rounded-xl bg-white/20 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
        />
        <label className="absolute left-4 top-3 text-white/70 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70 peer-placeholder-shown:text-base peer-focus:top-[-8px] peer-focus:text-sm peer-focus:text-teal-400">
          رقم البطاقة
        </label>
      </div>
      <div className="flex gap-4">
        <div className="relative w-1/2">
          <input
            type="text"
            name="expiry"
            placeholder=" "
            value={formData.expiry}
            onChange={handleChange}
            required
            className="peer w-full px-4 py-3 rounded-xl bg-white/20 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />
          <label className="absolute left-4 top-3 text-white/70 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70 peer-placeholder-shown:text-base peer-focus:top-[-8px] peer-focus:text-sm peer-focus:text-teal-400">
            تاريخ الانتهاء MM/YY
          </label>
        </div>
        <div className="relative w-1/2">
          <input
            type="text"
            name="cvc"
            placeholder=" "
            value={formData.cvc}
            onChange={handleChange}
            required
            className="peer w-full px-4 py-3 rounded-xl bg-white/20 text-black placeholder-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          />
          <label className="absolute left-4 top-3 text-white/70 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-white/70 peer-placeholder-shown:text-base peer-focus:top-[-8px] peer-focus:text-sm peer-focus:text-teal-400">
            CVC
          </label>
        </div>
      </div>
    </div>
  )}

  <button
    type="submit"
    className="w-full py-3 bg-gradient-to-r from-teal-400 to-green-500 hover:from-teal-500 hover:to-green-600 text-white font-bold rounded-full shadow-lg transition mt-6"
  >
    تأكيد الطلب ✅
  </button>
</form>

          </>
        )}
      </div>
    </div>
  );
}
