import React from "react";
import hero1 from "../assets/Images/hero1.jpg";
import hero4 from "../assets/Images/hero4.jpg";

const Hero = () => {
  return (
    <div className="lg:flex justify-center gap-5 mt-10 mb-10 px-4">
      {/* Left Hero */}
      <div
        className="rounded-2xl w-full lg:w-[75%] h-[500px] sm:h-[320px] lg:h-[500px] flex flex-col justify-center items-end p-8 box-border bg-cover bg-center relative"
        style={{ backgroundImage: `url(${hero1})` }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 text-[#E9EBED] text-right">
          Welcome to AK Tech
        </h1>

        <p className="text-base sm:text-lg mb-5 text-[#E9EBED] text-right">
          Everything You Love, One Click Away.
        </p>

        <button className="bg-[#E9EBED] text-[#111827] px-4 py-2 rounded-full hover:scale-105 transition duration-300">
          Shop Now
        </button>
      </div>

      {/* Right Hero */}
      <div
        className="hidden lg:block rounded-2xl w-[50%] h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${hero4})` }}
      ></div>
    </div>
  );
};

export default Hero;
