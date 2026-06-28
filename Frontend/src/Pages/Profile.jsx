import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signOut } from "../features/auth/authSlice";
import { selectUserOrders, selectAllOrders } from "../features/orders/ordersSlice";
import { selectWishlistItems } from "../features/wishlist/wishlistSlice";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaShoppingBag, FaHeart, FaSignOutAlt, FaEdit, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const auth = useSelector((state) => state.auth.auth);
  const allOrders = useSelector(selectAllOrders);
  const wishlistIds = useSelector(selectWishlistItems);

  const [isEditing, setIsEditing] = useState(false);
  const [savedDetails, setSavedDetails] = useState({
    address: "123 Tech Lane, Silicon Valley",
    phone: "+1 (555) 123-4567",
    city: "San Jose",
    postalCode: "95112",
  });

  const userOrders = auth?.user?.email
    ? allOrders.filter(o => o.deliveryDetails.email.toLowerCase() === auth.user.email.toLowerCase())
    : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: savedDetails,
  });

  const handleSignOut = () => {
    dispatch(signOut());
    toast.success("Successfully logged out");
    navigate("/");
  };

  const onSubmit = (data) => {
    setSavedDetails(data);
    setIsEditing(false);
    toast.success("Default shipping profile updated!");
  };

  if (!auth?.user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 text-black">
        <div className="border-2 border-black rounded-2xl p-8 text-center bg-[#e9ebed] shadow-lg max-w-sm w-full">
          <div className="w-16 h-16 bg-[#c8d3d7] border border-black rounded-full flex items-center justify-center mx-auto mb-4">
            <FaUser className="text-black text-xl" />
          </div>
          <h2 className="text-2xl font-bold">Your Account Profile</h2>
          <p className="text-gray-700 text-sm mt-2 mb-6">
            Log in to view your order history, set up shipping defaults, and manage your wishlist.
          </p>
          <Link
            to="/sign-in"
            className="block w-full py-2.5 bg-black text-white font-bold rounded-xl hover:opacity-90 transition duration-200 mb-3"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="block w-full py-2.5 border border-black text-black font-bold rounded-xl hover:bg-white/10 transition duration-200"
          >
            Register Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[75vh] py-12 text-black max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="border-2 border-black rounded-2xl p-6 bg-[#e9ebed] flex flex-col items-center text-center h-fit">
          <div className="w-20 h-20 bg-[#c8d3d7] border-2 border-black rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl font-extrabold text-black">
              {auth.user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-xl font-bold">{auth.user.name}</h2>
          <span className="text-xs font-bold text-gray-700 uppercase tracking-wider mt-1">
            {auth.user.role === "demo" ? "Admin Merchant" : "Customer Account"}
          </span>

          <div className="w-full border-t border-black/20 mt-6 pt-6 space-y-3 text-left text-sm text-gray-800">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-black/60" />
              <span className="truncate">{auth.user.email}</span>
            </div>
            {auth.user.role === "demo" && (
              <div className="p-3 bg-[#c8d3d7] border border-black/40 text-black rounded-xl text-xs font-semibold">
                You have administrative access to catalog operations and order shipment tracking adjustments.
              </div>
            )}
          </div>

          <button
            onClick={handleSignOut}
            className="w-full mt-6 flex items-center justify-center gap-2 py-2.5 border border-red-650 text-red-650 hover:bg-red-50 font-bold rounded-xl transition duration-200 cursor-pointer"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>

        {/* User Information Details / Order Quick Metrics */}
        <div className="md:col-span-2 space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/orders"
              className="border-2 border-black rounded-2xl p-5 bg-[#e9ebed] hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between items-center text-black">
                <span className="text-sm font-bold">Total Orders</span>
                <FaShoppingBag />
              </div>
              <p className="text-3xl font-black mt-2 text-black">{userOrders.length}</p>
            </Link>

            <Link
              to="/wishlist"
              className="border-2 border-black rounded-2xl p-5 bg-[#e9ebed] hover:shadow-md transition duration-200"
            >
              <div className="flex justify-between items-center text-black">
                <span className="text-sm font-bold">Wishlist Items</span>
                <FaHeart />
              </div>
              <p className="text-3xl font-black mt-2 text-black">{wishlistIds.length}</p>
            </Link>
          </div>

          {/* Shipping Addresses Defaults Card */}
          <div className="border-2 border-black rounded-2xl p-6 bg-[#e9ebed]">
            <div className="flex justify-between items-center pb-4 border-b border-black/20 mb-6">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <FaMapMarkerAlt />
                <span>Default Shipping Profile</span>
              </h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1.5 text-xs font-bold hover:opacity-75 transition duration-200 cursor-pointer"
                >
                  <FaEdit /> Edit
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Street Address</label>
                  <input
                    type="text"
                    {...register("address", { required: "Address is required" })}
                    className="w-full p-2.5 border-2 border-black rounded-xl outline-none focus:border-black text-sm bg-white text-black font-semibold"
                  />
                  {errors.address && <p className="text-red-650 text-xs mt-1 font-bold">{errors.address.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase tracking-wider">City</label>
                    <input
                      type="text"
                      {...register("city", { required: "City is required" })}
                      className="w-full p-2.5 border-2 border-black rounded-xl outline-none focus:border-black text-sm bg-white text-black font-semibold"
                    />
                    {errors.city && <p className="text-red-650 text-xs mt-1 font-bold">{errors.city.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Postal Code</label>
                    <input
                      type="text"
                      {...register("postalCode", { required: "Postal code is required" })}
                      className="w-full p-2.5 border-2 border-black rounded-xl outline-none focus:border-black text-sm bg-white text-black font-semibold"
                    />
                    {errors.postalCode && <p className="text-red-650 text-xs mt-1 font-bold">{errors.postalCode.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Contact Phone</label>
                  <input
                    type="text"
                    {...register("phone", { required: "Phone is required" })}
                    className="w-full p-2.5 border-2 border-black rounded-xl outline-none focus:border-black text-sm bg-white text-black font-semibold"
                  />
                  {errors.phone && <p className="text-red-650 text-xs mt-1 font-bold">{errors.phone.message}</p>}
                </div>

                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-black text-black text-xs font-bold rounded-lg hover:bg-white/10 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white text-xs font-bold rounded-lg hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
                  >
                    <FaCheck /> Save Address
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-sm text-gray-800">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-black/55 mt-1" />
                  <div>
                    <p className="font-bold">Street Address</p>
                    <p className="mt-0.5">{savedDetails.address}</p>
                    <p>{savedDetails.city}, {savedDetails.postalCode}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <FaPhoneAlt className="text-black/55 mt-1" />
                  <div>
                    <p className="font-bold">Phone Connection</p>
                    <p className="mt-0.5">{savedDetails.phone}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
