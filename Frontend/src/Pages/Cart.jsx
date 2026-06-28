import React from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../features/cart/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  
  const cartItems = useSelector(selectCartItems);
  const products = useSelector((state) => state.products.products);
  const subtotal = useSelector(selectCartTotal);

  // Compile products in cart
  const cartProducts = Object.keys(cartItems).map((key) => {
    const product = products.find((p) => String(p.id) === String(key));
    return { product, quantity: cartItems[key] };
  }).filter(item => item.product !== undefined);

  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const total = (subtotal + shipping).toFixed(2);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
    toast.info("Item quantity decremented");
  };

  const handleAddItem = (productId) => {
    dispatch(addToCart(productId));
  };

  const handleRemoveAllOf = (productId, name) => {
    dispatch(updateCartQuantity({ itemId: productId, quantity: 0 }));
    toast.error(`${name} removed from cart`);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared 🧹");
  };

  return (
    <div className="min-h-screen text-gray-800 py-8 px-4 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Your Shopping Cart</h1>
        <p className="text-gray-500 text-sm mt-1">Review items and proceed to secure checkout</p>
      </div>

      {cartProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-gray-200 rounded-3xl p-12 text-center bg-gray-50/50 max-w-lg mx-auto shadow-sm">
          <div className="w-16 h-16 bg-gray-105 rounded-full flex items-center justify-center mb-5">
            <FaShoppingCart className="text-gray-400 text-xl" />
          </div>
          <p className="text-xl mb-2 text-gray-800 font-bold">Your cart is empty</p>
          <p className="text-sm text-gray-500 mb-6">
            Add premium items from our storefront to get started!
          </p>
          <Link
            to="/products"
            className="px-6 py-3 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition duration-300 shadow"
          >
            Explore Catalog
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Cart Items */}
          <div className="w-full lg:flex-1 space-y-4">
            {cartProducts.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-4 border border-gray-200 rounded-3xl p-4 bg-white shadow-sm hover:shadow-md transition duration-300"
              >
                {/* Product Image */}
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-gray-100 flex-shrink-0"
                />

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{product.category}</span>
                  <Link
                    to={`/products/${product.id}`}
                    className="block text-md sm:text-lg font-bold text-gray-850 truncate hover:text-black mt-0.5"
                  >
                    {product.name}
                  </Link>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-3">
                    <div className="flex items-center bg-gray-100 border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        className="px-3.5 py-2 text-gray-600 hover:text-black hover:bg-gray-200 transition-colors cursor-pointer"
                        aria-label="decrease"
                        onClick={() => handleRemoveItem(product.id)}
                      >
                        <FaMinus size={10} />
                      </button>
                      <div className="px-4 py-1.5 text-gray-850 font-bold min-w-[2.5rem] text-center">
                        {quantity}
                      </div>
                      <button
                        className="px-3.5 py-2 text-gray-600 hover:text-black hover:bg-gray-200 transition-colors cursor-pointer"
                        aria-label="increase"
                        onClick={() => handleAddItem(product.id)}
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="flex flex-col items-end justify-between self-stretch flex-shrink-0">
                  <span className="text-lg font-extrabold text-gray-900">
                    ${(Number(product.price) * quantity).toFixed(2)}
                  </span>
                  <button
                    className="flex items-center gap-1 text-red-500 hover:text-red-650 text-xs font-bold transition-colors cursor-pointer p-1"
                    onClick={() => handleRemoveAllOf(product.id, product.name)}
                  >
                    <FaTrash size={10} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Summary Panel */}
          <aside className="w-full lg:w-80 border border-gray-200 rounded-3xl p-6 bg-white shadow-sm lg:sticky lg:top-24 space-y-5">
            <h3 className="text-xl font-bold text-gray-850 pb-3 border-b border-gray-100">
              Order Summary
            </h3>

            <div className="space-y-3 text-sm text-gray-605">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-gray-850 font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="text-gray-850 font-bold">
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900 text-lg">
              <span>Grand Total</span>
              <span className="font-extrabold">${total}</span>
            </div>

            <div className="pt-2 space-y-3">
              <Link
                to="/checkout"
                className="block w-full py-3.5 bg-black hover:bg-gray-800 text-white font-bold text-center rounded-2xl transition duration-300 shadow cursor-pointer text-md"
              >
                Proceed to Checkout
              </Link>
              <button
                className="w-full py-2.5 border border-gray-300 text-gray-600 hover:text-black font-bold cursor-pointer rounded-2xl hover:bg-gray-50 transition duration-200 text-sm"
                onClick={handleClearCart}
              >
                Clear Entire Cart
              </button>
            </div>
            
            <div className="text-center pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black transition duration-200"
              >
                <FaArrowLeft size={10} />
                <span>Continue Browsing Products</span>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
