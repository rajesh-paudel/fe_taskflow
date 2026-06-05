import React, { useState, useEffect } from "react";
import { FaTimes, FaFolder, FaAlignLeft, FaPalette } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
export default function CreateProjectModal({
  editingProject,
  isOpen,
  onClose,
  onCreateProject,
}) {
  const { user } = useAuth();
  // Local form control states
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");
  const [selectedColor, setSelectedColor] = useState("bg-blue-500");

  // Premium color palette options
  const colorOptions = [
    { id: "bg-blue-500", label: "Ocean Blue" },
    { id: "bg-purple-500", label: "Deep Purple" },
    { id: "bg-emerald-500", label: "Emerald Green" },
    { id: "bg-rose-500", label: "Rose Crimson" },
    { id: "bg-amber-500", label: "Amber Gold" },
    { id: "bg-neutral-500", label: "Slate Gray" },
  ];
  // Sync modal form state with the operation mode (Create vs. Edit)
  useEffect(() => {
    if (isOpen) {
      if (editingProject) {
        // Mode: Edit Project — Pre-populate form inputs
        setProjectName(editingProject.name || "");
        setProjectDesc(editingProject.desc || "");
        setSelectedColor(editingProject.color || "bg-blue-500");
      } else {
        // Mode: Create Project — Flush state back to pristine default values
        setProjectName("");
        setProjectDesc("");
        setSelectedColor("bg-blue-500");
      }
    }
  }, [editingProject, isOpen]);
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    // Package the detailed data object
    const projectPayload = {
      id: editingProject ? editingProject.id : `p_${Date.now()}`,
      owner: editingProject ? editingProject.owner : user?.id,
      name: projectName.trim(),
      desc: projectDesc.trim(),
      color: selectedColor,
    };

    onCreateProject(projectPayload);

    // Reset local form states and close modal layer
    setProjectName("");
    setProjectDesc("");
    setSelectedColor("bg-blue-500");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 1. BACKDROP OVERLAY (Smooth Glassmorphism Blur) */}
      <div
        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* 2. MODAL DIALOG CONTAINER */}
      <div className="relative w-full max-w-md transform rounded-2xl bg-white p-6 shadow-xl border border-neutral-200/60 transition-all z-10 animate-in fade-in-50 zoom-in-95 duration-150">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-neutral-100 text-neutral-800 rounded-lg text-sm">
              <FaFolder />
            </div>
            <div>
              <h3 className="text-sm font-black text-neutral-950 tracking-tight">
                Create New Project
              </h3>
              <p className="text-[10px] text-neutral-400 font-mono">
                Initialize a workspace container
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-all cursor-pointer"
          >
            <FaTimes size={12} />
          </button>
        </div>

        {/* Dynamic Form Sheet */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Unit: Project Title */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono block">
              Project Title *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                maxLength={40}
                placeholder="e.g., Mobile App Development"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200/80 rounded-xl px-3 py-2 text-xs font-medium placeholder-neutral-400 focus:outline-hidden focus:border-neutral-950 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Input Unit: Description */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono block">
              Description <span className="text-neutral-300">(Optional)</span>
            </label>
            <div className="relative">
              <textarea
                rows={3}
                maxLength={160}
                placeholder="Briefly describe the core milestones or objectives..."
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200/80 rounded-xl px-3 py-2 text-xs font-medium placeholder-neutral-400 focus:outline-hidden focus:border-neutral-950 focus:bg-white transition-all resize-none"
              />
            </div>
          </div>

          {/* Input Unit: Color Codings */}
          <div className="space-y-2 pt-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono block">
              Color Identifier Accent
            </label>
            <div className="flex items-center gap-2.5 flex-wrap">
              {colorOptions.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setSelectedColor(color.id)}
                  title={color.label}
                  className={`h-6 w-6 rounded-full cursor-pointer transition-all flex items-center justify-center ${color.id} ${
                    selectedColor === color.id
                      ? "ring-2 ring-neutral-950 ring-offset-2 scale-110 shadow-xs"
                      : "hover:scale-105 opacity-80 hover:opacity-100"
                  }`}
                >
                  {selectedColor === color.id && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Action Submission Buttons Footer Container */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-bold text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!projectName.trim()}
              className="px-4 py-2 text-xs font-bold text-white bg-neutral-950 hover:bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-all shadow-3xs active:scale-[0.99] cursor-pointer"
            >
              Initialize Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
