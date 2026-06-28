import React, { useState, useEffect } from "react";
import { FaRegUser, FaShoppingCart, FaBars, FaTimes, FaHeart, FaTruck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../features/auth/authSlice";
import { selectCartCount } from "../features/cart/cartSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const auth = useSelector((state) => state.auth.auth);
  const isDashboardUser = useSelector((state) => state.auth.isDashboardUser);
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector((state) => state.wishlist.wishlistItems.length);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen || window.innerWidth >= 768) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    setIsMenuOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#e9ebed] shadow-lg bg-opacity-90 backdrop-blur" : ""
      }`}
    >
      <div className="flex justify-between items-center px-8 py-5 md:px-10">
        {/* Logo */}
        <Link to="/">
          <h2 className="text-xl md:text-2xl text-[--text-color] font-extrabold tracking-tight">
            ShopEasy
          </h2>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex gap-5 md:gap-8 text-base md:text-lg text-[--text-color] font-medium">
            <Link to="/">
              <li className="cursor-pointer hover:font-bold transition-all">Home</li>
            </Link>
            {isDashboardUser && (
              <Link to="/admin">
                <li className="cursor-pointer hover:font-bold transition-all text-yellow-700">Admin</li>
              </Link>
            )}
            <Link to="/products">
              <li className="cursor-pointer hover:font-bold transition-all">Products</li>
            </Link>
            {auth?.user && (
              <Link to="/orders">
                <li className="cursor-pointer hover:font-bold transition-all">Orders</li>
              </Link>
            )}
            <Link to="/about">
              <li className="cursor-pointer hover:font-bold transition-all">About</li>
            </Link>
          </ul>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-6">
          {/* Wishlist Link */}
          <div className="relative flex items-center gap-2 cursor-pointer hover:opacity-75 transition-all text-red-500">
            <Link to="/wishlist">
              <FaHeart className="text-lg md:text-2xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-red-550 text-white text-[10px] font-black rounded-full px-1.5 py-0.5 flex items-center justify-center min-w-5">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>

          {/* Cart Link */}
          <div className="relative flex items-center gap-2 cursor-pointer hover:opacity-75 transition-all">
            <Link to="/cart">
              <FaShoppingCart className="text-lg md:text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-black text-white text-[10px] font-black rounded-full px-1.5 py-0.5 flex items-center justify-center min-w-5">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Profile/Auth Button */}
          <div className="flex items-center gap-2 hover:opacity-75 transition-all cursor-pointer bg-[#c8d3d7] rounded-full px-4 py-1.5 font-semibold text-sm">
            {auth?.user ? (
              <Link to="/profile" className="flex items-center gap-2">
                <FaRegUser className="text-md" />
                <span>{auth.user.name}</span>
              </Link>
            ) : (
              <Link to="/sign-in" className="flex items-center gap-2">
                <FaRegUser className="text-md" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Icons & Hamburger */}
        <div className="md:hidden flex items-center gap-5">
          <div className="relative flex items-center gap-2 cursor-pointer">
            <Link to="/wishlist" className="text-red-500">
              <FaHeart className="text-xl" />
              {wishlistCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-550 text-white text-[10px] font-black rounded-full px-1.5 min-w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>

          <div className="relative flex items-center gap-2 cursor-pointer">
            <Link to="/cart">
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-black text-white text-[10px] font-black rounded-full px-1.5 min-w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-2 cursor-pointer">
            <Link to="/profile">
              <FaRegUser className="text-xl" />
            </Link>
          </div>

          <button onClick={toggleMenu} className="text-xl cursor-pointer text-[--text-color]">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        onClick={toggleMenu}
        className={`md:hidden fixed inset-0 z-40 px-5 pt-24 pb-6 bg-black/25 backdrop-blur-[2px] transition-all duration-300 ease-out ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-[#E9EBED] rounded-3xl p-5 shadow-xl border border-white/60 transition-all duration-300 ease-out ${
            isMenuOpen ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"
          }`}
        >
          <ul className="flex flex-col gap-2 text-base text-[--text-color] font-bold">
            <Link to="/" onClick={toggleMenu}>
              <li className="cursor-pointer py-2 border-b border-gray-250 hover:pl-1 transition-all duration-200">
                Home
              </li>
            </Link>
            <Link to="/products" onClick={toggleMenu}>
              <li className="cursor-pointer py-2 border-b border-gray-250 hover:pl-1 transition-all duration-200">
                Products
              </li>
            </Link>
            {auth?.user && (
              <Link to="/orders" onClick={toggleMenu}>
                <li className="cursor-pointer py-2 border-b border-gray-250 hover:pl-1 transition-all duration-200">
                  My Orders
                </li>
              </Link>
            )}
            <Link to="/wishlist" onClick={toggleMenu}>
              <li className="cursor-pointer py-2 border-b border-gray-250 hover:pl-1 transition-all duration-200 text-red-500">
                Wishlist
              </li>
            </Link>
            {isDashboardUser && (
              <Link to="/admin" onClick={toggleMenu}>
                <li className="cursor-pointer py-2 border-b border-gray-250 hover:pl-1 transition-all duration-200 text-yellow-700">
                  Admin Dashboard
                </li>
              </Link>
            )}
            <Link to="/about" onClick={toggleMenu}>
              <li className="cursor-pointer py-2 border-b border-gray-250 hover:pl-1 transition-all duration-200">
                About Us
              </li>
            </Link>
            {auth?.user ? (
              <>
                <Link to="/profile" onClick={toggleMenu}>
                  <li className="cursor-pointer py-2 border-b border-gray-250 hover:pl-1 transition-all duration-200">
                    My Profile ({auth.user.name})
                  </li>
                </Link>
                <li
                  className="cursor-pointer py-2 hover:pl-1 transition-all duration-200 text-red-650"
                  onClick={handleSignOut}
                >
                  Logout
                </li>
              </>
            ) : (
              <Link to="/sign-in" onClick={toggleMenu}>
                <li className="cursor-pointer py-2 hover:pl-1 transition-all duration-200">
                  Login / Register
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
