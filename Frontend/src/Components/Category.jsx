import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCategory } from "../features/products/productsSlice";

const Category = ({
  navigateOnClick = false,
  selectedCategories: outerSelected,
  setSelectedCategories: outerSetSelected,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Accessories",
    "Clothing",
  ];

  const isControlled =
    typeof outerSelected !== "undefined" &&
    typeof outerSetSelected === "function";
  const currentSelected = isControlled ? outerSelected : selectedCategory;

  return (
    <div>
      <h1 className="text-3xl font-bold items-start mb-10 pt-10">
        Shop By category
      </h1>
      <div className="flex gap-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              if (isControlled) {
                outerSetSelected(cat);
              } else {
                dispatch(setSelectedCategory(cat));
              }
              if (navigateOnClick) navigate("/products");
            }}
            className={`px-7 py-2 rounded-xl font-medium cursor-pointer transition-all duration-200
              ${
                currentSelected === cat
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
