import React from "react";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex justify-between mt-5 w-full items-center sticky p-5 px-10 bg-[#E9EBED] rounded-full">
      <h2 className="text-2xl">AK Tech</h2>
      <div className="">
        <ul className="flex gap-5 text-lg">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">Product</li>
          <li className="cursor-pointer">Category</li>
        </ul>
      </div>
      <div className="flex items-center gap-10">
        <div className="flex items-center">
          <FaShoppingCart className="mr-2 text-2xl" />
          <span className="cursor-pointer">Cart</span>
        </div>
        <div className="flex items-center">
          <FaRegUser className="mr-2 text-2xl" />
          <button className="cursor-pointer">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
