"use client";
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // استرجاع السلة من localStorage أول مرة
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // تحديث localStorage كلما تغير cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

const addToCart = (product) => {
  // On cherche si le même produit avec exactement les mêmes options existe déjà
  const existingIndex = cart.findIndex(
    (item) =>
      item.id === product.id &&
      JSON.stringify(item.options || []) === JSON.stringify(product.options || [])
  );

  if (existingIndex !== -1) {
    // On augmente la quantité si combinaison existante
    const updatedCart = [...cart];
    updatedCart[existingIndex].qty += product.qty || 1;
    setCart(updatedCart);
  } else {
    // Sinon on ajoute un nouvel objet
    setCart([...cart, { ...product, qty: product.qty || 1 }]);
  }
};

  const updateQty = (id, qty) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id ? { ...item, qty } : item
    )
  );
};


  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  const clearCart = () => { 
    setCart([]);
    };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart , updateQty , clearCart}}>
      {children}
    </CartContext.Provider>
  );
}
