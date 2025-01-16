import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center py-7 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-4 text-center text-gray-900">
          Sign Up
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <NavLink
            to="/signin"
            className="text-blue-500 hover:underline font-medium"
          >
            Sign in
          </NavLink>
        </p>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold text-sm mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your name"
              className="w-full border border-gray-300 placeholder:text-gray-500 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold text-sm mb-1"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 placeholder:text-gray-500 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold text-sm mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email address"
              className="w-full border border-gray-300 placeholder:text-gray-500 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold text-sm mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full border border-gray-300 placeholder:text-gray-500 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 rounde3-l placeholder:text-gray-500g hover:bg-indigo-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
