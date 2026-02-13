import React, { useState } from "react";
import Hero from "../Components/Hero";
import Category from "../Components/Category";
import Trending from "../Components/Trending";
import { AllProducts } from "../assets/assets";

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
      <Trending filterProducts={filterProducts} />
    </>
  );
};

export default Home;
