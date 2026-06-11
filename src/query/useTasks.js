import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export function useTasks() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["dashboard-tasks", user?.id],
    queryFn: async () => {
      const { data } = await api.get(`/tasks`);
      return data;
    },
    // Keep data fresh in memory for 5 minutes to prevent aggressive refetching on tab switching
    staleTime: 5 * 60 * 1000,
  });

  const createTaskMutation = useMutation({
    mutationFn: async (newTaskPayload) => {
      const { data } = await api.post("/tasks", newTaskPayload);
      return data;
    },
    onSuccess: () => {
      // Invalidate cache to pull fresh server-side data matching ownership structures
      queryClient.invalidateQueries({ queryKey: ["dashboard-tasks"] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, ...updatedFields }) => {
      const { data } = await api.put(`/tasks/${id}`, updatedFields);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/tasks/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-tasks"] });
    },
  });

  return {
    tasks,
    isLoading,
    isError,
    error,
    isFetching,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    isCreating: createTaskMutation.isPending,
    isUpdating: updateTaskMutation.isPending,
    isDeleting: deleteTaskMutation.isPending,
  };
}
