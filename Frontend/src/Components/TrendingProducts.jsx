import React from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useSelector } from "react-redux";

const TrendingProducts = () => {
  const products = useSelector((state) => state.products.products);
  const trending = products.filter((product) => product.trending);

  return (
    <>
      <div className="flex justify-between items-center mt-10">
        <h1 className="text-3xl font-bold items-start">Trending Products</h1>
        <Link to="/products" className="hover:opacity-75 transition-all">
          <h2 className="flex items-center gap-2 font-bold text-sm md:text-base">
            <span>Browse All Products</span>
            <FaArrowRight className="text-xs" />
          </h2>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch h-auto mt-10">
        {trending.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default TrendingProducts;
