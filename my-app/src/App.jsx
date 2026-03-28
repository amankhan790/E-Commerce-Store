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
import Dashboard from "./Pages/Dashboard";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { StoreContext } from "./Context/StoreContext";

function App() {
  const { isDashboardUser } = useContext(StoreContext);

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route
            path="/dashboard"
            element={
              isDashboardUser ? <Dashboard /> : <Navigate to="/sign-in" replace />
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
