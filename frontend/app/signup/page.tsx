"use client";
import { signup } from "@/app/api/auth/request";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    try {
      const data = await signup(fullname, email, password);
      if (data?.message || data?.error) {
        setErrorMessage(data?.message || data?.error);
      } else {
        toast.success(`Welcome ${data.user.fullname}`);
        setFullname("");
        setEmail("");
        setPassword("");
        router.push("/");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (errorMessage) {
      const t = setTimeout(() => setErrorMessage(""), 5000);
      return () => clearTimeout(t);
    }
  }, [errorMessage]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-slate-900 rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center px-10 bg-linear-to-br from-[#E0234E]/90 to-[#ff194f] text-white">
          <h2 className="text-3xl font-bold mb-4">Join CodeHive</h2>

          <p className="text-white/90 leading-relaxed">
            Sign up now to join our community of web developers and tech
            enthusiasts. Learn, build, and grow together.
          </p>

          <button
            onClick={() => router.push("/login")}
            className="bg-white text-[#E0234E] py-3 px-5 rounded-md mt-3 font-bold border-2 border-white transition-all duration-300 hover:bg-transparent hover:text-white"
          >
            Login
          </button>
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-10">
          <h1 className="text-2xl font-bold text-white mb-2">
            Create your account
          </h1>

          <p className="text-gray-400 mb-6">
            Start your journey with us today 🚀
          </p>
          <p className="text-xs text-yellow-400 my-2 w-[90%] text-center">
            ⚠️ Make sure to remember your password. Account recovery is not
            available.
          </p>

          {errorMessage && (
            <div className="mb-4 bg-red-900/40 border border-red-700 text-red-400 px-4 py-3 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fullname */}
            <div>
              <label className="text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-[#E0234E] transition"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-400">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-[#E0234E] transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-800 text-white outline-none border border-gray-700 focus:border-[#E0234E] transition"
                placeholder="••••••••"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E0234E] hover:bg-[#ff194f] text-white font-semibold py-3 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-400 mt-6 text-center">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-[#E0234E] hover:underline cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
