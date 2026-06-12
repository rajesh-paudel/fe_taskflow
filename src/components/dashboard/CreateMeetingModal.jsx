import React, { useState, useEffect } from "react";
import { FaTimes, FaSearch, FaUserPlus, FaCheckCircle } from "react-icons/fa";
import { api } from "../../services/api";

const CreateMeetingModal = ({ isOpen, onClose, onSave, editingMeeting }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [type, setType] = useState("Remote");
  const [location, setLocation] = useState("");
  const [priority, setPriority] = useState("Medium");

  // Attendee tracking structural hooks
  const [attendees, setAttendees] = useState([]);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Sync state modifications during editing operations
  useEffect(() => {
    if (editingMeeting) {
      setTitle(editingMeeting.title || "");
      setDescription(editingMeeting.description || "");
      setDate(editingMeeting.date || "");
      setStartTime(editingMeeting.startTime || "");
      setEndTime(editingMeeting.endTime || "");
      setType(editingMeeting.type || "Remote");
      setLocation(editingMeeting.location || "");
      setPriority(editingMeeting.priority || "Medium");
      setAttendees(editingMeeting.attendees || []);
    } else {
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
    setUserSearchQuery("");
    setSearchResults([]);
  }, [editingMeeting, isOpen]);

  // Handle active typing for matching accounts
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (userSearchQuery.trim().length === 0) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const response = await api.get(`/users?search=${userSearchQuery}`);
        setSearchResults(response.data || []);
      } catch (err) {
        console.error("Failed fetching directory users context mapping", err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [userSearchQuery]);

  const handleAddAttendee = (user) => {
    if (!attendees.some((a) => a._id === user._id)) {
      setAttendees([...attendees, user]);
    }
    setUserSearchQuery("");
    setSearchResults([]);
  };

  const handleRemoveAttendee = (userId) => {
    setAttendees(attendees.filter((a) => a._id !== userId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      description,
      date,
      startTime,
      endTime,
      type,
      location,
      priority,
      attendees,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Block */}
        <div className="px-5 py-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <h3 className="text-xs font-black text-neutral-900 uppercase tracking-wider">
            {editingMeeting
              ? "Modify Target Configuration"
              : "Initialize New Meeting Record"}
          </h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600 p-1 rounded-md transition-colors"
          >
            <FaTimes size={14} />
          </button>
        </div>

        {/* Scrollable Form Body Container */}
        <form
          onSubmit={handleSubmit}
          className="p-5 space-y-4 overflow-y-auto flex-1 text-xs"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="block font-bold text-neutral-700">
                Meeting Parameters Header
              </label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg p-2 focus:outline-hidden focus:border-[#5A24CA]"
                placeholder="e.g., Matrix Synchronization Sync"
              />
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="block font-bold text-neutral-700">
                Scope Description Context
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg p-2 focus:outline-hidden focus:border-[#5A24CA]"
                placeholder="Provide technical logs reference document links..."
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-neutral-700">
                Target Date Sequence
              </label>
              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg p-2 focus:outline-hidden focus:border-[#5A24CA]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="block font-bold text-neutral-700">
                  Start Time
                </label>
                <input
                  required
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full border border-neutral-300 rounded-lg p-2 focus:outline-hidden focus:border-[#5A24CA]"
                />
              </div>
              <div className="space-y-1">
                <label className="block font-bold text-neutral-700">
                  End Time
                </label>
                <input
                  required
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full border border-neutral-300 rounded-lg p-2 focus:outline-hidden focus:border-[#5A24CA]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-neutral-700">
                Infrastructure Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg p-2 focus:outline-hidden focus:border-[#5A24CA] bg-white"
              >
                <option value="Remote">Remote</option>
                <option value="In-Person">In-Person</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-neutral-700">
                Priority Weighting
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg p-2 focus:outline-hidden focus:border-[#5A24CA] bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1">
              <label className="block font-bold text-neutral-700">
                Target Location Matrix Node Link
              </label>
              <input
                required
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-neutral-300 rounded-lg p-2 focus:outline-hidden focus:border-[#5A24CA]"
                placeholder="https://zoom.us/j/... or Conference Room 4B"
              />
            </div>
          </div>

          {/* 👥 ATTENDEE SEARCH & CHIP GENERATION TRACK */}
          <div className="border-t border-neutral-100 pt-3 space-y-2">
            <label className="block font-bold text-neutral-700">
              Interactive Roster Management Matrix
            </label>

            {/* Search Bar Block */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-neutral-400">
                <FaSearch size={11} />
              </div>
              <input
                type="text"
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 border border-neutral-300 rounded-lg p-2 focus:outline-hidden focus:border-[#5A24CA]"
                placeholder="Search directory node by system user handle or email allocation..."
              />

              {/* Dynamic Dropdown Search Options List */}
              {userSearchQuery && (
                <div className="absolute left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto bg-white border border-neutral-200 rounded-lg shadow-xl divide-y divide-neutral-100">
                  {isSearching ? (
                    <div className="p-3 text-center text-neutral-400 font-medium">
                      Querying target systems...
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="p-3 text-center text-neutral-400">
                      No profile matches found.
                    </div>
                  ) : (
                    searchResults.map((user) => {
                      const isAdded = attendees.some((a) => a._id === user._id);
                      return (
                        <div
                          key={user._id}
                          onClick={() => !isAdded && handleAddAttendee(user)}
                          className={`p-2 flex items-center justify-between transition-colors ${isAdded ? "bg-neutral-50 cursor-not-allowed text-neutral-400" : "hover:bg-neutral-50 cursor-pointer"}`}
                        >
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                user.avatar ||
                                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80"
                              }
                              alt={user.name}
                              className="w-6 h-6 rounded-full object-cover shrink-0"
                            />
                            <div>
                              <p className="font-bold text-neutral-800">
                                {user.name}
                              </p>
                              <p className="text-[10px] text-neutral-400">
                                {user.email}
                              </p>
                            </div>
                          </div>
                          <div className="pr-1 text-xs">
                            {isAdded ? (
                              <FaCheckCircle className="text-emerald-500" />
                            ) : (
                              <FaUserPlus className="text-[#5A24CA]" />
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Render Selected Items as Chips with Remove Action */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {attendees.length === 0 ? (
                <p className="text-[10px] text-neutral-400 italic">
                  No nodes appended to roster tracking list.
                </p>
              ) : (
                attendees.map((user) => (
                  <div
                    key={user._id}
                    className="inline-flex items-center gap-1.5 bg-neutral-100 border border-neutral-200 text-neutral-700 pl-1.5 pr-1 py-0.5 rounded-md text-[11px] font-medium"
                  >
                    <img
                      src={
                        user.avatar ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80"
                      }
                      alt=""
                      className="w-4 h-4 rounded-full object-cover"
                    />
                    <span>{user.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttendee(user._id)}
                      className="hover:bg-neutral-200 p-0.5 rounded text-neutral-400 hover:text-rose-600 transition-colors"
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Action buttons footer */}
          <div className="pt-3 border-t border-neutral-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-200 text-neutral-600 font-bold rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Abort
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#5A24CA] hover:bg-[#4A1CA5] text-white font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
            >
              Commit Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeetingModal;
