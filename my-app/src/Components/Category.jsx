import { useState, useContext } from "react";
import { StoreContext } from "../Context/StoreContext";
import { useNavigate } from "react-router-dom";

const Category = ({ navigateOnClick = false, selectedCategories: outerSelected, setSelectedCategories: outerSetSelected }) => {
  const { filterByCategory } = useContext(StoreContext);
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState("All");
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Accessories",
    "Clothing",
  ];

  const isControlled = typeof outerSelected !== "undefined" && typeof outerSetSelected === "function";
  const currentSelected = isControlled ? outerSelected : selectedCategories;

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
              const setSel = isControlled ? outerSetSelected : setSelectedCategories;
              setSel(cat);
              filterByCategory(cat);
              if (navigateOnClick) navigate("/products");
            }}
            className={`px-7 py-2 rounded-xl font-medium cursor-pointer
              ${
                currentSelected === cat
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
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
