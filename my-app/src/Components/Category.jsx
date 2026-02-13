const Category = ({ selectedCategories, setSelectedCategories }) => {
  const categories = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Accessories",
    "Clothing",
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold items-start mb-10 pt-10">
        Shop By category
      </h1>
      <div className="flex gap-4 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategories(cat)}
            className={`px-7 py-2 rounded-xl font-medium cursor-pointer
              ${
                selectedCategories === cat
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
