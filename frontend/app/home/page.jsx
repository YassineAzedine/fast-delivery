"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CartContext } from "../context/CartContext";

export default function ProductsPage() {
  const floatingShapesRef = useRef(null);
  const { addToCart, cart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [searchText, setSearchText] = useState("");

  // --- Popup state ---
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [options, setOptions] = useState([]);

  const toggleOption = (option) => {
    setOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const confirmAddToCart = () => {
    if (selectedProduct) {
      addToCart({ ...selectedProduct, options });
      setShowPopup(false);
      setOptions([]);
      setSelectedProduct(null);
    }
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
      }
      .float-animation { animation: float 20s infinite linear; }
    `;
    document.head.appendChild(style);

    const createParticle = () => {
      if (floatingShapesRef.current) {
        const particle = document.createElement("div");
        const size = Math.random() * 80 + 20;
        particle.className =
          "absolute rounded-full bg-gradient-to-br from-white/10 to-white/5 float-animation";
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.animationDuration = Math.random() * 20 + 15 + "s";
        particle.style.animationDelay = Math.random() * 5 + "s";
        floatingShapesRef.current.appendChild(particle);
        setTimeout(() => {
          if (particle.parentNode) particle.remove();
        }, 40000);
      }
    };

    const interval = setInterval(createParticle, 3000);
    return () => {
      clearInterval(interval);
      document.head.removeChild(style);
    };
  }, []);

  const categories = [
    { 
      name: "Food", 
      icon: "fas fa-utensils", 
      subcategories: [
        { name: "Pizza", icon: "fas fa-pizza-slice" },
        { name: "Burger", icon: "fas fa-hamburger" },
        { name: "Salad", icon: "fas fa-leaf" },
      ] 
    },

    
    { 
      name: "Drinks", 
      icon: "fas fa-coffee", 
      subcategories: [
        { name: "Soft Drink", icon: "fas fa-cocktail" },
        { name: "Juice", icon: "fas fa-wine-bottle" },
      ] 
    },
  ];

  const products = [
    {
      id: 1,
      name: "بيتزا مارغريتا",
      category: "Food",
      subcategory: "Pizza",
      desc: "بيتزا إيطالية أصلية بجبن الموزاريلا.",
      price: 80,
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800",
      options: ["إضافة جبن", "زيتون", "فلفل حار"],

    },
    {
      id: 2,
      name: "برغر كلاسيك",
      category: "Food",
      subcategory: "Burger",
      desc: "لحم طازج مع خبز محمص وخضروات.",
      price: 60,
      image: "https://images.pexels.com/photos/1639566/pexels-photo-1639566.jpeg?auto=compress&cs=tinysrgb&w=800",
      options: [],

    },
    {
      id: 3,
      name: "سلطة صحية",
      category: "Food",
      subcategory: "Salad",
      desc: "خضروات طازجة مع صوص مميز.",
      price: 40,
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800",
      options: [],

    },
    {
      id: 4,
      name: "مشروب غازي",
      category: "Drinks",
      subcategory: "Soft Drink",
      desc: "مشروب بارد منعش.",
      price: 15,
      image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800",
      options: [],

    },
    {
      id: 5,
      name: "عصير برتقال",
      category: "Drinks",
      subcategory: "Juice",
      desc: "عصير طبيعي منعش.",
      price: 20,
      image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800",
      options: [],

    },
        {
      id: 6,
      name: "تاكوس",
      category: "Food",
      subcategory: "Tacos",
      desc: "تاكوس لذيذ مع خيارات الصوص.",
      price: 50,
      image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800",
      options: ["صوص ألجيري", "صوص بيغي"],
    },
  ];

  const filteredProducts = products
    .filter(p => selectedCategory === "all" || p.category === selectedCategory)
    .filter(p => selectedSubcategory === "all" || p.subcategory === selectedSubcategory)
    .filter(p => p.name.includes(searchText));

  return (
    <div className="min-h-screen overflow-x-hidden relative" dir="rtl">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800">
        <div className="absolute inset-0 overflow-hidden" ref={floatingShapesRef}></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-lg flex justify-between items-center px-6 py-4 shadow-md">
        <Link href="/order" className="text-white px-4 py-2 hover:underline">
          طلباتي
        </Link>
        <Link href="/cart" className="relative">
          <i className="fas fa-shopping-cart text-white text-2xl"></i>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
      </nav>

      <div className="flex justify-start px-6 pt-28 mb-4">
        <Link href="/">
          <button className="px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition flex items-center gap-2">
            <i className="fas fa-arrow-left"></i> العودة
          </button>
        </Link>
      </div>

      {/* Header */}
      <header className="text-center pt-28 pb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
          قائمة المنتجات
        </h1>
        <p className="text-xl text-white/80">اختر طلبك المفضل وسنوصله بسرعة ⚡</p>

        {/* Search Bar */}
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="px-4 py-2 rounded-full w-80 text-black focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => { setSelectedCategory("all"); setSelectedSubcategory("all"); }}
            className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition ${selectedCategory === "all" ? "bg-teal-400 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}
          >
            <i className="fas fa-list"></i> الكل
          </button>

          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => { setSelectedCategory(cat.name); setSelectedSubcategory("all"); }}
              className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition ${selectedCategory === cat.name ? "bg-teal-400 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}
            >
              <i className={cat.icon}></i> {cat.name}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        {selectedCategory !== "all" && (
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {categories.find(c => c.name === selectedCategory)?.subcategories.map(sub => (
              <button
                key={sub.name}
                onClick={() => setSelectedSubcategory(sub.name)}
                className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition ${selectedSubcategory === sub.name ? "bg-red-500 text-white" : "bg-white/20 text-white hover:bg-white/30"}`}
              >
                <i className={sub.icon}></i> {sub.name}
              </button>
            ))}
            <button
              onClick={() => setSelectedSubcategory("all")}
              className="px-4 py-2 rounded-full font-semibold bg-white/20 text-white hover:bg-white/30"
            >
              الكل
            </button>
          </div>
        )}
      </header>

      {/* Products Grid */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center shadow-lg transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-black/20"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />
            <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
            <p className="text-white/80 mb-4">{product.desc}</p>
            <p className="text-xl font-semibold text-teal-300 mb-4">{product.price} درهم</p>
           <button
  onClick={() => {
    if (product.options && product.options.length > 0) {
      setSelectedProduct(product);
      setShowPopup(true);
    } else {
      addToCart({ ...product, options: [] }); // يضيف مباشرة للسلة
    }
  }}
  className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-md hover:shadow-red-500/50 transition-all duration-300"
>
  أضف إلى السلة
</button>


          </div>
        ))}
      </main>

      {/* Popup for options */}
      {showPopup && selectedProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 text-center relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">
              اختر الإضافات لـ {selectedProduct.name}
            </h2>
            <div className="flex flex-col gap-2 text-right">
              {selectedProduct.options && selectedProduct.options.length > 0 ? (
  selectedProduct.options.map((option) => (
    <label key={option} className="flex items-center gap-2">  
      <input
        type="checkbox"
        checked={options.includes(option)}
        onChange={() => toggleOption(option)}     
        className="form-checkbox h-5 w-5 text-red-500"
        required
      />
      <span className="text-gray-700">{option}</span>
    </label>
  ))
) : (
  <p className="text-gray-500">لا توجد إضافات متاحة لهذا المنتج.</p>
)}
            </div>
            <button
              onClick={confirmAddToCart}
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              تأكيد
            </button>
          </div>
        </div>
      )}

      <footer className="mt-16 text-center text-white/70 text-lg p-8">
        <p>&copy; 2025 جميع الحقوق محفوظة.</p>
      </footer>

      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        rel="stylesheet"
      />
    </div>
  );
}
