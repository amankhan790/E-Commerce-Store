import React from "react";
import {categoryImages} from "../assets/assets";

const Category = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold items-start mt-10 mb-10 text-[var(--text-color)]">
        Shop by Category
      </h1>
      <div className="flex justify-center gap-5 mb-10 ">
        <div
          className="w-1/4 h-48 bg-[#E9EBED] rounded-2xl border-2 border-[var(--text-color)] flex items-center justify-center cursor-pointer hover:scale-105 transform transition duration-300"
          style={{
            backgroundImage: `url(${categoryImages.All})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-2xl font-bold text-[var(--text-color)] px-15 rounded-2xl relative top-30">
            All
          </div>
        </div>
        <div
          className="w-1/4 h-48 bg-[#E9EBED] rounded-2xl border-2 border-[var(--text-color)] flex items-center justify-center cursor-pointer hover:scale-105 transform transition duration-300"
          style={{
            backgroundImage: `url(${categoryImages.Electronics})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-xl font-semibold text-[var(--text-color)]  px-10 rounded-2xl relative top-30">
            Electronics
          </div>
        </div>
        <div
          className="w-1/4 h-48 bg-[#E9EBED] rounded-2xl border-2 border-[var(--text-color)] flex items-center justify-center cursor-pointer hover:scale-105 transform transition duration-300"
          style={{
            backgroundImage: `url(${categoryImages.Accessories})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-xl font-semibold text-[var(--text-color)] px-10 rounded-2xl relative top-30">
            Accessories
          </div>
        </div>
        <div
          className="w-1/4 h-48 bg-[#E9EBED] rounded-2xl border-2 border-[var(--text-color)] flex items-center justify-center cursor-pointer hover:scale-105 transform transition duration-300"
          style={{
            backgroundImage: `url(${categoryImages.Clothing})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-xl font-semibold text-[var(--text-color)] px-10 rounded-2xl relative top-30">
            Clothing
          </div>
        </div>
        <div
          className="w-1/4 h-48 bg-[#E9EBED] rounded-2xl border-2 border-[var(--text-color)] flex items-center justify-center cursor-pointer hover:scale-105 transform transition duration-300"
          style={{
            backgroundImage: `url(${categoryImages.Home})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-xl font-semibold text-[var(--text-color)] px-10 rounded-2xl relative top-30">
            Home
          </div>
        </div>
        <div
          className="w-1/4 h-48 bg-[#E9EBED] rounded-2xl border-2 border-[var(--text-color)] flex items-center justify-center cursor-pointer hover:scale-105 transform transition duration-300"
          style={{
            backgroundImage: `url(${categoryImages.Fashion})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-xl font-semibold text-[var(--text-color)] px-10 rounded-2xl relative top-30">
            Fashion
          </div>
        </div>
        <div
          className="w-1/4 h-48 bg-[#E9EBED] rounded-2xl border-2 border-[var(--text-color)] flex items-center justify-center cursor-pointer hover:scale-105 transform transition duration-300"
          style={{
            backgroundImage: `url(${categoryImages.Sports})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-xl font-semibold text-[var(--text-color)] px-10 rounded-2xl relative top-30">
            Sports
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
