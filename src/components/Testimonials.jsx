import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Trophy,
  Briefcase,
  Star,
  Award,
} from "lucide-react";
import oliver from "../assets/oliver.png";
const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Product Designer",
    quote:
      "Streamlined my daily workflows to reduce timeline friction by almost 3x. An absolute game-changer for solo creators.",
  },
  {
    id: 2,
    name: "Alex Rivera",
    role: "Full Stack Developer",
    quote:
      "Task systems get created in three minutes between meetings, then hours of manual operational work disappear.",
  },
  {
    id: 3,
    name: "Marcus Chen",
    role: "Digital Strategist",
    quote:
      "This platform understands that you can solve a lot of complex organizational problems with just one beautifully simple tool.",
  },
  {
    id: 4,
    name: "Elena Rostova",
    role: "Content Operations",
    quote:
      "It has been the most powerful and impactful way to centralize our creative pipeline and keep ideas moving forward.",
  },
  {
    id: 5,
    name: "David Kim",
    role: "Software Engineer",
    quote:
      "Using these minimalist tools is an important competitive advantage for keeping my personal projects organized.",
  },
  {
    id: 6,
    name: "Emma Watson",
    role: "Creative Director",
    quote:
      "One central hub for creative thinking keeps everyone aligned, informed, and the design work flowing beautifully.",
  },
];

const achievements = [
  { icon: Globe, text: "Over 100M personal portfolios hosted" },
  { icon: Trophy, text: "#1 product management tool 3 years running" },
  { icon: Briefcase, text: "#1 minimalist workspace setup" },
  { icon: Star, text: "#1 rated user interface design" },
  { icon: Award, text: "Trusted by 62% of independent creators" },
];

export default function Testimonials() {
  const featured = {
    name: "Oliver Bennett",
    role: "Independent Tech Consultant",
    quote:
      "There's power in a single platform where you can do all your thinking, planning, and execution. This is that single place.",
    avatar: oliver,
  };

  return (
    <section className="bg-[#f9f9f9] text-[#111111] py-16 px-4 md:px-8 font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10 text-left">
          Trusted by people who build
        </h2>

        {/* Grid Layout (Matches image layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {/* Top Featured Long Card (Spans 3 columns) */}
          <div className="md:col-span-3 bg-white rounded-2xl p-8 md:p-10 border border-neutral-200/60 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="max-w-xl">
              <div className="flex flex-col mb-4">
                <span className="font-bold text-lg text-neutral-900">
                  {featured.name}
                </span>
                <span className="text-xs text-neutral-500">
                  {featured.role}
                </span>
              </div>
              <p className="text-2xl md:text-3xl font-serif text-neutral-800 tracking-tight leading-snug mb-6">
                "{featured.quote}"
              </p>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
                Read the full story <ArrowRight size={14} />
              </button>
            </div>

            {/* Person Image Profile Card */}
            <div className="w-full md:w-[340px] h-[220px] rounded-xl overflow-hidden border border-neutral-200 flex-shrink-0">
              <img
                src={featured.avatar}
                alt={featured.name}
                className="w-full h-full object-cover grayscale-[20%] contrast-[105%]"
              />
            </div>
          </div>

          {/* Standard Testimonial Cards */}
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-neutral-200/60 shadow-xs flex flex-col justify-between group hover:border-neutral-300 transition-all duration-200 cursor-pointer"
            >
              <div>
                <div className="flex flex-col mb-4">
                  <span className="font-bold text-sm text-neutral-800">
                    {item.name}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium tracking-wide uppercase">
                    {item.role}
                  </span>
                </div>
                <p className="text-[14px] leading-relaxed text-neutral-600">
                  "{item.quote}"
                </p>
              </div>
              <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowRight size={14} className="text-neutral-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Continuous Right-to-Left Infinite Marquee via Framer Motion */}
        <div className="relative w-full border-t border-neutral-200 pt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <motion.div
            className="flex gap-16 pr-16 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {/* Render items twice to build a seamless continuous loop stitch */}
            {[...achievements, ...achievements].map((achieve, index) => {
              const IconComponent = achieve.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2.5 text-xs md:text-sm text-neutral-400 font-medium whitespace-nowrap"
                >
                  <IconComponent
                    size={15}
                    className="text-neutral-400/80 flex-shrink-0"
                  />
                  <span>{achieve.text}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
