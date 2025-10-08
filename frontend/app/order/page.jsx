"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]); // tableau vide par défaut
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");
    console.log("Customer from localStorage:", storedCustomer);

    if (!storedCustomer) {
      setLoading(false);
      return;
    }

    const customer = JSON.parse(storedCustomer);

    fetch(`/api/ordersByCustomer?customerPhone=${encodeURIComponent(customer.customerPhone)}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders); // toutes les commandes
        } else {
          setOrders([]);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">جاري تحميل الطلبات...</p>;

  if (orders.length === 0) return <p className="text-center mt-10">لا توجد طلبات حتى الآن</p>;

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
          <div key={order._id} className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">طلب رقم 

             <p>#{order._id}</p>
            </h2>

            <ul className="mb-4 space-y-2">
              {order.items.map((item, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{item}</span>
                </li>
              ))}

              {/* Afficher acceptedBy */}
              {order.acceptedBy && order.acceptedBy.length > 0 ? (
                <li className="flex flex-col mt-4 text-green-300">
                  <span className="font-bold">الطلب مقبول من طرف :</span>
                  {order.acceptedBy.map((driver, idx) => (
                    <span key={idx} className="ml-4">
                      📞 {driver}
                    </span>
                  ))}
                </li>
              ) : (
               <li className="mt-4 text-yellow-300">لم يقبل أي سائق الطلب بعد 🏍️</li>

              )}
            </ul>

            <p className="font-bold mb-2">
              الحالة:{" "}
              <span
                className={`font-semibold ${
                  order.status === "accepted"
                    ? "text-green-400"
                    : order.status === "failed"
                    ? "text-red-400"
                    : "text-yellow-300"
                }`}
              >
                {order.status}
              </span>
            </p>

            <p className="mb-2">رقم الهاتف: {order.customerPhone}</p>

            {/* <Link href={`/order/${order._id}`} className="px-4 py-2 bg-teal-400 rounded-full hover:bg-teal-500 transition">
              التفاصيل
            </Link> */}
          </div>
        ))}
      </div>
    </div>
  );
}
