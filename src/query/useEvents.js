import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export const useEvents = (year, month) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch events for the current grid month
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events", year, month, user?.id],
    queryFn: async () => {
      const { data } = await api.get(`/events?year=${year}&month=${month}`);
      return data;
    },
  });

  // Create Event Mutation
  const createEvent = useMutation({
    mutationFn: (newEvent) => api.post("/events", newEvent),
    onSuccess: () => queryClient.invalidateQueries(["events", year, month]),
  });

  // Delete Event Mutation
  const deleteEvent = useMutation({
    mutationFn: (id) => api.delete(`/events/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["events", year, month]),
  });

  return { events, isLoading, createEvent, deleteEvent };
};
