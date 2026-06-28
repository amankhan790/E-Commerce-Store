import "./App.css";
import Navbar from "./Components/Navbar";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import { Routes, Route, Navigate } from "react-router";
import ProductDetail from "./Pages/ProductDetail";
import Footer from "./Components/Footer";
import Products from "./Pages/Products";
import About from "./Pages/About";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Checkout from "./Pages/Checkout";
import Orders from "./Pages/Orders";
import Profile from "./Pages/Profile";
import Wishlist from "./Pages/Wishlist";
import AdminPanel from "./Pages/AdminPanel";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

function App() {
  const isDashboardUser = useSelector((state) => state.auth.isDashboardUser);

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/dashboard"
            element={
              isDashboardUser ? <AdminPanel /> : <Navigate to="/sign-in" replace />
            }
          />
          <Route
            path="/admin"
            element={
              isDashboardUser ? <AdminPanel /> : <Navigate to="/sign-in" replace />
            }
          />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
