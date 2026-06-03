import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaChartBar,
  FaCheckCircle,
  FaCog,
  FaFolder,
  FaHome,
  FaRegStar,
  FaUsers,
  FaPlus,
  FaSearch,
  FaShareAlt,
  FaColumns,
  FaListUl,
  FaTrashAlt,
  FaTag,
} from "react-icons/fa";
import CreateProjectModal from "../components/dashboard/CreateProjectModal";

const structuralMenuItems = [
  { id: "tasks", label: "My Tasks", icon: FaCheckCircle },
  { id: "calendar", label: "Calendar View", icon: FaCalendarAlt },
  { id: "team", label: "Team Space", icon: FaUsers },
  { id: "analytics", label: "Analytics Matrix", icon: FaChartBar },
  { id: "favorites", label: "Favorites", icon: FaRegStar },
];

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
};

export default function Dashboard() {
  const storedUser = getStoredUser();
  const userName = storedUser.name || "Rajesh Paudel";
  const userEmail = storedUser.email || "rajesh@amrit.edu.np";

  // Core Projects Array State
  const [projects, setProjects] = useState([
    {
      id: "p1",
      name: "Website Redesign",
      color: "bg-blue-500",
      desc: "Marketing site refresh",
    },
    {
      id: "p2",
      name: "Mobile App",
      color: "bg-purple-500",
      desc: "iOS and Android client build",
    },
    {
      id: "p3",
      name: "Marketing",
      color: "bg-emerald-500",
      desc: "Q3 campaign rollout",
    },
  ]);

  // Master Relational Task Collection
  const [tasks, setTasks] = useState([
    {
      id: "t1",
      projectId: "p1",
      title: "Refactor global navigation bar to Tailwind CSS v4",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "t2",
      projectId: "p1",
      title: "Optimize hero asset bundle image footprints",
      status: "To Do",
      priority: "Medium",
    },
    {
      id: "t3",
      projectId: "p2",
      title: "Draft deployment schema manifest configurations",
      status: "To Do",
      priority: "High",
    },
    {
      id: "t4",
      projectId: "p3",
      title: "Schedule copywriter syncing sessions",
      status: "Done",
      priority: "Low",
    },
  ]);

  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeProject, setActiveProject] = useState(null);
  const [viewType, setViewType] = useState("board");

  // Form states for the unified top creator engine
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskStatus, setNewTaskStatus] = useState("To Do");
  const [selectedProjectId, setSelectedProjectId] = useState("p1"); // Used for global context fallback

  const getHeaderTitle = () => {
    if (activeProject) return activeProject.name;
    const currentItem = structuralMenuItems.find(
      (item) => item.id === activeTab,
    );
    return currentItem ? currentItem.label : "Dashboard Home Overview";
  };

  const handleMenuClick = (tabId) => {
    setActiveTab(tabId);
    setActiveProject(null);
  };

  const handleProjectClick = (projectObj) => {
    setActiveProject(projectObj);
    setActiveTab(null);
  };

  const handleAddProject = (newProjectObj) => {
    setProjects((prevProjects) => [...prevProjects, newProjectObj]);
  };

  // Pipeline Filtering Architecture
  const filteredTasks = tasks.filter((task) => {
    if (activeProject) return task.projectId === activeProject.id;
    if (activeTab === "tasks") return true;
    if (activeTab === "dashboard") return true;
    return false;
  });

  // Centralized Create Action Handler
  const handleCreateTaskUnified = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const taskPayload = {
      id: `t_${Date.now()}`,
      // Context logic: if in a project, lock it down. Otherwise, read the dropdown selector state
      projectId: activeProject ? activeProject.id : selectedProjectId,
      title: newTaskTitle.trim(),
      status: newTaskStatus,
      priority: newTaskPriority,
    };

    setTasks((prev) => [taskPayload, ...prev]);
    setNewTaskTitle(""); // Clean out title input field
  };

  const handleUpdateTaskStatus = (taskId, nextStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t)),
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans antialiased flex flex-col md:flex-row overflow-hidden h-screen w-screen">
      {/* SIDEBAR NAVIGATION UNIT */}
      <aside className="w-full md:w-68 shrink-0 border-b md:border-b-0 md:border-r border-neutral-200/80 bg-neutral-50 p-4 flex flex-col justify-between h-auto md:h-full overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-1">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-sm font-black text-white font-mono shadow-xs">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-black text-neutral-950 tracking-tight">
                {userName}
              </p>
              <p className="truncate text-[10px] text-neutral-400 font-mono font-medium">
                {userEmail}
              </p>
            </div>
          </div>

          <nav className="space-y-5">
            <div className="relative group">
              <FaSearch className="absolute left-3 top-2.5 text-xs text-neutral-400 group-focus-within:text-neutral-950 transition-colors" />
              <input
                type="text"
                placeholder="Quick Search (⌘K)"
                className="w-full bg-neutral-200/40 border border-neutral-200/30 rounded-lg pl-8 pr-3 py-1.5 text-xs font-medium placeholder-neutral-400 focus:outline-hidden"
              />
            </div>

            <button
              onClick={() => {
                setActiveTab("dashboard");
                setActiveProject(null);
              }}
              className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "dashboard" && !activeProject
                  ? "bg-white text-neutral-950 shadow-xs border border-neutral-200/60"
                  : "text-neutral-500 hover:bg-neutral-200/40 hover:text-neutral-950"
              }`}
            >
              <FaHome className="text-xs" />
              Dashboard Home
            </button>

            {/* Collaborative Projects List Block */}
            <section className="space-y-1">
              <div className="flex items-center justify-between px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-2">
                <span className="flex items-center gap-1.5">
                  <FaFolder /> Projects
                </span>
                <button
                  onClick={() => setIsProjectModalOpen(true)}
                  className="hover:text-neutral-950 p-0.5 rounded transition-colors cursor-pointer"
                >
                  <FaPlus size={8} />
                </button>
              </div>
              <div className="space-y-0.5">
                {projects?.map((project) => (
                  <button
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className={`w-full flex items-center gap-2 text-left rounded-md px-3 py-1.5 text-xs font-medium transition-colors truncate cursor-pointer ${
                      activeProject?.id === project.id
                        ? "bg-neutral-200/60 text-neutral-950 font-bold"
                        : "text-neutral-500 hover:bg-neutral-200/40 hover:text-neutral-950"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${project.color || "bg-neutral-400"}`}
                    />
                    <span className="truncate">{project.name}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Workspace Navigation Menu options */}
            <section className="space-y-0.5">
              <div className="px-3 text-[10px] font-bold uppercase tracking-widest text-neutral-400 font-mono mb-2">
                Workspace Views
              </div>
              {structuralMenuItems.map((item) => {
                const Icon = item.icon;
                const isSelected = activeTab === item.id && !activeProject;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id)}
                    className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white text-neutral-950 font-bold shadow-xs border border-neutral-200/60"
                        : "text-neutral-500 hover:bg-neutral-200/40 hover:text-neutral-950"
                    }`}
                  >
                    <Icon
                      className={
                        isSelected ? "text-neutral-950" : "text-neutral-400"
                      }
                    />
                    {item.label}
                  </button>
                );
              })}
            </section>
          </nav>
        </div>

        <button
          onClick={() => {
            setActiveTab("settings");
            setActiveProject(null);
          }}
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-neutral-500 hover:bg-neutral-200/40 hover:text-neutral-950 mt-4 cursor-pointer"
        >
          <FaCog className="text-neutral-400" />
          Workspace Settings
        </button>
      </aside>

      {/* PRIMARY WORKSPACE CANVAS CONTAINER */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Top Control Navbar */}
        <header className="h-14 border-b border-neutral-200/80 px-6 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
            <span>Workspace</span>
            <span>/</span>
            {activeProject && (
              <span className={`w-2 h-2 rounded-full ${activeProject.color}`} />
            )}
            <span className="text-neutral-950 font-bold">
              {getHeaderTitle()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-neutral-100 p-0.5 rounded-md border border-neutral-200/40 mr-2">
              <button
                onClick={() => setViewType("board")}
                className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${viewType === "board" ? "bg-white text-neutral-950 shadow-3xs" : "text-neutral-400 hover:text-neutral-950"}`}
              >
                <FaColumns size={11} />
              </button>
              <button
                onClick={() => setViewType("list")}
                className={`p-1.5 rounded-md text-xs transition-all cursor-pointer ${viewType === "list" ? "bg-white text-neutral-950 shadow-3xs" : "text-neutral-400 hover:text-neutral-950"}`}
              >
                <FaListUl size={11} />
              </button>
            </div>
            <button className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-950 px-2.5 py-1.5 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer">
              <FaShareAlt size={11} />
              <span>Share Space</span>
            </button>
          </div>
        </header>

        {/* Display Workspace Canvas Sheet */}
        <div className="flex-1 overflow-auto p-6 md:p-8 bg-white">
          <div className="mx-auto max-w-5xl space-y-6">
            {/* Context Heading */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                {activeProject
                  ? "Dedicated Project Workspace"
                  : "Global Aggregated Matrix"}
              </p>
              <h1 className="mt-0.5 text-2xl font-black tracking-tight text-neutral-950 flex items-center gap-2.5">
                {activeProject && (
                  <div
                    className={`w-3 h-3 rounded-full ${activeProject.color}`}
                  />
                )}
                {getHeaderTitle()}
              </h1>
            </div>

            {/* ========================================== */}
            {/* UNIFIED PREMIUM TASK CREATOR SHEET BAR     */}
            {/* ========================================== */}
            <form
              onSubmit={handleCreateTaskUnified}
              className="bg-neutral-50 border border-neutral-200/60 rounded-xl p-3 shadow-3xs flex flex-col md:flex-row gap-2 items-center"
            >
              <div className="w-full md:flex-1">
                <input
                  type="text"
                  required
                  placeholder={
                    activeProject
                      ? `Log a fast item inside "${activeProject.name}"...`
                      : "Log a fresh task parameter globally..."
                  }
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-1.5 text-xs font-medium placeholder-neutral-400 focus:outline-hidden focus:border-neutral-950 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                {/* 1. Project Selector Dropdown: Shows ONLY if on global views */}
                {!activeProject && (
                  <div className="flex items-center bg-white border border-neutral-200 rounded-lg px-2 py-1">
                    <FaFolder className="text-neutral-400 mr-1.5 text-[10px]" />
                    <select
                      value={selectedProjectId}
                      onChange={(e) => setSelectedProjectId(e.target.value)}
                      className="text-xs font-semibold bg-transparent text-neutral-700 focus:outline-hidden cursor-pointer"
                    >
                      {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 2. Status Destination Placement */}
                <select
                  value={newTaskStatus}
                  onChange={(e) => setNewTaskStatus(e.target.value)}
                  className="text-xs font-medium bg-white border border-neutral-200 rounded-lg px-2 py-1 text-neutral-600 focus:outline-hidden cursor-pointer"
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>

                {/* 3. Priority Configuration Toggle */}
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value)}
                  className="text-xs font-medium bg-white border border-neutral-200 rounded-lg px-2 py-1 text-neutral-600 focus:outline-hidden cursor-pointer"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>

                <button
                  type="submit"
                  className="bg-neutral-950 text-white font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-neutral-900 transition-all shadow-3xs shrink-0 cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>

            {/* View Render Matrix Toggle */}
            {viewType === "board" ? (
              /* KANBAN GRID (Now clean and empty of inputs at the bottom) */
              <div className="grid gap-4 md:grid-cols-3 items-start">
                {["To Do", "In Progress", "Done"].map((status) => {
                  const statusSpecificTasks = filteredTasks.filter(
                    (t) => t.status === status,
                  );

                  return (
                    <section
                      key={status}
                      className="rounded-xl border border-neutral-200/60 bg-neutral-50/50 p-4 space-y-3 flex flex-col max-h-[65vh] overflow-hidden"
                    >
                      <div className="flex items-center justify-between border-b border-neutral-200/50 pb-2 shrink-0">
                        <h2 className="text-xs font-bold text-neutral-950 uppercase tracking-wider font-mono">
                          {status}
                        </h2>
                        <span className="text-[10px] px-1.5 py-0.5 bg-neutral-200/80 text-neutral-700 font-bold rounded-sm font-mono">
                          {statusSpecificTasks.length}
                        </span>
                      </div>

                      <div className="space-y-2 overflow-y-auto pr-0.5 flex-1 min-h-[100px]">
                        {statusSpecificTasks.length === 0 ? (
                          <div className="rounded-lg border border-dashed border-neutral-200 bg-white p-6 text-center">
                            <p className="text-[11px] text-neutral-400">
                              No tasks allocated here
                            </p>
                          </div>
                        ) : (
                          statusSpecificTasks.map((task) => {
                            const parentProj = projects.find(
                              (p) => p.id === task.projectId,
                            );
                            return (
                              <div
                                key={task.id}
                                className="group rounded-xl border border-neutral-200 bg-white p-3.5 space-y-2.5 hover:border-neutral-400 transition-all shadow-3xs"
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-xs font-semibold text-neutral-900 leading-tight tracking-tight">
                                    {task.title}
                                  </p>
                                  <button
                                    onClick={() => handleDeleteTask(task.id)}
                                    className="text-neutral-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 p-0.5 transition-all cursor-pointer"
                                  >
                                    <FaTrashAlt size={10} />
                                  </button>
                                </div>
                                <div className="flex items-center justify-between text-[10px] pt-1">
                                  <span
                                    className={`px-1.5 py-0.5 rounded font-bold uppercase text-[9px] tracking-wider ${
                                      task.priority === "High"
                                        ? "bg-rose-50 text-rose-700"
                                        : task.priority === "Medium"
                                          ? "bg-amber-50 text-amber-700"
                                          : "bg-neutral-100 text-neutral-600"
                                    }`}
                                  >
                                    {task.priority}
                                  </span>
                                  <select
                                    value={task.status}
                                    onChange={(e) =>
                                      handleUpdateTaskStatus(
                                        task.id,
                                        e.target.value,
                                      )
                                    }
                                    className="bg-neutral-50 border border-neutral-200 rounded px-1.5 py-0.5 text-neutral-500 focus:outline-hidden text-[10px] font-medium cursor-pointer"
                                  >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">
                                      In Progress
                                    </option>
                                    <option value="Done">Done</option>
                                  </select>
                                </div>
                                {!activeProject && parentProj && (
                                  <div className="flex items-center gap-1.5 pt-2 border-t border-neutral-100 text-[9px] font-semibold text-neutral-400">
                                    <div
                                      className={`w-1.5 h-1.5 rounded-full ${parentProj.color}`}
                                    />
                                    <span className="truncate">
                                      {parentProj.name}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </section>
                  );
                })}
              </div>
            ) : (
              /* COMPACT LIST ROW MATRIX */
              <div className="border border-neutral-200/80 rounded-xl overflow-hidden bg-white shadow-3xs divide-y divide-neutral-100">
                {["To Do", "In Progress", "Done"].map((status) => {
                  const statusSpecificTasks = filteredTasks.filter(
                    (t) => t.status === status,
                  );

                  return (
                    <div key={status} className="p-4 space-y-2 bg-white">
                      <div className="text-xs font-bold text-neutral-950 uppercase font-mono tracking-wider mb-3">
                        {status} Container
                      </div>
                      <div className="space-y-1.5">
                        {statusSpecificTasks.map((task) => {
                          const parentProj = projects.find(
                            (p) => p.id === task.projectId,
                          );
                          return (
                            <div
                              key={task.id}
                              className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-100 hover:border-neutral-200 transition-colors bg-neutral-50/20 text-xs"
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <input
                                  type="checkbox"
                                  checked={task.status === "Done"}
                                  onChange={() =>
                                    handleUpdateTaskStatus(
                                      task.id,
                                      task.status === "Done" ? "To Do" : "Done",
                                    )
                                  }
                                  className="rounded border-neutral-300 text-neutral-950 focus:ring-0 cursor-pointer h-3.5 w-3.5 shrink-0"
                                />
                                <span
                                  className={`font-medium truncate text-neutral-800 ${task.status === "Done" ? "line-through text-neutral-400" : ""}`}
                                >
                                  {task.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-3 ml-4 shrink-0">
                                {!activeProject && parentProj && (
                                  <span className="inline-flex items-center gap-1 text-[10px] text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded font-medium">
                                    <span
                                      className={`w-1 h-1 rounded-full ${parentProj.color}`}
                                    />
                                    {parentProj.name}
                                  </span>
                                )}
                                <span
                                  className={`text-[9px] font-bold tracking-wide uppercase px-1.5 py-0.5 rounded ${task.priority === "High" ? "bg-rose-50 text-rose-700" : "bg-neutral-100 text-neutral-600"}`}
                                >
                                  {task.priority}
                                </span>
                                <button
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="text-neutral-300 hover:text-rose-600 p-1 cursor-pointer"
                                >
                                  <FaTrashAlt size={10} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        {statusSpecificTasks.length === 0 && (
                          <p className="text-[10px] text-neutral-400 italic pl-1">
                            No active properties inside this tracking field.
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      <CreateProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onCreateProject={handleAddProject}
      />
    </div>
  );
}
