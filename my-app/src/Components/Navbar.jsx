import React, { useState, useEffect, useContext } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { getTotalCartItems, isDashboardUser, auth, signOut } =
    useContext(StoreContext);

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

    // Lock background scroll while the mobile menu is open.
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut();
    setIsMenuOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#e9ebed] shadow-lg bg-opacity-90 backdrop-blur" : ""}`}
    >
      <div className="flex justify-between items-center  px-8 py-5 md:px-10  md:mx-0">
        {/* Logo */}
        <Link to={"/"}>
          <h2 className="text-xl md:text-2xl text-[--text-color] font-semibold">
            AK Tech
          </h2>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex gap-5 md:gap-8 text-base md:text-lg text-[--text-color]">
            <Link to={"/"}>
              <li className="cursor-pointer hover:font-semibold transition-300">
                Home
              </li>
            </Link>
            {isDashboardUser ? (
              <Link to={"/dashboard"}>
                <li className="cursor-pointer hover:font-semibold transition-300">
                  Dashboard
                </li>
              </Link>
            ) : null}
            <Link to={"/products"}>
              <li className="cursor-pointer hover:font-semibold transition-300">
                Product
              </li>
            </Link>
            <Link to={"/about"}>
              <li className="cursor-pointer hover:font-semibold transition-300">
                About
              </li>
            </Link>
          </ul>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative flex items-center gap-2 cursor-pointer hover:opacity-70 transition-all">
            <Link to="/cart">
              <FaShoppingCart className="text-lg md:text-2xl" />{" "}
              <span className="absolute -top-3 -right-3 text-[12px] font-bold">
                {getTotalCartItems()}
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2 hover:opacity-70 transition-all cursor-pointer bg-[#c8d3d7] rounded-sm px-4 py-1">
            {auth?.user ? (
              <div className="flex items-center gap-2">
                <FaRegUser className="text-lg md:text-2xl" />
                <button
                  className="cursor-pointer text-base md:text-lg text-[--text-color] hover:opacity-70 transition-all"
                  onClick={handleSignOut}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/sign-in" className="flex items-center gap-2">
                <FaRegUser className="text-lg md:text-2xl" />
                <button className="cursor-pointer text-base md:text-lg text-[--text-color] hover:opacity-70 transition-all">
                  Sign in
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Icons & Hamburger */}
        <div className=" md:hidden flex items-center gap-5">
          <div className="relative flex items-center gap-2 cursor-pointer">
            <Link to={"/cart"}>
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-3 -right-3 text-[12px] font-bold">
                {getTotalCartItems()}
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            {auth?.user ? (
              <button onClick={handleSignOut}>
                <FaRegUser className="text-xl" />
              </button>
            ) : (
              <Link to="/sign-in">
                <FaRegUser className="text-xl" />
              </Link>
            )}
          </div>
          <button
            onClick={toggleMenu}
            className="text-2xl cursor-pointer text-[--text-color]"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        onClick={toggleMenu}
        className={`md:hidden fixed inset-0 z-40 px-5 pt-24 pb-6 bg-black/20 backdrop-blur-[2px] transition-all duration-300 ease-out ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-[#E9EBED] rounded-3xl p-5 shadow-xl border border-white/60 transition-all duration-300 ease-out ${
            isMenuOpen ? "translate-y-0 scale-100" : "-translate-y-4 scale-95"
          }`}
        >
          <ul className="flex flex-col gap-3 text-base text-[--text-color]">
            <Link to={"/"} onClick={toggleMenu}>
              <li className="cursor-pointer py-2 border-b border-gray-300 hover:font-semibold hover:pl-1 transition-all duration-200">
                Home
              </li>
            </Link>
            {isDashboardUser ? (
              <Link to={"/dashboard"} onClick={toggleMenu}>
                <li className="cursor-pointer py-2 border-b border-gray-300 hover:font-semibold hover:pl-1 transition-all duration-200">
                  Dashboard
                </li>
              </Link>
            ) : null}
            <Link to={"/products"} onClick={toggleMenu}>
              <li className="cursor-pointer py-2 border-b border-gray-300 hover:font-semibold hover:pl-1 transition-all duration-200">
                Product
              </li>
            </Link>
            <Link to={"/products"} onClick={toggleMenu}>
              <li className="cursor-pointer py-2 border-b border-gray-300 hover:font-semibold hover:pl-1 transition-all duration-200">
                Category
              </li>
            </Link>
            {auth?.user ? (
              <li
                className="cursor-pointer py-2 hover:font-semibold hover:pl-1 transition-all duration-200"
                onClick={handleSignOut}
              >
                Logout
              </li>
            ) : (
              <Link to={"/sign-in"} onClick={toggleMenu}>
                <li className="cursor-pointer py-2 hover:font-semibold hover:pl-1 transition-all duration-200">
                  Login
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
