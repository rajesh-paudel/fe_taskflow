import { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/logo.png";
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Account created!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="  flex flex-col items-center justify-center mb-8">
          <img src={logo} className="w-60 h-auto" alt="taskflow logo"></img>
          <p className="text-gray-500 mt-2">Create your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg">
            <FaUser className="text-gray-500" />
            <input
              type="text"
              placeholder="Full name"
              className="bg-transparent outline-none ml-3 w-full"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[var(--text-secondary)] font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
