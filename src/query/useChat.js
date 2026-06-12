import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { io } from "socket.io-client";

// Global singleton socket instance to prevent multiplexing connections
const socket = io(import.meta.env.VITE_WS_URL || "http://localhost:5000");

export const useChat = (currentUserId) => {
  const queryClient = useQueryClient();
  const [activeChannel, setActiveChannel] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = window.localStorage.getItem(
        "taskflow_active_chat_channel",
      );
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      return null;
    }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 1. Fetch active log data for selected room via React Query
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", activeChannel?.id],
    queryFn: async () => {
      if (!activeChannel?.id) return [];
      const res = await api.get(`/chat/messages/${activeChannel.id}`);
      return res.data.map((m) => ({
        id: m._id,
        conversationId: m.conversationId,
        sender: m.sender?.name || "Unknown",
        text: m.text,
        timestamp: new Date(m.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isMe: m.sender?._id === currentUserId || m.sender === currentUserId,
      }));
    },
    enabled: !!activeChannel?.id,
  });

  // 2. Directory user lookup context sync
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const delayDebounce = setTimeout(async () => {
      try {
        const res = await api.get(`/users?search=${searchQuery}`);
        setSearchResults(res.data || []);
      } catch (err) {
        console.error("Directory search failure", err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // 3. Mutation to create or fetch a room when clicking a user
  const startConversationMutation = useMutation({
    // 💡 Explicitly destructure targetUserId directly out of the incoming click payload object
    mutationFn: async ({ targetUserId }) => {
      const res = await api.post("/chat/conversation", { targetUserId });
      return res.data;
    },
    onSuccess: (data) => {
      if (!data) return;

      // Guard rail to unpack your data safely whether it's full documents or raw IDs
      const partner = data.participants?.find((p) => {
        const pId = typeof p === "object" ? p._id || p.id : p;
        return pId !== currentUserId;
      });

      const fallbackPartnerName =
        partner && typeof partner === "object"
          ? partner.name
          : "Direct Message";

      // Set the state that opens the message window panel view
      const channel = {
        id: data._id || data.id,
        name: fallbackPartnerName,
        type: "direct",
      };

      setActiveChannel(channel);
      window.localStorage.setItem(
        "taskflow_active_chat_channel",
        JSON.stringify(channel),
      );

      // Tap into WebSocket room pipeline
      socket.emit("join_room", data._id || data.id);

      // Clear dropdown modal inputs
      setSearchQuery("");
      setSearchResults([]);
    },
    onError: (err) => {
      console.error("Critical error opening chat channel window:", err);
    },
  });

  // 4. Socket live data stream synchronization
  useEffect(() => {
    if (!activeChannel?.id) return undefined;

    socket.emit("join_room", activeChannel.id);

    const handler = (incomingMsg) => {
      if (incomingMsg.conversationId === activeChannel.id) {
        queryClient.setQueryData(["messages", activeChannel.id], (prev) => [
          ...(prev || []),
          {
            id: incomingMsg.id,
            conversationId: incomingMsg.conversationId,
            sender: incomingMsg.sender?.name || incomingMsg.sender,
            text: incomingMsg.text,
            timestamp: incomingMsg.timestamp,
            isMe:
              (incomingMsg.sender?._id || incomingMsg.sender) === currentUserId,
          },
        ]);
      }
    };

    socket.on("receive_message", handler);

    return () => {
      socket.off("receive_message", handler);
    };
  }, [activeChannel?.id, queryClient, currentUserId]);

  const dispatchSocketMessage = (text, userMeta) => {
    if (!activeChannel?.id) return;

    const socketPayload = {
      id: `m_${Date.now()}`,
      conversationId: activeChannel.id,
      sender: {
        _id: currentUserId,
        name: userMeta.name,
        avatar: userMeta.avatar,
      },
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    socket.emit("send_message", socketPayload);
  };

  return {
    activeChannel,
    setActiveChannel,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    messages,
    startConversation: startConversationMutation.mutate, // Connected trigger reference
    dispatchSocketMessage,
  };
};
