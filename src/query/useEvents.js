import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./axiosInstance";
export function useGetEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data } = await api.get("/events");
      return data;
    },
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newEventPayload) => {
      const { data } = await api.post("/events", newEventPayload);
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error) => {
      console.error("Failed to commit event pipeline sync:", error);
    },
  });
}
