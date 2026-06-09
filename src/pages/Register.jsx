import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import { api } from "../../services/api";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsRegistering(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err);
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900 font-sans antialiased relative">
      {/* Subtle architectural backplane grid line framework */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-40 pointer-events-none" />

      {/* Perfectly centered structural core canvas container */}
      <div className="w-full max-w-[420px] px-6 py-12 relative z-10 space-y-8">
        {/* HEADER BLOCK: Centered logo layout exactly matching your original structure */}
        <div className="flex flex-col items-center justify-center text-center">
          <img src={logo} className="w-56 h-auto" alt="taskflow logo" />
          <p className="text-neutral-500 text-sm mt-3 font-medium">
            Create your premium workspace. No credit card required.
          </p>
        </div>

        {/* REGISTRATION FORM CONFIGURATION */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Input block: Full Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-neutral-400 tracking-wider uppercase font-mono">
              Full Name
            </label>
            <div className="flex items-center bg-white border border-neutral-200 focus-within:border-neutral-950 focus-within:ring-1 focus-within:ring-neutral-950 rounded-xl px-3.5 py-3 transition-all duration-200 shadow-3xs">
              <User size={16} className="text-neutral-400 shrink-0" />
              <input
                type="text"
                placeholder="Rajesh Paudel"
                className="bg-transparent outline-hidden ml-3 w-full text-sm placeholder-neutral-300 text-neutral-900 font-medium"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Input block: Email Address */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-neutral-400 tracking-wider uppercase font-mono">
              Email Address
            </label>
            <div className="flex items-center bg-white border border-neutral-200 focus-within:border-neutral-950 focus-within:ring-1 focus-within:ring-neutral-950 rounded-xl px-3.5 py-3 transition-all duration-200 shadow-3xs">
              <Mail size={16} className="text-neutral-400 shrink-0" />
              <input
                type="email"
                placeholder="rajesh@taskflow.com"
                className="bg-transparent outline-hidden ml-3 w-full text-sm placeholder-neutral-300 text-neutral-900 font-medium"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Input block: Password */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-neutral-400 tracking-wider uppercase font-mono">
              Password
            </label>
            <div className="flex items-center bg-white border border-neutral-200 focus-within:border-neutral-950 focus-within:ring-1 focus-within:ring-neutral-950 rounded-xl px-3.5 py-3 transition-all duration-200 shadow-3xs">
              <Lock size={16} className="text-neutral-400 shrink-0" />
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent outline-hidden ml-3 w-full text-sm placeholder-neutral-300 text-neutral-900 font-medium"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit CTA Block Trigger matched to brand color space */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isRegistering}
              className="w-full bg-[#5A24CA] text-white hover:bg-[#4A1CA5] disabled:bg-neutral-100 disabled:text-neutral-400 py-3.5 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-2 shadow-3xs cursor-pointer active:scale-[0.99] disabled:cursor-not-allowed"
            >
              {isRegistering ? "Creating workspace..." : "Create Account"}
              {!isRegistering && <ArrowRight size={13} />}
            </button>
          </div>
        </form>

        {/* LEGAL COMPLIANCE DISCLAIMER */}
        <p className="text-[11px] text-neutral-400 leading-relaxed text-center px-2 font-medium">
          By continuing, you acknowledge that you understand and agree to the{" "}
          <Link
            to="/terms-and-conditions"
            className="text-neutral-600 font-bold hover:underline"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy-policy"
            className="text-neutral-600 font-bold hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </p>

        {/* BOTTOM NAVIGATION TRANSITION FOOTER */}
        <div className="pt-5 border-t border-neutral-100 text-center">
          <p className="text-xs text-neutral-500 font-medium">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[#5A24CA] font-black hover:underline bg-transparent border-none cursor-pointer inline-block ml-1 font-mono uppercase tracking-tight text-xs"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
