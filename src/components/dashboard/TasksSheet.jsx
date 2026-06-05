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
  FaEdit,
} from "react-icons/fa";
import CreateTaskModal from "./createTaskModal";

export default function TasksSheet({
  tasks,
  onCreateTask,
  projects,
  filteredTasks,
  handleUpdateTaskStatus,
  handleDeleteTask,
  handleEditTask, // Ensure this hook is handled by your upstream task array state layer
}) {
  // LOCAL VIEW STATE
  const [localViewType, setLocalViewType] = useState("board");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTaskPayload, setEditingTaskPayload] = useState(null);

  // Confirmation Delete States
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);

  const kanbanColumns = [
    { key: "To Do", label: "To Do" },
    { key: "In Progress", label: "In Progress" },
    { key: "Done", label: "Completed" },
  ];

  const timelineDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const formatCardDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const triggerOpenCreateMode = () => {
    setEditingTaskPayload(null);
    setIsTaskModalOpen(true);
  };

  const triggerOpenEditMode = (task) => {
    setEditingTaskPayload(task);
    setIsTaskModalOpen(true);
  };

  const executeConfirmedDeletion = () => {
    if (deleteConfirmationId) {
      handleDeleteTask(deleteConfirmationId);
      setDeleteConfirmationId(null);
    }
  };

  return (
    <div className="space-y-6 relative">
      {/* 🧭 TOP VIEWS SUB-NAVBAR CONTROL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-3 gap-3">
        <div className="flex items-center gap-5 text-xs font-semibold text-neutral-400">
          {["List", "Grid", "Calendar", "Gantt", "Kanban"].map((tabName) => {
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
                className={`transition-colors pb-3 -mb-[13px] border-b-2 ${
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
            onClick={triggerOpenCreateMode}
            className="inline-flex items-center gap-1.5 bg-[#5A24CA] hover:bg-[#4A1CA5] text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-3xs cursor-pointer"
          >
            <FaPlus size={10} />
            <span>Add New Task</span>
          </button>
        </div>
      </div>

      {/* 📊 KANBAN BOARD VIEW LAYOUT */}
      {localViewType === "board" && (
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
                          className="bg-white rounded-xl border border-neutral-200 p-3.5 space-y-3 shadow-3xs"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 space-y-1">
                              <p className="text-xs font-bold text-neutral-950 leading-snug tracking-tight break-words">
                                {task.title}
                              </p>
                              {/* Parent Project Reference Badge */}
                              <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-medium font-mono">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${parentProj?.color || "bg-neutral-400"}`}
                                />
                                <span className="truncate">
                                  {parentProj?.name || "Unassigned Space"}
                                </span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => triggerOpenEditMode(task)}
                                className="text-neutral-400 hover:text-neutral-900 p-1 cursor-pointer"
                                title="Edit Task"
                              >
                                <FaEdit size={10} />
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmationId(task.id)}
                                className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                                title="Delete Task"
                              >
                                <FaTrashAlt size={9} />
                              </button>
                            </div>
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
        <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-3xs">
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

          <div className="overflow-x-auto">
            <div className="min-w-[840px] divide-y divide-neutral-100">
              <div className="grid grid-cols-12 bg-neutral-50/40 text-[10px] font-bold text-neutral-400 uppercase tracking-wider text-center py-2">
                <div className="col-span-5 text-left pl-4 self-center">
                  Task Identity Matrix
                </div>
                <div className="col-span-7 grid grid-cols-7 border-l border-neutral-100">
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

              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center text-xs text-neutral-400">
                  No tracked data entries available.
                </div>
              ) : (
                filteredTasks.map((task) => {
                  const parentProj = projects.find(
                    (p) => p.id === task.projectId,
                  );
                  const isHigh = task.priority === "High";
                  const isInProgress = task.status === "In Progress";
                  const isCompleted = task.status === "Done";

                  let spanClass =
                    "col-start-2 col-span-3 bg-amber-400/20 text-amber-800 border-amber-300";
                  if (isInProgress)
                    spanClass =
                      "col-start-3 col-span-4 bg-[#5A24CA]/10 text-[#5A24CA] border-[#5A24CA]/20";
                  if (isCompleted)
                    spanClass =
                      "col-start-1 col-span-7 bg-emerald-50 text-emerald-800 border-emerald-200";

                  return (
                    <div
                      key={task.id}
                      className="grid grid-cols-12 items-center py-3.5"
                    >
                      {/* Left Header Info Block Column */}
                      <div className="col-span-5 pl-4 pr-3 flex items-center justify-between gap-3 min-w-0">
                        <div className="min-w-0 space-y-0.5">
                          <p className="text-xs font-bold text-neutral-900 truncate">
                            {task.title}
                          </p>
                          {/* Project row identity attachment */}
                          <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-medium font-mono">
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${parentProj?.color || "bg-neutral-400"}`}
                            />
                            <span className="truncate">
                              {parentProj?.name || "Unassigned Space"}
                            </span>
                          </div>
                        </div>

                        {/* Statically displayed tracking operations row */}
                        <div className="flex items-center gap-1 shrink-0 pr-2">
                          <button
                            type="button"
                            onClick={() => triggerOpenEditMode(task)}
                            className="text-neutral-400 hover:text-neutral-900 p-1 cursor-pointer"
                          >
                            <FaEdit size={10} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmationId(task.id)}
                            className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                          >
                            <FaTrashAlt size={9} />
                          </button>
                        </div>
                      </div>

                      {/* Right Grid Gantt Lane Track Area */}
                      <div className="col-span-7 grid grid-cols-7 h-full items-center border-l border-neutral-100 relative min-h-[36px]">
                        {Array(7)
                          .fill(0)
                          .map((_, idx) => (
                            <div
                              key={idx}
                              className="absolute top-0 bottom-0 border-r border-neutral-100/40 pointer-events-none"
                              style={{ left: `${(idx + 1) * (100 / 7)}%` }}
                            />
                          ))}

                        <div
                          className={`relative mx-2 p-1.5 rounded-lg border text-[10px] font-bold tracking-tight shadow-3xs truncate flex items-center justify-between ${spanClass}`}
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

      {/* 📊 LIST VIEW COMPONENT */}
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
                <div className="space-y-2">
                  {columnTasks.map((task) => {
                    const parentProj = projects.find(
                      (p) => p.id === task.projectId,
                    );
                    return (
                      <div
                        key={task.id}
                        className="flex items-center justify-between p-3 rounded-xl border border-neutral-100 bg-neutral-50/20 text-xs gap-4"
                      >
                        <div className="min-w-0 space-y-0.5">
                          <span className="font-semibold text-neutral-800 block truncate">
                            {task.title}
                          </span>
                          {/* Project context row attachment tag */}
                          <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono">
                            <span
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${parentProj?.color || "bg-neutral-400"}`}
                            />
                            <span className="truncate">
                              {parentProj?.name || "Unassigned Space"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {task.dueDate
                              ? formatCardDate(task.dueDate)
                              : "No Due Date"}
                          </span>
                          <div className="flex items-center gap-0.5">
                            <button
                              type="button"
                              onClick={() => triggerOpenEditMode(task)}
                              className="text-neutral-400 hover:text-neutral-900 p-1 cursor-pointer"
                              title="Edit Task"
                            >
                              <FaEdit size={11} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmationId(task.id)}
                              className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                              title="Delete Task"
                            >
                              <FaTrashAlt size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 🧱 PREMIUM TASK UPDATE/CREATOR MODAL LAYER */}
      {isTaskModalOpen && (
        <CreateTaskModal
          isTaskModalOpen={isTaskModalOpen}
          setIsTaskModalOpen={setIsTaskModalOpen}
          projects={projects}
          onCreateTask={onCreateTask}
          editingTask={editingTaskPayload} // Pass down editing target payload context
        />
      )}

      {/* ⚠️ INTEGRATED DELETION CONFIRMATION DIALOG MODAL */}
      {deleteConfirmationId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-100">
          <div
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs"
            onClick={() => setDeleteConfirmationId(null)}
          />
          <div className="relative bg-white rounded-2xl p-5 w-full max-w-sm border border-neutral-200/70 shadow-xl z-10 space-y-4">
            <div className="space-y-1.5">
              <h4 className="text-sm font-black text-neutral-950 tracking-tight">
                Permanently scrap task workspace target?
              </h4>
              <p className="text-[11px] text-neutral-400 leading-normal">
                This item will be dropped from all system timelines and metrics
                records immediately. This operation cannot be reversed.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setDeleteConfirmationId(null)}
                className="px-3 py-1.5 text-xs font-bold text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 rounded-xl transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeConfirmedDeletion}
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-all shadow-3xs cursor-pointer"
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
