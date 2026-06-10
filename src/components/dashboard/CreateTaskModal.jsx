import React, { useState, useEffect } from "react";
import { FaFolder, FaUserPlus, FaTimes } from "react-icons/fa";

const CreateTaskModal = ({
  editingTaskPayload,
  setIsTaskModalOpen,
  isTaskModalOpen,
  onCreateTask,
  projects = [],
}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskStartDate, setNewTaskStartDate] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("To Do");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");

  // Default to first project if available, otherwise blank string

  const [selectedProjectId, setSelectedProjectId] = useState(
    projects.length > 0 ? projects[0].id : "",
  );

  // Assignee email management states
  const [emailInput, setEmailInput] = useState("");
  const [newTaskAssignees, setNewTaskAssignees] = useState([]);

  const isEditing = !!editingTaskPayload;
  useEffect(() => {
    if (isTaskModalOpen) {
      if (editingTaskPayload) {
        setNewTaskTitle(editingTaskPayload.title || "");
        setNewTaskStartDate(editingTaskPayload.startDate || "");
        setNewTaskDueDate(editingTaskPayload.dueDate || "");
        setNewTaskStatus(editingTaskPayload.status || "Todo");
        setNewTaskPriority(editingTaskPayload.priority || "Medium");
        setSelectedProjectId(editingTaskPayload.projectId || "");
        setNewTaskAssignees(editingTaskPayload.assigneeEmails || []);
      } else {
        setNewTaskTitle("");
        setNewTaskStartDate("");
        setNewTaskDueDate("");
        setNewTaskStatus("Todo");
        setNewTaskPriority("Medium");
        setSelectedProjectId(projects.length > 0 ? projects[0].id : "");
        setNewTaskAssignees([]);
      }
      setEmailInput("");
    }
  }, [editingTaskPayload, isTaskModalOpen, projects]);

  if (!isTaskModalOpen) return null;

  // 👥 Handle adding email strings to local list array
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

  const onModalSubmit = (e) => {
    e.preventDefault();

    const taskPayloadObject = {
      ...(isEditing && { id: editingTaskPayload.id }),
      projectId: selectedProjectId,
      title: newTaskTitle.trim(),
      startDate: newTaskStartDate,
      dueDate: newTaskDueDate,
      assigneeEmails: newTaskAssignees,
      status: newTaskStatus,
      priority: newTaskPriority,
    };

    onCreateTask(taskPayloadObject);

    setNewTaskTitle("");
    setNewTaskStartDate("");
    setNewTaskDueDate("");
    setNewTaskStatus("Todo");
    setNewTaskPriority("Medium");
    setNewTaskAssignees([]);
    setIsTaskModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-xs">
      <div className="relative bg-white rounded-xl border border-neutral-200 max-w-md w-full p-5 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        <div>
          <h3 className="text-sm font-black text-neutral-950 tracking-tight">
            Register New Action Target
          </h3>
          <p className="text-[11px] text-neutral-400">
            Define precise timelines, durations, and member arrays.
          </p>
        </div>

        <form onSubmit={onModalSubmit} className="space-y-3.5">
          {/* Task Title Field */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-700">
              Task Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Run comprehensive API layout integration..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full bg-white border border-neutral-200 rounded-lg px-3 py-2 text-xs font-medium focus:outline-hidden focus:border-neutral-950 text-neutral-800"
            />
          </div>

          {/* TIME DURATION FIELD CONTAINER MATRIX */}
          <div className="grid grid-cols-2 gap-3 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200/60">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide font-mono">
                Start Matrix
              </label>
              <input
                type="date"
                required
                value={newTaskStartDate}
                onChange={(e) => setNewTaskStartDate(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-md px-2 py-1 text-xs font-medium text-neutral-700 focus:outline-hidden"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-600 uppercase tracking-wide font-mono">
                Deadline Target
              </label>
              <input
                type="date"
                required
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                className="w-full bg-white border border-neutral-200 rounded-md px-2 py-1 text-xs font-medium text-neutral-700 focus:outline-hidden"
              />
            </div>
          </div>

          {/*  REGISTERED USER GMAIL SEARCH */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-neutral-700">
              Assign Members via Registered Gmail
            </label>
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-lg px-2 py-1 focus-within:border-neutral-950 transition-all">
              <input
                type="email"
                placeholder="e.g., workspaceuser@gmail.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddEmailTag();
                  }
                }}
                className="w-full bg-transparent border-0 p-1 text-xs font-medium focus:outline-hidden text-neutral-800 placeholder-neutral-400"
              />
              <button
                type="button"
                onClick={handleAddEmailTag}
                className="p-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-md transition-colors cursor-pointer"
              >
                <FaUserPlus size={11} />
              </button>
            </div>

            {newTaskAssignees?.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1 max-h-[60px] overflow-y-auto">
                {newTaskAssignees.map((email) => (
                  <span
                    key={email}
                    className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 bg-[#5A24CA]/5 text-[#5A24CA] border border-[#5A24CA]/20 rounded-md"
                  >
                    <span className="truncate max-w-[140px]">{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmailTag(email)}
                      className="hover:text-rose-600 p-0.5 transition-colors cursor-pointer"
                    >
                      <FaTimes size={8} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-neutral-700">
              Target Workspace Project
            </label>
            <div className="flex items-center bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5">
              <FaFolder className="text-neutral-400 mr-2 text-xs" />
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full text-xs font-semibold bg-transparent text-neutral-800 focus:outline-hidden cursor-pointer"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Core Configuration Tiers */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-700">
                Initial Status
              </label>
              <select
                value={newTaskStatus}
                onChange={(e) => setNewTaskStatus(e.target.value)}
                className="w-full text-xs font-medium bg-white border border-neutral-200 rounded-lg p-2 text-neutral-700 focus:outline-hidden cursor-pointer"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Completed</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-700">
                Priority Tier
              </label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="w-full text-xs font-medium bg-white border border-neutral-200 rounded-lg p-2 text-neutral-700 focus:outline-hidden cursor-pointer"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>
          </div>

          {/* Action Operations Footer */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setIsTaskModalOpen(false)}
              className="text-xs font-bold text-neutral-500 hover:text-neutral-950 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#5A24CA] hover:bg-[#4A1CA5] text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-all shadow-2xs cursor-pointer"
            >
              Commit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
