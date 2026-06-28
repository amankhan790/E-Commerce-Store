import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, selectCartItems } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaCheck,
  FaShoppingCart,
  FaArrowLeft
} from "react-icons/fa";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);
  const product = products.find((p) => String(p.id) === String(id));
  const cartItems = useSelector(selectCartItems);
  const wishlistIds = useSelector((state) => state.wishlist.wishlistItems);
  const isInWishlist = wishlistIds.includes(Number(id));

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto my-20 p-8 bg-white border border-gray-250 rounded-3xl text-center shadow-sm">
        <p className="text-lg text-gray-500 font-semibold">Product not found.</p>
        <div className="mt-4">
          <Link to="/products" className="text-sm text-black font-bold underline flex items-center justify-center gap-1.5 hover:opacity-80">
            <FaArrowLeft /> Back to Products Catalog
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    "Premium quality craftsmanship",
    "Hypoallergenic & skin safe",
    "Ergonomically crafted structure",
    "10-day secure returns",
  ];

  const handleAddToCart = () => {
    dispatch(addToCart(product.id));
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product.id));
    if (isInWishlist) {
      toast.info(`${product.name} removed from wishlist`);
    } else {
      toast.success(`${product.name} saved to wishlist!`);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Product URL copied to clipboard!");
  };

  const cartQuantity = cartItems[String(product.id)] || 0;

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
      <Link to="/products" className="flex items-center gap-2 text-gray-600 hover:text-black mb-6 font-semibold transition duration-200">
        <FaArrowLeft /> Back to Catalog
      </Link>

      <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Left - Image + Thumbnails */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-50 border border-gray-100">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-black/85 backdrop-blur-xs text-white text-xs font-bold px-3.5 py-1 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
            </div>

            <div className="flex gap-3 overflow-x-auto">
              {[product.img, product.img, product.img].map((thumb, i) => (
                <button
                  key={i}
                  className="flex-none w-20 h-20 rounded-xl overflow-hidden border border-gray-250 hover:border-black transition duration-200 cursor-pointer"
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

          {/* Right - Product Details */}
          <div className="flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <span className="font-bold text-gray-700 flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md">
                      ★ {Number(product.rating || 0).toFixed(1)}
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="font-semibold text-green-600">Available In Stock</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                    {product.name}
                  </h1>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">PRICE</span>
                  <span className="text-3xl font-black text-gray-900">
                    ${Number(product.price).toFixed(2)}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {product.description}
              </p>

              <div className="pt-4">
                <h3 className="font-bold text-gray-800 text-sm mb-3">Highlights & Perks</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  {features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                      <FaCheck className="text-green-500" />
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
              {cartQuantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-black hover:bg-gray-800 text-white font-bold rounded-2xl transition duration-300 shadow cursor-pointer text-md"
                >
                  <FaShoppingCart />
                  <span>Add To Cart</span>
                </button>
              ) : (
                <Link
                  to="/cart"
                  className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-900 text-white font-bold rounded-2xl transition duration-300 shadow text-md"
                >
                  <span>View in Cart ({cartQuantity})</span>
                </Link>
              )}

              <div className="flex gap-2">
                <button
                  onClick={handleWishlistToggle}
                  className="p-4 border border-gray-250 rounded-2xl hover:bg-gray-50 transition duration-200 cursor-pointer flex items-center justify-center min-w-[56px]"
                  title="Toggle Wishlist"
                >
                  {isInWishlist ? <FaHeart className="text-red-500 text-lg" /> : <FaRegHeart className="text-gray-500 text-lg" />}
                </button>
                <button
                  onClick={handleShare}
                  className="p-4 border border-gray-250 rounded-2xl hover:bg-gray-50 transition duration-200 cursor-pointer flex items-center justify-center min-w-[56px]"
                  title="Copy Product Link"
                >
                  <FaShareAlt className="text-gray-500 text-lg" />
                </button>
              </div>
            </div>

            <div className="mt-6 text-xs text-gray-500 flex gap-6">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span>Free shipping over $100</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Secure payment channels</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
