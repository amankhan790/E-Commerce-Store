import React from "react";
import Hero from "../Components/Hero";
import Category from "../Components/Category";
import TrendingProducts from "../Components/TrendingProducts";
import InfoSection from "../Components/InfoSection";
import Testimonials from "../Components/Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <Category navigateOnClick={true} />
      <TrendingProducts />
      <InfoSection />
      <Testimonials />
    </>
  );
};

export default Home;
