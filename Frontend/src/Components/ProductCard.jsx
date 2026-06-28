import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistIds = useSelector((state) => state.wishlist.wishlistItems);
  const isInWishlist = wishlistIds.includes(product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product.id));
    if (isInWishlist) {
      toast.info(`${product.name} removed from wishlist`);
    } else {
      toast.success(`${product.name} saved to wishlist!`);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product.id));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="h-full relative">
      <Link key={product.id} to={`/products/${product.id}`}>
        <div className="group border-2 border-black rounded-2xl p-4 hover:shadow-lg hover:scale-105 duration-300 flex flex-col h-full bg-[#e9ebed] relative">
          
          {/* Wishlist Button Overlay */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-6 right-6 z-10 p-2 bg-[#c8d3d7] hover:bg-[#e9ebed] border border-black rounded-full text-black transition duration-200 cursor-pointer"
          >
            {isInWishlist ? <FaHeart className="text-red-650 text-sm" /> : <FaRegHeart className="text-sm" />}
          </button>

          {/* Thumbnail */}
          <div className="overflow-hidden rounded-xl aspect-[4/3] bg-[#c8d3d7] border border-black/40">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
          </div>

          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider mt-4">
            {product.category}
          </span>

          <div className="flex items-start justify-between gap-2 mt-1">
            <h2 className="text-md font-bold text-black line-clamp-1 flex-1">
              {product.name}
            </h2>
            <span className="text-sm text-black flex items-center font-bold gap-1 whitespace-nowrap">
              <FaStar className="text-yellow-600" />
              {Number(product.rating || 0).toFixed(1)}
            </span>
          </div>

          <p className="text-xs text-gray-700 mt-2 line-clamp-2 flex-grow">
            {product.description}
          </p>

          <div className="flex justify-between items-center gap-3 mt-4 pt-3 border-t border-black/20">
            <span className="text-lg font-bold text-black">
              ${Number(product.price).toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              className="px-3 py-1.5 bg-black hover:opacity-90 text-white rounded-lg flex items-center gap-1.5 transition duration-200 cursor-pointer text-xs font-bold"
              title="Add to Cart"
            >
              <FaShoppingCart className="text-xs" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
