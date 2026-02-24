import React from "react";
import Hero from "../Components/Hero";
import Category from "../Components/Category";
import TrendingProducts from "../Components/TrendingProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <Category navigateOnClick={true} />
      <TrendingProducts />
    </>
  );
};

export default Home;
