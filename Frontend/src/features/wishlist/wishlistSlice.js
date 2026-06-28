import { createSlice } from "@reduxjs/toolkit";

const getInitialWishlist = () => {
  try {
    const raw = localStorage.getItem("wishlist");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const initialState = {
  wishlistItems: getInitialWishlist(), // Array of product IDs (numbers)
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const productId = Number(action.payload);
      if (state.wishlistItems.includes(productId)) {
        state.wishlistItems = state.wishlistItems.filter(id => id !== productId);
      } else {
        state.wishlistItems.push(productId);
      }
      try {
        localStorage.setItem("wishlist", JSON.stringify(state.wishlistItems));
      } catch (err) {
        console.error("Failed to save wishlist to localStorage", err);
      }
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      try {
        localStorage.removeItem("wishlist");
      } catch (err) {
        console.error("Failed to clear wishlist in localStorage", err);
      }
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state) => state.wishlist.wishlistItems;

export const selectIsInWishlist = (state, productId) => {
  return state.wishlist.wishlistItems.includes(Number(productId));
};

export default wishlistSlice.reducer;
