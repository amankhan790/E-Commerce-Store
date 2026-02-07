import React, { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#e9ebed] shadow-lg bg-opacity-90 backdrop-blur" : ""}`}
    >
      <div className="flex justify-between items-center  px-8 py-5 md:px-10  md:mx-0">
        {/* Logo */}
        <h2 className="text-xl md:text-2xl text-[--text-color] font-semibold">
          AK Tech
        </h2>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="flex gap-5 md:gap-8 text-base md:text-lg text-[--text-color]">
            <li className="cursor-pointer hover:font-semibold transition-300">
              Home
            </li>
            <li className="cursor-pointer hover:font-semibold transition-300">
              Product
            </li>
            <li className="cursor-pointer hover:font-semibold transition-300">
              Category
            </li>
          </ul>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-70 transition-all">
            <Link to="/cart">
              <FaShoppingCart className="text-lg md:text-2xl" />
            </Link>
            <Link to="/cart">
              <span className="text-base md:text-lg text-[--text-color]">
                Cart
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2 hover:opacity-70 transition-all cursor-pointer">
            <Link to="/login" className="flex items-center gap-2">
              <FaRegUser className="text-lg md:text-2xl" />
              <button className="cursor-pointer text-base md:text-lg text-[--text-color] hover:opacity-70 transition-all">
                Login
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Icons & Hamburger */}
        <div className="md:hidden flex items-center gap-5">
          <div className="flex items-center gap-2 cursor-pointer">
            <FaShoppingCart className="text-xl" />
          </div>
          <div className="flex items-center gap-2">
            <FaRegUser className="text-xl" />
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
      {isMenuOpen && (
        <div className="md:hidden bg-[#E9EBED] rounded-b-3xl mx-5 mt-2 p-4">
          <ul className="flex flex-col gap-4 text-base text-[--text-color]">
            <li className="cursor-pointer py-2 border-b border-gray-300 hover:font-semibold">
              Home
            </li>
            <li className="cursor-pointer py-2 border-b border-gray-300 hover:font-semibold">
              Product
            </li>
            <li className="cursor-pointer py-2 border-b border-gray-300 hover:font-semibold">
              Category
            </li>
            <button className="cursor-pointer py-2 text-left hover:font-semibold">
              Login
            </button>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
