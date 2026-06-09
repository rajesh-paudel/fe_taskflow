import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaPaperPlane,
  FaCircle,
  FaUserCircle,
  FaHashtag,
  FaCheckDouble,
} from "react-icons/fa";

export default function ChatSheet() {
  // 🧭 SELECTED ACTIVE TARGET CONVERSATION
  const [activeChannel, setActiveChannel] = useState({
    id: "c1",
    name: "general-sync",
    type: "channel",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [typedMessage, setTypedMessage] = useState("");

  // 📝 LOCAL STATE SYNC SCHEMA (Prepped to map incoming Socket payloads)
  const [conversations, setConversations] = useState([
    {
      id: "c1",
      name: "general-sync",
      type: "channel",
      unread: 0,
      lastMsg: "High-fidelity UI strips look clean.",
    },
    {
      id: "c2",
      name: "real-estate-project",
      type: "channel",
      unread: 3,
      lastMsg: "Jason updated the view requirements.",
    },
    {
      id: "u1",
      name: "Jason Byun",
      type: "direct",
      unread: 0,
      lastMsg: "Let's review the platform logs tonight.",
      online: true,
    },
    {
      id: "u2",
      name: "System Admin",
      type: "direct",
      unread: 0,
      lastMsg: "Database cluster synchronization complete.",
      online: false,
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: "m1",
      conversationId: "c1",
      sender: "System Admin",
      text: "Welcome to the central task management communication matrix.",
      timestamp: "09:15 AM",
      isMe: false,
    },
    {
      id: "m2",
      conversationId: "c1",
      sender: "Jason Byun",
      text: "Rajesh, did we finalize the responsive calendar layout padding?",
      timestamp: "09:30 AM",
      isMe: false,
    },
    {
      id: "m3",
      conversationId: "c1",
      sender: "Rajesh Paudel",
      text: "Yes, locked down the grid row boundaries and normalized it to a fixed min-height layout structure.",
      timestamp: "09:32 AM",
      isMe: true,
    },
    {
      id: "m4",
      conversationId: "c1",
      sender: "Jason Byun",
      text: "High-fidelity UI strips look clean.",
      timestamp: "09:33 AM",
      isMe: false,
    },
  ]);

  const messageEndRef = useRef(null);

  // 📜 AUTOMATIC SCROLL ANCHORING
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChannel]);

  // 🔌 SOCKET.IO DISPATCH PLUG (Hook lifecycle method layout pattern)
  const handleSendMessageSubmit = (e) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const outgoingPayload = {
      id: `m_${Date.now()}`,
      conversationId: activeChannel.id,
      sender: "Rajesh Paudel",
      text: typedMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isMe: true,
    };

    // Emit statement placeholder for your Socket setup:
    // socket.emit("send_message", outgoingPayload);

    setMessages((prev) => [...prev, outgoingPayload]);

    // Update local roster array snapshot state references
    setConversations((prev) =>
      prev.map((item) =>
        item.id === activeChannel.id
          ? { ...item, lastMsg: outgoingPayload.text, unread: 0 }
          : item,
      ),
    );

    setTypedMessage("");
  };

  // 🔍 IN-MEMORY ROSTER LIST FILTER MATHEMATICS
  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const activeMessages = messages.filter(
    (m) => m.conversationId === activeChannel.id,
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-3xs">
      {/* 📂 LEFT-SIDEBAR ROSTER: SEARCH & CONVERSATIONS TARGET MATRIX */}
      <aside className="w-80 border-r border-neutral-200 flex flex-col bg-neutral-50/40 shrink-0">
        {/* Search Header Context Box */}
        <div className="p-4 border-b border-neutral-200/80 bg-white">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
              <FaSearch size={11} />
            </span>
            <input
              type="text"
              placeholder="Search workspaces or direct items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-hidden transition-all"
            />
          </div>
        </div>

        {/* Dynamic Navigation Scroll Lane */}
        <div className="flex-1 overflow-y-auto p-2 space-y-3">
          {/* Channels Section Layout Block */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-black text-neutral-400 uppercase tracking-widest font-mono">
              Workspace Hubs
            </div>
            <div className="space-y-0.5 mt-1">
              {filteredConversations
                .filter((c) => c.type === "channel")
                .map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      activeChannel.id === channel.id
                        ? "bg-[#5A24CA]/10 text-[#5A24CA]"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <FaHashtag
                        className={
                          activeChannel.id === channel.id
                            ? "text-[#5A24CA]"
                            : "text-neutral-400"
                        }
                        size={12}
                      />
                      <div className="truncate">
                        <p
                          className={`text-xs font-bold ${activeChannel.id === channel.id ? "text-neutral-950" : "text-neutral-800"}`}
                        >
                          {channel.name}
                        </p>
                        <p className="text-[10px] text-neutral-400 truncate mt-0.5 font-medium">
                          {channel.lastMsg}
                        </p>
                      </div>
                    </div>
                    {channel.unread > 0 && (
                      <span className="bg-[#5A24CA] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full font-mono shadow-3xs shrink-0">
                        {channel.unread}
                      </span>
                    )}
                  </button>
                ))}
            </div>
          </div>

          {/* Direct Messaging Section Layout Block */}
          <div>
            <div className="px-3 py-1.5 text-[10px] font-black text-neutral-400 uppercase tracking-widest font-mono">
              Direct Channels
            </div>
            <div className="space-y-0.5 mt-1">
              {filteredConversations
                .filter((c) => c.type === "direct")
                .map((user) => (
                  <button
                    key={user.id}
                    onClick={() => setActiveChannel(user)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      activeChannel.id === user.id
                        ? "bg-[#5A24CA]/10 text-[#5A24CA]"
                        : "text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <div className="relative shrink-0">
                        <FaUserCircle className="text-neutral-300" size={24} />
                        <span
                          className={`absolute bottom-0 right-0 block w-2 h-2 rounded-full ring-2 ring-white ${user.online ? "bg-emerald-500" : "bg-neutral-300"}`}
                        />
                      </div>
                      <div className="truncate">
                        <p
                          className={`text-xs font-bold ${activeChannel.id === user.id ? "text-neutral-950" : "text-neutral-800"}`}
                        >
                          {user.name}
                        </p>
                        <p className="text-[10px] text-neutral-400 truncate mt-0.5 font-medium">
                          {user.lastMsg}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </aside>

      {/* 💬 MAIN CHATBOX STREAM WRAPPER ENGINE CONTAINER */}
      <main className="flex-1 flex flex-col bg-white">
        {/* Dynamic Context Header Bar */}
        <header className="px-6 py-4 border-b border-neutral-200 bg-neutral-50/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {activeChannel.type === "channel" ? (
              <FaHashtag className="text-[#5A24CA]" size={14} />
            ) : (
              <FaCircle className="text-emerald-500" size={8} />
            )}
            <h2 className="text-sm font-black text-neutral-950 tracking-tight font-mono">
              {activeChannel.name}
            </h2>
          </div>
          <div className="text-[10px] text-neutral-400 font-bold font-mono uppercase tracking-wider bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-md">
            Socket Stream Channel Connection Active
          </div>
        </header>

        {/* Messaging Logs Matrix Wrapper Viewport */}
        <div className="flex-1 overflow-y-auto p-6 bg-radial from-neutral-50/50 to-white space-y-4">
          {activeMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[70%] animate-in fade-in slide-in-from-bottom-2 duration-200 ${
                msg.isMe ? "ml-auto items-end" : "mr-auto items-start"
              }`}
            >
              {/* Sender Name Identifier (Hidden on localized personal streams) */}
              {!msg.isMe && (
                <span className="text-[10px] font-black text-neutral-400 font-mono mb-1 px-1">
                  {msg.sender}
                </span>
              )}

              {/* Chat Message Bubble Content Row layout */}
              <div
                className={`px-4 py-2.5 rounded-2xl text-xs font-medium shadow-3xs ${
                  msg.isMe
                    ? "bg-[#5A24CA] text-white rounded-br-none"
                    : "bg-neutral-100 text-neutral-900 border border-neutral-200/60 rounded-bl-none"
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">
                  {msg.text}
                </p>
              </div>

              {/* Status and Timestamp Bottom Line Descriptor */}
              <div className="flex items-center gap-1.5 mt-1 px-1">
                <span className="text-[9px] text-neutral-400 font-mono font-bold tracking-tight">
                  {msg.timestamp}
                </span>
                {msg.isMe && (
                  <FaCheckDouble
                    className="text-[#5A24CA] opacity-80"
                    size={9}
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Input Text Form Area Dispatch Controller Block */}
        <footer className="p-4 border-t border-neutral-200 bg-white">
          <form onSubmit={handleSendMessageSubmit} className="flex gap-2">
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              placeholder={`Send message securely to #${activeChannel.name}...`}
              className="flex-1 bg-neutral-50 border border-neutral-200 focus:border-neutral-950 rounded-xl px-4 py-2.5 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-hidden transition-colors"
            />
            <button
              type="submit"
              disabled={!typedMessage.trim()}
              className="px-4 bg-[#5A24CA] hover:bg-[#4A1CA5] disabled:bg-neutral-100 disabled:text-neutral-400 text-white rounded-xl transition-all shadow-3xs flex items-center justify-center shrink-0 cursor-pointer disabled:cursor-not-allowed"
            >
              <FaPaperPlane size={11} />
            </button>
          </form>
        </footer>
      </main>
    </div>
  );
}
