import React, { useState } from "react";
import { useMeetingOperations } from "../../query/useMeetings";
import CreateMeetingModal from "./createMeetingModal";
import {
  FaVideo,
  FaMapMarkerAlt,
  FaCalendarPlus,
  FaSearch,
  FaUsers,
  FaClock,
  FaCircle,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";

const MeetingSheet = () => {
  const {
    meetings,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    isModalOpen,
    editingMeeting,
    openCreateModal,
    openEditModal,
    closeModal,
    saveMeeting,
    deleteMeeting,
    updateMeetingStatus,
  } = useMeetingOperations();

  // Internal component runtime configuration state for track inline context dropdown operations
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  // Helper helper to convert 24h standard payload time strings to legible AM/PM components
  const formatTimeLabel = (timeStr) => {
    if (!timeStr) return "TBD";
    if (timeStr.includes("AM") || timeStr.includes("PM")) return timeStr;
    const [hours, minutes] = timeStr.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHours = h % 12 || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  return (
    <div
      className="space-y-4 p-2 max-w-7xl mx-auto select-none"
      onClick={() => setActiveDropdownId(null)}
    >
      {/* 🚀 TOP MODULE HEADER PANEL */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white p-4 border border-neutral-200 rounded-xl shadow-3xs">
        <div>
          <h2 className="text-sm font-black text-neutral-950 tracking-tight">
            Enterprise Meeting Operations Hub
          </h2>
          <p className="text-[11px] text-neutral-400">
            Manage cross-functional scheduling windows, room matrix states, and
            technical sync logs.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 bg-[#5A24CA] hover:bg-[#4A1CA5] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors shadow-2xs self-start sm:self-center cursor-pointer"
        >
          <FaCalendarPlus size={12} />
          Schedule Operations Core
        </button>
      </div>

      {/* 🔍 SEARCH AND LIFE-CYCLE FILTERS ACTIONS HUB */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-neutral-50 p-2.5 border border-neutral-200 rounded-xl">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {["All", "Scheduled", "In Progress", "Completed"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all whitespace-nowrap cursor-pointer
                ${
                  activeFilter === filter
                    ? "bg-white text-neutral-950 border-neutral-200 shadow-3xs"
                    : "border-transparent text-neutral-400 hover:text-neutral-700"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 md:w-80 shadow-3xs">
          <FaSearch className="text-neutral-400 mr-2 text-xs shrink-0" />
          <input
            type="text"
            placeholder="Search matching targets or host nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-0 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-hidden"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* 📊 SPREADSHEET MATRIX TABLE */}
      <div className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-[10px] font-bold text-neutral-400 uppercase tracking-wider h-10">
                <th className="pl-4 w-[340px]">
                  Meeting Parameters & Scope Description
                </th>
                <th className="w-[180px]">Timeline Interval</th>
                <th className="w-[130px]">Infrastructure Type</th>
                <th className="w-[140px]">Target Location Node</th>
                <th className="w-[130px]">Roster Count</th>
                <th className="w-[130px]">Status Capsule</th>
                <th className="pr-4 text-right w-[100px]">Action Matrix</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-xs">
              {meetings.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="p-16 text-center text-xs font-medium text-neutral-400"
                  >
                    No matching configuration tracks or active schedules found.
                  </td>
                </tr>
              ) : (
                meetings.map((mtg) => {
                  let statusCapsule =
                    "bg-amber-50 text-amber-800 border-amber-200";
                  if (mtg.status === "In Progress")
                    statusCapsule =
                      "bg-purple-50 text-[#5A24CA] border-purple-200/50 animate-pulse";
                  if (mtg.status === "Completed")
                    statusCapsule =
                      "bg-emerald-50 text-emerald-800 border-emerald-200/60";

                  const isLink = mtg.location.startsWith("http");

                  return (
                    <tr
                      key={mtg.id}
                      className="hover:bg-neutral-50/20 transition-colors group h-18"
                    >
                      {/* Meta Block column metadata info */}
                      <td className="pl-4 py-3 pr-3">
                        <div className="space-y-0.5 max-w-[320px]">
                          <div className="flex items-center gap-1.5">
                            {mtg.priority === "High" && (
                              <FaCircle
                                className="text-rose-500 shrink-0 animate-bounce"
                                size={6}
                              />
                            )}
                            <span className="font-bold text-neutral-800 truncate block tracking-tight group-hover:text-[#5A24CA] transition-colors">
                              {mtg.title}
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-400 line-clamp-1 font-medium font-sans">
                            {mtg.description ||
                              "No supplemental details document provided."}
                          </p>
                        </div>
                      </td>

                      {/* Time intervals column block tracking */}
                      <td className="py-3 pr-2">
                        <div className="space-y-0.5 font-mono">
                          <p className="font-bold text-neutral-700 flex items-center gap-1">
                            <FaClock className="text-neutral-400" size={10} />
                            {formatTimeLabel(mtg.startTime)} -{" "}
                            {formatTimeLabel(mtg.endTime)}
                          </p>
                          <p className="text-[9px] font-semibold text-neutral-400 pl-3.5">
                            {mtg.date}
                          </p>
                        </div>
                      </td>

                      {/* Mode track capsule blocks */}
                      <td className="py-3 pr-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-neutral-200 bg-neutral-50 text-[10px] font-bold font-mono text-neutral-600">
                          {mtg.type === "Remote" ? (
                            <FaVideo className="text-[#5A24CA]" size={9} />
                          ) : (
                            <FaMapMarkerAlt
                              className="text-amber-500"
                              size={9}
                            />
                          )}
                          {mtg.type}
                        </span>
                      </td>

                      {/* Hyperlinks or locations rendering check */}
                      <td className="py-3 pr-2 max-w-[130px]">
                        {isLink ? (
                          <a
                            href={mtg.location}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center text-[11px] font-bold text-[#5A24CA] hover:underline truncate"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Join Active Node ↗
                          </a>
                        ) : (
                          <span className="text-neutral-700 font-semibold truncate block font-sans tracking-tight">
                            {mtg.location}
                          </span>
                        )}
                      </td>

                      {/* Member list array counts */}
                      <td className="py-3 pr-2">
                        <div className="flex items-center gap-1 text-neutral-500 font-semibold font-mono text-[11px]">
                          <FaUsers size={11} className="text-neutral-400" />
                          <span>{mtg.attendees?.length || 0} members</span>
                        </div>
                      </td>

                      {/* Dynamic status selection dropdown wrapper */}
                      <td
                        className="py-3 pr-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <select
                          value={mtg.status}
                          onChange={(e) =>
                            updateMeetingStatus(mtg.id, e.target.value)
                          }
                          className={`text-[9px] font-black uppercase tracking-wider rounded-md border p-1 focus:outline-hidden cursor-pointer ${statusCapsule}`}
                        >
                          <option value="Scheduled">Scheduled</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>

                      {/* Operations management action button controls execution block */}
                      <td
                        className="pr-4 py-3 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          <button
                            type="button"
                            onClick={() => openEditModal(mtg)}
                            className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
                            title="Edit Configuration Settings"
                          >
                            <FaEdit size={11} />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteMeeting(mtg.id)}
                            className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                            title="De-allocate Session Block"
                          >
                            <FaTrashAlt size={10} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 📊 MODAL PORTAL INJECTION ANCHOR NODE */}
      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveMeeting}
        editingMeeting={editingMeeting}
      />
    </div>
  );
};

export default MeetingSheet;
