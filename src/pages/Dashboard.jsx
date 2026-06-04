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
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import CreateProjectModal from "../components/dashboard/CreateProjectModal";
import DashboardWorksheet from "../components/dashboard/DashboardWorksheet";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeProject, setActiveProject] = useState(null);
  const [viewType, setViewType] = useState("board");

  // Form states for the unified top creator engine
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskStatus, setNewTaskStatus] = useState("To Do");
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
      projectId: activeProject ? activeProject.id : selectedProjectId,
      title: newTaskTitle.trim(),
      status: newTaskStatus,
      priority: newTaskPriority,
    };

    setTasks((prev) => [taskPayload, ...prev]);
    setNewTaskTitle("");
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
      <DashboardSidebar
        user={user}
        structuralMenuItems={structuralMenuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={logout}
      />

      {/* PRIMARY WORKSPACE CANVAS CONTAINER */}
      <DashboardWorksheet
        activeTab={activeTab}
        activeProject={activeProject}
        headerTitle={getHeaderTitle()}
        viewType={viewType}
        setViewType={setViewType}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        selectedProjectId={selectedProjectId}
        setSelectedProjectId={setSelectedProjectId}
        newTaskStatus={newTaskStatus}
        setNewTaskStatus={setNewTaskStatus}
        newTaskPriority={newTaskPriority}
        setNewTaskPriority={setNewTaskPriority}
        projects={projects}
        filteredTasks={filteredTasks}
        handleCreateTaskUnified={handleCreateTaskUnified}
        handleUpdateTaskStatus={handleUpdateTaskStatus}
        handleDeleteTask={handleDeleteTask}
      />

      <CreateProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onCreateProject={handleAddProject}
      />
    </div>
  );
}
