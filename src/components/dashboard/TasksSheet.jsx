import React, { useState } from "react";
import {
  FaTrashAlt,
  FaPlus,
  FaFolder,
  FaCalendarAlt,
  FaEllipsisH,
  FaUserPlus,
  FaTimes,
  FaStream,
} from "react-icons/fa";
import CreateTaskModal from "./createTaskModal";

export default function TasksSheet({
  tasks,
  onCreateTask,
  activeProject,
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
}) {
  //  LOCAL VIEW STATE: Toggles cleanly between board, list, and gantt
  const [localViewType, setLocalViewType] = useState("board");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const kanbanColumns = [
    { key: "To Do", label: "To Do" },
    { key: "In Progress", label: "In Progress" },
    { key: "Done", label: "Completed" },
  ];

  // Static timeline columns representing a 7-day sprint block layout for the Gantt matrix
  const timelineDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleAddEmailTag = () => {
    const cleanEmail = emailInput.trim().toLowerCase();
    if (cleanEmail && !newTaskAssignees.includes(cleanEmail)) {
      setNewTaskAssignees([...newTaskAssignees, cleanEmail]);
      setEmailInput("");
    }
  };

  const handleRemoveEmailTag = (emailToRemove) => {
    setNewTaskAssignees(
      newTaskAssignees.filter((email) => email !== emailToRemove),
    );
  };

  const formatCardDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-6 relative">
      {/* 🧭 TOP VIEWS SUB-NAVBAR CONTROL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-3 gap-3">
        <div className="flex items-center gap-5 text-xs font-semibold text-neutral-400">
          {["List", "Grid", "Calendar", "Gantt", "Kanban"].map((tabName) => {
            // Map tabs to their rendering layout tokens
            const layoutKey =
              tabName === "Kanban"
                ? "board"
                : tabName === "List"
                  ? "list"
                  : tabName === "Gantt"
                    ? "gantt"
                    : null;

            const isActive = localViewType === layoutKey;

            return (
              <button
                key={tabName}
                type="button"
                disabled={!layoutKey}
                onClick={() => layoutKey && setLocalViewType(layoutKey)}
                className={`transition-all pb-3 -mb-[13px] border-b-2 ${
                  !layoutKey
                    ? "opacity-30 cursor-not-allowed"
                    : "cursor-pointer"
                } ${
                  isActive
                    ? "text-neutral-950 border-neutral-950 font-bold"
                    : "border-transparent hover:text-neutral-700"
                }`}
              >
                {tabName}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 justify-end">
          <button
            type="button"
            onClick={() => setIsTaskModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-[#5A24CA] hover:bg-[#4A1CA5] text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-all shadow-3xs cursor-pointer"
          >
            <FaPlus size={10} />
            <span>Add New Task</span>
          </button>
        </div>
      </div>

      {/* 📊 INTERCHANGE LAYOUT MATRIX RENDERING */}
      {localViewType === "board" && (
        /* KANBAN BOARD VIEW LAYOUT */
        <div className="grid gap-4 md:grid-cols-3 items-start pt-2">
          {kanbanColumns.map((col) => {
            const columnTasks = filteredTasks.filter(
              (t) => t.status === col.key,
            );
            return (
              <section
                key={col.key}
                className="rounded-xl border border-neutral-200/60 bg-[#F4F5F7]/60 p-3.5 space-y-3.5 flex flex-col max-h-[70vh] overflow-hidden"
              >
                <div className="flex items-center justify-between shrink-0 px-0.5">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xs font-black text-neutral-900 tracking-tight">
                      {col.label}
                    </h2>
                    <span className="text-[10px] bg-neutral-200 text-neutral-600 font-bold rounded-full px-2 py-0.5 font-mono">
                      {columnTasks.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    <FaEllipsisH size={12} />
                  </button>
                </div>

                <div className="space-y-2.5 overflow-y-auto pr-0.5 flex-1 min-h-[150px]">
                  {columnTasks.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-neutral-200 bg-white p-6 text-center">
                      <p className="text-[11px] text-neutral-400">
                        No managed action targets here.
                      </p>
                    </div>
                  ) : (
                    columnTasks.map((task) => {
                      const parentProj = projects.find(
                        (p) => p.id === task.projectId,
                      );
                      return (
                        <div
                          key={task.id}
                          className="group bg-white rounded-xl border border-neutral-200 p-3.5 space-y-3 shadow-3xs hover:border-neutral-400 transition-all"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-bold text-neutral-950 leading-snug tracking-tight">
                              {task.title}
                            </p>
                            <button
                              type="button"
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-neutral-300 hover:text-rose-600 opacity-0 group-hover:opacity-100 p-0.5 transition-opacity cursor-pointer shrink-0"
                            >
                              <FaTrashAlt size={9} />
                            </button>
                          </div>

                          {(task.startDate || task.dueDate) && (
                            <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-medium bg-neutral-50 border border-neutral-100 rounded-md px-2 py-1 w-fit">
                              <FaCalendarAlt
                                size={9}
                                className="text-neutral-400"
                              />
                              <span>
                                {task.startDate
                                  ? formatCardDate(task.startDate)
                                  : "TBD"}{" "}
                                –{" "}
                                {task.dueDate
                                  ? formatCardDate(task.dueDate)
                                  : "TBD"}
                              </span>
                            </div>
                          )}

                          {task.assigneeEmails &&
                            task.assigneeEmails.length > 0 && (
                              <div className="flex flex-wrap gap-1 items-center pt-1">
                                {task.assigneeEmails.map((email, idx) => (
                                  <span
                                    key={idx}
                                    title={email}
                                    className="text-[9px] px-1.5 py-0.5 font-bold tracking-tight bg-neutral-100 border border-neutral-200 rounded-sm text-neutral-600 truncate max-w-[100px]"
                                  >
                                    {email.split("@")[0]}
                                  </span>
                                ))}
                              </div>
                            )}

                          <div className="flex items-center justify-between text-[10px] pt-1 border-t border-neutral-50">
                            <span
                              className={`px-1.5 py-0.5 rounded-sm font-bold uppercase text-[9px] tracking-wider ${
                                task.priority === "High"
                                  ? "bg-rose-50 text-rose-700"
                                  : task.priority === "Medium"
                                    ? "bg-blue-50 text-blue-700"
                                    : "bg-neutral-100 text-neutral-600"
                              }`}
                            >
                              {task.priority}
                            </span>

                            <select
                              value={task.status}
                              onChange={(e) =>
                                handleUpdateTaskStatus(task.id, e.target.value)
                              }
                              className="bg-neutral-50 border border-neutral-200 rounded px-1 py-0.5 text-neutral-500 text-[10px] font-medium focus:outline-hidden cursor-pointer"
                            >
                              <option value="To Do">To Do</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Done">Completed</option>
                            </select>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* 📊 GANTT VIEW TIMELINE LAYOUT SYSTEM */}
      {localViewType === "gantt" && (
        <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-3xs animate-in fade-in duration-200">
          {/* Gantt Matrix Operational Header */}
          <div className="bg-neutral-50/80 p-3.5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaStream className="text-neutral-500" size={12} />
              <h3 className="text-xs font-bold text-neutral-900">
                Sprint Roadmap Timeline
              </h3>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono">
              June 2026 Grid
            </span>
          </div>

          {/* Core Gantt View Area Table Grid */}
          <div className="overflow-x-auto">
            <div className="min-w-[760px] divide-y divide-neutral-100">
              {/* Gantt Timeline Labels Row */}
              <div className="grid grid-cols-12 bg-neutral-50/40 text-[10px] font-bold text-neutral-400 uppercase tracking-wider text-center py-2">
                <div className="col-span-4 text-left pl-4 self-center">
                  Task Identity Target
                </div>
                <div className="col-span-8 grid grid-cols-7 border-l border-neutral-100">
                  {timelineDays.map((day, i) => (
                    <div
                      key={i}
                      className="py-0.5 border-r border-neutral-100/60 last:border-0"
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              {/* Gantt Project Tasks Row List */}
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-400">
                  No tracked data entries to map onto timeline coordinates.
                </div>
              ) : (
                filteredTasks.map((task) => {
                  // Elegant UI layout simulations: assign visual column offsets for Gantt rendering
                  const isHigh = task.priority === "High";
                  const isInProgress = task.status === "In Progress";
                  const isCompleted = task.status === "Done";

                  // Dynamic Gantt span calculation logic simulation matching specific task status properties
                  let spanClass =
                    "col-start-2 col-span-3 bg-amber-400/20 text-amber-800 border-amber-300"; // Default 'To Do' span positioning
                  if (isInProgress)
                    spanClass =
                      "col-start-3 col-span-4 bg-[#5A24CA]/10 text-[#5A24CA] border-[#5A24CA]/20";
                  if (isCompleted)
                    spanClass =
                      "col-start-1 col-span-7 bg-emerald-50 text-emerald-800 border-emerald-200";

                  return (
                    <div
                      key={task.id}
                      className="grid grid-cols-12 items-center group hover:bg-neutral-50/40 transition-colors py-3"
                    >
                      {/* Left Column Label Block */}
                      <div className="col-span-4 pl-4 pr-3 min-w-0">
                        <p className="text-xs font-bold text-neutral-900 truncate leading-tight">
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className={`text-[8px] font-black tracking-wide uppercase ${isHigh ? "text-rose-600" : "text-neutral-400"}`}
                          >
                            {task.priority} Priority
                          </span>
                          {task.assigneeEmails &&
                            task.assigneeEmails.length > 0 && (
                              <span className="text-[9px] text-neutral-400 truncate max-w-[120px]">
                                • {task.assigneeEmails[0].split("@")[0]}
                              </span>
                            )}
                        </div>
                      </div>

                      {/* Right Timeline Grid Lane Area */}
                      <div className="col-span-8 grid grid-cols-7 h-full items-center border-l border-neutral-100 relative min-h-[36px]">
                        {/* Elegant Timeline Vertical Background Grid Overlay Bars */}
                        {Array(7)
                          .fill(0)
                          .map((_, idx) => (
                            <div
                              key={idx}
                              className="absolute top-0 bottom-0 border-r border-neutral-100/40 pointer-events-none"
                              style={{ left: `${(idx + 1) * (100 / 7)}%` }}
                            />
                          ))}

                        {/* Interactive Dynamic Gantt Bar Item Component */}
                        <div
                          className={`relative mx-2 p-1.5 rounded-lg border text-[10px] font-bold tracking-tight shadow-3xs truncate flex items-center justify-between transition-all ${spanClass}`}
                        >
                          <span className="truncate">{task.status}</span>
                          <span className="text-[9px] font-mono opacity-80 shrink-0 ml-1">
                            {task.startDate
                              ? formatCardDate(task.startDate)
                              : "TBD"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* 📊 LIST VIEW FALLBACK COMPONENT */}
      {localViewType === "list" && (
        <div className="border border-neutral-200/80 rounded-xl overflow-hidden bg-white shadow-3xs divide-y divide-neutral-100">
          {kanbanColumns.map((col) => {
            const columnTasks = filteredTasks.filter(
              (t) => t.status === col.key,
            );
            return (
              <div key={col.key} className="p-4 space-y-2 bg-white">
                <div className="text-xs font-bold text-neutral-950 uppercase font-mono tracking-wider mb-2">
                  {col.label} Group
                </div>
                <div className="space-y-1.5">
                  {columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-100 hover:border-neutral-200 bg-neutral-50/20 text-xs"
                    >
                      <span className="font-semibold text-neutral-800 truncate">
                        {task.title}
                      </span>
                      <div className="flex items-center gap-3 ml-4 shrink-0">
                        <span className="text-[10px] text-neutral-400">
                          {task.dueDate
                            ? formatCardDate(task.dueDate)
                            : "No Due Date"}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-neutral-300 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <FaTrashAlt size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 🧱 PREMIUM TASK CREATOR MODAL LAYER */}
      {isTaskModalOpen && (
        <CreateTaskModal
          isTaskModalOpen={isTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          projects={projects}
          onCreateTask={onCreateTask}
        />
      )}
    </div>
  );
}
