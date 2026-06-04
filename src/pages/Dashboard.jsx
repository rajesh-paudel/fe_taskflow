import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaChartBar,
  FaCheckCircle,
  FaRegStar,
  FaUsers,
  FaHome,
  FaVideo,
  FaClock,
  FaComments,
  FaFolder,
  FaColumns,
  FaListUl,
  FaShareAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import CreateProjectModal from "../components/dashboard/CreateProjectModal";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import TasksSheet from "../components/dashboard/TasksSheet";
import PlaceholdersSheet from "../components/dashboard/PlaceholdersSheet";
import ProjectsSheet from "../components/dashboard/ProjectsSheet";
import OverviewSheet from "../components/dashboard/OverviewSheet";

//navigation  items for the sidebar so to control the worksheet
const structuralMenuItems = [
  { id: "overview", label: "Overview", icon: FaHome },
  { id: "projects", label: "Projects", icon: FaFolder },
  { id: "tasks", label: "Tasks", icon: FaCheckCircle },
  { id: "meetings", label: "Meetings", icon: FaVideo },
  { id: "timesheet", label: "Timesheet", icon: FaClock },
  { id: "chat", label: "Chat", icon: FaComments },
];
export default function Dashboard() {
  const { user, logout } = useAuth();

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
  const [activeTab, setActiveTab] = useState("overview");
  const [activeProject, setActiveProject] = useState(null);
  const [viewType, setViewType] = useState("board");

  const [selectedProjectId, setSelectedProjectId] = useState("p1");

  const getHeaderTitle = () => {
    if (activeProject) return activeProject.name;
    const currentItem = structuralMenuItems.find(
      (item) => item.id === activeTab,
    );
    return currentItem ? currentItem.label : "Dashboard Home Overview";
  };

  const handleAddProject = (newProjectObj) => {
    setProjects((prevProjects) => [...prevProjects, newProjectObj]);
  };

  const handleCreateTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };
  // Pipeline Filtering Architecture
  const filteredTasks = tasks.filter((task) => {
    if (activeProject) return task.projectId === activeProject.id;
    if (activeTab === "tasks") return true;
    if (activeTab === "dashboard") return true;
    if (activeTab === "projects") return true;
    return false;
  });

  // Centralized Create Action Handler

  const handleUpdateTaskStatus = (taskId, nextStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t)),
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Central Dynamic Sheet Router Logic
  const renderActiveWorkspaceSheet = () => {
    // 1. If an individual custom project is actively targeted on the sidebar
    if (activeProject) {
      return (
        <TasksSheet
          tasks={tasks}
          onCreateTask={handleCreateTask}
          activeProject={activeProject}
          viewType={viewType}
          setNewTaskTitle={setNewTaskTitle}
          selectedProjectId={selectedProjectId}
          setSelectedProjectId={setSelectedProjectId}
          newTaskStatus={newTaskStatus}
          setNewTaskStatus={setNewTaskStatus}
          newTaskPriority={newTaskPriority}
          setNewTaskPriority={setNewTaskPriority}
          projects={projects}
          filteredTasks={filteredTasks}
          handleUpdateTaskStatus={handleUpdateTaskStatus}
          handleDeleteTask={handleDeleteTask}
        />
      );
    }

    // 2. Routing logic handled conditionally based on core selected sidebar tabs
    switch (activeTab) {
      case "overview":
        return <OverviewSheet />;
      case "project":
        return (
          <ProjectsSheet
            projects={projects}
            tasks={tasks}
            setIsProjectModalOpen={setIsProjectModalOpen}
            setActiveProject={setActiveProject}
            setActiveTab={setActiveTab}
          />
        );
      case "tasks":
        return (
          <TasksSheet
            tasks={tasks}
            onCreateTask={handleCreateTask}
            activeProject={activeProject}
            viewType={viewType}
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
            projects={projects}
            filteredTasks={filteredTasks}
            handleUpdateTaskStatus={handleUpdateTaskStatus}
            handleDeleteTask={handleDeleteTask}
          />
        );
      case "meetings":
      case "timesheet":
      case "chat":
        return <PlaceholdersSheet currentTab={activeTab} />;
      default:
        // Graceful fallback to Project Dashboard Overview list
        return (
          <ProjectsSheet
            projects={projects}
            tasks={filteredTasks}
            setIsProjectModalOpen={setIsProjectModalOpen}
            setActiveProject={setActiveProject}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans antialiased flex flex-col md:flex-row overflow-hidden h-screen w-screen">
      {/* SIDEBAR NAVIGATION UNIT */}
      <DashboardSidebar
        user={user}
        structuralMenuItems={structuralMenuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={logout}
      />

      {/* PRIMARY WORKSPACE CANVAS CONTAINER */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Top Control Control Header Canvas Navbar */}
        <header className="h-14 border-b border-neutral-200/80 px-6 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
            <span>Workspace</span>
            <span>/</span>
            {activeProject && (
              <span className={`w-2 h-2 rounded-full ${activeProject.color}`} />
            )}
            <span className="text-neutral-950 font-bold">
              {activeProject
                ? activeProject.name
                : activeTab
                  ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                  : "Overview"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Main Top Header Controls are hidden for non-task sheets to keep UI decluttered */}
            {(activeProject || activeTab === "tasks") && (
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
            )}
            <button className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-950 px-2.5 py-1.5 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer">
              <FaShareAlt size={11} />
              <span>Share Space</span>
            </button>
          </div>
        </header>

        {/* Primary Display Work Surface Canvas Container Area */}
        <div className="flex-1 overflow-auto p-6 md:p-8 bg-white">
          <div className="mx-auto max-w-6xl space-y-6">
            {/* Dynamic Context Breadcrumb Display Header Title text */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-mono">
                {activeProject
                  ? "Dedicated Project Area"
                  : "Global Worksheets Engine"}
              </p>
              <h1 className="mt-0.5 text-2xl font-black tracking-tight text-neutral-950 flex items-center gap-2.5">
                {activeProject && (
                  <div
                    className={`w-3 h-3 rounded-full ${activeProject.color}`}
                  />
                )}
                {activeProject
                  ? activeProject.name
                  : activeTab
                    ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                    : "Workspace Overview"}
              </h1>
            </div>

            {/* DYNAMIC PIPELINE ELEMENT ROUTER CALL */}
            {renderActiveWorkspaceSheet()}
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
