import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), d * 1000);
    });
  };

  const onSubmit = async (data) => {
    await delay(2); // simulate network delay
    console.log(data);
    reset();
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-[#c8d3d7] backdrop-blur-lg shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-black mb-4">Welcome Back</h2>
        <p className="text-sm text-gray-600 mb-6">SignIn to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="you@gmail.com"
              className="w-full px-4 py-2 bg-[#c8d3d7] border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              {...register("email", {
                required: { value: true, message: "email required" },
                validate: (value) => {
                  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return "Enter a valid email address";
                  }
                  if (value.length < 10) {
                    return "Email looks too short";
                  }
                  return true;
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-[#c8d3d7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              {...register("password", {
                required: { value: true, message: "Password required" },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-2 inline-flex cursor-pointer items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-medium py-2 rounded-md transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          Don't have a account ?{" "}
          <Link to={"/sign-up"} className="text-black hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
