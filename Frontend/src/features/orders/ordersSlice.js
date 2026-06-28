import { createSlice } from "@reduxjs/toolkit";

const getInitialOrders = () => {
  try {
    const raw = localStorage.getItem("orders");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const initialState = {
  orders: getInitialOrders(),
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const { items, amount, deliveryDetails, paymentMethod } = action.payload;
      const newOrder = {
        id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        items, // [{ product, quantity }]
        amount,
        deliveryDetails,
        paymentMethod,
        paymentStatus: "Paid",
        status: "Placed", // Statuses: Placed -> Packed -> Shipped -> Out for Delivery -> Delivered
      };
      state.orders.unshift(newOrder); // New orders at the top
      try {
        localStorage.setItem("orders", JSON.stringify(state.orders));
      } catch (err) {
        console.error("Failed to save orders to localStorage", err);
      }
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const index = state.orders.findIndex((o) => o.id === orderId);
      if (index !== -1) {
        state.orders[index].status = status;
        try {
          localStorage.setItem("orders", JSON.stringify(state.orders));
        } catch (err) {
          console.error("Failed to save orders to localStorage", err);
        }
      }
    },
    cancelOrder: (state, action) => {
      const orderId = action.payload;
      const index = state.orders.findIndex((o) => o.id === orderId);
      if (index !== -1) {
        state.orders[index].status = "Cancelled";
        try {
          localStorage.setItem("orders", JSON.stringify(state.orders));
        } catch (err) {
          console.error("Failed to save orders to localStorage", err);
        }
      }
    },
  },
});

export const { placeOrder, updateOrderStatus, cancelOrder } = ordersSlice.actions;

export const selectAllOrders = (state) => state.orders.orders;

export const selectUserOrders = (state, userEmail) => {
  return state.orders.orders.filter(
    (order) => order.deliveryDetails.email.toLowerCase() === userEmail.toLowerCase()
  );
};

export default ordersSlice.reducer;
