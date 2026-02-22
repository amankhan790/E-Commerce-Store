import { useContext } from "react";
import ProductCard from "./ProductCard";
import { StoreContext } from "../Context/StoreContext";

const TrendingProducts = () => {
  const { products } = useContext(StoreContext);

  const trending = products.filter((product) => product.trending);
  console.log(trending);

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold items-start pt-10">Trending</h1>
        <h1 className="text-3xl font-bold items-start  pt-10">
          Browse Our All
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 items-stretch h-auto mt-10">
        {trending.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default TrendingProducts;
