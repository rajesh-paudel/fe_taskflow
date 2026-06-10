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
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../query/useTasks";
import { useProjects } from "../../query/useProjects";
import toast from "react-hot-toast";
export default function TasksSheet() {
  const { user } = useAuth();
  const {
    tasks,
    isLoading: tasksLoading,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();
  const { projects, isLoading: projectsLoading } = useProjects();
  // LOCAL VIEW STATE
  const [localViewType, setLocalViewType] = useState("board");
  const [selectedProjectId, setSelectedProjectId] = useState("all");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTaskPayload, setEditingTaskPayload] = useState(null);

  // Confirmation Delete States
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
  const filteredTasks =
    selectedProjectId === "all"
      ? tasks
      : tasks.filter((task) => task.projectId === selectedProjectId);
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
  const handleCreateTask = (data) => {
    if (data.id) {
      updateTask(data);
      toast.success("task updated successfully!");
    } else {
      createTask(data);
      toast.success("task created successfully!");
    }
    setEditingTaskPayload(null);
  };
  const executeConfirmedDeletion = () => {
    if (deleteConfirmationId) {
      deleteTask(deleteConfirmationId);
      toast.success("task deleted successfully!");
      setDeleteConfirmationId(null);
    }
  };
  const handleUpdateTaskStatus = (task, newStatus) => {
    updateTask({ ...task, status: newStatus });
    toast.success(`task status changed to "${newStatus}"`);
  };
  const getGetCurrentMonthDays = () => {
    const current = new Date(); // Automatically resolves to June 2026 based on system clock
    const year = current.getFullYear();
    const month = current.getMonth(); // Current month index

    const totalDaysInMonth = new Date(year, month + 1, 0).getDate(); // e.g., 30 for June
    const daysArray = [];

    for (let i = 1; i <= totalDaysInMonth; i++) {
      daysArray.push(new Date(year, month, i));
    }
    return daysArray;
  };
  return (
    <div className="space-y-6 relative">
      {/* 🧭 TOP VIEWS SUB-NAVBAR CONTROL */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 pb-3 gap-3">
        <div className="flex items-center gap-5 text-xs font-semibold text-neutral-400">
          {["List", "Gantt", "Kanban"].map((tabName) => {
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

                <div className="space-y-2.5 overflow-y-auto scrollbar-hide pr-0.5 flex-1 min-h-[150px]">
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
                                handleUpdateTaskStatus(task, e.target.value)
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
      {localViewType === "gantt" &&
        (() => {
          const currentMonthDays = getGetCurrentMonthDays();
          const totalDays = currentMonthDays.length;

          return (
            /* 🚨 MAIN OUTER CONTAINER: This must allow horizontal + vertical scrolling */
            <div className="w-full overflow-auto scrollbar-hide border border-neutral-200 rounded-xl bg-white shadow-2xs flex flex-col max-h-[600px]">
              {/* Header Banner */}
              <div className="bg-neutral-50/75 p-3.5 border-b border-neutral-200 flex items-center justify-between shrink-0 sticky left-0 w-full">
                <div className="flex items-center gap-2">
                  <FaStream className="text-neutral-500" size={12} />
                  <h3 className="text-xs font-bold text-neutral-900 tracking-tight">
                    Monthly Operational Roadmap Timeline
                  </h3>
                </div>
                <span className="text-[10px] text-[#5A24CA] font-mono font-bold bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {currentMonthDays[0].toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* 🚨 THE WORKSPACE: This forces the actual width expansion layout matrix */}
              <div className="min-w-[2000px] bg-white relative">
                {/* 💡 Bumped from 1600px to 2000px to guarantee huge day-cells on wide monitors */}

                {/* STICKY TIMELINE HEADER */}
                <div className="sticky top-0 z-30 flex bg-neutral-50 border-b border-neutral-200 items-center text-[9px] font-bold text-neutral-400 uppercase tracking-wider h-11">
                  {/* Left Sticky Identity Header block */}
                  <div className="sticky left-0 z-40 w-[280px] bg-neutral-50 text-left pl-4 font-sans text-neutral-500 border-r border-neutral-200 h-full flex items-center shadow-[4px_0_8px_-4px_rgba(0,0,0,0.08)]">
                    Task Identity Matrix
                  </div>

                  {/* Right Day Grid Header track cells */}
                  <div
                    className="flex-1 grid h-full items-center text-center font-mono"
                    style={{
                      gridTemplateColumns: `repeat(${totalDays}, minmax(0, 1fr))`,
                    }}
                  >
                    {currentMonthDays.map((dateObj, i) => {
                      const dayNum = dateObj.getDate();
                      const isWeekend =
                        dateObj.getDay() === 0 || dateObj.getDay() === 6;
                      return (
                        <div
                          key={i}
                          className={`h-full flex flex-col justify-center border-r border-neutral-200/60 last:border-0 font-bold transition-colors
                    ${isWeekend ? "bg-neutral-100/60 text-neutral-400" : "text-neutral-700"}`}
                        >
                          <span className="text-[8px] tracking-tighter opacity-60">
                            {dateObj.toLocaleDateString("en-US", {
                              weekday: "narrow",
                            })}
                          </span>
                          <span className="text-[10px] mt-0.5">{dayNum}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* TASK ROWS SCROLL LANE DATA */}
                <div className="divide-y divide-neutral-100">
                  {filteredTasks.length === 0 ? (
                    <div className="p-16 text-center text-xs font-medium text-neutral-400 w-[280px] sticky left-0">
                      No tracked data entries currently found in scope.
                    </div>
                  ) : (
                    filteredTasks.map((task) => {
                      const parentProj = projects.find(
                        (p) => p.id === task.projectId,
                      );
                      const isInProgress = task.status === "In Progress";
                      const isCompleted = task.status === "Done";

                      let colorStyles =
                        "bg-amber-50 text-amber-800 border-amber-200/70";
                      if (isInProgress)
                        colorStyles =
                          "bg-purple-50 text-[#5A24CA] border-purple-200/60";
                      if (isCompleted)
                        colorStyles =
                          "bg-emerald-50 text-emerald-800 border-emerald-200/60";

                      let startColumn = 1;
                      let columnSpan = 1;

                      if (task.startDate) {
                        const taskStart = new Date(task.startDate);
                        taskStart.setHours(0, 0, 0, 0);

                        const dayIndex = currentMonthDays.findIndex((d) => {
                          const compareDay = new Date(d);
                          compareDay.setHours(0, 0, 0, 0);
                          return compareDay.getTime() === taskStart.getTime();
                        });

                        if (dayIndex !== -1) {
                          startColumn = dayIndex + 1;
                        } else if (taskStart < currentMonthDays[0]) {
                          startColumn = 1;
                        }

                        if (task.dueDate) {
                          const taskDue = new Date(task.dueDate);
                          taskDue.setHours(0, 0, 0, 0);
                          const activeStart =
                            taskStart < currentMonthDays[0]
                              ? currentWeekDays[0]
                              : taskStart;
                          const diffTime = taskDue - activeStart;
                          const diffDays =
                            Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                          columnSpan = Math.max(
                            1,
                            Math.min(diffDays, totalDays + 1 - startColumn),
                          );
                        }
                      }

                      return (
                        <div
                          key={task.id}
                          className="flex items-center hover:bg-neutral-50/40 transition-colors h-14 group"
                        >
                          {/* Left Locked Sticky Task Metadata Cell */}
                          <div className="sticky left-0 z-50 w-[280px] shrink-0 bg-white group-hover:bg-neutral-50 border-r border-neutral-200 h-full flex items-center justify-between pl-4 pr-3 gap-2 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.08)] transition-colors">
                            <div className="min-w-0 space-y-0.5">
                              <p className="text-xs font-bold text-neutral-800 truncate tracking-tight">
                                {task.title}
                              </p>
                              <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-semibold font-mono">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${parentProj?.color || "bg-neutral-300"}`}
                                />
                                <span className="truncate">
                                  {parentProj?.name || "Unassigned"}
                                </span>
                              </div>
                            </div>

                            {/* Tiny inline row actions */}
                            <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150 pr-1">
                              <button
                                type="button"
                                onClick={() => triggerOpenEditMode(task)}
                                className="text-neutral-400 hover:text-neutral-900 p-1 cursor-pointer"
                              >
                                <FaEdit size={11} />
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmationId(task.id)}
                                className="text-neutral-400 hover:text-rose-600 p-1 cursor-pointer"
                              >
                                <FaTrashAlt size={10} />
                              </button>
                            </div>
                          </div>

                          {/* Right Timeline Lane Container Track */}
                          <div
                            className="flex-1 grid h-full items-center relative"
                            style={{
                              gridTemplateColumns: `repeat(${totalDays}, minmax(0, 1fr))`,
                            }}
                          >
                            {/* Background Grid Guide Lines Matrix Layout */}
                            {Array(totalDays)
                              .fill(0)
                              .map((_, idx) => (
                                <div
                                  key={idx}
                                  className="absolute top-0 bottom-0 border-r border-neutral-100/60 pointer-events-none"
                                  style={{
                                    left: `${(idx + 1) * (100 / totalDays)}%`,
                                  }}
                                />
                              ))}

                            {/* RENDERING DYNAMIC WIDTH TIMELINE BAR TRACK */}
                            <div
                              style={{
                                gridColumnStart: startColumn,
                                gridColumnEnd: `span ${columnSpan}`,
                              }}
                              className={`relative mx-0.5 p-1.5 rounded-md border text-[9px] font-bold tracking-tight shadow-3xs truncate flex items-center justify-between transition-all duration-200 z-10 ${colorStyles}`}
                              title={`${task.title} (${columnSpan} Days)`}
                            >
                              <span className="truncate pl-0.5 font-sans uppercase text-[8px] tracking-wide font-black">
                                {task.status}
                              </span>
                              <span className="text-[8px] font-mono opacity-75 shrink-0 ml-1 bg-white/60 px-0.5 rounded-xs border border-black/5">
                                {columnSpan}d
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
          );
        })()}
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
                            {task.startDate
                              ? formatCardDate(task.startDate)
                              : ""}{" "}
                            -{task.dueDate ? formatCardDate(task.dueDate) : ""}
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

      <CreateTaskModal
        editingTaskPayload={editingTaskPayload}
        isTaskModalOpen={isTaskModalOpen}
        setIsTaskModalOpen={setIsTaskModalOpen}
        projects={projects}
        onCreateTask={handleCreateTask}
      />

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
