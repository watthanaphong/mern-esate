import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <main className="flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#2E271F] border border-[#3A3127] rounded-2xl p-10 shadow-xl">
        {/* Title */}
        <h1 className="text-3xl font-light tracking-widest text-center mb-2">
          Member Access
        </h1>
        <p className="text-sm text-center text-[#B8A895] mb-10">
          Sign in to explore exclusive listings
        </p>

        {/* Form */}
        <form className="flex flex-col gap-6">
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="bg-[#241E18] text-[#EFE4D3] placeholder:text-[#9E8F7C] px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
          />

          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-[#241E18] text-[#EFE4D3] placeholder:text-[#9E8F7C] px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
          />

          {/* Button */}
          <button
            type="submit"
            className="mt-4 bg-[#C6A15B] text-[#1E1713] py-3 rounded-lg tracking-widest uppercase text-sm hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-[#B8A895] mt-8">
          Not a member yet?{" "}
          <Link to="/sign-up" className="text-[#C6A15B] hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </main>
  );
};

export default SignIn;
