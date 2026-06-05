import React, { useEffect } from "react";
import {
  FaExclamationTriangle,
  FaTrashAlt,
  FaSignOutAlt,
  FaInfoCircle,
} from "react-icons/fa";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to proceed with this action? This operation cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  isLoading = false,
}) {
  // ⌨️ Handle Escape key close behavior
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 🛡️ Map variations to exact contextual accents
  const variantMap = {
    danger: {
      icon: <FaTrashAlt className="text-rose-600" size={16} />,
      iconBg: "bg-rose-50 border-rose-100",
      btnBg: "bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500",
    },
    warning: {
      icon: <FaExclamationTriangle className="text-amber-600" size={16} />,
      iconBg: "bg-amber-50 border-amber-100",
      btnBg: "bg-amber-500 hover:bg-amber-600 text-white focus:ring-amber-500",
    },
    info: {
      icon: <FaSignOutAlt className="text-[#5A24CA]" size={16} />,
      iconBg: "bg-purple-50 border-purple-100",
      btnBg: "bg-[#5A24CA] hover:bg-[#4A1CA5] text-white focus:ring-[#5A24CA]",
    },
  };

  const currentVariant = variantMap[variant] || variantMap.danger;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 🌑 Backdrop Overlay with subtle fade Blur */}
      <div
        className="absolute inset-0 bg-neutral-950/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={isLoading ? null : onClose}
      />

      {/* 📦 Modal Surface Container Box */}
      <div className="relative bg-white border border-neutral-200 w-full max-w-md rounded-xl p-5 shadow-xl transition-all scale-in duration-200 animate-in select-none z-10">
        <div className="flex items-start gap-3.5">
          {/* Contextual Icon Node */}
          <div
            className={`w-9 h-9 shrink-0 rounded-lg border flex items-center justify-center ${currentVariant.iconBg}`}
          >
            {currentVariant.icon}
          </div>

          {/* Typography Text Stack */}
          <div className="space-y-1 mt-0.5 flex-1">
            <h3 className="text-sm font-black text-neutral-950 tracking-tight leading-none">
              {title}
            </h3>
            <p className="text-xs text-neutral-500 font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* ⚙️ Action Footer Controls Layer Matrix */}
        <div className="mt-5 pt-3.5 border-t border-neutral-100 flex items-center justify-end gap-2">
          <button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            className="px-3.5 py-1.5 border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 font-bold text-xs rounded-lg transition-all cursor-pointer disabled:opacity-50 select-none"
          >
            {cancelText}
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={onConfirm}
            className={`px-3.5 py-1.5 font-bold text-xs rounded-lg transition-all cursor-pointer shadow-3xs flex items-center gap-1.5 disabled:opacity-75 disabled:cursor-not-allowed select-none ${currentVariant.btnBg}`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-3 w-3 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
