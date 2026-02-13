import React, { createContext } from "react";
import { AllProducts } from "../assets/assets";

const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const contextValue = {
    AllProducts,
  };
  return (
    <StoreContextProvider.Provider value={contextValue}>
      {props.children}
    </StoreContextProvider.Provider>
  );
};

export default StoreContextProvider;
