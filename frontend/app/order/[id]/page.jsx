"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
// Icône personnalisée du livreur
const livreurIcon = new L.Icon({
  iconUrl: "/img.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function OrderDetail() {
  const params = useParams();
  const orderId = params.id;

  const [order, setOrder] = useState(null);
  const [livreurPosition, setLivreurPosition] = useState({ lat: 33.5731, lng: -7.5898 }); // Exemple Rabat

  useEffect(() => {
    // Simuler récupération d'une commande depuis le backend
    setOrder({
      id: orderId,
      items: [
        { name: "بيتزا مارغريتا", qty: 1, price: 80 },
        { name: "مشروب غازي", qty: 2, price: 15 },
      ],
      total: 110,
      status: "En cours",
      phone: "065XXXXXXX",
      address: "Rabat, Maroc",
    });
  }, [orderId]);

  // Simuler déplacement du livreur
  useEffect(() => {
    const interval = setInterval(() => {
      setLivreurPosition(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.001,
        lng: prev.lng + (Math.random() - 0.5) * 0.001,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!order) return <p className="text-white">Chargement...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800 p-8 text-white" dir="rtl">
        
      <h1 className="text-4xl font-bold text-center mb-10">طلب رقم #{order.id}</h1>

      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-10">
       <div className="flex justify-start px-2 pt-2 mb-2">
  <Link href="/">
    <button className="px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition flex items-center gap-2">
      <i className="fas fa-arrow-left"></i> العودة
    </button>
  </Link>
</div>
        <h2 className="text-2xl font-semibold mb-4">تفاصيل الطلب</h2>
        <ul className="mb-4 space-y-2">
          {order.items.map((item, idx) => (
            <li key={idx} className="flex justify-between">
              <span>{item.name} x {item.qty}</span>
              <span>{item.price * item.qty} درهم</span>
            </li>
          ))}
        </ul>
        <p className="font-bold mb-2">المجموع الكلي: {order.total} درهم</p>
        <p className="mb-2">الحالة: <span className="text-yellow-300">{order.status}</span></p>
        <p className="mb-2">رقم الهاتف: {order.phone}</p>
        <p className="mb-2">العنوان: {order.address}</p>
      </div>

      {/* Carte avec livreur animé */}
      <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-6">
        <h2 className="text-2xl font-semibold mb-4">موقع السائق الحالي</h2>
        <MapContainer center={[livreurPosition.lat, livreurPosition.lng]} zoom={15} scrollWheelZoom={false} className="h-64 rounded-2xl">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[livreurPosition.lat, livreurPosition.lng]} icon={livreurIcon}>
            <Popup>السائق هنا 🚴‍♂️</Popup>
          </Marker>
        </MapContainer>
        <p className="mt-2 text-white/80">موقع السائق يتم تحديثه تلقائياً كل 3 ثواني</p>
      </div>
    </div>
  );
}
