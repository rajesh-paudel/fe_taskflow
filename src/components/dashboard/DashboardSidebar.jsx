import React from "react";
import {
  FaFolder,
  FaHome,
  FaPlus,
  FaSearch,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
export default function DashboardSidebar({
  structuralMenuItems,
  activeTab,
  onTabChange,
}) {
  const { user, logout } = useAuth();
  const handleMenuClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <aside className="w-full md:w-68 shrink-0 border-b md:border-b-0 md:border-r border-neutral-200/80 bg-neutral-50 p-4 flex flex-col justify-between h-auto md:h-full overflow-y-auto">
      <div className="space-y-6">
        {/* User Profile Block */}
        <div className="flex items-center gap-3 p-1">
          {user?.image ? (
            <img
              src={user.image}
              alt={user?.name || "User profile"}
              className="h-10 w-10 shrink-0 rounded-xl object-cover shadow-xs border border-neutral-200/60"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-950 text-sm font-black text-white font-mono shadow-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-xs font-black text-neutral-950 tracking-tight">
              {user?.name || "Guest User"}
            </p>
            <p className="truncate text-[10px] text-neutral-400 font-mono font-medium">
              {user?.email || "no-email@workspace.com"}
            </p>
          </div>
        </div>

        <nav className="space-y-5">
          {/* Quick Search */}
          <div className="relative group">
            <FaSearch className="absolute left-3 top-2.5 text-xs text-neutral-400 group-focus-within:text-neutral-950 transition-colors" />
            <input
              type="text"
              placeholder="Quick Search (⌘K)"
              className="w-full bg-neutral-200/40 border border-neutral-200/30 rounded-lg pl-8 pr-3 py-1.5 text-xs font-medium placeholder-neutral-400 focus:outline-hidden"
            />
          </div>

          <section className="space-y-0.5">
            {structuralMenuItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-neutral-950 font-bold shadow-xs border border-neutral-200/60"
                      : "text-neutral-500 hover:bg-neutral-200/40 hover:text-neutral-950"
                  }`}
                >
                  <Icon
                    className={
                      isSelected ? "text-neutral-950" : "text-neutral-400"
                    }
                  />
                  {item.label}
                </button>
              );
            })}
          </section>
        </nav>
      </div>

      {/* Footer Logout Action Block */}
      <button
        onClick={logout}
        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors mt-4 cursor-pointer"
      >
        <FaSignOutAlt className="text-red-500" />
        Logout
      </button>
    </aside>
  );
}
