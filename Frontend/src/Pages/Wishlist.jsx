import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectWishlistItems, toggleWishlist } from "../features/wishlist/wishlistSlice";
import { addToCart } from "../features/cart/cartSlice";
import { FaTrash, FaShoppingCart, FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistIds = useSelector(selectWishlistItems);
  const products = useSelector((state) => state.products.products);

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleAddToCart = (product) => {
    dispatch(addToCart(product.id));
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemove = (product) => {
    dispatch(toggleWishlist(product.id));
    toast.info(`${product.name} removed from wishlist`);
  };

  return (
    <div className="min-h-[75vh] py-12 text-black">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <FaHeart className="text-red-650 text-2xl animate-pulse" />
        <h1 className="text-3xl font-extrabold tracking-tight text-center">
          My Saved Wishlist
        </h1>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="border-2 border-black rounded-2xl p-10 text-center bg-[#e9ebed] max-w-md mx-auto shadow-sm">
          <div className="w-16 h-16 bg-[#c8d3d7] border border-black rounded-full flex items-center justify-center mx-auto mb-5">
            <FaHeart className="text-red-650 text-2xl" />
          </div>
          <h2 className="text-xl font-bold">Your wishlist is empty</h2>
          <p className="text-gray-700 text-sm mt-2 mb-6">
            Tap the heart icon on any product card while browsing to save them here!
          </p>
          <Link
            to="/products"
            className="inline-block px-5 py-2.5 bg-black hover:opacity-90 text-white font-semibold rounded-xl shadow transition duration-200"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="group border-2 border-black rounded-2xl overflow-hidden bg-[#e9ebed] hover:shadow-lg transition-all duration-300 flex flex-col h-full relative p-4"
            >
              {/* Product Thumbnail */}
              <div className="relative overflow-hidden aspect-[4/3] bg-[#c8d3d7] border border-black/40 rounded-xl">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-550 group-hover:scale-102"
                />
                <button
                  onClick={() => handleRemove(product)}
                  className="absolute top-3 right-3 p-2 bg-[#c8d3d7] hover:bg-[#e9ebed] border border-black rounded-full text-black hover:text-red-650 transition-all duration-200 cursor-pointer"
                  title="Remove from Wishlist"
                >
                  <FaTrash className="text-xs" />
                </button>
              </div>

              {/* Product Info */}
              <div className="pt-4 flex flex-col flex-grow">
                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-1">
                  {product.category}
                </span>
                <Link
                  to={`/products/${product.id}`}
                  className="font-bold text-black text-lg hover:underline line-clamp-1 mb-2"
                >
                  {product.name}
                </Link>
                <p className="text-gray-700 text-xs line-clamp-2 mb-4 flex-grow">
                  {product.description}
                </p>

                <div className="flex justify-between items-center gap-3 pt-3 border-t border-black/10">
                  <div>
                    <span className="text-xl font-bold text-black">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center text-xs font-bold text-black gap-1">
                    ★ {Number(product.rating || 0).toFixed(1)}
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 bg-black hover:opacity-90 text-white font-bold rounded-xl transition duration-200 cursor-pointer"
                >
                  <FaShoppingCart className="text-sm" />
                  <span>Add To Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
