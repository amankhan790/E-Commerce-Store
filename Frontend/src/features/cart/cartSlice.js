import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const initialState = {
  cartItems: getInitialCart(), // Format: { [itemId]: quantity }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = String(action.payload);
      state.cartItems[itemId] = (state.cartItems[itemId] || 0) + 1;
      try {
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      } catch (err) {
        console.error("Failed to save cart to localStorage", err);
      }
    },
    removeFromCart: (state, action) => {
      const itemId = String(action.payload);
      if (state.cartItems[itemId]) {
        if (state.cartItems[itemId] <= 1) {
          delete state.cartItems[itemId];
        } else {
          state.cartItems[itemId] -= 1;
        }
      }
      try {
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      } catch (err) {
        console.error("Failed to save cart to localStorage", err);
      }
    },
    updateCartQuantity: (state, action) => {
      const { itemId, quantity } = action.payload;
      const key = String(itemId);
      const val = Number(quantity);
      if (val <= 0) {
        delete state.cartItems[key];
      } else {
        state.cartItems[key] = val;
      }
      try {
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      } catch (err) {
        console.error("Failed to save cart to localStorage", err);
      }
    },
    clearCart: (state) => {
      state.cartItems = {};
      try {
        localStorage.removeItem("cart");
      } catch (err) {
        console.error("Failed to clear cart in localStorage", err);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;

export const selectCartCount = (state) => {
  return Object.values(state.cart.cartItems).reduce((sum, qty) => sum + qty, 0);
};

export const selectCartTotal = (state) => {
  const products = state.products.products;
  const cartItems = state.cart.cartItems;
  let total = 0;
  Object.keys(cartItems).forEach((key) => {
    const product = products.find((p) => String(p.id) === String(key));
    if (product) {
      total += Number(product.price) * cartItems[key];
    }
  });
  return total;
};

export default cartSlice.reducer;
