import React from "react";

const Hero = () => {
  return (
    <div className="flex justify-center gap-5 mt-10 mb-10">
      <div className="hero-img rounded-2xl pr-[50px] pb-[100px]">
        <h1 className="text-5xl font-bold mb-5  text-[#E9EBED]">
          Welcome to AK Tech
        </h1>
        <p className="text-lg mb-5 text-[#E9EBED]">
          Everything You Love, One Click Away.
        </p>
        <button className="bg-[#E9EBED] text-[#111827] px-4 py-2 rounded-full">
          Shop Now
        </button>
      </div>
      <div className="hero2-img rounded-2xl"></div>
    </div>
  );
};

export default Hero;
