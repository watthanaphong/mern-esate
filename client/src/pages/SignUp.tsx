import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
};

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id as keyof SignUpFormData]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Sign up failed");
        setLoading(false);
        return;
      }
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (err) {
      setLoading(false);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <main className="flex items-center justify-center px-2">
      <div className="w-full max-w-md bg-[#2E271F] border border-[#3A3127] rounded-2xl p-10 shadow-xl">
        {/* Title */}
        <h1 className="text-3xl font-light tracking-widest text-center mb-2">
          Create Account
        </h1>
        <p className="text-sm text-center text-[#B8A895] mb-10">
          Access exclusive luxury residences
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <fieldset disabled={loading} className="flex flex-col gap-6">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Username"
              id="username"
              className="bg-[#241E18] text-[#EFE4D3] placeholder:text-[#9E8F7C] px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C6A15B]"
              required
            />

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
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </fieldset>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-[#B8A895] mt-8">
          Already a member?{" "}
          <Link to="/sign-in" className="text-[#C6A15B] hover:underline">
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </main>
  );
};

export default SignUp;
