import React from "react";

const Category = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold items-start mb-10 pt-10">
        Shop By category
      </h1>
      <div className="flex gap-5">
        <button className="active bg-black text-white px-7 py-2 rounded-xl font-medium cursor-pointer ">
          All
        </button>
        <button className="bg-black text-white px-7 py-2 rounded-xl font-medium cursor-pointer">
          Electronics
        </button>
        <button className="bg-black text-white px-7 py-2 rounded-xl font-medium cursor-pointer">
          Fashion
        </button>
        <button className="bg-black text-white px-7 py-2 rounded-xl font-medium cursor-pointer">
          Home
        </button>
        <button className="bg-black text-white px-7 py-2 rounded-xl font-medium cursor-pointer">
          Sports
        </button>
        <button className="bg-black text-white px-7 py-2 rounded-xl font-medium cursor-pointer">
          Accessories
        </button>
        <button className="bg-black text-white px-7 py-2 rounded-xl font-medium cursor-pointer">
          Clothing
        </button>
      </div>
    </div>
  );
};

export default Category;
