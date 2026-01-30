import React from "react";
import { categoryImages } from "../assets/assets";

const Category = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold items-center mt-15 mb-10 text-[var(--text-color)]">
        Shop by Category
      </h1>
      <div className="flex flex-wrap justify-between gap-5 mb-10 ">
        {Object.entries(categoryImages).map(([name, src]) => (
          <div
            key={name}
            className="w-full sm:w-1/4 md:w-1/3 lg:w-1/6 flex flex-col items-center cursor-pointer hover:scale-105 transform transition duration-300"
          >
            <div className="w-full h-30 bg-[#E9EBED] rounded-2xl border-2 border-[var(--text-color)] relative overflow-hidden">
              <img
                src={src}
                alt={name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="text-2xl font-bold text-[var(--text-color)] mt-3">
              {name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
