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
  FaCalendar,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import CreateProjectModal from "../components/dashboard/CreateProjectModal";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import TasksSheet from "../components/dashboard/TasksSheet";
import PlaceholdersSheet from "../components/dashboard/PlaceholdersSheet";
import ProjectsSheet from "../components/dashboard/ProjectsSheet";
import OverviewSheet from "../components/dashboard/OverviewSheet";
import ChatSheet from "../components/dashboard/ChatSheet";
import CalenderSheet from "../components/dashboard/CalenderSheet";

//navigation  items for the sidebar so to control the worksheet
const structuralMenuItems = [
  { id: "overview", label: "Overview", icon: FaHome },
  { id: "projects", label: "Projects", icon: FaFolder },
  { id: "tasks", label: "Tasks", icon: FaCheckCircle },
  { id: "meetings", label: "Meetings", icon: FaVideo },
  { id: "calender", label: "Calender", icon: FaCalendar },
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
  console.log(tasks);
  //for creating new project
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  //handles active tab in sidebar inorder to control worksheet
  const [activeTab, setActiveTab] = useState("overview");

  //handles project to be edited
  const [editingProject, setEditingProject] = useState(null);

  const getHeaderTitle = () => {
    if (activeProject) return activeProject.name;
    const currentItem = structuralMenuItems.find(
      (item) => item.id === activeTab,
    );
    return currentItem ? currentItem.label : "Dashboard Home Overview";
  };

  //save or update a project
  const handleSaveOrUpdateProject = (projectPayload) => {
    const projectExists = projects.some((p) => p.id === projectPayload.id);

    if (projectExists) {
      // Mode: Update state safely map matrix layout array updates
      setProjects(
        projects.map((p) => (p.id === projectPayload.id ? projectPayload : p)),
      );
    } else {
      // Mode: Create completely fresh data entry allocation array insert
      setProjects([...projects, projectPayload]);
    }
  };

  //creating a task
  const handleCreateTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  // Pipeline Filtering Architecture
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "tasks") return true;
    if (activeTab === "dashboard") return true;
    if (activeTab === "projects") return true;
    return false;
  });

  //updating the task status
  const handleUpdateTaskStatus = (taskId, nextStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: nextStatus } : t)),
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleDeleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };
  // Central Dynamic Sheet Router Logic
  const renderActiveWorkspaceSheet = () => {
    // 2. Routing logic handled conditionally based on core selected sidebar tabs
    switch (activeTab) {
      case "overview":
        return <OverviewSheet />;
      case "projects":
        return (
          <ProjectsSheet
            projects={projects}
            tasks={tasks}
            onDelete={handleDeleteProject}
            setIsProjectModalOpen={setIsProjectModalOpen}
            setActiveTab={setActiveTab}
            setEditingProject={setEditingProject}
          />
        );
      case "tasks":
        return (
          <TasksSheet
            tasks={tasks}
            onCreateTask={handleCreateTask}
            projects={projects}
            filteredTasks={filteredTasks}
            handleUpdateTaskStatus={handleUpdateTaskStatus}
            handleDeleteTask={handleDeleteTask}
          />
        );
      case "calender":
        return <CalenderSheet />;
      case "chat":
        return <ChatSheet />;
      case "meetings":
      case "timesheet":
        return <PlaceholdersSheet currentTab={activeTab} />;
      default:
        // Graceful fallback to Project Dashboard Overview list
        return <OverviewSheet />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans antialiased flex flex-col md:flex-row overflow-hidden h-screen w-screen">
      {/* SIDEBAR NAVIGATION UNIT */}
      <DashboardSidebar
        structuralMenuItems={structuralMenuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* PRIMARY WORKSPACE CANVAS CONTAINER */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Top Control Control Header Canvas Navbar */}
        <header className="h-14 border-b border-neutral-200/80 px-6 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-400">
            <span>Workspace</span>
            <span>/</span>

            <span className="text-neutral-950 font-bold">
              {activeTab
                ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                : "Overview"}
            </span>
          </div>

          <div className="flex items-center gap-2">
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
              <h1 className="mt-0.5 text-2xl font-black tracking-tight text-neutral-950 flex items-center gap-2.5">
                {activeTab
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
