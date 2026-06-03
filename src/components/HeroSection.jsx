import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-200 opacity-30 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-80px] w-[500px] h-[500px] bg-purple-200 opacity-30 blur-3xl rounded-full" />

      <div className="relative max-w-6xl w-full px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-600 mb-6">
            ⚡ Built for productivity & focus
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Organize your tasks.
            <br />
            <span className="text-primary">Think less. Do more.</span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-lg text-gray-600 max-w-md">
            TaskFlow helps you manage tasks, projects, and goals in one clean
            workspace designed for speed and clarity.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 rounded-xl bg-primary text-primary-text font-medium flex items-center justify-center gap-2 hover:bg-primary-hover transition">
              Get Started Free
              <ArrowRight size={18} />
            </button>

            <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition">
              <PlayCircle size={18} />
              Watch Demo
            </button>
          </div>

          {/* Small trust text */}
          <p className="mt-4 text-sm text-gray-400">
            No credit card required • Free forever plan available
          </p>
        </motion.div>

        {/* RIGHT CONTENT (Mock UI Preview) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="rounded-2xl shadow-2xl border bg-white overflow-hidden">
            {/* Fake Top Bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b bg-gray-50">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>

            {/* Mock content */}
            <div className="p-6 space-y-4">
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>

              <div className="space-y-3">
                <div className="h-12 bg-gray-100 rounded-xl"></div>
                <div className="h-12 bg-gray-100 rounded-xl"></div>
                <div className="h-12 bg-gray-100 rounded-xl"></div>
              </div>

              <div className="flex gap-3 mt-6">
                <div className="h-10 w-24 bg-blue-100 rounded-lg"></div>
                <div className="h-10 w-24 bg-gray-100 rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute -top-6 -right-6 bg-white shadow-lg px-4 py-2 rounded-xl text-sm text-gray-600"
          >
            📌 12 tasks today
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
