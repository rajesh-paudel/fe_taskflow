import React from "react";
import { FaVideo, FaClock, FaComments } from "react-icons/fa";

export default function PlaceholdersSheet({ currentTab }) {
  const metaConfig = {
    meetings: {
      title: "Meetings Interface Module",
      desc: "Connect sync sessions and schedule team calibrations instantly.",
      icon: FaVideo,
    },
    timesheet: {
      title: "Timesheet Tracker System",
      desc: "Monitor project deployment log values and sprint durations.",
      icon: FaClock,
    },
    chat: {
      title: "Secure Chat Matrix",
      desc: "Instant contextual message relays and asset bundle delivery channels.",
      icon: FaComments,
    },
  };

  const currentView = metaConfig[currentTab] || {
    title: "Workspace Concept",
    desc: "Selected feature node is initializing active canvas processes.",
    icon: FaComments,
  };
  const ComponentIcon = currentView.icon;

  return (
    <div className="rounded-xl border border-dashed border-neutral-200 p-12 text-center bg-neutral-50/30">
      <div className="w-10 h-10 rounded-xl bg-neutral-100 border border-neutral-200/50 flex items-center justify-center mx-auto text-neutral-500 mb-4">
        <ComponentIcon size={14} />
      </div>
      <h3 className="text-xs font-bold text-neutral-950 uppercase tracking-wide font-mono">
        {currentView.title}
      </h3>
      <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto leading-normal">
        {currentView.desc}
      </p>
    </div>
  );
}
