import { useState } from "react";

const INITIAL_MOCK_MEETINGS = [
  {
    id: "mtg-101",
    title: "Sprint Alpha Architecture Sync Alignment",
    description:
      "Deep dive into cross-origin component matrix layers and performance bottlenecks.",
    date: "2026-06-12",
    startTime: "10:00",
    endTime: "11:30",
    timeZone: "Asia/Kathmandu",
    type: "Remote",
    location: "https://zoom.us/j/9876543210",
    host: "Rajesh Paudel",
    status: "Scheduled",
    priority: "High",
    attendees: ["rajesh@workspace.io", "jason.byun@realty.com"],
  },
  {
    id: "mtg-102",
    title: "Commercial Real Estate Strategy Review",
    description:
      "Quarterly portfolio alignment and user journey mapping for properties platform.",
    date: "2026-06-12",
    startTime: "14:00",
    endTime: "15:00",
    timeZone: "Asia/Kathmandu",
    type: "Hybrid",
    location: "Executive Boardroom Alpha",
    host: "Jason Byun",
    status: "In Progress",
    priority: "High",
    attendees: ["jason.byun@realty.com", "rajesh@workspace.io"],
  },
];

export const useMeetingOperations = () => {
  const [meetings, setMeetings] = useState(INITIAL_MOCK_MEETINGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);

  // Filter & Search Evaluation
  const filteredMeetings = meetings.filter((mtg) => {
    const matchesSearch =
      mtg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mtg.host.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mtg.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = activeFilter === "All" || mtg.status === activeFilter;
    return matchesSearch && matchesStatus;
  });

  // Action: Create or Update Master Schedule Handler
  const saveMeeting = (meetingPayload) => {
    if (meetingPayload.id) {
      // 🌐 BACKEND HOOK OPTION: replace with updateMutation.mutate(meetingPayload)
      setMeetings((prev) =>
        prev.map((m) =>
          m.id === meetingPayload.id ? { ...m, ...meetingPayload } : m,
        ),
      );
    } else {
      // 🌐 BACKEND HOOK OPTION: replace with createMutation.mutate(meetingPayload)
      const newMeeting = {
        ...meetingPayload,
        id: `mtg-${Date.now()}`,
        status: "Scheduled",
      };
      setMeetings((prev) => [newMeeting, ...prev]);
    }
    closeModal();
  };

  // Action: Delete Entry Track
  const deleteMeeting = (id) => {
    if (
      window.confirm(
        "Are you sure you want to completely de-schedule this operational block?",
      )
    ) {
      // 🌐 BACKEND HOOK OPTION: replace with deleteMutation.mutate(id)
      setMeetings((prev) => prev.filter((m) => m.id !== id));
    }
  };

  // Action: Update Single Lifecycle State Property
  const updateMeetingStatus = (id, newStatus) => {
    // 🌐 BACKEND HOOK OPTION: replace with statusMutation.mutate({ id, status: newStatus })
    setMeetings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m)),
    );
  };

  const openCreateModal = () => {
    setEditingMeeting(null);
    setIsModalOpen(true);
  };

  const openEditModal = (meeting) => {
    setEditingMeeting(meeting);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMeeting(null);
  };

  return {
    meetings: filteredMeetings,
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
  };
};
