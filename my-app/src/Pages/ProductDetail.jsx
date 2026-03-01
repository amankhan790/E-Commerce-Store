import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import {
  FaStar,
  FaMinus,
  FaPlus,
  FaHeart,
  FaShareAlt,
  FaCheck,
} from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const { getProductById, addCartItem, cartItem } = useContext(StoreContext);

  const product = getProductById(id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto my-20 p-6 bg-white/40 rounded-lg border border-gray-200">
        <p className="text-center text-lg">Product not found.</p>
        <div className="text-center mt-4">
          <Link to="/products" className="text-sm text-blue-600 underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    "High quality materials",
    "Easy to use",
    "Designed for comfort",
    "10-day returns",
  ];

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold items-start mb-5">Product Details</h1>
      <div className="bg-var[background-color] rounded-2xl shadow-lg overflow-hidden border border-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Left - Image + thumbnails */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-xl overflow-hidden bg-gray-100">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
              <span className="absolute top-4 left-4 bg-gray-900 text-white text-xs px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            <div className="flex gap-3 overflow-x-auto">
              {[product.img, product.img, product.img].map((thumb, i) => (
                <button
                  key={i}
                  className="flex-none w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={thumb}
                    alt={`thumb-${i}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Details */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <FaStar className="text-yellow-500" />
                  <span className="font-semibold text-gray-700">
                    {product.rating}
                  </span>
                  <span className="ml-2 text-gray-400">•</span>
                  <span className="ml-2 text-sm text-green-600">In stock</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  {product.name}
                </h2>
              </div>

              <div className="text-right">
                <div className="text-sm text-gray-500">Price</div>
                <div className="text-2xl font-bold text-gray-900">
                  ${product.price}
                </div>
              </div>
            </div>

            <p className="text-gray-600 mt-4">{product.description}</p>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">Highlights</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {features.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <FaCheck className="text-green-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-stretch gap-4">
              <div className="flex-1 w-full">
                <div className="w-full bg-gray-900 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4"
                    />
                  </svg>
                  {!cartItem[String(product.id)] ? (
                    <Link to={"/cart"} onClick={() => addCartItem(product.id)} className="flex items-center">
                      Add to Cart
                    </Link>
                  ) : (
                    <Link to="/cart" className="flex items-center gap-2">
                      View Cart
                      <span className="bg-white text-gray-900 rounded-full px-2 py-0.5 text-sm">{cartItem[String(product.id)]}</span>
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer">
                  <FaHeart />
                </button>
                <button className="p-3 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer">
                  <FaShareAlt />
                </button>
              </div>
            </div>
           

            <div className="mt-6 border-t pt-4 text-sm text-gray-500 flex gap-8">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 11a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" />
                </svg>
                Free shipping over $50
              </div>

              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 102 0V7zm-1 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    clipRule="evenodd"
                  />
                </svg>
                10-day returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
