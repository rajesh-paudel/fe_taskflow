import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

export const useMeetingOperations = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);

  const { data: meetings = [] } = useQuery({
    queryKey: ["meetings", searchQuery, activeFilter],
    queryFn: async () => {
      const response = await api.get(`/meetings`, {
        params: { search: searchQuery, status: activeFilter },
      });
      return response.data;
    },
    placeholderData: (previousData) => previousData, // TanStack v5 alternative to keepPreviousData
  });

  const createMutation = useMutation({
    mutationFn: (newMtg) => api.post("/meetings", newMtg),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["meetings"] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) =>
      api.put(`/meetings/${id}`, updatedData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["meetings"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/meetings/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["meetings"] }),
  });

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

  const saveMeeting = async (formData) => {
    // Extract array of attendee user IDs to send to backend
    const payload = {
      ...formData,
      attendees: formData.attendees.map((a) => a._id),
    };

    if (editingMeeting) {
      await updateMutation.mutateAsync({
        id: editingMeeting.id || editingMeeting._id,
        updatedData: payload,
      });
    } else {
      await createMutation.mutateAsync(payload);
    }
    closeModal();
  };

  // 🎯 CLEANED UP: Only pass the specific status change parameter
  const updateMeetingStatus = async (id, nextStatus) => {
    await updateMutation.mutateAsync({
      id,
      updatedData: { status: nextStatus }, // Backend receives just the field it needs
    });
  };

  return {
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
    deleteMeeting: deleteMutation.mutate,
    updateMeetingStatus,
  };
};
