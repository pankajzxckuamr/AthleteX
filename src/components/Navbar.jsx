import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, Search, Menu, X } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

const navLinks = [
  { to: "/",         label: "Home"      },
  { to: "/dashboard",label: "Dashboard" },
  { to: "/players",  label: "Players"   },
  { to: "/trending", label: "Trending"  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-default)" }}
    >
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-6">

        {/* Brand */}
        <Link to="/" className="font-bold text-base flex-shrink-0"
              style={{ color: "var(--text-primary)" }}>
          AthleteX
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "text-white bg-white/5"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search button → navigates to search */}
        <button
          onClick={() => navigate("/search")}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition"
          style={{
            backgroundColor: "var(--bg-input)",
            border: "1px solid var(--border-default)",
            color: "var(--text-faint)",
            minWidth: "160px",
          }}
        >
          <Search className="w-3.5 h-3.5" />
          Search athletes...
        </button>

        {/* Notifications */}
        <NotificationDropdown />

        {/* Sign in */}
        <Link
          to="/login"
          className="hidden sm:block btn btn-ghost text-sm px-3 py-1.5"
        >
          Sign In
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 rounded-md"
          style={{ color: "var(--text-secondary)" }}
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t px-4 py-3 space-y-1"
             style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-default)" }}>
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive ? "text-white bg-white/5" : "text-gray-400 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-2 border-t" style={{ borderColor: "var(--border-default)" }}>
            <button
              onClick={() => { navigate("/search"); setMobileMenuOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm"
              style={{ color: "var(--text-faint)" }}
            >
              <Search className="w-4 h-4" /> Search athletes...
            </button>
            <Link to="/login" className="block px-3 py-2 text-sm font-medium"
                  style={{ color: "var(--text-secondary)" }}>
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
