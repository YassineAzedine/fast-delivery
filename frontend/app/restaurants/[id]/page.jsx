"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { CartContext } from "../../context/CartContext";

export default function ProductsPage() {
      const { addToCart, cart } = useContext(CartContext);
    
  const floatingShapesRef = useRef(null);
//   const { addToCart, cart } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedSauce, setSelectedSauce] = useState(null);
const [selectedDrink, setSelectedDrink] = useState(null);
  // Floating shapes animation
  useEffect(() => {
    const shapes = floatingShapesRef.current;
    if (!shapes) return;

    // Clear existing shapes
    shapes.innerHTML = '';

    // Create floating shapes
    for (let i = 0; i < 8; i++) {
      const shape = document.createElement('div');
      const size = Math.random() * 100 + 50;
      const isCircle = Math.random() > 0.5;
      
      shape.className = `absolute opacity-10 ${isCircle ? 'rounded-full' : 'rounded-2xl rotate-45'} bg-white`;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.animation = `float ${5 + Math.random() * 10}s infinite ease-in-out`;
      shape.style.animationDelay = `${Math.random() * 5}s`;
      
      shapes.appendChild(shape);
    }

    // Add keyframes for floating animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) =>
      prev.includes(extra) ? prev.filter((e) => e !== extra) : [...prev, extra]
    );
  };

const confirmAddToCart = () => {
  if (selectedProduct && selectedSize) {
    addToCart({
      ...selectedProduct,
      price:
        selectedSize.price +
        selectedExtras.reduce((sum, extra) => {
          const ex = selectedProduct.extras.find((e) => e.name === extra);
          return sum + (ex?.price || 0);
        }, 0) +
        (selectedDrink?.price || 0), // ajout de la boisson
      selectedSize: selectedSize.name,
      selectedExtras,
      selectedSauce,
      selectedDrink: selectedDrink?.name || null, // enregistre le nom de la boisson
    });

    // Reset selections
    setShowPopup(false);
    setSelectedProduct(null);
    setSelectedSize(null);
    setSelectedExtras([]);
    setSelectedSauce(null);
    setSelectedDrink(null); // reset la boisson
  } else {
    alert("Veuillez sélectionner une taille !");
  }
};


  // Mapping option → icône
  const optionIcons = {
    "Frites": "🍟",
    "Fromage": "🧀",
    "Olives": "🫒",
  };

  // --- Categories ---
  const categories = [
    { name: "Pizza", icon: "🍕", gradient: "from-orange-500 to-red-500" },
    { name: "Tacos", icon: "🌮", gradient: "from-yellow-500 to-orange-500" },
    { name: "Burger", icon: "🍔", gradient: "from-green-500 to-teal-500" },
    { name: "Boissons", icon: "☕", gradient: "from-blue-500 to-purple-500" },
  ];

  // --- Products ---
  const products = [
    {
      id: 1,
      name: "Pizza Margherita",
      category: "Pizza",
      description: "Pizza classique avec tomate, mozzarella et basilic frais",
      image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800",
      sizes: [
        { name: "Small", price: 70 },
        { name: "Medium", price: 80 },
        { name: "Large", price: 90 },
      ],
      extras: [
        { name: "Fromage", price: 5 },
      ],
      sauces: [],
      rating: 4.8,
      popular: true
    },
    {
      id: 2,
      name: "Pizza Pepperoni",
      category: "Pizza",
      description: "Pizza avec pepperoni, fromage et sauce tomate",
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=800",
      sizes: [
        { name: "Small", price: 75 },
        { name: "Medium", price: 85 },
        { name: "Large", price: 95 },
      ],
      extras: [
        { name: "Fromage", price: 5 },
        { name: "Olives", price: 3 },
      ],
      sauces: [],
      rating: 4.9
    },
    {
      id: 3,
      name: "Tacos Poulet",
      category: "Tacos",
      description: "Tacos au poulet grillé avec légumes frais",
      image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800",
      sizes: [
        { name: "Small", price: 45 },
        { name: "Medium", price: 50 },
        { name: "Large", price: 55 },
        { name: "XXL", price: 65 },
      ],
      extras: [
        { name: "Frites", price: 5 }
      ],
      sauces: ["Sauce Algérienne", "Sauce Biggy"],
        drinks: [  // <== boissons disponibles comme option
      { name: "Coca Cola", price: 15 },
      { name: "Jus d'Orange", price: 20 }
    ],
      rating: 4.7
    },
    {
      id: 4,
      name: "Burger Classique",
      category: "Burger",
      description: "Burger avec steak haché, salade, tomate et oignon",
      image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800",
      sizes: [
        { name: "Simple", price: 40 },
        { name: "Double", price: 55 },
      ],
      extras: [
        { name: "Frites", price: 5 },
        { name: "Fromage", price: 3 },
      ],
      sauces: ["Ketchup", "Mayo", "Sauce BBQ"],
      rating: 4.6
    },
    {
      id: 5,
      name: "Coca Cola",
      category: "Boissons",
      description: "Boisson gazeuse rafraîchissante",
      image: "https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=800",
      sizes: [
        { name: "33cl", price: 10 },
        { name: "50cl", price: 15 },
      ],
      extras: [],
      sauces: [],
      rating: 4.5
    },
    {
      id: 6,
      name: "Jus d'Orange",
      category: "Boissons",
      description: "Jus d'orange naturel pressé",
      image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800",
      sizes: [
        { name: "25cl", price: 12 },
        { name: "50cl", price: 20 },
      ],
      extras: [],
      sauces: [],
      rating: 4.4
    }
  ];

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "all" || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen overflow-x-hidden relative" dir="rtl">
      {/* Enhanced Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20"></div>
        <div className="absolute inset-0 overflow-hidden" ref={floatingShapesRef}></div>
      </div>

      {/* Enhanced Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/order" className="text-white hover:text-purple-200 transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-white/10">
              <span className="text-lg">📋</span>
              <span>Mes commandes</span>
            </Link>
          </div>
          
          <Link href="/cart" className="relative group">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
              <span className="text-2xl">🛒</span>
              <span className="text-white">Panier</span>
              {cart.length > 0 && (
                <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                  {cart.length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </nav>

      {/* Enhanced Header */}
      <header className="text-center pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-black text-white drop-shadow-2xl mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Liste des produits
          </h1>
          <p className="text-2xl text-white/90 mb-8 font-light">
            Choisissez votre commande préférée et nous la livrons rapidement ⚡
          </p>
          
          {/* Enhanced Search */}
          <div className="relative max-w-md mx-auto mb-10">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 text-xl">🔍</span>
          </div>
          
          {/* Enhanced Category Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-3 rounded-full font-bold flex items-center gap-3 transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === "all" 
                  ? "bg-white text-purple-600 shadow-xl shadow-white/20" 
                  : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
              }`}
            >
              <span className="text-xl">📋</span>
              <span>Tous</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-6 py-3 rounded-full font-bold flex items-center gap-3 transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === cat.name 
                    ? "bg-white text-purple-600 shadow-xl shadow-white/20" 
                    : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Enhanced Products Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl "
            
            >
              {/* Popular Badge */}
              {product.popular && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  🔥 Populaire
                </div>
              )}

              {/* Product Image */}
              <div className="relative overflow-hidden h-56">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span>⭐</span>
                    <span className="text-white/90 font-medium">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-white/80 mb-4 text-sm leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm text-white/70 mb-1">À partir de</p>
                    <p className="text-2xl font-bold text-white">
                      {Math.min(...product.sizes.map(s => s.price))} <span className="text-lg text-purple-200">MAD</span>
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowPopup(true);
                    }}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold shadow-xl hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 hover:from-red-600 hover:to-pink-700"
                  >
                    Ajouter 🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="text-2xl font-bold text-white mb-2">Aucun produit trouvé</h3>
            <p className="text-white/70">Essayez avec d'autres mots-clés ou catégories</p>
          </div>
        )}
      </main>

      {/* Enhanced Popup */}
{showPopup && selectedProduct && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl w-full max-w-xl shadow-lg max-h-[90vh] overflow-y-auto">
      
      {/* Header */}
      <div className="relative p-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-t-2xl text-white flex items-center gap-4">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white hover:text-red-400 transition"
        >
          ✖
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/30">
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
            <p className="text-purple-200 text-sm mt-1">{selectedProduct.description}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 space-y-6">
        {/* Sizes */}
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">📏 Taille</h3>
          <div className="flex flex-wrap gap-2">
            {selectedProduct.sizes.map((size) => (
              <label 
                key={size.name} 
                className={`flex-1 p-3 border rounded-lg cursor-pointer text-center transition ${
                  selectedSize?.name === size.name 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="font-medium">{size.name}</div>
                <div className="text-purple-600">{size.price} MAD</div>
                <input
                  type="radio"
                  name="size"
                  checked={selectedSize?.name === size.name}
                  onChange={() => setSelectedSize(size)}
                  className="hidden"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Extras */}
        {selectedProduct.extras.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">➕ Extras (optionnel)</h3>
            <div className="flex flex-col gap-2">
              {selectedProduct.extras.map((extra) => (
                <label 
                  key={extra.name} 
                  className={`flex justify-between items-center p-3 border rounded-lg cursor-pointer transition ${
                    selectedExtras.includes(extra.name) 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {/* Icône pour Frites */}
                    {extra.name === "Frites" && <span className="text-yellow-500 text-2xl">🍟</span>}
                    <span>{extra.name}</span>
                  </div>
                  <span>+{extra.price} MAD</span>
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.name)}
                    onChange={() => toggleExtra(extra.name)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Sauces */}
        {selectedProduct.sauces.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">🥫 Sauce</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.sauces.map((sauce) => (
                <label 
                  key={sauce} 
                  className={`flex-1 p-3 border rounded-lg text-center cursor-pointer transition ${
                    selectedSauce === sauce 
                      ? 'border-orange-500 bg-orange-50' 
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  {sauce}
                  <input
                    type="radio"
                    name="sauce"
                    checked={selectedSauce === sauce}
                    onChange={() => setSelectedSauce(sauce)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Boissons (optionnel) */}
        {selectedProduct.drinks?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">🥤 Boisson</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.drinks.map((drink) => (
  <label 
    key={drink.name} 
    className={`flex-1 p-3 border rounded-lg text-center cursor-pointer transition ${
      selectedDrink?.name === drink.name 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-200 hover:border-blue-300'
    }`}
    onClick={() => {
      // toggle: si déjà sélectionnée, désélectionner
      if (selectedDrink?.name === drink.name) {
        setSelectedDrink(null);
      } else {
        setSelectedDrink(drink);
      }
    }}
  >
    {drink.name} +{drink.price} MAD
  </label>
))}
            </div>
          </div>
        )}

        {/* Total Price */}
        {selectedSize && (
          <div className="p-3 bg-gray-100 rounded-lg text-center font-semibold">
            Total : {selectedSize.price
              + selectedExtras.reduce((sum, extra) => {
                  const ex = selectedProduct.extras.find(e => e.name === extra);
                  return sum + (ex?.price || 0);
                }, 0)
              + (selectedDrink?.price || 0)
            } MAD
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={confirmAddToCart}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
        >
          🛒 Ajouter au panier
        </button>
      </div>
    </div>
  </div>
)}




      {/* Enhanced Footer */}
      <footer className="text-center text-white/80 py-12 bg-black/20 backdrop-blur-lg border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-4xl mb-4">🍕🌮🍔</div>
          <p className="text-lg font-medium">&copy; 2025 Tous droits réservés.</p>
          <p className="text-white/60 mt-2">Livraison rapide • Qualité garantie • Service 24/7</p>
        </div>
      </footer>
    </div>
  );
}