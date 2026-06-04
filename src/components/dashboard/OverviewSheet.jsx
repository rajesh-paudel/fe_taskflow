import React from "react";
import {
  FaCalendarCheck,
  FaChartLine,
  FaCheckCircle,
  FaClock,
  FaEllipsisH,
  FaExclamationCircle,
  FaFolderOpen,
  FaHistory,
  FaExternalLinkAlt,
} from "react-icons/fa";

export default function OverviewSheet() {
  // 📊 SELF-CONTAINED COMPREHENSIVE WORKSPACE MOCK DATA
  const dashboardStats = {
    user: { name: "Rajesh", totalTodayTasks: 6, completionRate: 50 },
    upcomingMeetings: [
      {
        id: 1,
        title: "Technical Architecture Sync with Jason",
        date: "08 Jun 2026",
        time: "11:00 AM",
        type: "professional",
      },
      {
        id: 2,
        title: "CSIT Lab Report Internal Verification",
        date: "09 Jun 2026",
        time: "02:30 PM",
        type: "academic",
      },
    ],
    activityTimeline: [
      { date: "01 Jun", counts: 2 },
      { date: "02 Jun", counts: 3 },
      { date: "03 Jun", counts: 4 },
      { date: "04 Jun", counts: 6 },
    ],
    taskMetrics: {
      byPriority: { high: 12, middle: 8, low: 11, total: 31 },
      byCompletion: [
        { label: "In Progress", rate: 50, color: "bg-[#5A24CA]" },
        { label: "In Review", rate: 35, color: "bg-blue-500" },
        { label: "Completed", rate: 70, color: "bg-emerald-500" },
        { label: "Not Started", rate: 15, color: "bg-neutral-300" },
        { label: "Cancelled", rate: 0, color: "bg-rose-400" },
      ],
    },
    team: [
      {
        name: "Jason Byun",
        role: "Real Estate Director",
        initial: "JB",
        mail: "jason@realtyexec.com",
      },
      {
        name: "Anish Shrestha",
        role: "Backend Collaborator",
        initial: "AS",
        mail: "anish@amrit.edu.np",
      },
      {
        name: "Sita Paudel",
        role: "UI/UX QA Engineering",
        initial: "SP",
        mail: "sita@workspace.com",
      },
    ],
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 🚀 TOP ROW MATRIX LAYER: HERO GREETING BANNER & MEETINGS AGENDA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Welcome Card Component */}
        <div className="lg:col-span-2 border border-neutral-200 rounded-xl p-5 bg-white shadow-3xs relative overflow-hidden flex flex-col justify-between min-h-[140px]">
          <div className="space-y-1 z-10">
            <h2 className="text-base font-black text-neutral-950 tracking-tight">
              Welcome Back, {dashboardStats.user.name}!
            </h2>
            <p className="text-xs text-neutral-500 font-medium max-w-md leading-relaxed">
              You have{" "}
              <span className="font-bold text-[#5A24CA]">
                {dashboardStats.user.totalTodayTasks} workspace targets
              </span>{" "}
              logged for today. Your milestone conversion roadmap speed is
              sitting at an efficient{" "}
              <span className="font-bold text-neutral-950">
                {dashboardStats.user.completionRate}%
              </span>
              .
            </p>
          </div>
          <div className="text-[11px] font-bold text-[#5A24CA] bg-[#5A24CA]/5 border border-[#5A24CA]/10 rounded-lg px-3 py-1.5 w-fit mt-3">
            ⚡ Operations Velocity: Stable & Optimized
          </div>

          {/* Decorative geometric branding background nodes */}
          <div className="absolute right-0 bottom-0 top-0 w-32 bg-radial from-[#5A24CA]/10 to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* Upcoming Meetings Component Card */}
        <div className="border border-neutral-200 rounded-xl p-4 bg-white shadow-3xs flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <FaCalendarCheck className="text-[#5A24CA]" size={11} />
              <span>Upcoming Syncs</span>
            </h3>
            <button
              type="button"
              className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <FaEllipsisH size={11} />
            </button>
          </div>

          <div className="divide-y divide-neutral-100 flex-1 mt-2">
            {dashboardStats.upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="py-2.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5 min-w-0">
                  <p className="font-bold text-neutral-950 truncate leading-snug">
                    {meeting.title}
                  </p>
                  <span className="text-[10px] text-neutral-400 font-medium font-mono">
                    {meeting.time}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-sm shrink-0 border ${
                    meeting.type === "professional"
                      ? "bg-blue-50 border-blue-100 text-blue-700"
                      : "bg-emerald-50 border-emerald-100 text-emerald-700"
                  }`}
                >
                  {meeting.date.split(" ")[0]} {meeting.date.split(" ")[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 📊 SECOND ROW MATRIX LAYER: ACTIVITY CHART & COMPREHENSIVE TASK ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Visual Line Graph Representation Simulator (Left 7 Columns) */}
        <div className="lg:col-span-7 border border-neutral-200 rounded-xl p-4 bg-white shadow-3xs flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <FaChartLine className="text-[#5A24CA]" size={11} />
              <span>Velocity Engagement Trend</span>
            </h3>
            <span className="text-[10px] text-neutral-400 font-mono">
              June 2026 Timeline
            </span>
          </div>

          {/* Simple Vector Graph Simulation Container Layout */}
          <div className="h-44 w-full flex items-end justify-between pt-6 px-2 relative">
            {/* Horizontal Grid Baseline Indicators */}
            <div className="absolute inset-x-0 bottom-6 border-b border-neutral-100 pointer-events-none" />
            <div className="absolute inset-x-0 top-12 border-b border-dashed border-neutral-100/60 pointer-events-none" />

            {dashboardStats.activityTimeline.map((item, index) => {
              // Calculate explicit heights based on the metrics values
              const heightPercentage = (item.counts / 6) * 100;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 group z-10 flex-1"
                >
                  <div className="relative w-full flex justify-center">
                    {/* Visual Coordinate Pill Bar Indicator */}
                    <div
                      style={{ height: `${heightPercentage * 0.8}px` }}
                      className="w-2 bg-linear-to-t from-[#5A24CA] to-[#7C4DFF] rounded-full shadow-3xs group-hover:scale-x-125 transition-transform duration-200"
                    />
                    {/* Value Popover Bubble on Hover */}
                    <span className="absolute -top-6 bg-neutral-950 text-white font-mono font-bold text-[9px] px-1.5 py-0.5 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.counts}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-400 group-hover:text-neutral-950 transition-colors">
                    {item.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Task Quantities Breakdown Panel Dashboard Container (Right 5 Columns) */}
        <div className="lg:col-span-5 border border-neutral-200 rounded-xl p-4 bg-white shadow-3xs space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <FaFolderOpen className="text-[#5A24CA]" size={11} />
              <span>Target Metrics Matrix</span>
            </h3>
            <button
              type="button"
              className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
            >
              <FaEllipsisH size={11} />
            </button>
          </div>

          {/* Core Numerical Circle Displays */}
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              {
                label: "High",
                value: dashboardStats.taskMetrics.byPriority.high,
                border: "border-rose-200 bg-rose-50/40 text-rose-700",
              },
              {
                label: "Middle",
                value: dashboardStats.taskMetrics.byPriority.middle,
                border: "border-blue-200 bg-blue-50/40 text-blue-700",
              },
              {
                label: "Low",
                value: dashboardStats.taskMetrics.byPriority.low,
                border: "border-neutral-200 bg-neutral-50/60 text-neutral-600",
              },
              {
                label: "Total",
                value: dashboardStats.taskMetrics.byPriority.total,
                border:
                  "border-[#5A24CA]/20 bg-[#5A24CA]/5 text-[#5A24CA] font-black",
              },
            ].map((node, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg border flex flex-col justify-center ${node.border}`}
              >
                <span className="text-sm font-black font-mono tracking-tight">
                  {node.value}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">
                  {node.label}
                </span>
              </div>
            ))}
          </div>

          {/* Status Progression Bars Matrix Stack Layout */}
          <div className="space-y-2.5 pt-1 text-[11px]">
            {dashboardStats.taskMetrics.byCompletion.map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between font-medium text-neutral-500">
                  <span className="font-semibold text-neutral-800">
                    {row.label}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-neutral-950">
                    {row.rate}%
                  </span>
                </div>
                {/* Horizontal Progress Track Bar Component */}
                <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${row.rate}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${row.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🏢 THIRD ROW MATRIX LAYER: WORKSPACE CONVERTER RADIALS & TEAM STRUCTURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Progress Velocity Circle Wheel Container */}
        <div className="border border-neutral-200 rounded-xl p-4 bg-white shadow-3xs flex flex-col justify-between">
          <div className="border-b border-neutral-100 pb-2">
            <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <FaHistory className="text-[#5A24CA]" size={11} />
              <span>Sprint Scope Progress</span>
            </h4>
          </div>

          <div className="py-4 flex items-center justify-around gap-4">
            {/* Visual simulation radial gauge node via standard SVG circles */}
            <div className="relative flex items-center justify-center w-20 h-20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-neutral-100"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#5A24CA]"
                  strokeDasharray="45, 100"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-xs font-black font-mono text-neutral-950">
                45%
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-neutral-500">
              <p className="font-semibold text-neutral-800">
                Operational Summary
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#5A24CA]" />
                <span>Active Sprint Conversion</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-neutral-200" />
                <span>Remaining Scope</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Registered Team Directory List View Container Row */}
        <div className="border border-neutral-200 rounded-xl p-4 bg-white shadow-3xs space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider flex items-center gap-1.5">
              <FaCheckCircle className="text-[#5A24CA]" size={11} />
              <span>Workspace Team Core</span>
            </h4>
            <span className="text-[10px] text-neutral-400 font-bold font-mono">
              3 Registered
            </span>
          </div>

          <div className="space-y-2 max-h-[110px] overflow-y-auto pr-0.5 custom-scrollbar">
            {dashboardStats.team.map((member, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-1.5 rounded-lg border border-neutral-100 hover:border-neutral-200 transition-colors bg-neutral-50/30"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {/* Text-based Lightweight Initials Avatar Component Replacement */}
                  <div className="w-7 h-7 bg-neutral-950 text-white font-bold text-[10px] rounded-full flex items-center justify-center shrink-0 tracking-tight font-mono">
                    {member.initial}
                  </div>
                  <div className="text-[11px] min-w-0">
                    <p className="font-bold text-neutral-950 truncate leading-tight">
                      {member.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>
                <span
                  className="text-[9px] font-mono text-neutral-400 bg-white border border-neutral-200 px-1.5 py-0.5 rounded-md hidden sm:block truncate max-w-[100px]"
                  title={member.mail}
                >
                  {member.mail.split("@")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Support Portal Component Panel Card Element */}
        <div className="border border-neutral-200 rounded-xl p-4 bg-linear-to-br from-neutral-950 to-neutral-900 text-white shadow-3xs flex flex-col justify-between">
          <div className="space-y-1">
            <h4 className="text-xs font-black tracking-tight text-white flex items-center gap-1.5">
              <FaExclamationCircle className="text-[#7C4DFF]" size={12} />
              <span>Need Architectural Help?</span>
            </h4>
            <p className="text-[11px] text-neutral-400 leading-normal font-medium">
              Stuck layout structures or need assistance implementing advanced
              MySQL array procedures? Sync up live.
            </p>
          </div>

          <button
            type="button"
            className="w-full mt-3 py-1.5 bg-[#5A24CA] hover:bg-[#4A1CA5] text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Initialize Live Chat</span>
            <FaExternalLinkAlt size={8} />
          </button>
        </div>
      </div>
    </div>
  );
}
