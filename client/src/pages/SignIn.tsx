import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

type SignInFormData = {
  email: string;
  password: string;
};
const SignIn = () => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });
  const { loading, error } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signInFailure(data.message || "Sign in failed"));
        return;
      }
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error: any) {
      dispatch(signInFailure(error.message));
    }
  };
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
        <form onSubmit={handleSubmit}>
          <fieldset disabled={loading} className="flex flex-col gap-6">
            <input
              onChange={handleChange}
              type="email"
              placeholder="Email"
              id="email"
              className="bg-[#241E18] text-[#EFE4D3] placeholder:text-[#9E8F7C] px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
              required
            />

            <input
              onChange={handleChange}
              type="password"
              placeholder="Password"
              id="password"
              className="bg-[#241E18] text-[#EFE4D3] placeholder:text-[#9E8F7C] px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
              required
            />

            <button
              type="submit"
              className="mt-4 bg-[#C6A15B] text-[#1E1713] py-3 rounded-lg tracking-widest uppercase text-sm hover:opacity-90 transition"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <div className="flex items-center gap-4 my-1">
              <div className="flex-1 h-px bg-[#3A3127]" />
              <span className="text-xs text-[#B8A895] uppercase tracking-widest">
                or
              </span>
              <div className="flex-1 h-px bg-[#3A3127]" />
            </div>

            <OAuth />
          </fieldset>
        </form>

        {error && (
          <p className="text-center text-sm text-red-400 mt-4">{error}</p>
        )}

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
