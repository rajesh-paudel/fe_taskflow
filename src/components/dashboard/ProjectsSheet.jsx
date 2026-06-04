import React, { useState } from "react";
import {
  FaColumns,
  FaListUl,
  FaPlus,
  FaTasks,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

export default function ProjectsSheet({
  projects = [],
  tasks = [],
  setIsProjectModalOpen,
  setActiveProject,
  setActiveTab,
}) {
  const [projectLayoutMode, setProjectLayoutMode] = useState("grid"); // Local toggle underneath header

  // Helper utility to safely count tasks mapping to explicit project structures
  const getProjectTaskStats = (projectId) => {
    const projectSubTasks = tasks.filter((t) => t.projectId === projectId);
    const completed = projectSubTasks.filter((t) => t.status === "Done").length;
    return {
      total: projectSubTasks.length,
      completed: completed,
    };
  };

  // Mock team members generation architecture matching your layout blueprint requirements
  const mockTeamAvatars = [
    { text: "RP", bg: "bg-neutral-950" },
    { text: "JB", bg: "bg-blue-600" },
    { text: "AA", bg: "bg-emerald-600" },
  ];

  const handleDrilldown = (project) => {
    setActiveProject(project);
    setActiveTab(null);
  };

  return (
    <div className="space-y-6">
      {/* Sub-Header Dynamic Options Block */}
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
        <div>
          <h2 className="text-sm font-black text-neutral-950 tracking-tight">
            Active Workspaces Matrix
          </h2>
          <p className="text-[11px] text-neutral-400 mt-0.5">
            Manage structural project properties and track aggregated task
            coverage metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Subheader Grid/List Toggle Switch */}
          <div className="flex items-center bg-neutral-100 p-0.5 rounded-md border border-neutral-200/40">
            <button
              onClick={() => setProjectLayoutMode("grid")}
              className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${projectLayoutMode === "grid" ? "bg-white text-neutral-950 shadow-3xs" : "text-neutral-400 hover:text-neutral-950"}`}
            >
              <FaColumns size={11} />
            </button>
            <button
              onClick={() => setProjectLayoutMode("list")}
              className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${projectLayoutMode === "list" ? "bg-white text-neutral-950 shadow-3xs" : "text-neutral-400 hover:text-neutral-950"}`}
            >
              <FaListUl size={11} />
            </button>
          </div>

          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-neutral-950 text-white font-bold text-xs px-2.5 py-1.5 rounded-lg hover:bg-neutral-900 transition-all shadow-3xs cursor-pointer"
          >
            <FaPlus size={9} />
            <span>New Space</span>
          </button>
        </div>
      </div>

      {/* Conditionally Render Based on Selected Layout Button */}
      {projectLayoutMode === "grid" ? (
        /* GRID LAYOUT VIEW */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const stats = getProjectTaskStats(project.id);
            return (
              <div
                key={project.id}
                className="group relative rounded-xl border border-neutral-200/75 bg-white p-4 flex flex-col justify-between hover:border-neutral-400 shadow-3xs hover:shadow-2xs transition-all"
              >
                <div className="space-y-3">
                  {/* Top Header Card Info */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${project.color || "bg-neutral-400"}`}
                      />
                      <h3 className="text-xs font-bold text-neutral-950 truncate max-w-[140px]">
                        {project.name}
                      </h3>
                    </div>
                    {/* Hardcoded Premium Visual Tags */}
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm bg-neutral-100 text-neutral-500 font-mono">
                      {project.id === "p1" ? "Production" : "Active"}
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                    {project.desc ||
                      "No custom manifest summary specified for this corporate roadmap sector allocation."}
                  </p>

                  {/* Task Completion Counter Row */}
                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-500 font-mono">
                    <FaTasks className="text-neutral-300" size={10} />
                    <span>
                      {stats.completed}/{stats.total} Tasks Completed
                    </span>
                  </div>
                </div>

                {/* Team Avatars Block & Interactivity Footer */}
                <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                  <div className="flex items-center -space-x-1.5 overflow-hidden">
                    {mockTeamAvatars.map((avatar, idx) => (
                      <div
                        key={idx}
                        className={`w-6 h-6 rounded-full border border-white text-[8px] font-black text-white flex items-center justify-center ${avatar.bg} shrink-0 select-none font-mono`}
                      >
                        {avatar.text}
                      </div>
                    ))}
                    {/* Explicit Request Layout: +8 +9 stack layout tag element */}
                    <div className="w-6 h-6 rounded-full border border-white bg-neutral-100 text-neutral-500 text-[8px] font-bold flex items-center justify-center shrink-0 font-mono select-none">
                      +8
                    </div>
                  </div>

                  <button
                    onClick={() => handleDrilldown(project)}
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-400 group-hover:text-neutral-950 transition-colors cursor-pointer"
                  >
                    <span>Explore Space</span>
                    <FaArrowRight size={8} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* COMPACT LIST ROW VIEW */
        <div className="border border-neutral-200/80 rounded-xl overflow-hidden bg-white shadow-3xs divide-y divide-neutral-100">
          {projects.map((project) => {
            const stats = getProjectTaskStats(project.id);
            return (
              <div
                key={project.id}
                onClick={() => handleDrilldown(project)}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 hover:bg-neutral-50/50 transition-colors cursor-pointer gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${project.color || "bg-neutral-400"}`}
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-neutral-900 truncate">
                      {project.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate max-w-md">
                      {project.desc || "No descriptor allocated."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end shrink-0">
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded font-bold">
                    {stats.total} Total Tasks
                  </span>

                  {/* Avatar Overflow Strip */}
                  <div className="flex items-center -space-x-1">
                    <div className="w-5 h-5 rounded-full bg-neutral-950 text-[7px] font-black text-white flex items-center justify-center font-mono">
                      RP
                    </div>
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-[7px] font-black text-white flex items-center justify-center font-mono">
                      JB
                    </div>
                    <div className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-500 text-[7px] font-bold flex items-center justify-center font-mono">
                      +9
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
