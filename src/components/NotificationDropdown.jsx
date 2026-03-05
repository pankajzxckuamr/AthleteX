import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { api } from "../services/api";

export default function NotificationDropdown() {
  const [isOpen,        setIsOpen]        = useState(false);
  const [notifications, setNotifications] = useState([]);
  const ref = useRef(null);

  useEffect(() => { api.getNotifications().then(setNotifications); }, []);

  /* Close on outside click */
  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative p-1.5 rounded-md transition hover:bg-white/5"
        style={{ color: "var(--text-secondary)" }}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span
            className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
            style={{ backgroundColor: "var(--accent)" }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-10 w-72 rounded-xl shadow-2xl z-50 overflow-hidden border"
          style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-default)" }}
        >
          <div className="px-4 py-3 border-b flex items-center justify-between"
               style={{ borderColor: "var(--border-default)" }}>
            <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
              Notifications
            </span>
            {unreadCount > 0 && (
              <span className="text-xs font-medium" style={{ color: "var(--accent)" }}>
                {unreadCount} new
              </span>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="px-4 py-3 flex items-start gap-3 cursor-pointer border-b transition hover:bg-white/5"
                style={{ borderColor: "var(--border-default)" }}
              >
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.read ? "opacity-0" : ""}`}
                  style={{ backgroundColor: "var(--accent)" }}
                />
                <div>
                  <p className="text-xs leading-snug" style={{ color: "var(--text-primary)" }}>
                    {n.message}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                    {n.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
