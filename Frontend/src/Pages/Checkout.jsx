import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectCartItems, selectCartTotal, clearCart } from "../features/cart/cartSlice";
import { placeOrder } from "../features/orders/ordersSlice";
import { toast } from "react-toastify";
import { FaCreditCard, FaLock, FaSpinner, FaArrowLeft } from "react-icons/fa";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const products = useSelector((state) => state.products.products);
  const auth = useSelector((state) => state.auth.auth);

  const [paymentMethod, setPaymentMethod] = useState("stripe"); // stripe or razorpay
  const [isProcessing, setIsProcessing] = useState(false);

  // Compile cart details
  const checkoutItems = Object.keys(cartItems).map((key) => {
    const product = products.find((p) => String(p.id) === String(key));
    return { product, quantity: cartItems[key] };
  }).filter(item => item.product !== undefined);

  const shippingCost = cartTotal > 100 || cartTotal === 0 ? 0 : 9.99;
  const taxCost = cartTotal * 0.08;
  const finalTotal = cartTotal + shippingCost + taxCost;

  // React Hook Form for address details validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: auth?.user?.name || "",
      email: auth?.user?.email || "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
    },
  });

  const onSubmit = (data) => {
    if (checkoutItems.length === 0) {
      toast.error("Your cart is empty. Add products before checkout.");
      return;
    }
    
    // Trigger mock payment flow
    setIsProcessing(true);
    
    setTimeout(() => {
      // Create new order
      dispatch(
        placeOrder({
          items: checkoutItems,
          amount: finalTotal,
          deliveryDetails: data,
          paymentMethod: paymentMethod === "stripe" ? "Stripe (Card)" : "Razorpay (UPI)",
        })
      );
      
      dispatch(clearCart());
      setIsProcessing(false);
      toast.success("Order placed successfully!");
      navigate("/orders");
    }, 2500); // 2.5s simulated payment delay
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto text-black">
        <h2 className="text-2xl font-bold mb-2">No checkout items</h2>
        <p className="text-gray-700 mb-6">Add products to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate("/products")}
          className="px-5 py-2.5 bg-black hover:opacity-90 text-white font-bold rounded-xl cursor-pointer"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 text-black relative">
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-black">
          <div className="bg-[#e9ebed] border-2 border-black p-8 rounded-2xl flex flex-col items-center max-w-xs shadow-2xl">
            <FaSpinner className="text-4xl text-black animate-spin mb-4" />
            <h3 className="font-bold text-lg text-center">Processing Secure Payment</h3>
            <p className="text-xs text-gray-700 text-center mt-2">
              Please do not refresh the page or click back button.
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate("/cart")}
        className="flex items-center gap-2 text-black hover:opacity-70 mb-6 font-bold transition duration-200 cursor-pointer"
      >
        <FaArrowLeft /> Back to Cart
      </button>

      <h1 className="text-3xl font-extrabold mb-8 tracking-tight">Checkout Order</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Checkout Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-7 space-y-6">
          <div className="border-2 border-black rounded-2xl p-6 bg-[#e9ebed] space-y-5">
            <h2 className="text-xl font-bold pb-3 border-b border-black/20">
              1. Delivery Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  {...register("fullName", { required: "Full name is required" })}
                  className={`w-full p-3 border-2 rounded-xl outline-none bg-white text-black font-semibold transition-all ${
                    errors.fullName ? "border-red-600 bg-red-50/20" : "border-black focus:border-black"
                  }`}
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-red-650 text-xs mt-1 font-bold">{errors.fullName.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                  })}
                  className={`w-full p-3 border-2 rounded-xl outline-none bg-white text-black font-semibold transition-all ${
                    errors.email ? "border-red-600 bg-red-50/20" : "border-black focus:border-black"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-650 text-xs mt-1 font-bold">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Street Address</label>
              <input
                type="text"
                {...register("address", { required: "Street address is required" })}
                className={`w-full p-3 border-2 rounded-xl outline-none bg-white text-black font-semibold transition-all ${
                  errors.address ? "border-red-600 bg-red-50/20" : "border-black focus:border-black"
                }`}
                placeholder="123 Shopping Avenue, Suite 4B"
              />
              {errors.address && <p className="text-red-650 text-xs mt-1 font-bold">{errors.address.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">City</label>
                <input
                  type="text"
                  {...register("city", { required: "City is required" })}
                  className={`w-full p-3 border-2 rounded-xl outline-none bg-white text-black font-semibold transition-all ${
                    errors.city ? "border-red-600 bg-red-50/20" : "border-black focus:border-black"
                  }`}
                  placeholder="San Francisco"
                />
                {errors.city && <p className="text-red-650 text-xs mt-1 font-bold">{errors.city.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Postal Code</label>
                <input
                  type="text"
                  {...register("postalCode", { required: "Postal code is required" })}
                  className={`w-full p-3 border-2 rounded-xl outline-none bg-white text-black font-semibold transition-all ${
                    errors.postalCode ? "border-red-600 bg-red-50/20" : "border-black focus:border-black"
                  }`}
                  placeholder="94103"
                />
                {errors.postalCode && <p className="text-red-650 text-xs mt-1 font-bold">{errors.postalCode.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Phone Number</label>
              <input
                type="tel"
                {...register("phone", { required: "Phone number is required" })}
                className={`w-full p-3 border-2 rounded-xl outline-none bg-white text-black font-semibold transition-all ${
                  errors.phone ? "border-red-600 bg-red-50/20" : "border-black focus:border-black"
                }`}
                placeholder="+1 (555) 019-2834"
              />
              {errors.phone && <p className="text-red-650 text-xs mt-1 font-bold">{errors.phone.message}</p>}
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="border-2 border-black rounded-2xl p-6 bg-[#e9ebed] space-y-5">
            <h2 className="text-xl font-bold pb-3 border-b border-black/20">
              2. Payment Method
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMethod("stripe")}
                className={`border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all bg-[#c8d3d7] ${
                  paymentMethod === "stripe" ? "border-black" : "border-black/35 hover:border-black"
                }`}
              >
                <div>
                  <h3 className="font-bold text-base">Pay with Stripe</h3>
                  <p className="text-xs text-gray-700 mt-0.5">Credit/Debit Card (Visa, Mastercard)</p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                  {paymentMethod === "stripe" && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod("razorpay")}
                className={`border-2 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all bg-[#c8d3d7] ${
                  paymentMethod === "razorpay" ? "border-black" : "border-black/35 hover:border-black"
                }`}
              >
                <div>
                  <h3 className="font-bold text-base">Pay with Razorpay</h3>
                  <p className="text-xs text-gray-700 mt-0.5">UPI, NetBanking, Wallet options</p>
                </div>
                <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                  {paymentMethod === "razorpay" && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                </div>
              </div>
            </div>

            {paymentMethod === "stripe" && (
              <div className="p-4 bg-[#c8d3d7]/50 border border-black/20 rounded-xl space-y-3">
                <p className="text-[10px] font-bold text-black uppercase tracking-wider">Simulated Stripe Card Details</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-3">
                    <input
                      type="text"
                      placeholder="Card Number (4242 4242 4242 4242)"
                      className="w-full p-2.5 border-2 border-black/45 rounded-lg text-sm outline-none bg-white font-semibold"
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full p-2.5 border-2 border-black/45 rounded-lg text-sm outline-none bg-white font-semibold"
                      disabled
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="CVC"
                      className="w-full p-2.5 border-2 border-black/45 rounded-lg text-sm outline-none bg-white font-semibold"
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "razorpay" && (
              <div className="p-4 bg-[#c8d3d7]/50 border border-black/20 rounded-xl">
                <p className="text-xs text-gray-800">
                  Secure Razorpay interface integration enabled. When placing the order, you will be redirected to complete the payment via mock UPI callback.
                </p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-black hover:opacity-90 text-white font-bold rounded-xl transition duration-300 cursor-pointer text-md"
          >
            <FaLock />
            <span>Pay & Complete Purchase (${finalTotal.toFixed(2)})</span>
          </button>
        </form>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-5 border-2 border-black rounded-2xl p-6 bg-[#e9ebed] space-y-6">
          <h2 className="text-xl font-bold pb-3 border-b border-black/20">
            Order Summary
          </h2>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {checkoutItems.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 items-center">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-xl border border-black/20"
                />
                <div className="flex-1 min-w-0 text-black">
                  <h3 className="font-bold text-sm truncate">{product.name}</h3>
                  <p className="text-xs text-gray-700">Qty: {quantity} • ${Number(product.price).toFixed(2)} each</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-sm">
                    ${(Number(product.price) * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-black/20 pt-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-black">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-bold text-black">
                {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span className="font-bold text-black">${taxCost.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-black/20 pt-4 flex justify-between items-end text-black">
              <span className="font-bold text-base">Order Total</span>
              <span className="font-extrabold text-2xl">${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-[#c8d3d7]/50 p-4 border border-dashed border-black/30 rounded-xl flex items-start gap-3">
            <FaLock className="text-black/50 mt-0.5" />
            <p className="text-[10px] text-gray-800">
              We encrypt sensitive billing details. Your personal details are completely protected on secure connection servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
