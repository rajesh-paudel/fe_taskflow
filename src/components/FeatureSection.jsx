import React, { useState } from "react";
import {
  Layers,
  Calendar,
  Tag,
  FolderGit2,
  Search,
  ChevronRight,
  GripVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

const featuresData = [
  {
    id: "drag-drop",
    title: "Drag & drop task management",
    description:
      "Move issues fluidly between custom columns. Prioritize on the fly without waiting for server lag or clumsy modal menus.",
    icon: Layers,
    accentColor: "text-blue-600",
    bgColor: "bg-blue-50/50",
    borderColor: "border-blue-100",
  },
  {
    id: "smart-dates",
    title: "Smart due dates & reminders",
    description:
      "Type 'Next Tuesday at 4pm' and let our natural language parser handle the scheduling. Never drop a time-sensitive milestone again.",
    icon: Calendar,
    accentColor: "text-purple-600",
    bgColor: "bg-purple-50/50",
    borderColor: "border-purple-100",
  },
  {
    id: "tags-priority",
    title: "Tags & priority system",
    description:
      "Classify your workspace via custom labels and strict Urgent-to-Low indicators. Filter global views down to what matters in one click.",
    icon: Tag,
    accentColor: "text-amber-600",
    bgColor: "bg-amber-50/50",
    borderColor: "border-amber-100",
  },
  {
    id: "project-tracking",
    title: "Project-level tracking",
    description:
      "Bundle isolated tasks into nested operational epic tracks. Keep stakeholder reports updated with native, real-time progress percentages.",
    icon: FolderGit2,
    accentColor: "text-emerald-600",
    bgColor: "bg-emerald-50/50",
    borderColor: "border-emerald-100",
  },
  {
    id: "global-search",
    title: "Instant global search",
    description:
      "Press CMD+K anywhere across the app interface to instantly crawl text parameters inside comments, project descriptions, and archived files.",
    icon: Search,
    accentColor: "text-rose-600",
    bgColor: "bg-rose-50/50",
    borderColor: "border-rose-100",
  },
];

export default function FeatureDeepDive() {
  const [activeTab, setActiveTab] = useState("drag-drop");

  // Helper component to render the high-fidelity UI mockups programmatically
  const renderMockup = () => {
    switch (activeTab) {
      case "drag-drop":
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 bg-gray-950 font-mono text-[11px] text-gray-400 select-none">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="text-gray-300 font-sans font-bold text-sm">
                Sprint Board
              </span>
              <span className="px-2 py-0.5 rounded-sm bg-gray-800 text-gray-400 text-[10px]">
                3 Issues Active
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 flex-1">
              {/* Column 1 */}
              <div className="space-y-2">
                <div className="text-gray-500 font-sans font-semibold uppercase text-[10px] tracking-wider mb-2">
                  In Progress
                </div>
                <div className="p-3 bg-gray-900 border border-gray-800 rounded-lg flex items-start gap-2 shadow-sm opacity-50">
                  <GripVertical size={12} className="mt-0.5 text-gray-700" />
                  <div>
                    <p className="text-gray-200 font-sans font-medium text-xs">
                      TF-102 Auth Overhaul
                    </p>
                    <span className="text-[10px] text-blue-400">
                      Next.js 15
                    </span>
                  </div>
                </div>
              </div>
              {/* Column 2 */}
              <div className="space-y-2">
                <div className="text-gray-500 font-sans font-semibold uppercase text-[10px] tracking-wider mb-2">
                  Review
                </div>
                <div className="p-3 bg-gray-900 border border-blue-500/50 rounded-lg flex items-start gap-2 shadow-[0_0_15px_rgba(59,130,246,0.1)] relative transform scale-[1.02] rotate-1 transition-all">
                  <div className="absolute -top-1.5 -right-1.5 px-1.5 py-0.5 bg-blue-500 text-white font-sans text-[8px] font-bold rounded-sm uppercase tracking-wider">
                    Active Drag
                  </div>
                  <GripVertical size={12} className="mt-0.5 text-blue-500" />
                  <div>
                    <p className="text-gray-100 font-sans font-medium text-xs">
                      TF-104 Tailwind v4 Setup
                    </p>
                    <span className="text-[10px] text-purple-400">
                      UI / Refactor
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "smart-dates":
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 bg-gray-950 text-xs font-sans text-gray-400 select-none">
            <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
              <Clock size={14} className="text-purple-400" />
              <span className="text-gray-300 font-bold">
                Natural Language Scheduler
              </span>
            </div>
            <div className="my-auto space-y-4">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
                <p className="text-gray-500 text-[11px] mb-1">Task Input</p>
                <p className="text-gray-100 font-medium">
                  Review architectural design specs with engineering lead{" "}
                  <span className="text-purple-400 underline font-mono">
                    tomorrow at 3 PM
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-[11px] px-1 animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                <span>Parsing execution metrics...</span>
              </div>
              <div className="bg-purple-950/20 border border-purple-900/50 rounded-lg p-3 grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-purple-400 block">Parsed ISO Date</span>
                  <span className="text-gray-200 font-mono font-medium text-xs">
                    2026-06-04
                  </span>
                </div>
                <div>
                  <span className="text-purple-400 block">System Reminder</span>
                  <span className="text-gray-200 font-mono font-medium text-xs">
                    14:45 (15m before)
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case "tags-priority":
        return (
          <div className="w-full h-full flex flex-col p-6 bg-gray-950 text-xs font-sans text-gray-400 select-none">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3 mb-4">
              <span className="text-gray-300 font-bold">
                Priority Triage Matrix
              </span>
              <span className="text-[10px] bg-red-950/40 border border-red-900/50 text-red-400 px-2 py-0.5 rounded-full font-mono font-bold">
                1 Urgent Alert
              </span>
            </div>
            <div className="space-y-2.5">
              <div className="p-3 bg-gray-900/60 border border-red-950 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  <span className="text-gray-200 font-medium">
                    TF-409 Production Memory Leak
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-red-900/30 text-red-400 text-[10px] border border-red-900/40 rounded-sm font-mono font-bold uppercase">
                  Urgent
                </span>
              </div>
              <div className="p-3 bg-gray-900/60 border border-gray-800 rounded-lg flex items-center justify-between opacity-60">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-gray-300">
                    TF-312 Refactor CSS Root Rules
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-amber-900/20 text-amber-400 text-[10px] border border-amber-900/30 rounded-sm font-mono uppercase">
                  Medium
                </span>
              </div>
              <div className="p-3 bg-gray-900/60 border border-gray-800 rounded-lg flex items-center justify-between opacity-30">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-gray-400">
                    TF-118 Update Copyright Disclaimers
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-blue-900/20 text-blue-400 text-[10px] border border-blue-900/30 rounded-sm font-mono uppercase">
                  Low
                </span>
              </div>
            </div>
          </div>
        );
      case "project-tracking":
        return (
          <div className="w-full h-full flex flex-col justify-between p-6 bg-gray-950 text-xs font-sans text-gray-400 select-none">
            <div className="border-b border-gray-800 pb-3">
              <span className="text-gray-300 font-bold">
                Active Epics Workspace
              </span>
            </div>
            <div className="space-y-4 my-auto">
              <div>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-gray-200 font-medium">
                    Core Infrastructure Engine
                  </span>
                  <span className="text-emerald-400 font-mono font-bold">
                    84%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-900 border border-gray-800 rounded-full overflow-hidden">
                  <div className="w-[84%] h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)] rounded-full transition-all duration-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-gray-400">Mobile App Sync Syncing</span>
                  <span className="text-gray-500 font-mono">31%</span>
                </div>
                <div className="w-full h-2 bg-gray-900 border border-gray-800 rounded-full overflow-hidden">
                  <div className="w-[31%] h-full bg-gray-700 rounded-full" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-600 border-t border-gray-950 pt-2 font-mono">
              <span>Updated 2m ago</span>
              <span>Target: Q2 Deliverables</span>
            </div>
          </div>
        );
      case "global-search":
        return (
          <div className="w-full h-full flex flex-col p-5 bg-gray-950 text-xs font-sans text-gray-400 select-none">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-2.5 flex items-center gap-2 shadow-inner">
              <Search size={14} className="text-rose-500" />
              <span className="text-gray-100 font-mono">analytics/</span>
              <span className="w-0.5 h-3.5 bg-rose-500 animate-pulse" />
              <span className="ml-auto text-[9px] bg-gray-800 px-1.5 py-0.5 rounded-sm font-mono text-gray-500">
                ESC
              </span>
            </div>
            <div className="mt-4 space-y-1.5">
              <p className="text-[10px] font-semibold text-gray-600 tracking-wider uppercase mb-1 px-1">
                File & Code Matches
              </p>
              <div className="p-2 bg-rose-950/20 border border-rose-900/30 rounded-md flex items-center justify-between">
                <div>
                  <p className="text-gray-200 font-medium">
                    useAnalyticsTracker.ts
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono">
                    src/hooks/modules/core
                  </p>
                </div>
                <ChevronRight size={12} className="text-rose-400" />
              </div>
              <div className="p-2 hover:bg-gray-900/40 rounded-md flex items-center justify-between opacity-50">
                <div>
                  <p className="text-gray-400">
                    analyticsDashboardContainer.jsx
                  </p>
                  <p className="text-[10px] text-gray-600 font-mono">
                    src/components/dashboard
                  </p>
                </div>
                <ChevronRight size={12} className="text-gray-700" />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-32 bg-white text-gray-900 border-b border-gray-100 overflow-hidden font-sans antialiased">
      <div className="max-w-6xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-950 leading-[1.15]">
            Built for real workflow control
          </h2>
          <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Every layer is engineered to strip down friction, eliminating
            systemic micro-delays from your tracking environment.
          </p>
        </div>

        {/* HIGH-FIDELITY BENTO WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-12">
          {/* LEFT COLUMN: INTERACTIVE TABS LAYER */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3.5 order-2 lg:order-1">
            {featuresData.map((f) => {
              const IconComponent = f.icon;
              const isActive = activeTab === f.id;

              return (
                <button
                  key={f.id}
                  onClick={() => setActiveTab(f.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative group cursor-pointer ${
                    isActive
                      ? "bg-white border-gray-200 shadow-sm shadow-gray-100/50 scale-[1.01]"
                      : "bg-transparent border-transparent hover:bg-gray-50/70"
                  }`}
                >
                  {/* Active anchor light indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-gray-950 rounded-r" />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center border transition-colors ${
                        isActive
                          ? `${f.bgColor} ${f.borderColor} ${f.accentColor}`
                          : "bg-gray-50 border-gray-200/80 text-gray-400 group-hover:text-gray-600 group-hover:bg-gray-100"
                      }`}
                    >
                      <IconComponent
                        size={16}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </div>

                    <div className="space-y-1 pr-4">
                      <h4
                        className={`text-base font-bold transition-colors ${
                          isActive
                            ? "text-gray-950"
                            : "text-gray-700 group-hover:text-gray-900"
                        }`}
                      >
                        {f.title}
                      </h4>
                      <p
                        className={`text-sm leading-relaxed transition-all duration-300 ${
                          isActive
                            ? "text-gray-500 h-auto opacity-100 mt-1"
                            : "text-gray-400 h-0 opacity-0 overflow-hidden lg:h-auto lg:opacity-100"
                        }`}
                      >
                        {f.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: HIGH-FIDELITY LIVE CODE MOCKUP DISPLAY */}
          <div className="lg:col-span-7 flex flex-col order-1 lg:order-2">
            <div className="relative w-full aspect-4/3 lg:h-full min-h-[380px] bg-gray-900 rounded-2xl p-3 border border-gray-800 shadow-2xl shadow-gray-950/20 flex flex-col overflow-hidden">
              {/* Premium Browser Chrome Window Controls */}
              <div className="flex items-center gap-2 px-3 pb-3 border-b border-gray-800">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />
                <div className="w-2.5 h-2.5 rounded-full bg-gray-800" />
                <div className="ml-4 px-3 py-0.5 rounded-md bg-gray-950 text-[10px] text-gray-600 font-mono tracking-wide w-48 text-center truncate select-none">
                  app.taskflow.com/workspace
                </div>
              </div>

              {/* Dynamic View Frame */}
              <div className="flex-1 rounded-lg overflow-hidden border border-gray-800/50 mt-3 bg-gray-950 relative">
                {renderMockup()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
