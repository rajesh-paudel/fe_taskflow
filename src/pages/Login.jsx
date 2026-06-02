import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/logo.png";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="  flex flex-col items-center justify-center mb-8">
          <img src={logo} className="w-60 h-auto" alt="taskflow logo"></img>

          <p className="text-gray-500 ">Welcome back</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg">
            <FaEnvelope className="text-gray-500" />
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent outline-none ml-3 w-full"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg">
            <FaLock className="text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none ml-3 w-full"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button className="w-full bg-[var(--primary)] text-[var(--primary-text)] py-3 rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors duration-200 ease-in-out cursor-pointer">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?
          <a
            href="/register"
            className="text-[var(--text-secondary)] font-medium"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
