import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Users, TrendingUp, Settings } from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard"  },
  { to: "/players",   icon: Users,           label: "My Players" },
  { to: "/trending",  icon: TrendingUp,      label: "Trending"   },
  { to: "/settings",  icon: Settings,        label: "Settings"   },
];

export default function Sidebar() {
  return (
    <aside className="w-44 flex-shrink-0 hidden lg:flex flex-col gap-1">
      {navItems.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `nav-item ${isActive ? "nav-item-active" : ""}`
          }
        >
          <Icon className="w-4 h-4" />
          {label}
        </NavLink>
      ))}
    </aside>
  );
}
