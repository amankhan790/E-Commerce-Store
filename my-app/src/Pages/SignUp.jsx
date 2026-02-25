import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
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
        <h2 className="text-2xl font-semibold text-black mb-4">
          Create an account
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Join us — create your account to start shopping.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full px-4 py-2 bg-[#c8d3d7] border border-gray-200 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              {...register("username", {
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 32, message: "Max length is 32" },
                required: { value: true, message: "Username required" },
              })}
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
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
                required: { value: true, message: "Username required" },
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
                minLength: { value: 6, message: "Min length is 6" },
                maxLength: { value: 8, message: "Max length is 8" },
                required: { value: true, message: "Password required" },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm
            </label>
            <input
              id="confrimPassword"
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 border border-gray-200 rounded-md bg-[#c8d3d7] text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white font-medium py-2 rounded-md transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Sign up"}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/sign-in" className="text-black hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
