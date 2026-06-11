import React, { useState, useEffect, useRef } from "react";
import { FaFolder, FaUserPlus, FaTimes, FaSpinner } from "react-icons/fa";
import { api } from "../../services/api";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // Default to first project if available, otherwise blank string

  const [selectedProjectId, setSelectedProjectId] = useState(
    projects.length > 0 ? projects[0].id : "",
  );

  const [newTaskAssignees, setNewTaskAssignees] = useState([]);
  const dropdownRef = useRef(null);

  const isEditing = !!editingTaskPayload;
  console.log(editingTaskPayload);
  useEffect(() => {
    if (isTaskModalOpen) {
      if (editingTaskPayload) {
        setNewTaskTitle(editingTaskPayload.title || "");
        setNewTaskStartDate(editingTaskPayload.startDate || "");
        setNewTaskDueDate(editingTaskPayload.dueDate || "");
        setNewTaskStatus(editingTaskPayload.status || "To Do ");
        setNewTaskPriority(editingTaskPayload.priority || "Medium");
        setSelectedProjectId(editingTaskPayload.projectId || "");
        setNewTaskAssignees(editingTaskPayload.assignees || []);
      } else {
        setNewTaskTitle("");
        setNewTaskStartDate("");
        setNewTaskDueDate("");
        setNewTaskStatus("To Do");
        setNewTaskPriority("Medium");
        setSelectedProjectId(projects.length > 0 ? projects[0].id : "");
        setNewTaskAssignees([]);
      }
      setSearchQuery("");
    }
  }, [editingTaskPayload, isTaskModalOpen, projects]);

  // 1. Debounced Backend API Fetching logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        // Replace with your exact backend URL instance
        const response = await api.get(`/users?search=${searchQuery}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  //  Close dropdown if clicking outside the component
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Select user from list
  const handleSelectUser = (user) => {
    // Prevent duplicates just in case
    if (!newTaskAssignees.some((assignee) => assignee._id === user._id)) {
      setNewTaskAssignees([...newTaskAssignees, user]);
    }
    setSearchQuery(""); // Reset input text
    setShowDropdown(false);
  };
  //  Remove user tag
  const handleRemoveAssignee = (userId) => {
    setNewTaskAssignees(newTaskAssignees.filter((user) => user._id !== userId));
  };

  // Filter out users from the dropdown who have already been selected
  const visibleResults = searchResults.filter(
    (user) => !newTaskAssignees.some((assignee) => assignee._id === user._id),
  );
  const onModalSubmit = (e) => {
    e.preventDefault();

    const taskPayloadObject = {
      ...(isEditing && { id: editingTaskPayload.id }),
      projectId: selectedProjectId,
      title: newTaskTitle.trim(),
      startDate: newTaskStartDate,
      dueDate: newTaskDueDate,
      assignees: newTaskAssignees.map((user) => user._id),
      status: newTaskStatus,
      priority: newTaskPriority,
    };

    onCreateTask(taskPayloadObject);

    setNewTaskTitle("");
    setNewTaskStartDate("");
    setNewTaskDueDate("");
    setNewTaskStatus("To Do");
    setNewTaskPriority("Medium");
    setNewTaskAssignees([]);
    setIsTaskModalOpen(false);
  };
  if (!isTaskModalOpen) return null;
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

          <div className="space-y-1.5 relative" ref={dropdownRef}>
            <label className="text-[11px] font-bold text-neutral-700">
              Assign Members via Registered Gmail
            </label>

            {/* SEARCH INPUT WRAPPER */}
            <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-lg px-2 py-1 focus-within:border-neutral-950 transition-all">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="w-full bg-transparent border-0 p-1 text-xs font-medium focus:outline-hidden text-neutral-800 placeholder-neutral-400"
              />

              {/* Loading Spinner Indicator */}
              {isLoading && (
                <FaSpinner
                  className="animate-spin text-neutral-400 mr-1"
                  size={12}
                />
              )}
            </div>

            {/* FLOATING DROPDOWN MODAL/LIST */}
            {showDropdown && searchQuery.trim().length > 0 && (
              <div className="absolute z-50 w-full bg-white border border-neutral-200 shadow-lg rounded-lg max-h-48 overflow-y-auto mt-0.5 custom-scrollbar">
                {isLoading && visibleResults.length === 0 ? (
                  <div className="p-3 text-center text-xs text-neutral-500 font-medium">
                    Searching user directory...
                  </div>
                ) : visibleResults.length > 0 ? (
                  <div className="p-1 divide-y divide-neutral-50">
                    {visibleResults.map((user) => (
                      <button
                        key={user._id}
                        type="button"
                        onClick={() => handleSelectUser(user)}
                        className="w-full flex items-center justify-between text-left px-2.5 py-2 hover:bg-neutral-50 rounded-md transition-colors group"
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-semibold text-neutral-800 truncate">
                            {user.name}
                          </span>
                          <span className="text-[10px] text-neutral-400 truncate">
                            {user.email}
                          </span>
                        </div>
                        <FaUserPlus
                          className="text-neutral-300 group-hover:text-[#5A24CA] transition-colors"
                          size={12}
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-neutral-400 font-medium">
                    No registered accounts found
                  </div>
                )}
              </div>
            )}

            {/* SELECTED ASSIGNEE TAGS */}
            {newTaskAssignees?.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1 max-h-[60px] overflow-y-auto">
                {newTaskAssignees.map((user) => (
                  <span
                    key={user._id}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 bg-[#5A24CA]/5 text-[#5A24CA] border border-[#5A24CA]/20 rounded-md"
                  >
                    <span className="truncate max-w-[140px]">
                      {user.name} ({user.email})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAssignee(user._id)}
                      className="hover:text-rose-600 p-0.5 transition-colors cursor-pointer flex-shrink-0"
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
