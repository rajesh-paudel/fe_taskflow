import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const stats = [
  {
    label: "Tasks completed flawlessly",
    value: "10M+",
    subtext:
      "Powering operational velocity across modern distributed workspaces.",
  },
  {
    label: "Active global builders",
    value: "150k+",
    subtext:
      "Engineering teams, designers, and systems architects working in sync.",
  },
  {
    label: "Productivity multiplier",
    value: "2.5x",
    subtext: "Calculated average improvement in feature delivery cycle times.",
  },
];

export default function Stats() {
  return (
    <section className="relative py-32 bg-white text-gray-900 border-t border-gray-100 overflow-hidden">
      {/* Premium Minimalist Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70 pointer-events-none" />

      {/* Soft color glow to pull continuity down from previous sections */}
      <div className="absolute bottom-[-100px] left-1/3 w-[500px] h-[350px] bg-blue-50/50 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* LEFT BLOCK: Context & High-intent CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-200/60 text-xs font-semibold text-gray-600 tracking-wide">
            <Sparkles size={12} className="text-gray-400" /> Scale with Momentum
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 leading-[1.15]">
            Built for velocity. Trusted for precision.
          </h2>

          <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-md">
            We measure our success by the absolute friction frictioned out of
            your workday. Switch from chaotic tracking matrices to clean visual
            momentum.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <button className="px-5 py-2.5 text-sm font-semibold text-white bg-black hover:bg-neutral-800 active:scale-[0.99] rounded-lg transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer">
              Start your space free
              <ArrowRight size={15} />
            </button>
            <button className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 hover:border-gray-300 rounded-lg transition-all flex items-center justify-center cursor-pointer">
              Talk to enterprise
            </button>
          </div>
        </div>

        {/* RIGHT BLOCK: High-Fidelity Geometric Metric Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 w-full">
          {stats.map((s, i) => (
            <div
              key={i}
              className="relative p-8 rounded-2xl border border-gray-200/60 bg-gradient-to-r from-white to-gray-50/30 shadow-3xs flex flex-col lg:flex-row lg:items-center justify-between gap-6 group hover:border-gray-300 transition-all duration-300"
            >
              {/* Subtle card-specific left border line for anchor focus */}
              <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-transparent group-hover:bg-blue-500 rounded-r transition-all duration-300" />

              <div className="space-y-1 max-w-sm order-2 lg:order-1">
                <p className="text-base font-bold text-gray-950 tracking-tight">
                  {s.label}
                </p>
                <p className="text-xs md:text-sm text-gray-400 font-normal leading-relaxed">
                  {s.subtext}
                </p>
              </div>

              <p className="text-4xl md:text-5xl font-black tracking-tight text-gray-950 order-1 lg:order-2 bg-gradient-to-br from-gray-950 to-gray-600 bg-clip-text text-transparent">
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
