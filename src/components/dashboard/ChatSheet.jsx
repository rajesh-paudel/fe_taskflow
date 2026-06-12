import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaPaperPlane,
  FaCircle,
  FaUserCircle,
  FaHashtag,
  FaCheckDouble,
} from "react-icons/fa";
import { useChat } from "../../query/useChat";

export default function ChatSheet({ currentUser }) {
  const authenticatedUser = currentUser || {
    _id: "60c72b2f9b1d8b2bad7f3111",
    name: "Rajesh Paudel",
  };
  const currentUserId = authenticatedUser._id || authenticatedUser.id;

  const {
    activeChannel,
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    messages,
    startConversation,
    dispatchSocketMessage,
  } = useChat(currentUserId);

  const [typedMessage, setTypedMessage] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChannel]);

  const handleSendMessageSubmit = (e) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeChannel) return;

    dispatchSocketMessage(typedMessage, authenticatedUser);
    setTypedMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-2xs">
      {/* 📂 LEFT SIDEBAR */}
      <aside className="w-80 border-r border-neutral-200 flex flex-col bg-neutral-50/40 shrink-0">
        {/* 🎯 FIXED: Added "relative" containment layout so absolute dropdown positions perfectly */}
        <div className="p-4 border-b border-neutral-200/80 bg-white relative z-30">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
              <FaSearch size={11} />
            </span>
            <input
              type="text"
              placeholder="Search user profile roster node..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-900 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-neutral-900 placeholder-neutral-400 focus:outline-hidden transition-all"
            />
          </div>

          {/* Dynamic User Directory Match Dropdown */}
          {searchQuery && (
            /* 🛠️ FIXED: Normalized bounds mapping alignment container to sidebar grid */
            <div className="absolute left-4 right-4 z-50 mt-1 max-h-48 overflow-y-auto bg-white border border-neutral-200 rounded-xl shadow-xl divide-y divide-neutral-100">
              {isSearching ? (
                <div className="p-3 text-center text-neutral-400 font-medium text-xs">
                  Querying profiles...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-3 text-center text-neutral-400 text-xs">
                  No users matched.
                </div>
              ) : (
                searchResults.map((user) => (
                  <div
                    key={user._id || user.id}
                    onClick={() =>
                      startConversation({
                        targetUserId: user._id || user.id,
                      })
                    }
                    className="p-2.5 flex items-center gap-2 hover:bg-neutral-50 cursor-pointer transition-colors"
                  >
                    <img
                      src={
                        user.avatar ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80"
                      }
                      className="w-6 h-6 rounded-full object-cover"
                      alt=""
                    />
                    <div className="truncate flex-1">
                      <p className="text-xs font-bold text-neutral-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-neutral-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Lane Navigation Panel */}
        <div className="flex-1 overflow-y-auto p-2 relative z-10">
          <div className="px-3 py-1.5 text-[10px] font-black text-neutral-400 uppercase tracking-widest font-mono">
            Active Chat Node
          </div>
          {activeChannel ? (
            <div className="w-full flex items-center p-2.5 bg-[#5A24CA]/10 text-[#5A24CA] rounded-xl mt-1">
              <FaUserCircle
                className="text-neutral-400 mr-2 shrink-0"
                size={20}
              />
              <p className="text-xs font-bold text-neutral-950 truncate">
                {activeChannel.name}
              </p>
            </div>
          ) : (
            <p className="text-[11px] p-3 text-neutral-400 italic">
              No chat selected. Search above to start standard communication.
            </p>
          )}
        </div>
      </aside>

      {/* 💬 CHAT STREAM VIEWPORT */}
      <main className="flex-1 flex flex-col bg-white">
        {activeChannel ? (
          <>
            <header className="px-6 py-4 border-b border-neutral-200 bg-neutral-50/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <FaCircle className="text-emerald-500" size={8} />
                <h2 className="text-sm font-black text-neutral-950 tracking-tight font-mono">
                  {activeChannel.name}
                </h2>
              </div>
              <div className="text-[10px] text-neutral-400 font-bold font-mono uppercase tracking-wider bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded-md">
                Live Socket Session Pipeline
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col max-w-[70%] ${msg.isMe ? "ml-auto items-end" : "mr-auto items-start"}`}
                >
                  {!msg.isMe && (
                    <span className="text-[10px] font-black text-neutral-400 font-mono mb-1 px-1">
                      {msg.sender}
                    </span>
                  )}
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
                  <div className="flex items-center gap-1.5 mt-1 px-1">
                    <span className="text-[9px] text-neutral-400 font-mono font-bold">
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

            <footer className="p-4 border-t border-neutral-200 bg-white">
              <form onSubmit={handleSendMessageSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={typedMessage}
                  onChange={(e) => setTypedMessage(e.target.value)}
                  placeholder={`Write secure message payload to ${activeChannel.name}...`}
                  className="flex-1 bg-neutral-50 border border-neutral-200 focus:border-neutral-950 rounded-xl px-4 py-2.5 text-xs font-medium text-neutral-900 focus:outline-hidden transition-colors"
                />
                <button
                  type="submit"
                  disabled={!typedMessage.trim()}
                  className="px-4 bg-[#5A24CA] hover:bg-[#4A1CA5] disabled:bg-neutral-100 disabled:text-neutral-400 text-white rounded-xl transition-all flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
                >
                  <FaPaperPlane size={11} />
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 p-6">
            <FaUserCircle size={40} className="text-neutral-200 mb-2" />
            <p className="text-xs font-medium">
              Select a system user profile node to execute real-time
              communications.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
