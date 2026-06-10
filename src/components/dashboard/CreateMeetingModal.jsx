import React, { useState, useEffect } from "react";
import {
  FaTimes,
  FaVideo,
  FaMapMarkerAlt,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

const CreateMeetingModal = ({ isOpen, onClose, onSave, editingMeeting }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [timeZone, setTimeZone] = useState("Asia/Kathmandu");
  const [type, setType] = useState("Remote");
  const [location, setLocation] = useState("");
  const [host, setHost] = useState("Rajesh Paudel");
  const [priority, setPriority] = useState("Medium");
  const [attendees, setAttendees] = useState([]);
  const [currentAttendeeInput, setCurrentAttendeeInput] = useState("");

  // Hydrate fields if editing an existing record
  useEffect(() => {
    if (isOpen) {
      if (editingMeeting) {
        setTitle(editingMeeting.title || "");
        setDescription(editingMeeting.description || "");
        setDate(editingMeeting.date || "");
        setStartTime(editingMeeting.startTime || "");
        setEndTime(editingMeeting.endTime || "");
        setTimeZone(editingMeeting.timeZone || "Asia/Kathmandu");
        setType(editingMeeting.type || "Remote");
        setLocation(editingMeeting.location || "");
        setHost(editingMeeting.host || "Rajesh Paudel");
        setPriority(editingMeeting.priority || "Medium");
        setAttendees(editingMeeting.attendees || []);
      } else {
        // Clear forms for standard fresh creation operations
        setTitle("");
        setDescription("");
        setDate("");
        setStartTime("");
        setEndTime("");
        setType("Remote");
        setLocation("");
        setPriority("Medium");
        setAttendees([]);
      }
    }
  }, [editingMeeting, isOpen]);

  if (!isOpen) return null;

  const handleAddAttendee = (e) => {
    e.preventDefault();
    const cleanEmail = currentAttendeeInput.trim().toLowerCase();
    if (cleanEmail && !attendees.includes(cleanEmail)) {
      setAttendees([...attendees, cleanEmail]);
      setCurrentAttendeeInput("");
    }
  };

  const handleRemoveAttendee = (targetEmail) => {
    setAttendees(attendees.filter((email) => email !== targetEmail));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date || !startTime || !endTime || !location.trim()) {
      alert(
        "Please ensure all mandatory parameter fields are correctly populated.",
      );
      return;
    }

    onSave({
      ...(editingMeeting && {
        id: editingMeeting.id,
        status: editingMeeting.status,
      }),
      title: title.trim(),
      description: description.trim(),
      date,
      startTime,
      endTime,
      timeZone,
      type,
      location: location.trim(),
      host,
      priority,
      attendees,
    });
  };

  return (
    <div className="fixed inset-0 bg-neutral-950/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-lg shadow-xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider">
            {editingMeeting
              ? "Edit Operational Sync Block"
              : "Provision New Workspace Session"}
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1 cursor-pointer"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-4 space-y-4 overflow-y-auto text-xs"
        >
          {/* Title input */}
          <div className="space-y-1">
            <label className="font-bold text-neutral-600">
              Meeting Session Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Core Architecture Alignment Sync"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-neutral-200 rounded-lg p-2 bg-white text-neutral-800 focus:outline-hidden text-xs font-medium"
            />
          </div>

          {/* Description input */}
          <div className="space-y-1">
            <label className="font-bold text-neutral-600">
              Session Objective & Scope Context
            </label>
            <textarea
              rows={2}
              placeholder="Outline specific structural parameters, notes, or critical engineering references..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-neutral-200 rounded-lg p-2 bg-white text-neutral-800 focus:outline-hidden text-xs font-medium resize-none"
            />
          </div>

          {/* Date and Timeline Track Group */}
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-neutral-600">
                Calendar Date *
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg p-1.5 bg-white text-neutral-800 focus:outline-hidden text-xs font-medium font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-neutral-600">
                Start Boundary *
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg p-1.5 bg-white text-neutral-800 focus:outline-hidden text-xs font-medium font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-neutral-600">
                End Boundary *
              </label>
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg p-1.5 bg-white text-neutral-800 focus:outline-hidden text-xs font-medium font-mono"
              />
            </div>
          </div>

          {/* Type Selection Tabs */}
          <div className="space-y-1">
            <label className="font-bold text-neutral-600">
              Infrastructure Pipeline Architecture Mode
            </label>
            <div className="grid grid-cols-3 gap-2 pt-0.5">
              {["Remote", "In-Person", "Hybrid"].map((mode) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() => setType(mode)}
                  className={`p-2 border rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer
                    ${
                      type === mode
                        ? "bg-purple-50 border-purple-300 text-[#5A24CA]"
                        : "bg-white border-neutral-200 text-neutral-500 hover:bg-neutral-50"
                    }`}
                >
                  {mode === "Remote" ? (
                    <FaVideo size={10} />
                  ) : (
                    <FaMapMarkerAlt size={10} />
                  )}
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Location/Connection Node String input */}
          <div className="space-y-1">
            <label className="font-bold text-neutral-600">
              {type === "Remote"
                ? "Video Interface Platform Call URL *"
                : "Physical Boardroom Room Destination Target *"}
            </label>
            <input
              type="text"
              required
              placeholder={
                type === "Remote"
                  ? "https://zoom.us/j/..."
                  : "e.g., Executive Suite Block Alpha"
              }
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-neutral-200 rounded-lg p-2 bg-white text-neutral-800 focus:outline-hidden text-xs font-medium"
            />
          </div>

          {/* Priority Allocation Setup */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-neutral-600">
                Priority Tier
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg p-2 bg-white text-neutral-800 focus:outline-hidden text-xs font-medium cursor-pointer"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-neutral-600">
                Session Host Authority
              </label>
              <input
                type="text"
                disabled
                value={host}
                className="w-full border border-neutral-200 bg-neutral-50 text-neutral-400 rounded-lg p-2 text-xs font-bold"
              />
            </div>
          </div>

          {/* Attendee Roster Tag Matrix */}
          <div className="space-y-1">
            <label className="font-bold text-neutral-600">
              Invite Stakeholder Roster Node Emails
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="developer@workspace.io"
                value={currentAttendeeInput}
                onChange={(e) => setCurrentAttendeeInput(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg p-2 bg-white text-neutral-800 focus:outline-hidden text-xs font-medium"
              />
              <button
                type="button"
                onClick={handleAddAttendee}
                className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold p-2.5 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <FaPlus size={10} />
              </button>
            </div>

            {/* Render dynamically accumulated attendee tags */}
            {attendees.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {attendees.map((email) => (
                  <span
                    key={email}
                    className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-700 font-medium font-mono px-2 py-0.5 rounded-md border border-neutral-200 text-[10px]"
                  >
                    {email}
                    <button
                      type="button"
                      onClick={() => handleRemoveAttendee(email)}
                      className="text-neutral-400 hover:text-rose-600 ml-0.5 cursor-pointer"
                    >
                      <FaTimes size={8} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer Action Confirm Operations */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-2 bg-neutral-50/30 -mx-4 -mb-4 p-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 border border-neutral-200 text-neutral-500 font-bold rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#5A24CA] hover:bg-[#4A1CA5] text-white font-bold rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              {editingMeeting ? "Commit Updates" : "Save Track Block"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeetingModal;
