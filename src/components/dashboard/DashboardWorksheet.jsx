import React from "react";
import { FaColumns, FaListUl, FaShareAlt } from "react-icons/fa";
import TasksSheet from "./TasksSheet";
import PlaceholdersSheet from "./PlaceholdersSheet";
import ProjectsSheet from "./ProjectsSheet";

export default function DashboardWorksheet({
  tasks,
  onCreateTask,
  activeTab,
  setActiveTab,
  activeProject,
  setActiveProject,
  headerTitle,
  viewType,
  setViewType,
  newTaskTitle,
  setNewTaskTitle,
  selectedProjectId,
  setSelectedProjectId,
  newTaskStatus,
  setNewTaskStatus,
  newTaskPriority,
  setNewTaskPriority,
  projects,
  filteredTasks,

  handleUpdateTaskStatus,
  handleDeleteTask,
  setIsProjectModalOpen,
}) {
  // Central Dynamic Sheet Router Engine
  const renderActiveWorkspaceSheet = () => {
    // 1. If an individual custom project is actively targeted on the sidebar
    if (activeProject) {
      return (
        <TasksSheet
          tasks={tasks}
          onCreateTasks={onCreateTasks}
          activeProject={activeProject}
          viewType={viewType}
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
          handleUpdateTaskStatus={handleUpdateTaskStatus}
          handleDeleteTask={handleDeleteTask}
        />
      );
    }

    // 2. Routing logic handled conditionally based on core selected sidebar tabs
    switch (activeTab) {
      case "dashboard":
      case "overview":
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
            onCreateTask={onCreateTask}
            activeProject={activeProject}
            viewType={viewType}
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
        <div className="mx-auto max-w-5xl space-y-6">
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
  );
}
