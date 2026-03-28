import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../Context/StoreContext";
import { AllProducts } from "../assets/assets";

const Dashboard = () => {
  const { isDemo } = useContext(StoreContext);

  const catalog = AllProducts;

  const counts = new Map();
  for (const p of catalog) {
    counts.set(p.category, (counts.get(p.category) || 0) + 1);
  }

  const categories = Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  const productCount = catalog.length;
  const categoriesCount = categories.length;

  const trending = catalog.filter((p) => p.trending);
  const trendingCount = trending.length;

  const averageRating =
    catalog.length === 0
      ? 0
      : catalog.reduce((acc, p) => acc + Number(p.rating || 0), 0) /
        catalog.length;

  const prices = catalog
    .map((p) => Number(p.price))
    .filter((v) => Number.isFinite(v));
  const priceStats =
    prices.length === 0
      ? { min: 0, max: 0, avg: 0 }
      : {
          min: Math.min(...prices),
          max: Math.max(...prices),
          avg: prices.reduce((a, b) => a + b, 0) / prices.length,
        };

  const topRated = [...catalog]
    .sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    .slice(0, 5);

  if (!isDemo) {
    return (
      <div className="min-h-[70vh] py-12">
        <div className="max-w-3xl mx-auto border-2 border-dashed border-gray-700 rounded-2xl p-10 text-center">
          <h1 className="text-2xl font-bold text-black">Demo access required</h1>
          <p className="text-sm text-gray-700 mt-2">
            This page is restricted to the demo account.
          </p>
          <Link
            to="/sign-in"
            className="inline-block mt-5 px-5 py-2 bg-gray-200 text-black rounded-lg font-medium hover:bg-white transition-colors"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Admin Dashboard</h1>
            <p className="text-sm text-gray-700 mt-1">
              Catalog health and merchandising overview.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/products"
              className="px-4 py-2 rounded-xl bg-black text-white font-semibold hover:opacity-90 transition-all"
            >
              View Storefront
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-black rounded-2xl p-5 bg-[#e9ebed]">
            <p className="text-sm text-gray-700">Total Products</p>
            <p className="text-2xl font-bold text-black mt-2">{productCount}</p>
            <p className="text-xs text-gray-600 mt-1">Live catalog items</p>
          </div>

          <div className="border border-black rounded-2xl p-5 bg-[#e9ebed]">
            <p className="text-sm text-gray-700">Categories</p>
            <p className="text-2xl font-bold text-black mt-2">{categoriesCount}</p>
            <p className="text-xs text-gray-600 mt-1">Active product groups</p>
          </div>

          <div className="border border-black rounded-2xl p-5 bg-[#e9ebed]">
            <p className="text-sm text-gray-700">Trending Items</p>
            <p className="text-2xl font-bold text-black mt-2">{trendingCount}</p>
            <p className="text-xs text-gray-600 mt-1">Flagged as trending</p>
          </div>

          <div className="border border-black rounded-2xl p-5 bg-[#e9ebed]">
            <p className="text-sm text-gray-700">Avg Rating</p>
            <p className="text-2xl font-bold text-black mt-2">
              {averageRating.toFixed(2)}
            </p>
            <p className="text-xs text-gray-600 mt-1">Across all products</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <section className="lg:col-span-2 border border-black rounded-2xl p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-bold text-black">Category Breakdown</h2>
              <p className="text-sm text-gray-700">
                Price avg ${priceStats.avg.toFixed(2)}
              </p>
            </div>

            <div className="space-y-3">
              {categories.map(({ category, count }) => {
                const pct = productCount > 0 ? (count / productCount) * 100 : 0;
                return (
                  <div
                    key={category}
                    className="rounded-2xl bg-[#e9ebed] border border-black p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-bold text-black truncate">{category}</p>
                        <p className="text-xs text-gray-600">
                          {count} products • {pct.toFixed(0)}%
                        </p>
                      </div>
                      <Link
                        to="/products"
                        className="text-sm font-semibold text-black underline hover:opacity-80 whitespace-nowrap"
                      >
                        View
                      </Link>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-gray-300 overflow-hidden">
                      <div
                        className="h-full bg-black"
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-gray-700 mt-6 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-[#e9ebed] border border-black p-4">
                  <p className="text-sm text-gray-700">Min Price</p>
                  <p className="text-lg font-bold text-black mt-1">
                    ${priceStats.min.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#e9ebed] border border-black p-4">
                  <p className="text-sm text-gray-700">Avg Price</p>
                  <p className="text-lg font-bold text-black mt-1">
                    ${priceStats.avg.toFixed(2)}
                  </p>
                </div>
                <div className="rounded-2xl bg-[#e9ebed] border border-black p-4">
                  <p className="text-sm text-gray-700">Max Price</p>
                  <p className="text-lg font-bold text-black mt-1">
                    ${priceStats.max.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside className="border border-black rounded-2xl p-6">
            <h2 className="text-xl font-bold text-black">Top Rated</h2>
            <p className="text-sm text-gray-700 mt-1">
              Products with strongest ratings.
            </p>

            <div className="mt-5 space-y-3">
              {topRated.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="flex items-center gap-3 border border-black rounded-2xl p-3 hover:opacity-95 transition-all"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-14 h-14 object-cover rounded-xl"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-black truncate">{p.name}</p>
                    <p className="text-xs text-gray-700 truncate">
                      {p.category} • ${Number(p.price).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-black">{Number(p.rating).toFixed(1)}</p>
                    <p className="text-xs text-gray-600">Rating</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="border-t border-gray-700 mt-6 pt-6">
              <h3 className="text-sm font-semibold text-black">Merchandising</h3>
              <p className="text-sm text-gray-700 mt-2">
                Keep trending items refreshed and make sure each category has at
                least one high-rated product highlighted.
              </p>
            </div>
          </aside>
        </div>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-black">Trending Products</h2>
            <Link
              to="/products"
              className="text-sm font-semibold text-black underline hover:opacity-80"
            >
              Browse all
            </Link>
          </div>

          {trendingCount === 0 ? (
            <div className="border-2 border-dashed border-gray-700 rounded-2xl p-10 text-center mt-6">
              <p className="text-lg font-bold text-black">No trending items</p>
              <p className="text-sm text-gray-700 mt-1">
                Mark products as trending to feature them here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch h-auto mt-6">
              {trending.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="border-2 border-(--text-color) rounded-2xl p-4 hover:shadow-lg hover:scale-105 duration-300 flex flex-col h-full"
                >
                  <img
                    src={p.img}
                    alt={p.name}
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                  <p className="text-sm text-gray-600 mb-2 mt-3">{p.category}</p>
                  <h3 className="text-lg font-semibold mt-1 mb-2">{p.name}</h3>
                  <p className="text-sm text-gray-600 mb-5 grow">
                    {p.description}
                  </p>
                  <div className="flex justify-between items-center gap-3 mt-auto">
                    <p className="text-lg font-semibold text-gray-700">
                      ${Number(p.price).toFixed(2)}
                    </p>
                    <span className="text-sm font-semibold text-black">
                      {Number(p.rating).toFixed(1)} ★
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;