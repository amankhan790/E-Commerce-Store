import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Components/ProductCard";
import Category from "../Components/Category";

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const selectedCategory = useSelector((state) => state.products.selectedCategory);

  const [searchItem, setSearchItem] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchItem);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchItem]);

  // Filtered Products
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="px-4 md:px-8 max-w-7xl mx-auto py-6">
      <h1 className="lg:text-3xl text-2xl font-bold mb-5 pt-10 text-center">
        Our Premium Products
      </h1>

      <p className="mb-5 text-center text-gray-500">
        Browse our premium collection of products
      </p>

      <div className="text-center mb-8">
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search your favourite product"
          className="w-full md:w-[60%] bg-gray-100 border border-gray-200 text-lg p-4 rounded-xl outline-none focus:border-black transition"
        />
      </div>

      <Category />

      <div className="grid xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 h-auto mt-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-xl mt-10">
            No products found 😔
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
