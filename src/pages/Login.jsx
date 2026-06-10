import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
export default function Login() {
  const { login, isLoggingIn, loginError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields.");
    }

    try {
      const userPayload = await login({ email, password });

      if (userPayload) {
        navigate("/");
      }
    } catch (err) {
      console.error("Login submission failed:", err);

      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Invalid email or password.";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900 font-sans antialiased relative">
      {/* Matching structural backplane grid line framework */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-40 pointer-events-none" />

      {/* Perfectly centered structural core canvas container */}
      <div className="w-full max-w-[420px] px-6 py-12 relative z-10 space-y-8">
        {/* HEADER BLOCK: Centered logo layout exactly matching your brand format */}
        <div className="flex flex-col items-center justify-center text-center">
          <img src={logo} className="w-56 h-auto" alt="taskflow logo" />
          <p className="text-neutral-500 text-sm mt-3">
            Welcome back. Log in to access your workspace.
          </p>
        </div>

        {/* AUTHENTICATION FORM CONFIGURATION */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Input block: Email Address */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-700 tracking-wide uppercase">
                Email Address
              </label>
            </div>
            <div className="flex items-center bg-white border border-neutral-200 focus-within:border-neutral-950 focus-within:ring-1 focus-within:ring-neutral-950 rounded-xl px-3.5 py-3 transition-all duration-200 shadow-3xs">
              <Mail size={16} className="text-neutral-400 shrink-0" />
              <input
                type="email"
                placeholder="rajesh@taskflow.com"
                className="bg-transparent outline-none ml-3 w-full text-base placeholder-neutral-300 text-neutral-900"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Input block: Password */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-700 tracking-wide uppercase">
                Password
              </label>
            </div>
            <div className="flex items-center bg-white border border-neutral-200 focus-within:border-neutral-950 focus-within:ring-1 focus-within:ring-neutral-950 rounded-xl px-3.5 py-3 transition-all duration-200 shadow-3xs">
              <Lock size={16} className="text-neutral-400 shrink-0" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent outline-none ml-3 w-full text-base placeholder-neutral-300 text-neutral-900"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit CTA Block Trigger */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-primary text-primary-text hover:bg-primary-hover disabled:bg-neutral-400 py-3.5 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-[0.99]"
            >
              {isLoggingIn ? "Authenticating..." : "Sign In"}
              {!isLoggingIn && <ArrowRight size={15} />}
            </button>
          </div>
        </form>

        {/* LEGAL COMPLIANCE DISCLAIMER */}
        <p className="text-xs text-neutral-400 leading-relaxed text-center px-2">
          By continuing, you acknowledge that you understand and agree to the{" "}
          <Link
            to="/terms-and-conditions"
            className="text-neutral-600 font-medium hover:underline"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy-policy"
            className="text-neutral-600 font-medium hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* BOTTOM NAVIGATION TRANSITION FOOTER */}
        <div className="pt-5 border-t border-neutral-100 text-center">
          <p className="text-sm text-neutral-500">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 font-bold hover:underline bg-transparent border-none cursor-pointer inline-block ml-1"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
