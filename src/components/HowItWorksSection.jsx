import React from "react";
import { motion } from "framer-motion";
import { Plus, FolderKanban, Target, Sparkles, ArrowDown } from "lucide-react";

const steps = [
  {
    stepNumber: "01",
    icon: Plus,
    title: "Create Tasks Instantly",
    desc: "Capture anything in seconds before you lose the thread. Use rapid shortcut keys to populate your scratchpad effortlessly.",
    badge: "Capture Layer",
    borderColor: "group-hover:border-blue-500/40",
    iconColor: "text-blue-600 bg-blue-50/60 border-blue-100",
  },
  {
    stepNumber: "02",
    icon: FolderKanban,
    title: "Organize into Projects",
    desc: "Group disparate objectives into structured, meaningful epics. Drag, drop, nesting, and contextual relationship mappings built natively.",
    badge: "Structural Core",
    borderColor: "group-hover:border-purple-500/40",
    iconColor: "text-purple-600 bg-purple-50/60 border-purple-100",
  },
  {
    stepNumber: "03",
    icon: Target,
    title: "Track & Complete",
    desc: "Isolate high-impact targets, remove background static, and watch operational data scale across your workspace in real time.",
    badge: "Velocity Engine",
    borderColor: "group-hover:border-emerald-500/40",
    iconColor: "text-emerald-600 bg-emerald-50/60 border-emerald-100",
  },
];

// Motion container animation variants for beautiful orchestration
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 15 },
  },
};

export default function HowItWorks() {
  return (
    <section className="relative py-32 bg-white text-gray-900 overflow-hidden font-sans antialiased selection:bg-purple-100">
      {/* Decorative Structural Accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent" />
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-purple-50/40 to-transparent blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-50 border border-neutral-200/60 text-xs font-semibold text-neutral-600 tracking-wide">
            <Sparkles size={11} className="text-purple-500 animate-pulse" />{" "}
            Architecture in Motion
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-950 leading-[1.12]">
            From idea to completion in 3 simple steps
          </h2>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            TaskFlow strips away tracking overhead, organizing your creative and
            analytical pipeline automatically.
          </p>
        </div>

        {/* TIMELINE FRAMEWORK ROW */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connecting architectural tracking track (Hidden on mobile screens) */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-[1px] bg-linear-to-r from-gray-100 via-gray-200 to-gray-100 hidden lg:block pointer-events-none" />

          {steps.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group flex flex-col justify-between p-8 rounded-2xl border border-gray-100 bg-linear-to-b from-white to-gray-50/20 hover:bg-white hover:shadow-xl hover:shadow-neutral-200/30 transition-all duration-300"
              >
                {/* Micro-border glow line accent */}
                <div
                  className={`absolute inset-x-0 -top-px h-[2px] bg-transparent rounded-t-2xl transition-colors duration-300 ${index === 0 ? "group-hover:bg-blue-500" : index === 1 ? "group-hover:bg-purple-500" : "group-hover:bg-emerald-500"}`}
                />

                <div className="space-y-6">
                  {/* Top line: Bubble Icon + Large Architectural Digit Indicator */}
                  <div className="flex items-center justify-between relative z-10">
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${step.iconColor}`}
                    >
                      <IconComponent size={18} strokeWidth={2.5} />
                    </div>
                    <span className="text-5xl font-black font-mono select-none tracking-tighter text-gray-100 group-hover:text-gray-200/70 transition-colors duration-300">
                      {step.stepNumber}
                    </span>
                  </div>

                  {/* Text Cluster content mapping blocks */}
                  <div className="space-y-2">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 font-mono">
                      {step.badge}
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight text-gray-950">
                      {step.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Decorative Context Step Connector on Mobile Views */}
                {index < 2 && (
                  <div className="lg:hidden flex justify-center pt-8 text-neutral-200">
                    <ArrowDown size={16} className="animate-bounce" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom micro subtle divider anchor element */}
        <div className="mt-24 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
          <div className="w-12 h-px bg-gray-100" />
          <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
        </div>
      </div>
    </section>
  );
}
