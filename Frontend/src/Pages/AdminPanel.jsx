import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct, editProduct, deleteProduct } from "../features/products/productsSlice";
import { selectAllOrders, updateOrderStatus } from "../features/orders/ordersSlice";
import { useForm } from "react-hook-form";
import { FaBoxes, FaClipboardList, FaUsers, FaChartBar, FaPlus, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.auth);
  const products = useSelector((state) => state.products.products);
  const orders = useSelector(selectAllOrders);

  const [activeTab, setActiveTab] = useState("overview"); // overview, products, orders, users
  
  // Product Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const isDemo = auth?.user?.role === "demo";

  // Catalog Stats Calculations
  const counts = new Map();
  products.forEach((p) => {
    counts.set(p.category, (counts.get(p.category) || 0) + 1);
  });
  const categories = Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  const averageRating =
    products.length === 0
      ? 0
      : products.reduce((acc, p) => acc + Number(p.rating || 0), 0) / products.length;

  const prices = products.map((p) => Number(p.price)).filter(Number.isFinite);
  const priceStats =
    prices.length === 0
      ? { min: 0, max: 0, avg: 0 }
      : {
          min: Math.min(...prices),
          max: Math.max(...prices),
          avg: prices.reduce((a, b) => a + b, 0) / prices.length,
        };

  // React Hook Form for Product Creation/Editing
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "Accessories",
      price: "",
      description: "",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500", // placeholder
      trending: false,
    },
  });

  const handleOpenAddForm = () => {
    setEditingProductId(null);
    reset({
      name: "",
      category: "Accessories",
      price: "",
      description: "",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      trending: false,
    });
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (product) => {
    setEditingProductId(product.id);
    reset({
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      img: product.img,
      trending: product.trending,
    });
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
      toast.info("Product deleted successfully.");
    }
  };

  const onProductSubmit = (data) => {
    if (editingProductId) {
      dispatch(editProduct({ id: editingProductId, ...data }));
      toast.success("Product updated successfully!");
    } else {
      dispatch(addProduct(data));
      toast.success("Product added to catalog!");
    }
    setIsFormOpen(false);
    reset();
  };

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
    toast.success(`Order status updated to "${newStatus}"`);
  };

  if (!isDemo) {
    return (
      <div className="min-h-[70vh] py-12 flex items-center justify-center text-black">
        <div className="max-w-md mx-auto border-2 border-black rounded-2xl p-10 text-center bg-[#e9ebed] shadow-sm">
          <h1 className="text-2xl font-bold text-red-650">Demo Access Restricted</h1>
          <p className="text-sm text-gray-700 mt-2">
            This dashboard is restricted to the demo administrator account.
          </p>
          <Link
            to="/sign-in"
            className="inline-block mt-5 px-5 py-2.5 bg-black text-white rounded-xl font-bold hover:opacity-90 transition duration-200"
          >
            Sign In with Demo Card
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 text-black max-w-7xl mx-auto">
      {/* Form Dialog Backdrop */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#e9ebed] border-2 border-black rounded-2xl p-6 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-black hover:opacity-70 cursor-pointer text-xl"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold text-black mb-5">
              {editingProductId ? "Modify Product Details" : "Add Product to Catalog"}
            </h2>

            <form onSubmit={handleSubmit(onProductSubmit)} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Product Title</label>
                <input
                  type="text"
                  {...register("name", { required: "Product name is required" })}
                  className="w-full p-2.5 border-2 border-black rounded-xl outline-none focus:border-black bg-white text-black font-semibold"
                  placeholder="Vintage Leather Bag"
                />
                {errors.name && <p className="text-red-650 text-xs mt-1 font-bold">{errors.name.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Category</label>
                  <select
                    {...register("category")}
                    className="w-full p-2.5 border-2 border-black rounded-xl outline-none focus:border-black bg-white text-black font-semibold"
                  >
                    <option value="Accessories">Accessories</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Home">Home</option>
                    <option value="Sports">Sports</option>
                    <option value="Electronics">Electronics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", { required: "Price is required", min: 0 })}
                    className="w-full p-2.5 border-2 border-black rounded-xl outline-none focus:border-black bg-white text-black font-semibold"
                    placeholder="49.99"
                  />
                  {errors.price && <p className="text-red-650 text-xs mt-1 font-bold">{errors.price.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Image URL</label>
                <input
                  type="text"
                  {...register("img", { required: "Image URL is required" })}
                  className="w-full p-2.5 border-2 border-black rounded-xl outline-none focus:border-black bg-white text-black font-semibold text-xs font-mono"
                  placeholder="https://images.unsplash.com/..."
                />
                {errors.img && <p className="text-red-650 text-xs mt-1 font-bold">{errors.img.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Description</label>
                <textarea
                  rows="3"
                  {...register("description", { required: "Description is required" })}
                  className="w-full p-2.5 border-2 border-black rounded-xl outline-none focus:border-black bg-white text-black font-semibold"
                  placeholder="Enter detailed product description..."
                />
                {errors.description && <p className="text-red-650 text-xs mt-1 font-bold">{errors.description.message}</p>}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="trending"
                  {...register("trending")}
                  className="w-4 h-4 rounded border-black focus:ring-black cursor-pointer text-black"
                />
                <label htmlFor="trending" className="text-sm font-bold cursor-pointer">
                  Feature as Trending Product on Homepage
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black hover:opacity-90 text-white font-bold rounded-xl transition duration-200 cursor-pointer mt-4"
              >
                {editingProductId ? "Save Modifications" : "Publish to Storefront"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Admin Merchant Center</h1>
          <p className="text-gray-700 text-sm mt-1">Manage catalog health, user accounts, and track deliveries.</p>
        </div>
        <Link
          to="/products"
          className="px-4 py-2 bg-black text-white hover:opacity-90 font-bold rounded-xl transition duration-250 text-sm self-start"
        >
          Open Shop Storefront
        </Link>
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-black/30 gap-2 overflow-x-auto pb-px mb-8 scrollbar-none">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition duration-205 whitespace-nowrap cursor-pointer ${
            activeTab === "overview" ? "border-black text-black" : "border-transparent text-black/55 hover:text-black"
          }`}
        >
          <FaChartBar /> Overview Analytics
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition duration-205 whitespace-nowrap cursor-pointer ${
            activeTab === "products" ? "border-black text-black" : "border-transparent text-black/55 hover:text-black"
          }`}
        >
          <FaBoxes /> Catalog Products ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition duration-205 whitespace-nowrap cursor-pointer ${
            activeTab === "orders" ? "border-black text-black" : "border-transparent text-black/55 hover:text-black"
          }`}
        >
          <FaClipboardList /> Customer Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition duration-205 whitespace-nowrap cursor-pointer ${
            activeTab === "users" ? "border-black text-black" : "border-transparent text-black/55 hover:text-black"
          }`}
        >
          <FaUsers /> User Management
        </button>
      </div>

      {/* Content Rendering based on Active Tab */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border-2 border-black rounded-2xl p-5 bg-[#e9ebed]">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Total Products</span>
              <p className="text-3xl font-extrabold mt-2 text-black">{products.length}</p>
            </div>
            <div className="border-2 border-black rounded-2xl p-5 bg-[#e9ebed]">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Active Categories</span>
              <p className="text-3xl font-extrabold mt-2 text-black">{categories.length}</p>
            </div>
            <div className="border-2 border-black rounded-2xl p-5 bg-[#e9ebed]">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Total Orders</span>
              <p className="text-3xl font-extrabold mt-2 text-black">{orders.length}</p>
            </div>
            <div className="border-2 border-black rounded-2xl p-5 bg-[#e9ebed]">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Avg Review Rating</span>
              <p className="text-3xl font-extrabold mt-2 text-black">★ {averageRating.toFixed(1)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 border-2 border-black rounded-2xl p-6 bg-[#e9ebed]">
              <h3 className="text-lg font-bold mb-4">Product Category Densities</h3>
              <div className="space-y-4">
                {categories.map(({ category, count }) => {
                  const pct = products.length > 0 ? (count / products.length) * 100 : 0;
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-end text-sm">
                        <span className="font-bold">{category}</span>
                        <span className="text-xs font-semibold text-gray-750">
                          {count} products ({pct.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-[#c8d3d7] overflow-hidden">
                        <div className="h-full bg-black rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-2 border-black rounded-2xl p-6 bg-[#e9ebed] space-y-4">
              <h3 className="text-lg font-bold">Catalog Price Ranges</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-3 bg-[#c8d3d7] border-2 border-black rounded-xl text-center">
                  <span className="text-[10px] text-gray-700 font-bold block">MIN</span>
                  <span className="font-extrabold text-sm">${priceStats.min.toFixed(2)}</span>
                </div>
                <div className="p-3 bg-[#c8d3d7] border-2 border-black rounded-xl text-center">
                  <span className="text-[10px] text-gray-700 font-bold block">AVG</span>
                  <span className="font-extrabold text-sm">${priceStats.avg.toFixed(2)}</span>
                </div>
                <div className="p-3 bg-[#c8d3d7] border-2 border-black rounded-xl text-center">
                  <span className="text-[10px] text-gray-700 font-bold block">MAX</span>
                  <span className="font-extrabold text-sm">${priceStats.max.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "products" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={handleOpenAddForm}
              className="flex items-center gap-1.5 px-4 py-2 bg-black hover:opacity-90 text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              <FaPlus /> Add New Product
            </button>
          </div>

          <div className="border-2 border-black rounded-2xl overflow-hidden bg-[#e9ebed]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#c8d3d7] text-xs font-bold border-b-2 border-black uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Item Details</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-black/5 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <img src={p.img} alt={p.name} className="w-12 h-12 object-cover rounded-xl border border-black/25" />
                        <div className="min-w-0">
                          <h4 className="font-bold truncate max-w-xs">{p.name}</h4>
                          {p.trending && (
                            <span className="px-1.5 py-0.5 bg-yellow-105 border border-black/30 text-xs font-bold rounded uppercase inline-block mt-0.5">
                              Trending
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold">{p.category}</td>
                      <td className="px-6 py-4 font-extrabold">${Number(p.price).toFixed(2)}</td>
                      <td className="px-6 py-4 font-bold">★ {Number(p.rating || 0).toFixed(1)}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOpenEditForm(p)}
                            className="p-2 border border-black text-black hover:bg-white/20 rounded-lg cursor-pointer"
                            title="Edit Product"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-2 border border-red-650 text-red-650 hover:bg-red-650 hover:text-white rounded-lg transition cursor-pointer"
                            title="Delete Product"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "orders" && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="border-2 border-black rounded-2xl p-12 text-center bg-[#e9ebed]">
              <p className="text-gray-700 font-bold">No checkout orders placed in this session yet.</p>
            </div>
          ) : (
            <div className="border-2 border-black rounded-2xl overflow-hidden bg-[#e9ebed]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#c8d3d7] text-xs font-bold border-b-2 border-black uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Order ID & Date</th>
                      <th className="px-6 py-4">Customer Details</th>
                      <th className="px-6 py-4">Cost Sum</th>
                      <th className="px-6 py-4">Payment</th>
                      <th className="px-6 py-4">Status Adjustment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-black/5 transition-colors">
                        <td className="px-6 py-4 font-medium">
                          <div className="font-mono text-xs font-bold">{order.id}</div>
                          <div className="text-xs text-gray-700 mt-0.5">{order.date}</div>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium">
                          <div className="font-bold">{order.deliveryDetails.fullName}</div>
                          <div>{order.deliveryDetails.email}</div>
                          <div className="text-gray-700 mt-0.5 truncate max-w-xs">{order.deliveryDetails.address}</div>
                        </td>
                        <td className="px-6 py-4 font-extrabold">${Number(order.amount).toFixed(2)}</td>
                        <td className="px-6 py-4 text-xs font-semibold">
                          <div>{order.paymentMethod}</div>
                          <span className="px-1.5 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded border border-green-205 mt-1 inline-block">
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {order.status === "Cancelled" ? (
                            <span className="text-red-650 text-xs font-bold uppercase tracking-wider">Cancelled</span>
                          ) : (
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className="p-1.5 bg-white border-2 border-black rounded-lg text-xs font-semibold outline-none focus:border-black cursor-pointer text-black"
                            >
                              <option value="Placed">Placed</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "users" && (
        <div className="space-y-6">
          <div className="border-2 border-black rounded-2xl overflow-hidden bg-[#e9ebed]">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#c8d3d7] text-xs font-bold border-b-2 border-black uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Assigned Role</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/10">
                  <tr className="hover:bg-black/5">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black/10 border border-black flex items-center justify-center font-bold">A</div>
                      <span className="font-bold">Aman (You)</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs font-semibold">demo@ayashtech.com</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-yellow-50 text-yellow-805 text-xs font-bold rounded border border-yellow-105 uppercase tracking-wider">
                        demo
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block w-2.5 h-2.5 bg-green-500 rounded-full border border-black/20" title="Active Session" />
                    </td>
                  </tr>
                  <tr className="hover:bg-black/5">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black/10 border border-black flex items-center justify-center font-bold">G</div>
                      <span className="font-bold">Guest Session</span>
                    </td>
                    <td className="px-6 py-4 font-mono text-xs font-semibold">guest@customer.com</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-[#c8d3d7] text-black/70 text-xs font-bold rounded border border-black/10 uppercase tracking-wider">
                        user
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block w-2.5 h-2.5 bg-gray-400 rounded-full border border-black/20" title="Offline" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
