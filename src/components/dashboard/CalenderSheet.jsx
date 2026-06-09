import React, { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaClock,
  FaTimes,
  FaListUl,
  FaTrashAlt,
} from "react-icons/fa";
import { useEvents } from "../../query/useEvents";
import toast from "react-hot-toast";
export default function CalendarSheet() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayCell, setSelectedDayCell] = useState(null);
  const [viewingAllEventsDate, setViewingAllEventsDate] = useState(null);
  const [activeViewEvent, setActiveViewEvent] = useState(null);

  // 🧪 FORM VALUES STATE
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventColor, setNewEventColor] = useState("bg-[#5A24CA] text-white");
  const [isAllDay, setIsAllDay] = useState(true);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // 🛰️ DISCOVER REAL-TIME TODAY TIMESTAMP STRINGS
  const systemToday = new Date();
  const todayDateStr = `${systemToday.getFullYear()}-${String(systemToday.getMonth() + 1).padStart(2, "0")}-${String(systemToday.getDate()).padStart(2, "0")}`;

  //  DYNAMIC CALENDAR HEIGHT MATHEMATICS MATRIX
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const { events, createEvent, deleteEvent } = useEvents(year, month + 1);

  const firstDayOfMonthIndex = new Date(year, month, 1).getDay();
  const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
  const totalDaysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarCells = [];

  // 1. Map Previous Month's Trailing Buffer Days
  for (let i = firstDayOfMonthIndex - 1; i >= 0; i--) {
    const dayNum = totalDaysInPrevMonth - i;
    calendarCells.push({ day: dayNum, isCurrentMonth: false, dateStr: "" });
  }

  // 2. Map Current Month's Active Grid Spaces
  for (let i = 1; i <= totalDaysInMonth; i++) {
    const activeDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    calendarCells.push({
      day: i,
      isCurrentMonth: true,
      dateStr: activeDateStr,
    });
  }

  // 3. Dynamic Row-Limit Clamping (Prevents trailing 6th blank week rows)
  const currentTotalFilled = calendarCells.length;
  const targetGridSlots = currentTotalFilled <= 35 ? 35 : 42;
  const remainingSlots = targetGridSlots - currentTotalFilled;

  for (let i = 1; i <= remainingSlots; i++) {
    calendarCells.push({ day: i, isCurrentMonth: false, dateStr: "" });
  }

  // NAVIGATION WORKFLOWS
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const handleToday = () => setCurrentDate(new Date());

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim() || !selectedDayCell) return;

    createEvent.mutate({
      title: newEventTitle.trim(),
      date: selectedDayCell.dateStr,
      isAllDay,
      color: newEventColor,
      ...(isAllDay ? {} : { startTime, endTime }),
    });
    toast.success("event added");
    // Reset local form states
    setNewEventTitle("");
    setIsAllDay(true);
    setSelectedDayCell(null);
  };

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
    setActiveViewEvent(null);
    toast.success("event deleted");
  };

  return (
    <div className="flex flex-col h-auto min-h-[600px] w-full bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-3xs">
      {/* NAVIGATION HEADER CONTROL STRIP */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 shrink-0 bg-neutral-50/50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 bg-white border border-neutral-200 rounded-xl p-1 shadow-3xs">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-neutral-50 text-neutral-600 rounded-lg cursor-pointer"
            >
              <FaChevronLeft size={11} />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-neutral-50 text-neutral-600 rounded-lg cursor-pointer"
            >
              <FaChevronRight size={11} />
            </button>
          </div>
          <button
            onClick={handleToday}
            className="px-3 py-1.5 bg-white border border-neutral-200 hover:border-neutral-900 rounded-xl text-xs font-bold text-neutral-800 shadow-3xs cursor-pointer"
          >
            Today
          </button>
          <h2 className="text-sm font-black text-neutral-950 tracking-tight font-mono">
            {currentDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>
      </header>

      {/* WEEKDAY AXIS LABELS */}
      <div className="grid grid-cols-7 border-b border-neutral-200 bg-neutral-50/20 text-center py-2 shrink-0">
        {weekdays.map((day) => (
          <div
            key={day}
            className="text-[10px] font-black text-neutral-400 uppercase tracking-widest font-mono"
          >
            {day}
          </div>
        ))}
      </div>

      {/* CALENDAR DAY CELL LABELS MATRIX */}
      <div className="grid grid-cols-7 bg-neutral-200 gap-[1px]">
        {calendarCells.map((cell, index) => {
          if (!cell.isCurrentMonth) {
            return (
              <div
                key={index}
                className="bg-white p-2 select-none pointer-events-none cursor-not-allowed min-h-[150px]"
              >
                <span className="text-xs font-mono font-bold text-neutral-300 opacity-40">
                  {cell.day}
                </span>
              </div>
            );
          }

          const isTodayCell = cell.dateStr === todayDateStr;
          const dayEvents = events.filter((e) => e.date === cell.dateStr);
          const visibleEvents = dayEvents.slice(0, 4); // Increased view capacity for taller cells
          const overflowCount = dayEvents.length - 4;

          return (
            <div
              key={index}
              onClick={() => setSelectedDayCell(cell)}
              className={`bg-white p-2 flex flex-col justify-start min-h-[150px] transition-all select-none cursor-pointer relative hover:bg-neutral-50/60 `}
            >
              {/* Top Row Indicators */}
              <div className="flex justify-between items-center w-full mb-2 shrink-0">
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                    isTodayCell
                      ? "bg-[#4919a9] text-white shadow-3xs font-black"
                      : "text-neutral-800"
                  }`}
                >
                  {cell.day}
                </span>
              </div>

              {/* Stacked Row Strips Grid - Starts immediately under day index */}
              <div className="space-y-1 w-full flex-1 overflow-hidden">
                {visibleEvents.map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveViewEvent(event);
                    }}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md truncate shadow-3xs border border-black/5 ${event.color}`}
                  >
                    {event.isAllDay ? "" : `${event.startTime} - `}
                    {event.title}
                  </div>
                ))}
              </div>

              {/* Overflow Indicator Bottom Section */}
              <div className="min-h-[16px] w-full mt-1 flex items-center justify-start ">
                {overflowCount > 0 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setViewingAllEventsDate(cell);
                    }}
                    className="text-[9px] w-full cursor-pointer font-extrabold text-[#5A24CA] bg-[#5A24CA]/5 hover:bg-[#5A24CA]/15 px-1.5 py-0.5 rounded-md font-mono tracking-tight"
                  >
                    +{overflowCount} more
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL A: COMPREHENSIVE SCHEDULING FORM */}
      {selectedDayCell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs"
            onClick={() => setSelectedDayCell(null)}
          />
          <form
            onSubmit={handleCreateEventSubmit}
            className="relative bg-white rounded-2xl p-5 w-full max-w-sm border border-neutral-200 shadow-xl z-10 space-y-4"
          >
            <div className="flex items-center justify-between pb-1 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-[#5A24CA]" size={12} />
                <h4 className="text-xs font-black text-neutral-950 font-mono">
                  Create Event ({selectedDayCell.dateStr})
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDayCell(null)}
                className="text-neutral-400 hover:text-neutral-900 cursor-pointer"
              >
                <FaTimes size={12} />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">
                Event Summary Title
              </label>
              <input
                type="text"
                required
                placeholder="Project milestone presentation..."
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs font-medium text-neutral-900 focus:outline-hidden focus:border-neutral-950"
              />
            </div>

            {/* All Day / Time Range Toggle Control Switch Layout */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-neutral-600 uppercase font-mono">
                  All-Day Duration Event
                </span>
                <input
                  type="checkbox"
                  checked={isAllDay}
                  onChange={(e) => setIsAllDay(e.target.checked)}
                  className="w-4 h-4 rounded text-[#5A24CA] focus:ring-[#5A24CA] border-neutral-300 cursor-pointer"
                />
              </div>

              {!isAllDay && (
                <div className="grid grid-cols-2 gap-2 pt-1 animate-in slide-in-from-top-1 duration-150">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-neutral-400 font-mono block">
                      START TIME
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full bg-white border border-neutral-200 rounded-md p-1.5 text-xs text-center focus:outline-hidden"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-neutral-400 font-mono block">
                      END TIME
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full bg-white border border-neutral-200 rounded-md p-1.5 text-xs text-center focus:outline-hidden"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono block">
                Color Brand Tag
              </label>
              <div className="flex gap-2">
                {[
                  "bg-[#5A24CA] text-white",
                  "bg-blue-600 text-white",
                  "bg-emerald-600 text-white",
                  "bg-amber-500 text-white",
                  "bg-rose-600 text-white",
                ].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setNewEventColor(color)}
                    className={`w-5 h-5 rounded-full ${color.split(" ")[0]} transition-all cursor-pointer ${newEventColor === color ? "ring-2 ring-offset-2 ring-neutral-950 scale-110" : "opacity-80"}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setSelectedDayCell(null)}
                className="px-3 py-1.5 text-xs font-bold text-neutral-500 hover:bg-neutral-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#5A24CA] hover:bg-[#4A1CA5] rounded-xl shadow-3xs cursor-pointer"
              >
                Save Event
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL B: EXPANDED LIST DIALOG FOR OVERFLOW ITEMS */}
      {viewingAllEventsDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs"
            onClick={() => setViewingAllEventsDate(null)}
          />
          <div className="relative bg-white rounded-2xl p-5 w-full max-w-sm border border-neutral-200 shadow-xl z-10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <FaListUl className="text-neutral-500" size={12} />
                <h4 className="text-xs font-black text-neutral-950 font-mono">
                  Scheduled Targets ({viewingAllEventsDate.dateStr})
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setViewingAllEventsDate(null)}
                className="text-neutral-400 hover:text-neutral-900 cursor-pointer"
              >
                <FaTimes size={12} />
              </button>
            </div>

            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
              {events
                .filter((e) => e.date === viewingAllEventsDate.dateStr)
                .map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setActiveViewEvent(event)}
                    className={`p-2.5 rounded-xl text-xs font-bold border border-black/5 flex items-center justify-between shadow-3xs cursor-pointer transition-transform hover:scale-[1.01] ${event.color}`}
                  >
                    <span className="truncate pr-4">{event.title}</span>
                    <span className="text-[9px] font-mono opacity-75 shrink-0 flex items-center gap-1">
                      <FaClock size={8} />{" "}
                      {event.isAllDay
                        ? "All Day"
                        : `${event.startTime} - ${event.endTime}`}
                    </span>
                  </div>
                ))}
            </div>
            <div className="pt-2 border-t border-neutral-100 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingAllEventsDate(null)}
                className="px-4 py-1.5 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL C: INDIVIDUAL EVENT VIEW & DELETE MODAL */}
      {activeViewEvent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs"
            onClick={() => setActiveViewEvent(null)}
          />
          <div className="relative bg-white rounded-2xl p-5 w-full max-w-sm border border-neutral-200 shadow-xl z-10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${activeViewEvent.color.split(" ")[0]}`}
                />
                <h4 className="text-xs font-black text-neutral-950 font-mono">
                  Event Details
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveViewEvent(null)}
                className="text-neutral-400 hover:text-neutral-900 cursor-pointer"
              >
                <FaTimes size={12} />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider font-mono block">
                  Title
                </span>
                <p className="text-sm font-bold text-neutral-900 break-words mt-0.5">
                  {activeViewEvent.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-neutral-50 border border-neutral-200 rounded-xl p-3">
                <div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider font-mono block">
                    Date
                  </span>
                  <span className="text-xs font-bold text-neutral-800 font-mono block mt-0.5">
                    {activeViewEvent.date}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider font-mono block">
                    Time
                  </span>
                  <span className="text-xs font-bold text-neutral-800 font-mono block mt-0.5 flex items-center gap-1">
                    {activeViewEvent.isAllDay ? (
                      "All Day"
                    ) : (
                      <>
                        <FaClock size={10} className="text-neutral-400" />
                        {`${activeViewEvent.startTime} - ${activeViewEvent.endTime}`}
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => handleDeleteEvent(activeViewEvent.id)}
                className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <FaTrashAlt size={10} />
                Delete Event
              </button>
              <button
                type="button"
                onClick={() => setActiveViewEvent(null)}
                className="px-4 py-1.5 text-xs font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
