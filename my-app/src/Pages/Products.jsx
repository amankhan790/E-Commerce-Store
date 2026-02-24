import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../Context/StoreContext";
import ProductCard from "../Components/ProductCard";
import Category from "../Components/Category";

const Products = () => {
  const { products } = useContext(StoreContext);

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
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  return (
    <div>
      <h1 className="lg:text-3xl text-2xl font-bold mb-5 pt-10 text-center">
        Our Premium Products
      </h1>

      <p className="mb-5 text-center">
        Browse our premium collection of products
      </p>

      <div className="text-center">
        <input
          type="text"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search your favourite product"
          className="w-[80%] bg-gray-200 text-xl p-5 rounded-xl outline-none"
        />
      </div>

      <Category />

      <div className="grid xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 h-auto mt-10">
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
