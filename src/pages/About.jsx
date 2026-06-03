import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, ShieldCheck, Cpu, Code2 } from "lucide-react";

const values = [
  {
    icon: <Cpu size={20} className="text-neutral-950" />,
    title: "Velocity as a Feature",
    description:
      "We engineering systems to minimize UI friction. Every interaction should respond instantaneously without heavy database execution lag or layout rendering jumps.",
  },
  {
    icon: <Code2 size={20} className="text-neutral-950" />,
    title: "Obsessive Software Craft",
    description:
      "We don't build generic web views. Our elements are written from the ground up with clean typography, intentional negative spaces, and pixel-precise alignment schemas.",
  },
  {
    icon: <ShieldCheck size={20} className="text-neutral-950" />,
    title: "Sovereign Infrastructure",
    description:
      "Security isn't a post-launch add-on. Every pipeline, user access matrix, data persistence bucket, and endpoint validation handshake is guarded with native TLS 1.3 systems.",
  },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans antialiased selection:bg-neutral-100">
      {/* SECTION 1: HERO MANIFESTO HERO LINE */}
      <div className="relative border-b border-neutral-200 py-24 px-6 overflow-hidden bg-neutral-50/30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-neutral-950 transition-colors cursor-pointer group mb-4"
          >
            <ArrowLeft
              size={14}
              className="transform group-hover:-translate-x-0.5 transition-transform"
            />
            Return to app
          </button>

          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-100 text-[10px] font-bold font-mono text-neutral-500 uppercase tracking-wider">
              <Target size={10} className="text-neutral-950" /> Our Mission
              Matrix
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-neutral-950 tracking-tight leading-[1.1]">
              We design tools that amplify human productivity. Natively.
            </h1>
            <p className="text-neutral-500 text-base sm:text-lg max-w-xl leading-relaxed">
              TaskFlow was founded on a simple realization: modern productivity
              software has become slow, complex, and uninspiring. We are
              building the antidote.
            </p>
          </div>
        </div>
      </div>

      {/* CORE FRAMEWORK CANVAS */}
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-24">
        {/* SECTION 2: EDITORIAL 2-COLUMN SPLIT */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Narrative Frame Left */}
          <div className="col-span-1 md:col-span-7 space-y-4 text-neutral-600 leading-relaxed text-sm sm:text-base">
            <h2 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
              The Origin Story
            </h2>
            <h3 className="text-xl font-extrabold text-neutral-950 tracking-tight">
              Eradicating corporate canvas clutter
            </h3>
            <p>
              TaskFlow started as a local experiment to clean up messy developer
              dashboards. We realized teams spent more time filling out
              over-engineered input layers than actually shipping production
              code.
            </p>
            <p>
              By combining high-performance database architectures with a
              minimalist design layer, we stripped away the typical bulky shadow
              cards and sluggish query responses. The result is a
              lightning-fast, cohesive engine that keeps you locked in your flow
              state.
            </p>
          </div>

          {/* Premium Architectural Visual Frame Right */}
          <div className="col-span-1 md:col-span-5 relative group">
            <div className="absolute inset-0 bg-neutral-950/5 rounded-2xl filter blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none" />
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
              alt="Minimalist abstract architecture design geometry"
              className="w-full h-72 md:h-80 object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 border border-neutral-100 shadow-xs"
            />
          </div>
        </section>

        {/* SECTION 3: THE OPERATING PRINCIPLES MATRIX */}
        <section className="space-y-8">
          <div className="space-y-1">
            <h2 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
              Core Architecture
            </h2>
            <p className="text-sm text-neutral-500">
              The engineering values injected into every single line of code we
              write.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="bg-white border border-neutral-100 rounded-xl p-6 space-y-4 hover:border-neutral-950 transition-colors duration-200 shadow-3xs"
              >
                <div className="p-2.5 bg-neutral-50 rounded-lg w-fit">
                  {value.icon}
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold tracking-tight text-neutral-950">
                    {value.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: MINIMAL TEAM FOOTPRINT BANNER */}
        <section className="border-t border-neutral-200 pt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="col-span-1 md:col-span-4 relative">
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
              alt="Core developer building infrastructure"
              className="w-full h-48 object-cover rounded-xl grayscale border border-neutral-100 shadow-3xs"
            />
          </div>
          <div className="col-span-1 md:col-span-8 space-y-3">
            <h4 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">
              The Engineering Core
            </h4>
            <h3 className="text-lg font-black text-neutral-950 tracking-tight">
              Built globally, designed with intent
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              TaskFlow is forged by independent developers and designers who
              value software aesthetics. We run as an autonomous, remote-first
              crew focused purely on optimizing computing interfaces. No bloated
              overhead, no unnecessary distractions—just pure focus.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
