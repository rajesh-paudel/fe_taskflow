import React, { useState } from "react";
import {
  FaColumns,
  FaListUl,
  FaPlus,
  FaTasks,
  FaUsers,
  FaArrowRight,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import ConfirmationModal from "../ConfirmationModal";
import { useTasks } from "../../query/useTasks";
import { useProjects } from "../../query/useProjects";
import CreateProjectModal from "./CreateProjectModal";
import toast from "react-hot-toast";
export default function ProjectsSheet() {
  const { user } = useAuth();
  const {
    projects,
    createProject,
    updateProject,
    deleteProject,
    isUpdating,
    isDeleting,
    isCreating,
  } = useProjects();
  const { tasks } = useTasks();
  console.log(projects, tasks);
  const [projectLayoutMode, setProjectLayoutMode] = useState("grid");
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const getProjectTaskStats = (projectId) => {
    const projectSubTasks = tasks?.filter((t) => t.projectId === projectId);
    const completed = projectSubTasks.filter((t) => t.status === "Done").length;
    return {
      total: projectSubTasks.length,
      completed: completed,
    };
  };
  const handleEditProject = (project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  const mockTeamAvatars = [
    { text: "RP", bg: "bg-neutral-950" },
    { text: "JB", bg: "bg-blue-600" },
    { text: "AA", bg: "bg-emerald-600" },
  ];

  const handleSaveOrUpdateProject = (data) => {
    if (editingProject && data.id) {
      updateProject(
        {
          id: data.id,
          name: data.name.trim(),
          desc: data.desc,
          color: data.color,
        },
        {
          onSuccess: () => {
            setIsProjectModalOpen(false);
            toast.success("Project updated successfully!");
          },
          onError: (err) => {
            console.error("Failed to update project workspace:", err);
            toast.error("Failed to update project!");
          },
        },
      );
    } else {
      createProject(
        {
          name: data.name.trim(),
          desc: data.desc,
          color: data.color,
        },
        {
          onSuccess: () => {
            setIsProjectModalOpen(false);
            toast.success("project created successfully!");
          },
          onError: (err) => {
            console.error("Failed to establish new project workspace:", err);
            toast.error("Failed to create project!");
          },
        },
      );
    }
  };
  const handleDeleteProject = () => {
    if (!deleteProjectId) return null;
    deleteProject(deleteProjectId);
    setDeleteProjectId(null);
    toast.success("Project deleted successfully!")
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

      {projectLayoutMode === "grid" ? (
        /* GRID LAYOUT VIEW */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const stats = getProjectTaskStats(project.id);
            return (
              <div
                key={project.id}
                className="group relative rounded-xl border border-neutral-200/75 bg-white p-4 flex flex-col justify-between hover:border-neutral-400 shadow-3xs hover:shadow-2xs transition-all duration-300"
              >
                {project?.isOwner && (
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProject(project);
                      }}
                      title="Edit Project Space"
                      className="w-6 h-6 border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-900 rounded-md flex items-center justify-center transition-all shadow-3xs cursor-pointer hover:border-neutral-300"
                    >
                      <FaEdit size={10} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteProjectId(project.id);
                      }}
                      title="Delete Project Space"
                      className="w-6 h-6 border border-neutral-100 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-md flex items-center justify-center transition-all shadow-3xs cursor-pointer"
                    >
                      <FaTrashAlt size={10} />
                    </button>
                  </div>
                )}

                <div className="space-y-1">
                  {/* Top Header Card Info */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 max-w-[70%]">
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${project.color || "bg-neutral-400"}`}
                      />
                      <h3 className="text-xs font-bold text-neutral-950 truncate">
                        {project.name}
                      </h3>
                    </div>

                    {project?.isOwner && (
                      <span className="text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded bg-purple-50 border border-purple-100/70 text-[#5A24CA] font-mono select-none transition-all group-hover:mr-14">
                        Owner
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] mt-1 mb-4 text-neutral-400 line-clamp-2 leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="flex items-center gap-1.5 text-[10px] font-semibold text-neutral-500 font-mono">
                    <FaTasks className="text-neutral-300" size={10} />
                    <span>
                      {stats.completed}/{stats.total} Tasks Completed
                    </span>
                  </div>
                </div>

                <div className="w-full mt-3 h-1.5 bg-neutral-100 border border-neutral-200/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#5A24CA] rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
                    }}
                  />
                </div>

                <div className="mt-3 pt-3 border-t border-neutral-100/60 flex items-center justify-between gap-2">
                  <div className="flex items-center -space-x-1.5 overflow-hidden">
                    {mockTeamAvatars.map((avatar, idx) => (
                      <div
                        key={idx}
                        className={`w-6 h-6 rounded-full border border-white text-[8px] font-black text-white flex items-center justify-center ${avatar.bg} shrink-0 select-none font-mono`}
                      >
                        {avatar.text}
                      </div>
                    ))}

                    <div className="w-6 h-6 rounded-full border border-white bg-neutral-100 text-neutral-500 text-[8px] font-bold flex items-center justify-center shrink-0 font-mono select-none">
                      +8
                    </div>
                  </div>

                  <button className="inline-flex items-center gap-1 text-[10px] font-bold text-neutral-400 group-hover:text-neutral-950 transition-colors cursor-pointer select-none">
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
                className="relative flex flex-col sm:flex-row sm:items-center justify-between p-3.5 hover:bg-neutral-50/50 cursor-pointer gap-3 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${project.color || "bg-neutral-400"}`}
                  />
                  <div className="min-w-0 flex items-center gap-2">
                    <p className="font-bold text-neutral-900 truncate">
                      {project.name}
                    </p>

                    {project?.isOwner && (
                      <span className="text-[8px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded bg-purple-50 border border-purple-100/70 text-[#5A24CA] font-mono select-none">
                        Owner
                      </span>
                    )}
                  </div>
                </div>

                {/* Description Block */}
                <p className="text-[10px] text-neutral-400 truncate max-w-sm sm:max-w-xs md:max-w-md hidden sm:block">
                  {project.desc || "No custom manifest summary specified."}
                </p>

                <div className="flex items-center gap-4 justify-between sm:justify-end shrink-0">
                  <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded font-bold whitespace-nowrap">
                    {stats.completed}/{stats.total} Completed
                  </span>

                  <div className="flex items-center -space-x-1.5">
                    {mockTeamAvatars.slice(0, 2).map((avatar, idx) => (
                      <div
                        key={idx}
                        className={`w-5 h-5 rounded-full border border-white text-[7px] font-black text-white flex items-center justify-center ${avatar.bg} shrink-0 select-none font-mono`}
                      >
                        {avatar.text}
                      </div>
                    ))}
                    <div className="w-5 h-5 rounded-full border border-white bg-neutral-100 text-neutral-500 text-[7px] font-bold flex items-center justify-center shrink-0 font-mono select-none">
                      +8
                    </div>
                  </div>

                  {project?.isOwner && (
                    <div className="flex items-center gap-1 z-20 pl-1 border-l border-neutral-200">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProject(project);
                        }}
                        title="Edit Project Space"
                        className="w-5 h-5 border border-neutral-200 bg-white text-neutral-500 hover:text-neutral-900 rounded-md flex items-center justify-center shadow-3xs cursor-pointer hover:border-neutral-300"
                      >
                        <FaEdit size={9} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteProjectId(project.id);
                        }}
                        title="Delete Project Space"
                        className="w-5 h-5 border border-neutral-100 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-md flex items-center justify-center shadow-3xs cursor-pointer"
                      >
                        <FaTrashAlt size={9} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* delete confirmation modal */}
      <ConfirmationModal
        isOpen={Boolean(deleteProjectId)}
        onClose={() => setDeleteProjectId(null)}
        onConfirm={handleDeleteProject}
        title="confirm Action"
        description="Are you sure you want to delete this project permanently? This operation cannot be undone. "
        confirmText="Delete"
      />
      <CreateProjectModal
        editingProject={editingProject}
        isOpen={isProjectModalOpen}
        onClose={() => {
          setEditingProject(null);
          setIsProjectModalOpen(false);
        }}
        onCreateProject={handleSaveOrUpdateProject}
      />
    </div>
  );
}
