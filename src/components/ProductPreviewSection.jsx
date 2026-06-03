import React from "react";
import { motion } from "framer-motion";
import {
  Layers,
  LayoutGrid,
  Calendar,
  CheckCircle2,
  GripVertical,
  Plus,
  TrendingUp,
  User2,
  Folder,
  ArrowRight,
} from "lucide-react";

const previewData = [
  {
    title: "Task Board",
    badge: "Kanban",
    description:
      "Visualize bottlenecks instantly. Drag cards across intuitive staging tracks designed to measure real-time operational cycle velocity.",
    icon: Layers,
    accentClass: "group-hover:border-blue-500/30",
  },
  {
    title: "Project View",
    badge: "List Architecture",
    description:
      "Manage complex hierarchies gracefully. Consolidate isolated actions into nested operational branches with real-time status weights.",
    icon: LayoutGrid,
    accentClass: "group-hover:border-purple-500/30",
  },
  {
    title: "Calendar View",
    badge: "Schedule Stream",
    description:
      "Map milestones without calendar friction. Leverage fluid click-and-drag interactions to reschedule tasks or orchestrate launches smoothly.",
    icon: Calendar,
    accentClass: "group-hover:border-emerald-500/30",
  },
];

export default function ProductPreview() {
  return (
    <section className="relative py-32 bg-neutral-50 text-neutral-900 border-y border-neutral-200/60 overflow-hidden font-sans antialiased selection:bg-neutral-900 selection:text-white">
      {/* Subtle Architectural Backplane Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* HEADER BLOCK */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="text-center max-w-2xl mx-auto space-y-4 mb-20"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 text-[11px] font-bold text-neutral-600 uppercase tracking-widest shadow-xs">
            Core Interface Engine
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-neutral-950 tracking-tight leading-[1.12]">
            Everything you need, in one clean workspace
          </h2>
          <p className="text-neutral-500 text-lg leading-relaxed">
            A meticulously calibrated environment engineered to minimize
            tracking overhead and prioritize pure focus.
          </p>
        </motion.div>

        {/* HIGH-FIDELITY INTERACTIVE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewData.map((item, i) => {
            const IconComponent = item.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 15,
                  delay: i * 0.1,
                }}
                whileHover={{ y: -6 }}
                className={`group rounded-2xl border border-neutral-200 bg-white shadow-xs overflow-hidden flex flex-col justify-between transition-all duration-300 ${item.accentClass}`}
              >
                {/* HIGH-FIDELITY LIVE CODE MOCKUP FRAMES */}
                <div className="h-56 bg-neutral-950 border-b border-neutral-900 p-4 relative flex flex-col overflow-hidden select-none">
                  {/* Subtle top border line to anchor screen chrome */}
                  <div className="flex items-center justify-between border-b border-neutral-900 pb-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <IconComponent size={12} className="text-neutral-500" />
                      <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400">
                        {item.badge}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                    </div>
                  </div>

                  {/* Render Contextual Component Graphics Natively */}
                  <div className="flex-1 relative flex flex-col justify-center">
                    {/* CARD 1: KANBAN TASK BOARD */}
                    {i === 0 && (
                      <div className="grid grid-cols-2 gap-3 w-full font-sans text-[10px]">
                        <div className="space-y-1.5">
                          <span className="text-neutral-500 text-[9px] uppercase font-bold tracking-wider block mb-1">
                            Todo
                          </span>
                          <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-lg flex items-start gap-1.5 opacity-60">
                            <GripVertical
                              size={10}
                              className="text-neutral-700 mt-0.5"
                            />
                            <span className="text-neutral-300 font-medium truncate">
                              TF-41 Stripe Sync
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-blue-400 text-[9px] uppercase font-bold tracking-wider block mb-1">
                            Active Progress
                          </span>
                          <div className="p-2 bg-neutral-900 border border-blue-500/40 rounded-lg flex items-start gap-1.5 shadow-[0_0_12px_rgba(59,130,246,0.08)] transform rotate-1 scale-[1.02]">
                            <GripVertical
                              size={10}
                              className="text-blue-500 mt-0.5"
                            />
                            <div className="overflow-hidden">
                              <span className="text-neutral-100 font-medium block truncate">
                                TF-90 Refactor Engine
                              </span>
                              <span className="text-[8px] text-blue-400 font-mono font-bold uppercase tracking-tight mt-0.5 block">
                                High Priority
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CARD 2: STRUCTURAL PROJECT VIEW */}
                    {i === 1 && (
                      <div className="w-full space-y-2 text-[10px]">
                        <div className="p-2 bg-neutral-900/60 border border-neutral-800 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <Folder
                              size={11}
                              className="text-purple-400 shrink-0"
                            />
                            <span className="text-neutral-200 font-medium truncate">
                              V4 Component Library
                            </span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0 font-mono text-[9px]">
                            <span className="text-purple-400 font-bold bg-purple-950/40 px-1.5 py-0.5 rounded border border-purple-900/30">
                              8/12 Done
                            </span>
                            <div className="w-8 h-1 bg-neutral-800 rounded-full overflow-hidden">
                              <div className="w-2/3 h-full bg-purple-500" />
                            </div>
                          </div>
                        </div>
                        <div className="p-2 bg-neutral-900/40 border border-neutral-800/60 rounded-lg flex items-center justify-between opacity-50 pl-6">
                          <div className="flex items-center gap-2 min-w-0">
                            <CheckCircle2
                              size={10}
                              className="text-neutral-600 shrink-0"
                            />
                            <span className="text-neutral-400 truncate">
                              Setup Tailwind layers
                            </span>
                          </div>
                          <span className="text-neutral-600 text-[9px] font-mono">
                            Completed
                          </span>
                        </div>
                      </div>
                    )}

                    {/* CARD 3: CALENDAR VIEW */}
                    {i === 2 && (
                      <div className="w-full space-y-2 font-sans text-[10px]">
                        <div className="grid grid-cols-4 gap-1.5 border-b border-neutral-900 pb-1.5 font-mono text-[8px] text-neutral-500 text-center">
                          <span>MON 01</span>
                          <span className="text-emerald-400 font-bold">
                            TUE 02
                          </span>
                          <span>WED 03</span>
                          <span>THU 04</span>
                        </div>
                        <div className="grid grid-cols-4 gap-1.5 min-h-[48px]">
                          <div className="bg-neutral-900/20 border border-neutral-900 rounded-md p-1 opacity-20" />
                          {/* Calendar day containing an active task block */}
                          <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-md p-1.5 flex flex-col justify-between group-hover:scale-[1.03] transition-transform duration-300 cursor-pointer relative">
                            <span className="text-[8px] font-bold text-emerald-400 uppercase tracking-tight block">
                              Launch
                            </span>
                            <div className="w-full h-1 bg-emerald-500 rounded-full mt-2 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                          </div>
                          <div className="bg-neutral-900/20 border border-neutral-900 rounded-md p-1 opacity-20" />
                          <div className="bg-neutral-900/20 border border-neutral-900 rounded-md p-1 opacity-20" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* TEXT CONTENT CONTAINER */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-neutral-950 tracking-tight flex items-center justify-between group-hover:text-neutral-950 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-neutral-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Inline interactive link trigger */}
                  <div className="pt-2 flex items-center gap-1 text-xs font-bold text-neutral-400 group-hover:text-neutral-950 transition-colors">
                    <span>Explore system design</span>
                    <ArrowRight
                      size={13}
                      className="transform group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
