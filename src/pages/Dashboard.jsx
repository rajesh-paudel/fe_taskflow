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
import { useSearchParams } from "react-router-dom";

import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import TasksSheet from "../components/dashboard/TasksSheet";
import PlaceholdersSheet from "../components/dashboard/PlaceholdersSheet";
import ProjectsSheet from "../components/dashboard/ProjectsSheet";
import OverviewSheet from "../components/dashboard/OverviewSheet";
import ChatSheet from "../components/dashboard/ChatSheet";
import CalenderSheet from "../components/dashboard/CalenderSheet";
import MeetingSheet from "../components/dashboard/MeetingSheet";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";
  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  const getHeaderTitle = () => {
    if (activeProject) return activeProject.name;
    const currentItem = structuralMenuItems.find(
      (item) => item.id === activeTab,
    );
    return currentItem ? currentItem.label : "Dashboard Home Overview";
  };

  // Central Dynamic Sheet Router Logic
  const renderActiveWorkspaceSheet = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewSheet />;
      case "projects":
        return <ProjectsSheet />;
      case "tasks":
        return <TasksSheet />;
      case "calender":
        return <CalenderSheet />;
      case "chat":
        return <ChatSheet />;
      case "meetings":
        return <MeetingSheet />;
      default:
        return <OverviewSheet />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans antialiased flex flex-col md:flex-row overflow-hidden h-screen w-screen">
      {/* SIDEBAR NAVIGATION UNIT */}
      <DashboardSidebar
        structuralMenuItems={structuralMenuItems}
        activeTab={activeTab}
        onTabChange={handleTabChange}
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
    </div>
  );
}
