import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import { StoreContext } from "../Context/StoreContext";

const Cart = () => {
  const {
    getCartProducts,
    addCartItem,
    removeCartItem,
    clearCart,
    getTotalAmount,
  } = useContext(StoreContext);

  const cartProducts = getCartProducts();
  const subtotal = getTotalAmount();
  const shipping = subtotal > 0 ? 5 : 0;
  const total = (subtotal + shipping).toFixed(2);

  const removeAllOf = (productId, quantity) => {
    for (let i = 0; i < quantity; i++) {
      removeCartItem(productId);
    }
  };

  return (
    <div className="min-h-screen  text-white py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">Your Cart</h1>
          <p className="text-sm text-gray-700 mt-1">
            Review items and proceed to checkout
          </p>
        </div>

        {cartProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-2xl p-12 ">
            <p className="text-xl mb-4 text-black font-bold">
              Your cart is empty
            </p>
            <p className="text-sm text-gray-700 mb-6">
              Add products from the store to see them here.
            </p>
            <Link
              to="/products"
              className="px-5 py-2 bg-gray-200 text-black rounded-lg font-medium hover:bg-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Cart Items */}
            <div className="w-full lg:flex-1 space-y-4">
              {cartProducts.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex items-center gap-2 lg:gap-4 border border-[#000] rounded-2xl p-3 lg:p-4 "
                >
                  {/* Product Image */}
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl flex-shrink-0"
                  />

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-black truncate">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {product.category}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center lg:gap-3 mt-3">
                      <div className="flex items-center bg-gray-300 border border-black rounded-lg overflow-hidden">
                        <button
                          className="px-3 py-2 text-black transition-colors cursor-pointer"
                          aria-label="decrease"
                          onClick={() => removeCartItem(product.id)}
                        >
                          <FaMinus size={10} />
                        </button>
                        <div className="lg:px-4 lg:py-2 text-black font-semibold min-w-[2.5rem] text-center">
                          {quantity}
                        </div>
                        <button
                          className="px-3 py-2 text-black transition-colors cursor-pointer"
                          aria-label="increase"
                          onClick={() => addCartItem(product.id)}
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="flex flex-col items-end justify-between h-full gap-8 flex-shrink-0">
                    <span className="text-lg font-bold text-black">
                      ${(Number(product.price) * quantity).toFixed(2)}
                    </span>
                    <button
                      className="flex items-center gap-1.5 text-red-500 hover:text-red-400 text-sm transition-colors cursor-pointer"
                      onClick={() => removeAllOf(product.id, quantity)}
                    >
                      <FaTrash size={12} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="w-full lg:w-80 border border-gray-700 rounded-2xl p-6 lg:sticky lg:top-4">
              <h3 className="text-xl font-bold text-black mb-5">
                Order Summary
              </h3>

              <div className="flex justify-between text-gray-600 mb-3">
                <span>Subtotal</span>
                <span className="text-black font-bold">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-gray-600 mb-3">
                <span>Shipping</span>
                <span className="text-black font-bold">
                  ${shipping.toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-700 my-4" />

              <div className="flex justify-between font-bold text-black text-lg mb-6">
                <span>Total</span>
                <span>${total}</span>
              </div>

              <button className="w-full py-3 bg-[#1fffb4] text-black font-bold rounded-xl mb-3 cursor-pointer hover:bg-[#17d99a] transition-colors">
                Checkout
              </button>
              <button
                className="w-full py-2.5 border border-gray-700 text-black font-bold cursor-pointer rounded-xl hover:bg-gray-800 hover:text-white transition-colors text-sm"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              {/* Continue Shopping
              <Link
                to="/products"
                className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mt-2 transition-colors w-fit"
              >
                <FaArrowLeft size={12} />
                Continue Shopping
              </Link> */}
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
