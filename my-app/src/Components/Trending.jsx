import React from "react";
import { AllProducts } from "../assets/assets";
import { FaStar } from "react-icons/fa";
import { categoryImages } from "../assets/assets";

const Trending = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold items-start mb-10 pt-10">
        Trending Products
      </h1>
      <div>
        <div className="grid grid-cols-4 gap-5">
          {AllProducts.slice(5, 15).map((product) => (
            <div
              key={product.id}
              className="border-2 border-[var(--text-color)] rounded-2xl p-4 hover:shadow-lg hover:scale-105 duration-300"
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
              <p className="text-sm text-gray-600 mb-2">
                Description: {product.description}
              </p>
              <p className="text-sm text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trending;
