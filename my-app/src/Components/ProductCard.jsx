import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="h-full">
      <div className="h-full">
        <Link key={product.id} to={`/products/${product.id}`}>
          <div className="border-2 border-[var(--text-color)] rounded-2xl p-4 hover:shadow-lg hover:scale-105 duration-300 flex flex-col h-full">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-48 object-cover rounded-2xl"
            />

            <p className="text-sm text-gray-600 mb-2 mt-3">
              {product.category}
            </p>

            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-semibold mt-2 mb-2 flex-1">
                {product.name}
              </h2>

              <span className="text-md text-[var(--text-color)] flex items-center font-semibold whitespace-nowrap">
                <FaStar className="inline-block ml-2 mb-0.5" />
                {product.rating}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-5 flex-grow">
              Description: {product.description}
            </p>

            <div className="flex justify-between items-center gap-3 mt-auto">
              <p className="text-lg font-semibold text-gray-700">
                ${product.price}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
