import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "../services/api";
export function useProjects() {
  const queryClient = useQueryClient();

  const {
    data: projects = [],
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["workspace-projects"],
    queryFn: async () => {
      const { data } = await api.get("projects");
      return data;
    },
    staleTime: 5 * 60 * 1000, // Keeps cache fresh for 5 mins to prevent repetitive background requests
  });

  const createProjectMutation = useMutation({
    mutationFn: async (newProjectData) => {
      const { data } = await api.post("/projects", newProjectData);
      return data;
    },
    onSuccess: () => {
      // Refresh the project list for both TaskSheet and ProjectSheet
      queryClient.invalidateQueries({ queryKey: ["workspace-projects"] });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, ...updatedFields }) => {
      const { data } = await api.put(`/projects/${id}`, updatedFields);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-projects"] });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/projects/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspace-projects"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-tasks"] });
    },
  });

  return {
    projects,
    isLoading,
    isError,
    error,
    isFetching,
    createProject: createProjectMutation.mutate,
    updateProject: updateProjectMutation.mutate,
    deleteProject: deleteProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,
    isUpdating: updateProjectMutation.isPending,
    isDeleting: deleteProjectMutation.isPending,
  };
}
