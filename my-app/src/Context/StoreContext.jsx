import React, { createContext, useEffect, useState } from "react";
import { AllProducts } from "../assets/assets";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const DEMO_EMAILS = new Set(["demo@ayashtech.com"]);
  const DEMO_PASSWORDS = new Set(["demo1234"]);
  const DEMO_NAME = "Aman";

  const [products, setProducts] = useState(AllProducts);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem("auth");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [cartItem, setCartItem] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItem));
    } catch {
      // ignore storage errors
    }
  }, [cartItem]);

  useEffect(() => {
    try {
      if (!auth) {
        localStorage.removeItem("auth");
        return;
      }
      localStorage.setItem("auth", JSON.stringify(auth));
    } catch {
      // ignore storage errors
    }
  }, [auth]);

  const signIn = ({ email, password }) => {
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    const normalizedPassword = String(password || "");

    const isDemoLogin =
      DEMO_EMAILS.has(normalizedEmail) &&
      DEMO_PASSWORDS.has(normalizedPassword);

    const user = {
      email: normalizedEmail,
      name: isDemoLogin ? DEMO_NAME : "Guest",
      role: isDemoLogin ? "demo" : "user",
    };

    setAuth({ user });
    return user;
  };

  const signOut = () => setAuth(null);

  const isDemo = auth?.user?.role === "demo";
  const isDashboardUser = isDemo;

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
    auth,
    signIn,
    signOut,
    isDemo,
    isDashboardUser,
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
