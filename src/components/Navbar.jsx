import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaThLarge, FaSignOutAlt } from "react-icons/fa";

const navLinks = [
  { title: "Features", href: "/features" },
  { title: "About", href: "/about" },
  { title: "Blog", href: "/blog" },
  { title: "Solutions", href: "/solutions" },
  { title: "Resources", href: "/resources" },
  { title: "Enterprise", href: "/enterprise" },
  { title: "Pricing", href: "/pricing" },
  { title: "Request a demo", href: "/contact-sales" },
];

const Navbar = () => {
  // 1. Consume the live authentication state properties
  const { user, logout } = useAuth();

  // 2. Track whether the small profile dropdown modal is visible
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 3. Clean UX: Close the user modal instantly if clicking anywhere else outside it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="border-b border-neutral-200/80 bg-white sticky top-0 z-50">
      <nav
        className="w-full grid items-center gap-4 px-6 py-4 md:grid-cols-[1fr_auto_1fr] lg:px-8 "
        aria-label="Main navigation"
      >
        {/* BRAND IDENTITY */}
        <Link to="/" className="flex w-fit items-center">
          <img src={logo} className="h-8 w-auto" alt="TaskFlow" />
        </Link>

        {/* MIDDLE MARKETING NAVIGATION */}
        <div className="hidden lg:flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-neutral-500">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="transition hover:text-neutral-950"
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* RIGHT CONTROL BLOCK: DYNAMIC CONDITIONAL RENDERING */}
        <div className="flex items-center gap-4 md:justify-end">
          {user ? (
            /* ========================================== */
            /* PROFILE MODE LAYER (If Logged In)          */
            /* ========================================== */
            <div className="relative" ref={dropdownRef}>
              {/* Circular Monogram Button Element */}
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-100 border border-neutral-200/60 shadow-xs transition hover:scale-105 active:scale-95 cursor-pointer select-none overflow-hidden"
              >
                {user.profilePic ? (
                  /* Condition A: Render user avatar image if it exists */
                  <img
                    src={user?.profilePic}
                    alt={user?.name || "User profile"}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      // Fallback safety: If image link breaks at runtime, remove it to force monogram/avatar fallback
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  /* Condition B: Render clean default silhouette placeholder (Facebook style) */
                  <svg
                    className="h-full w-full text-neutral-400 bg-neutral-200 pt-1.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </button>

              {/* Floating Profile Context Dropdown Modal */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-56 rounded-xl border border-neutral-200/80 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  {/* Account Summary Segment */}
                  <div className="px-3 py-2 border-b border-neutral-100 mb-1">
                    <p className="text-xs font-black text-neutral-950 truncate">
                      {user?.name}
                    </p>
                    <p className="text-[10px] text-neutral-400 font-mono truncate font-medium mt-0.5">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={() => setIsDropdownOpen(false)}
                    className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 transition-colors"
                  >
                    <FaThLarge className="text-neutral-400 text-[11px]" />
                    Dashboard
                  </Link>

                  {/* Sign Out Trigger Anchor */}
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
                  >
                    <FaSignOutAlt className="text-rose-400 text-[11px]" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ========================================== */
            /* ANONYMOUS GUEST GATEWAY LAYER (Logged Out) */
            /* ========================================== */
            <>
              <Link
                to="/login"
                className="text-sm font-semibold text-neutral-500 hover:text-neutral-950 px-3 py-2 rounded-lg transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-neutral-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-neutral-900 shadow-sm"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
