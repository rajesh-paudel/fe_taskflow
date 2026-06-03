import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import {
  Zap,
  FolderKanban,
  Target,
  BarChart3,
  Clock,
  Search,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast Task Creation",
    desc: "Lightning-fast input mechanisms designed to catch ideas the second they strike. Zero friction, pure velocity.",
    className:
      "md:col-span-2 bg-gradient-to-br from-white via-white to-blue-50/30",
    featured: true,
    accent: "text-blue-600 bg-blue-50 border-blue-100",
  },
  {
    icon: FolderKanban,
    title: "Organized Projects",
    desc: "Dynamic workspaces that group your sub-tasks into strict visual pipelines.",
    className: "bg-white",
    accent: "text-purple-600 bg-purple-50 border-purple-100",
  },
  {
    icon: Target,
    title: "Deep Focus Mode",
    desc: "Instantly hide secondary notifications and prioritize a singular, actionable task view.",
    className: "bg-white",
    accent: "text-amber-600 bg-amber-50 border-amber-100",
  },
  {
    icon: BarChart3,
    title: "Productivity Insights",
    desc: "Contextual feedback loops analyze your completion velocity. Identify bottlenecks and balance cognitive loads automatically.",
    className:
      "md:col-span-2 bg-gradient-to-bl from-white via-white to-purple-50/30",
    featured: true,
    accent: "text-indigo-600 bg-indigo-50 border-indigo-100",
  },
  {
    icon: Clock,
    title: "Smart Reminders",
    desc: "Intelligent deadlines that adapt natively based on your operational work cycles.",
    className: "bg-white",
    accent: "text-emerald-600 bg-emerald-50 border-emerald-100",
  },
  {
    icon: Search,
    title: "Instant Search",
    desc: "Locate nested comments, code parameters, or attachments within a fraction of a second.",
    className: "bg-white",
    accent: "text-rose-600 bg-rose-50 border-rose-100",
  },
];

const tickerHighlights = [
  "⚡ Real-time cloud sync active",
  "🛡️ Enterprise-grade data protection",
  "✨ Keyboard-shortcut optimization native",
  "🚀 100% Offline-first core support",
  "👥 Built for modern high-velocity engineering teams",
];

function FeatureCard({ item, index }) {
  const Icon = item.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Generates a soft reactive light reflection matching the card's accent color
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay: index * 0.04,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-2xl border border-gray-200/70 p-8 overflow-hidden transition-all duration-300 hover:border-gray-300 hover:shadow-xs cursor-pointer ${item.className}`}
    >
      {/* Light Mode Spotlight Glow */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.06),
              transparent 80%
            )
          `,
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          {/* Dynamic App Icon wrapper */}
          <div
            className={`inline-flex w-11 h-11 rounded-xl border items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-2xs ${item.accent}`}
          >
            <Icon size={18} strokeWidth={2} />
          </div>

          {/* Card Title */}
          <h3
            className={`mt-5 font-bold tracking-tight text-gray-950 ${item.featured ? "text-xl md:text-2xl" : "text-lg"}`}
          >
            {item.title}
          </h3>

          {/* Card Body */}
          <p
            className={`mt-2 text-gray-500 font-normal leading-relaxed ${item.featured ? "text-sm md:text-base max-w-lg" : "text-sm"}`}
          >
            {item.desc}
          </p>
        </div>

        {/* Small interaction cue */}
        <div className="mt-8 flex items-center gap-1.5 text-xs font-semibold text-gray-400 group-hover:text-gray-900 transition-colors duration-200">
          <span>Learn workflow</span>
          <ArrowRight
            size={12}
            className="transform group-hover:translate-x-0.5 transition-transform"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function KeyBenefits() {
  return (
    <section className="relative py-28 bg-white text-gray-900 overflow-hidden border-t border-gray-100">
      {/* Subtle atmospheric ambient blur matching the Hero styling */}
      <div className="absolute top-[-50px] right-1/4 w-[500px] h-[400px] bg-blue-100/40 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-12 left-1/4 w-[400px] h-[400px] bg-purple-100/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Layout Headers */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-700 tracking-wide mb-4">
            <Sparkles size={12} /> Key Features
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 leading-[1.15]">
            Engineered for elite personal execution.
          </h2>

          <p className="mt-4 text-gray-500 text-lg max-w-xl leading-relaxed">
            We stripped out the management bloating. TaskFlow structures your
            daily momentum inside an asymmetric workspace designed around focus.
          </p>
        </div>

        {/* Bento Grid Inspired by layout image_032c3f.jpg */}
        <div className="mt-16 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => (
            <FeatureCard key={index} item={item} index={index} />
          ))}
        </div>

        {/* Continuous Right-to-Left Infinite Ticker as the final layout element */}
        <div className="relative w-full border-t border-gray-200/60 pt-10 mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
          <motion.div
            className="flex gap-16 pr-16 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 22,
              repeat: Infinity,
            }}
          >
            {/* Array stitch to sustain illusion loop seamlessness */}
            {[...tickerHighlights, ...tickerHighlights].map((text, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-xs md:text-sm text-gray-400 font-semibold tracking-wide whitespace-nowrap"
              >
                <CheckCircle2
                  size={14}
                  className="text-gray-300 flex-shrink-0"
                />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
