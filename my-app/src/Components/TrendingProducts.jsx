import { useContext } from "react";
import ProductCard from "./ProductCard";
import { StoreContext } from "../Context/StoreContext";

const TrendingProducts = () => {
  const { products } = useContext(StoreContext);

  const trending = products.filter((product) => product.trending);
  console.log(trending);

  return (
    <div>
      {trending.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default TrendingProducts;
