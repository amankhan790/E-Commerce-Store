import React from "react";
import { AllProducts } from "../assets/assets";
import { FaStar } from "react-icons/fa";

const Trending = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold items-start mb-10 pt-10">
        Browse Products
      </h1>
      <div>
        <div className="grid grid-cols-4 gap-5 h-auto">
          {AllProducts.map((product) => (
            <div
              key={product.id}
              className="border-2 border-[var(--text-color)] rounded-2xl p-4 hover:shadow-lg hover:scale-105 duration-300 relative"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-48 object-cover rounded-2xl"
              />
              <p className="text-sm text-gray-600 mb-2 mt-3">
                {product.category}
              </p>
              <div className="flex items-center justify-between ">
                <h2 className="text-lg font-semibold mt-2 mb-2">
                  {product.name}
                </h2>
                <span className="text-md  text-[var(--text-color)] flex items-center pr-2 font-semibold">
                  <FaStar className="inline-block ml-2 mb-0.5" />
                  {product.rating}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-5 pb-10">
                Description: {product.description}
              </p>
              <div className="absolute bottom-4 mt-10 justify-around w-full flex justify-between pr-10">
                <p className="text-lg text-gray-600">${product.price}</p>
                <button className="w-[80px] font-bold bg-gray-500 px-5 py-2 rounded-lg hover:bg-[var(--text-color)] hover:text-white transition-ease-in-out duration-300">Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
