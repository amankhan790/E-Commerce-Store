import React, { createContext, useState } from "react";
import { AllProducts } from "../assets/assets";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [products, setProducts] = useState(AllProducts);

  const getProductById = (id) => {
    return products.find((product) => product.id === Number(id));
  };

  const filterByCategory = (category) => {
    if (!category || category === "All") {
      setProducts(AllProducts);
      return;
    }
    const filtered = AllProducts.filter(
      (product) => product.category === category,
    );
    setProducts(filtered);
  };

  const contextValue = {
    products,
    setProducts,
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
