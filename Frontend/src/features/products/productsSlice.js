import { createSlice } from "@reduxjs/toolkit";
import { AllProducts } from "../../assets/assets";

const getInitialProducts = () => {
  try {
    const raw = localStorage.getItem("products");
    return raw ? JSON.parse(raw) : AllProducts;
  } catch {
    return AllProducts;
  }
};

const initialState = {
  products: getInitialProducts(),
  selectedCategory: "All",
  searchQuery: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: state.products.length > 0 ? Math.max(...state.products.map(p => p.id)) + 1 : 1,
        rating: action.payload.rating || 4.0,
        reviewsCount: action.payload.reviewsCount || 0,
        trending: !!action.payload.trending,
      };
      state.products.unshift(newProduct); // Add to the top
      try {
        localStorage.setItem("products", JSON.stringify(state.products));
      } catch (err) {
        console.error("Failed to save products to localStorage", err);
      }
    },
    editProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...action.payload,
        };
        try {
          localStorage.setItem("products", JSON.stringify(state.products));
        } catch (err) {
          console.error("Failed to save products to localStorage", err);
        }
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
      try {
        localStorage.setItem("products", JSON.stringify(state.products));
      } catch (err) {
        console.error("Failed to save products to localStorage", err);
      }
    },
  },
});

export const {
  setSelectedCategory,
  setSearchQuery,
  addProduct,
  editProduct,
  deleteProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
