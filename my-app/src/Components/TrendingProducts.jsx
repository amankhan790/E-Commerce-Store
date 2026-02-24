import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { AllProducts } from "../assets/assets";

const TrendingProducts = () => {
  const trending = AllProducts.filter((product) => product.trending);

  return (
    <>
      <div className="flex justify-between items-center mt-10">
        <h1 className="text-3xl font-bold items-start">Trending</h1>
        <Link to={"/products"}>
          <h2 className="flex items-center gap-3">
            Browse All Products{" "}
            <span>
              <FaArrowRight />
            </span>
          </h2>
        </Link>
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
