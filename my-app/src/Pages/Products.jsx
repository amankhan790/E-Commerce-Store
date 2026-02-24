import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import ProductCard from "../Components/ProductCard";
import Category from "../Components/Category";

const Products = () => {
  const { products } = useContext(StoreContext);

  return (
    <div>
      <h1 className="lg:text-3xl text-2xl font-bold mb-5 pt-10 text-center">
        Our Premium Products
      </h1>
      <p className="mb-5 text-center">
        Browse our premium collection of products
      </p>
      <div className="items-center text-center">
        <input
          type="text"
          placeholder="Search your favourite product"
          className="w-[80%] bg-gray-200 text-xl p-5 rounded-xl"
        />
      </div>
      <Category />
      <div className="grid xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 h-auto mt-10">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
