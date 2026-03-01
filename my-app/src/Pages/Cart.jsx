import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { StoreContext } from "../Context/StoreContext";

const Cart = () => {
  const { getCartProducts, addCartItem, removeCartItem, clearCart, getTotalAmount } = useContext(StoreContext);

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
    <div className="app py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-[var(--text-color)]">Your Cart</h1>
        <p className="text-sm text-gray-600 mt-1">Review items and proceed to checkout</p>
      </div>

      {cartProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-12 bg-[var(--primary-color)]">
          <p className="text-xl font-medium mb-4">Your cart is empty</p>
          <p className="text-sm text-gray-600 mb-6">Add products from the store to see them here.</p>
          <Link to="/products" className="px-5 py-2 bg-[var(--text-color)] text-white rounded-lg">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartProducts.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 items-center border-2 border-[var(--text-color)] rounded-2xl p-4 bg-white">
                <img src={product.img} alt={product.name} className="w-28 h-28 object-cover rounded-lg" />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[var(--text-color)]">{product.name}</h2>
                  <p className="text-sm text-gray-600">{product.category}</p>
                  <p className="text-md font-semibold text-gray-700 mt-2">${Number(product.price).toFixed(2)}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center border rounded-full overflow-hidden">
                    <button
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                      aria-label="decrease"
                      onClick={() => removeCartItem(product.id)}
                    >
                      <FaMinus />
                    </button>
                    <div className="px-4 py-2">{quantity}</div>
                    <button
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200"
                      aria-label="increase"
                      onClick={() => addCartItem(product.id)}
                    >
                      <FaPlus />
                    </button>
                  </div>

                  <button className="text-red-600 hover:underline flex items-center gap-2" onClick={() => removeAllOf(product.id, quantity)}>
                    <FaTrash /> Remove
                  </button>
                </div>

                <div className="ml-4 font-semibold">${(Number(product.price) * quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <aside className="border-2 border-[var(--text-color)] rounded-2xl p-6 bg-white">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-[var(--text-color)] text-lg mt-4 mb-4">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <button className="w-full py-3 bg-[var(--text-color)] text-white rounded-lg mb-3">Checkout</button>
            <button className="w-full py-2 border rounded-lg mb-3" onClick={clearCart}>Clear Cart</button>
            <Link to="/products" className="w-full block text-center text-sm text-gray-700 underline">Continue Shopping</Link>
          </aside>
        </div>
      )}
    </div>
  );
};

export default Cart;
