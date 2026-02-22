import React, { useState } from "react";
import Hero from "../Components/Hero";
import Category from "../Components/Category";
import { AllProducts } from "../assets/assets";
import TrendingProducts from "../Components/TrendingProducts";

const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState("All");
  const filterProducts =
    setSelectedCategories === "All"
      ? AllProducts
      : AllProducts.filter((product) => {
          product.category === selectedCategories;
        });
  return (
    <>
      <Hero />
      <Category
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      {/* <TrendingProducts /> */}
    </>
  );
};

export default Home;
