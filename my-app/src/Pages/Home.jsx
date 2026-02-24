import React from "react";
import Hero from "../Components/Hero";
import Category from "../Components/Category";
import TrendingProducts from "../Components/TrendingProducts";
import InfoSection from "../Components/InfoSection";

const Home = () => {
  return (
    <>
      <Hero />
      <Category navigateOnClick={true} />
      <TrendingProducts />
      <InfoSection />
    </>
  );
};

export default Home;
