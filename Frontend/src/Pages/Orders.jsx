import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllOrders, cancelOrder, selectUserOrders } from "../features/orders/ordersSlice";
import { FaTruck, FaBox, FaRegClock, FaCheckCircle, FaBan, FaCalendarAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Orders = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  
  // Get all orders or filter by logged in user email
  const allOrders = useSelector(selectAllOrders);
  const userOrders = auth?.user?.email 
    ? allOrders.filter(o => o.deliveryDetails.email.toLowerCase() === auth.user.email.toLowerCase())
    : allOrders;

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleCancelOrder = (orderId) => {
    dispatch(cancelOrder(orderId));
    toast.info("Order has been cancelled.");
  };

  // Helper to determine status progress step
  const getStatusStep = (status) => {
    const steps = ["Placed", "Packed", "Shipped", "Out for Delivery", "Delivered"];
    return steps.indexOf(status);
  };

  const stepsList = [
    { name: "Placed", icon: FaRegClock },
    { name: "Packed", icon: FaBox },
    { name: "Shipped", icon: FaTruck },
    { name: "Out for Delivery", icon: FaTruck },
    { name: "Delivered", icon: FaCheckCircle },
  ];

  return (
    <div className="min-h-[75vh] py-12 text-black max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <FaTruck className="text-black text-2xl" />
        <h1 className="text-3xl font-extrabold tracking-tight text-center">
          My Order History
        </h1>
      </div>

      {userOrders.length === 0 ? (
        <div className="border-2 border-black rounded-2xl p-10 text-center bg-[#e9ebed] shadow-sm max-w-md mx-auto">
          <div className="w-16 h-16 bg-[#c8d3d7] border border-black rounded-full flex items-center justify-center mx-auto mb-5">
            <FaBox className="text-black/60 text-2xl" />
          </div>
          <h2 className="text-xl font-bold">No orders found</h2>
          <p className="text-gray-700 text-sm mt-2 mb-6">
            You haven't placed any orders yet. Add items to your cart and complete checkout!
          </p>
          <Link
            to="/products"
            className="inline-block px-5 py-2.5 bg-black hover:opacity-90 text-white font-semibold rounded-xl shadow transition duration-200"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {userOrders.map((order) => {
            const currentStep = getStatusStep(order.status);
            const isCancelled = order.status === "Cancelled";
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="border-2 border-black rounded-2xl overflow-hidden bg-[#e9ebed] shadow-sm hover:shadow-md transition duration-300"
              >
                {/* Order Summary Header */}
                <div className="p-5 bg-[#c8d3d7] border-b-2 border-black flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">ORDER ID</span>
                      <span className="font-mono font-bold text-black text-sm">{order.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-800 text-xs">
                      <FaCalendarAlt />
                      <span>{order.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs font-bold text-gray-700 block uppercase tracking-wider">TOTAL AMOUNT</span>
                      <span className="font-extrabold text-black text-lg">${Number(order.amount).toFixed(2)}</span>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-md text-xs font-bold uppercase border border-black ${
                        isCancelled
                          ? "bg-red-50 text-red-650"
                          : order.status === "Delivered"
                          ? "bg-green-50 text-green-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Tracking Progress Timeline */}
                {!isCancelled ? (
                  <div className="p-6 border-b border-black/10 bg-[#e9ebed]">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-6">Delivery Tracking</h3>
                    
                    <div className="relative flex justify-between items-center w-full max-w-2xl mx-auto">
                      {/* Connection Line */}
                      <div className="absolute left-0 right-0 top-1/2 h-1 bg-black/20 -translate-y-1/2 z-0" />
                      <div
                        className="absolute left-0 top-1/2 h-1 bg-black -translate-y-1/2 z-0 transition-all duration-500"
                        style={{
                          width: `${(currentStep / (stepsList.length - 1)) * 100}%`,
                        }}
                      />

                      {stepsList.map((step, idx) => {
                        const StepIcon = step.icon;
                        const isCompleted = idx <= currentStep;
                        const isActive = idx === currentStep;

                        return (
                          <div key={step.name} className="flex flex-col items-center z-10">
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center border-2 border-black transition-all duration-300 ${
                                isCompleted
                                  ? "bg-black text-white"
                                  : "bg-[#c8d3d7] text-black/60"
                              } ${isActive ? "ring-4 ring-black/10 scale-110" : ""}`}
                            >
                              <StepIcon className="text-xs" />
                            </div>
                            <span
                              className={`text-[10px] font-bold mt-2 text-center whitespace-nowrap hidden sm:inline ${
                                isCompleted ? "text-black" : "text-black/55"
                              }`}
                            >
                              {step.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-5 border-b border-black/10 bg-red-50/20 flex items-center gap-3">
                    <FaBan className="text-red-650" />
                    <span className="text-xs font-bold text-red-650 uppercase tracking-wider">This order has been cancelled and refunded.</span>
                  </div>
                )}

                {/* Collapsible Content */}
                <div className="px-5 py-4 flex justify-between items-center bg-[#e9ebed]">
                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="text-xs font-extrabold uppercase hover:underline tracking-wider cursor-pointer"
                  >
                    {isExpanded ? "Hide Order Items" : "View Order Items"} ({order.items.length})
                  </button>

                  {!isCancelled && order.status === "Placed" && (
                    <button
                      onClick={() => handleCancelOrder(order.id)}
                      className="px-3.5 py-1.5 text-xs font-bold text-red-650 border border-red-650 rounded-lg hover:bg-red-650 hover:text-white transition duration-200 cursor-pointer"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>

                {isExpanded && (
                  <div className="p-6 bg-[#c8d3d7]/35 border-t border-black/20 space-y-4">
                    <h4 className="text-[10px] font-bold text-gray-700 uppercase tracking-wider">Shipped Items</h4>
                    <div className="divide-y divide-black/10">
                      {order.items.map(({ product, quantity }) => (
                        <div key={product.id} className="py-3 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={product.img}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-xl border border-black/20"
                            />
                            <div>
                              <h5 className="font-bold text-black text-sm line-clamp-1">{product.name}</h5>
                              <p className="text-xs text-gray-750 font-medium">Qty: {quantity} • ${Number(product.price).toFixed(2)} each</p>
                            </div>
                          </div>
                          <span className="font-bold text-black text-sm">${(Number(product.price) * quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-black/20 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-800">
                      <div>
                        <h5 className="font-bold text-black mb-1.5">Shipping Details</h5>
                        <p className="font-semibold">{order.deliveryDetails.fullName}</p>
                        <p>{order.deliveryDetails.address}</p>
                        <p>{order.deliveryDetails.city}, {order.deliveryDetails.postalCode}</p>
                        <p>Phone: {order.deliveryDetails.phone}</p>
                      </div>
                      <div>
                        <h5 className="font-bold text-black mb-1.5">Payment Details</h5>
                        <p>Method: {order.paymentMethod}</p>
                        <p>Status: {order.paymentStatus}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
