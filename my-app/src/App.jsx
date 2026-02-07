import "./App.css";
import Navbar from "./Components/Navbar";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import { Routes, Route } from "react-router";
import ProductDetail from "./Pages/ProductDetail";
import Login from "./Pages/Login";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Product-detail" element={<ProductDetail />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
