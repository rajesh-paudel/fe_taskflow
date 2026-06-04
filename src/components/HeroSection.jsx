import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import heroImage from "../assets/hero.png"; // 🖼️ Direct relative import of your asset
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-neutral-50/50 to-white overflow-hidden">
      {/* Background radial ambient glow layers */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#5A24CA]/10 opacity-40 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-80px] w-[500px] h-[500px] bg-purple-200/40 opacity-30 blur-3xl rounded-full" />

      <div className="relative max-w-6xl w-full px-6 py-12 grid md:grid-cols-2 gap-12 items-center z-10">
        {/* 📋 LEFT CONTENT COLUMN */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Minimal Brand Status Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/60 text-xs font-bold text-neutral-600 mb-6 tracking-tight">
            ⚡ Built for productivity & focus
          </div>

          {/* Crisp Elegant Typography Header */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-neutral-950 leading-tight tracking-tight">
            Organize your tasks.
            <br />
            <span className="text-[#5A24CA]">Think less. Do more.</span>
          </h1>

          {/* Core App Context Subtext */}
          <p className="mt-6 text-sm sm:text-base text-neutral-500 max-w-md font-medium leading-relaxed">
            TaskFlow helps you manage tasks, projects, and goals in one clean
            workspace designed for speed, structure, and absolute clarity.
          </p>

          {/* Interactive Core Brand Navigation CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-[#5A24CA] text-white font-bold text-xs tracking-wide flex items-center justify-center gap-2 hover:bg-[#4A1CA5] transition-all shadow-3xs hover:shadow-md cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight size={14} />
            </Link>

            <button className="px-6 py-3 rounded-xl border border-neutral-200 bg-white text-neutral-700 font-bold text-xs tracking-wide flex items-center justify-center gap-2 hover:bg-neutral-50 hover:border-neutral-300 transition-all cursor-pointer">
              <PlayCircle size={14} className="text-neutral-400" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Under-button conversion trust markers */}
          <p className="mt-4 text-[11px] font-medium text-neutral-400">
            No credit card required • Free forever workspace plan available
          </p>
        </motion.div>

        {/* 🖼️ RIGHT CONTENT COLUMN: CLEAN IMAGE WRAPPER TRANSFORMATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative "
        >
          {/* High-Fidelity UI Browser Card Wrapper Shell */}
          <div className="rounded-2xl shadow-2xl border border-neutral-200/80 bg-white overflow-hidden group hover:border-neutral-300 transition-all duration-300">
            {/* Minimalist Mac-Style Window Dots Top Header Bar */}
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-neutral-100 bg-neutral-50/80">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 group-hover:bg-rose-400 transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 group-hover:bg-amber-400 transition-colors" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-200 group-hover:bg-emerald-400 transition-colors" />
            </div>

            {/* Content Container Node for hero.png */}
            <div className="bg-neutral-50/40 p-1 flex items-center justify-center">
              <img
                src={heroImage}
                alt="TaskFlow Workspace Interface Preview Roadmap"
                className="w-full h-auto object-cover rounded-xl border border-neutral-200/40 bg-white"
                loading="eager"
              />
            </div>
          </div>

          {/* Floating Micro-Badge Widget with Smooth CSS-Spring Animation */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 bg-white border border-neutral-200 shadow-xl px-4 py-2 rounded-xl text-xs font-bold text-neutral-800 flex items-center gap-1.5 z-20 select-none"
          >
            <span className="text-[#5A24CA]">📌</span>
            <span>12 tasks today</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
