import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TrendingPanel from "../components/TrendingPanel";

export default function TrendingPage() {
  return (
    <div className="page">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex gap-5">
          <Sidebar />
          <main className="flex-1 min-w-0">
            <h1 className="font-bold text-lg mb-5" style={{ color: "var(--text-primary)" }}>
              Trending Now
            </h1>
            <div className="max-w-sm">
              <TrendingPanel />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
