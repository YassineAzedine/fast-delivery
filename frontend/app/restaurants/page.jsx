"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

// Données des restaurants
const restaurants = [
  {
    id: 1,
    name: "Amigo",
    rating: 4.5,
    reviews: 177,
    priceRange: "50–100 MAD",
    type: "Restaurant",
    location: "Ben Guerir",
    comment: "Un bon service.",
    image: "./restaurants/amigo.jpg",
    specialty: "Cuisine Méditerranéenne",
    deliveryTime: "25-35 min",
    isOpen: true,
    discount: "20% OFF",
    popular: true
  },
  {
    id: 2,
    name: "Delish Garden",
    rating: 4.7,
    reviews: 165,
    priceRange: "50–100 MAD",
    type: "Restaurant",
    location: "N 615, Hay Riad 1",
    comment: "Service nickel.",
    image: "./restaurants/delish-garden.jpg",
    specialty: "Plats Bio & Healthy",
    deliveryTime: "20-30 min",
    isOpen: true,
    featured: true
  },
  {
    id: 3,
    name: "Coin Gourmand",
    rating: 4.5,
    reviews: 80,
    priceRange: "50–100 MAD",
    type: "Restaurant",
    location: "à côté du crédit agricole, Rue Hassan II",
    comment: "Très bon service et cuisine variée.",
    image: "./restaurants/coin-gourmand.jpg",
    specialty: "Cuisine Fusion",
    deliveryTime: "30-40 min",
    isOpen: false,
    newRestaurant: true
  },
];

export default function RestaurantsPage() {
  const floatingShapesRef = useRef(null);
  const [searchText, setSearchText] = useState("");

  // Floating shapes animation
  useEffect(() => {
    const shapes = floatingShapesRef.current;
    if (!shapes) return;

    shapes.innerHTML = '';

    for (let i = 0; i < 12; i++) {
      const shape = document.createElement('div');
      const size = Math.random() * 80 + 30;
      const isCircle = Math.random() > 0.6;

      shape.className = `absolute opacity-20 ${isCircle ? 'rounded-full bg-yellow-400/20' : 'rounded-2xl rotate-45 bg-white/20'}`;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.animation = `float ${8 + Math.random() * 12}s infinite ease-in-out`;
      shape.style.animationDelay = `${Math.random() * 8}s`;

      shapes.appendChild(shape);
    }

    // Keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        25% { transform: translateY(-15px) rotate(90deg) scale(1.1); }
        50% { transform: translateY(-30px) rotate(180deg) scale(0.9); }
        75% { transform: translateY(-15px) rotate(270deg) scale(1.1); }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      .slide-up { animation: slideUp 0.6s ease-out forwards; }
      .pulse-animation { animation: pulse 2s infinite; }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  const filteredRestaurants = restaurants.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(searchText.toLowerCase()) ||
           restaurant.specialty.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <div className="min-h-screen overflow-x-hidden relative" dir="rtl">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-white/10"></div>
        <div className="absolute inset-0 overflow-hidden" ref={floatingShapesRef}></div>
      </div>

      {/* Header */}
      <header className="text-center pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-400 via-white to-yellow-300 bg-clip-text text-transparent drop-shadow-2xl mb-4">
            اختر المطعم
          </h1>
          <p className="text-2xl text-white/90 mb-8 font-light">
            اكتشف أفضل المطاعم في مدينتك 🍽️
          </p>

          {/* Search Bar */}
          <div className="relative max-w-lg mx-auto mb-8">
            <input
              type="text"
              placeholder="البحث عن مطعم ..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-black/60 border border-yellow-400/30 text-white placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-black/70 transition-all duration-300"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 text-xl">🔍</span>
          </div>
        </div>
      </header>

      {/* Restaurants Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="group slide-up bg-black/60 backdrop-blur-xl rounded-3xl border border-yellow-400/20 overflow-hidden shadow-2xl hover:border-yellow-400/50"
            >
              {/* Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {restaurant.discount && (
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-2 bg-gradient-to-r from-yellow-400 to-white text-black font-bold rounded-full shadow-xl pulse-animation">
                      {restaurant.discount}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors mb-1">
                      {restaurant.name}
                    </h2>
                    <p className="text-yellow-300 text-sm font-medium">{restaurant.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-400 mb-1">
                      <span>⭐</span>
                      <span className="text-white font-bold">{restaurant.rating}</span>
                      <span className="text-white/70 text-sm">({restaurant.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span>📍</span>
                    <span>{restaurant.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span>💰</span>
                    <span>{restaurant.priceRange}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span>🕐</span>
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                </div>

                <div className="mb-4 p-3 bg-black/30 rounded-xl border border-yellow-400/20">
                  <p className="text-white/90 italic text-sm">💬 "{restaurant.comment}"</p>
                </div>

                <Link href={`/restaurants/${restaurant.id}`}>
                  <button className="w-full py-4 bg-gradient-to-r from-yellow-400 to-white hover:from-yellow-500 hover:to-white/90 text-black font-bold text-lg rounded-xl shadow-xl hover:shadow-yellow-400/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    <span>🍽️</span>
                    <span>عرض المنتجات</span>
                    <span>←</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-20 text-white">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold mb-2">لم نعثر على مطاعم</h3>
            <p className="text-white/70">جرب البحث بكلمات مختلفة أو تصفح جميع المطاعم</p>
          </div>
        )}
      </main>

      {/* Stats */}
      <section className="bg-black/30 backdrop-blur-lg border-t border-yellow-400/10 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2 text-yellow-400">{restaurants.length}+</div>
              <div className="text-white/80">مطاعم شريكة</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-green-400">95%</div>
              <div className="text-white/80">رضا العملاء</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-blue-400">24/7</div>
              <div className="text-white/80">خدمة العملاء</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 text-purple-400">15 دقيقة</div>
              <div className="text-white/80">متوسط التوصيل</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-white/80 py-12 bg-black/40 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-4xl mb-4">🍽️✨</div>
          <p className="text-xl font-medium mb-2">&copy; 2025 جميع الحقوق محفوظة.</p>
          <p className="text-yellow-400">توصيل سريع • جودة مضمونة • خدمة على مدار الساعة</p>
        </div>
      </footer>
    </div>
  );
}
