import React, { createContext, useEffect, useState } from "react";
import { AllProducts } from "../assets/assets";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [products, setProducts] = useState(AllProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [cartItem, setCartItem] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItem));
    } catch (e) {
      // ignore storage errors
    }
  }, [cartItem]);

  const addCartItem = (itemId) => {
    const key = String(itemId);
    setCartItem((prev) => ({
      ...prev,
      [key]: prev[key] ? prev[key] + 1 : 1,
    }));
  };

  const removeCartItem = (itemId) => {
    const key = String(itemId);
    setCartItem((prev) => {
      const current = prev[key] || 0;
      if (current <= 1) {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      }
      return { ...prev, [key]: current - 1 };
    });
  };

  const clearCart = () => setCartItem({});

  const getTotalAmount = () => {
    let total = 0;
    Object.keys(cartItem).forEach((key) => {
      const product = AllProducts.find((p) => p.id === Number(key));
      if (product) total += Number(product.price) * cartItem[key];
    });
    return total;
  };

  const getTotalCartItems = () => {
    return Object.values(cartItem).reduce((sum, q) => sum + q, 0);
  };

  const getCartProducts = () => {
    return Object.keys(cartItem).map((key) => {
      const product = AllProducts.find((p) => p.id === Number(key));
      return { product, quantity: cartItem[key] };
    });
  };

  const getProductById = (id) => {
    const numId = Number(id);
    return products.find((product) => product.id === numId);
  };

  const filterByCategory = (category) => {
    const cat = category || "All";
    setSelectedCategory(cat);
    if (cat === "All") {
      setProducts(AllProducts);
      return;
    }
    const filtered = AllProducts.filter((product) => product.category === cat);
    setProducts(filtered);
  };

  
  

  const contextValue = {
    products,
    setProducts,
    selectedCategory,
    setSelectedCategory,
    cartItem,
    addCartItem,
    removeCartItem,
    clearCart,
    getTotalAmount,
    getTotalCartItems,
    getCartProducts,
    getProductById,
    filterByCategory,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
