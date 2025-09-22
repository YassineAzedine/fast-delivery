"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CartContext } from "../../context/CartContext";

export default function ProductsPage() {
  const { addToCart, cart } = useContext(CartContext);

  const floatingShapesRef = useRef(null);
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

    shapes.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      const shape = document.createElement('div');
      const size = Math.random() * 100 + 50;
      const isCircle = Math.random() > 0.5;
      shape.className = `absolute opacity-10 ${isCircle ? 'rounded-full' : 'rounded-2xl rotate-45'} bg-yellow-400`;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      shape.style.animation = `float ${5 + Math.random() * 10}s infinite ease-in-out`;
      shape.style.animationDelay = `${Math.random() * 5}s`;
      shapes.appendChild(shape);
    }

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
      .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
    `;
    document.head.appendChild(style);
    return () => { if (document.head.contains(style)) document.head.removeChild(style); };
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
          (selectedDrink?.price || 0),
        selectedSize: selectedSize.name,
        selectedExtras,
        selectedSauce,
        selectedDrink: selectedDrink?.name || null,
      });
      setShowPopup(false);
      setSelectedProduct(null);
      setSelectedSize(null);
      setSelectedExtras([]);
      setSelectedSauce(null);
      setSelectedDrink(null);
    } else {
      alert("Veuillez sélectionner une taille !");
    }
  };

  const categories = [
    { name: "Pizza", icon: "🍕" },
    { name: "Tacos", icon: "🌮" },
    { name: "Burger", icon: "🍔" },
    { name: "Boissons", icon: "🥤" },
  ];

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
      extras: [{ name: "Fromage", price: 5 }],
      sauces: [],
      rating: 4.8,
      popular: true,
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
      extras: [{ name: "Fromage", price: 5 }, { name: "Olives", price: 3 }],
      sauces: [],
      rating: 4.9,
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
      extras: [{ name: "Frites", price: 5 }],
      sauces: ["Sauce Algérienne", "Sauce Biggy"],
      drinks: [{ name: "Coca Cola", price: 15 }, { name: "Jus d'Orange", price: 20 }],
      rating: 4.7,
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
      extras: [{ name: "Frites", price: 5 }, { name: "Fromage", price: 3 }],
      sauces: ["Ketchup", "Mayo", "Sauce BBQ"],
      rating: 4.6,
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
      rating: 4.5,
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
      rating: 4.4,
    },
  ];

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "all" || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen overflow-x-hidden relative bg-black" dir="rtl">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 overflow-hidden" ref={floatingShapesRef}></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-yellow-400/30">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/order" className="text-yellow-400 hover:text-white transition px-4 py-2 rounded-full hover:bg-yellow-400/10">
              📋 Mes commandes
            </Link>
          </div>
          <Link href="/cart" className="relative">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/20 hover:bg-yellow-400/40 transition">
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-bold">{cart.length}</span>
              )}
            </div>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <header className="text-center pt-32 pb-16 px-6">
        <h1 className="text-6xl md:text-7xl font-black text-yellow-400 mb-6">Liste des produits</h1>
        <p className="text-white/80 text-2xl mb-8">Choisissez votre commande préférée ⚡</p>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-6 py-4 rounded-full bg-black/40 border border-yellow-400 text-yellow-400 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400 text-xl">🔍</span>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-full font-bold flex items-center gap-3 transition transform hover:scale-105 ${
              selectedCategory === "all" ? "bg-yellow-400 text-black shadow-lg" : "bg-black/40 text-yellow-400 border border-yellow-400/50"
            }`}
          >
            📋 Tous
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-6 py-3 rounded-full font-bold flex items-center gap-3 transition transform hover:scale-105 ${
                selectedCategory === cat.name ? "bg-yellow-400 text-black shadow-lg" : "bg-black/40 text-yellow-400 border border-yellow-400/50"
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative bg-black/70 border border-yellow-400 rounded-3xl overflow-hidden shadow-lg">
              {product.popular && (
                <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">🔥 Populaire</div>
              )}
              <div className="relative overflow-hidden h-56">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-2xl font-bold text-yellow-400 group-hover:text-white transition">{product.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    ⭐ {product.rating}
                  </div>
                </div>
                <p className="text-white/80 mb-4 text-sm leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-yellow-400 font-bold">{Math.min(...product.sizes.map(s => s.price))} MAD</p>
                  <button
                    onClick={() => { setSelectedProduct(product); setShowPopup(true); }}
                    className="px-6 py-3 rounded-full bg-yellow-400 text-black font-bold shadow-lg hover:bg-yellow-500 transition"
                  >
                    🛒 Ajouter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Popup */}
      {showPopup && selectedProduct && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-black/90 rounded-3xl w-full max-w-2xl p-8 relative text-yellow-400">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-yellow-400 hover:text-white text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-4">{selectedProduct.name}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-xl mb-6" />
            
            {/* Sizes */}
            <div className="mb-4">
              <h3 className="font-bold mb-2">Taille :</h3>
              <div className="flex flex-wrap gap-3">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full font-bold transition ${
                      selectedSize?.name === size.name ? "bg-yellow-400 text-black" : "bg-black/40 border border-yellow-400"
                    }`}
                  >
                    {size.name} ({size.price} MAD)
                  </button>
                ))}
              </div>
            </div>

            {/* Extras */}
            {selectedProduct.extras.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold mb-2">Extras :</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.extras.map((extra) => (
                    <button
                      key={extra.name}
                      onClick={() => toggleExtra(extra.name)}
                      className={`px-4 py-2 rounded-full font-bold transition ${
                        selectedExtras.includes(extra.name) ? "bg-yellow-400 text-black" : "bg-black/40 border border-yellow-400"
                      }`}
                    >
                      {extra.name} (+{extra.price} MAD)
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sauces */}
            {selectedProduct.sauces && selectedProduct.sauces.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold mb-2">Sauce :</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.sauces.map((sauce) => (
                    <button
                      key={sauce}
                      onClick={() => setSelectedSauce(sauce)}
                      className={`px-4 py-2 rounded-full font-bold transition ${
                        selectedSauce === sauce ? "bg-yellow-400 text-black" : "bg-black/40 border border-yellow-400"
                      }`}
                    >
                      {sauce}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Drinks */}
            {selectedProduct.drinks && selectedProduct.drinks.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold mb-2">Boissons :</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.drinks.map((drink) => (
                    <button
                      key={drink.name}
                      onClick={() => setSelectedDrink(drink)}
                      className={`px-4 py-2 rounded-full font-bold transition ${
                        selectedDrink?.name === drink.name ? "bg-yellow-400 text-black" : "bg-black/40 border border-yellow-400"
                      }`}
                    >
                      {drink.name} (+{drink.price} MAD)
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="text-right mt-6">
              <button
                onClick={confirmAddToCart}
                className="px-8 py-3 rounded-full bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-yellow-400 py-12 bg-black/90 border-t border-yellow-400/20">
        <p className="text-lg font-medium">&copy; 2025 Tous droits réservés.</p>
        <p className="text-yellow-400/70 mt-2">Livraison rapide • Qualité garantie • Service 24/7</p>
      </footer>
    </div>
  );
}
