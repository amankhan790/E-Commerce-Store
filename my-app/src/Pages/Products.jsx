import React, { useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import ProductCard from "../Components/ProductCard";

const Products = () => {
  const { products } = useContext(StoreContext);

  return (
    <div>
      <h1 className="text-3xl font-bold items-start mb-5 pt-10">
        Our Products
      </h1>
      <p className="mb-5">Browse our premium collection of products</p>
      <div className="grid xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 h-auto">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Products;
