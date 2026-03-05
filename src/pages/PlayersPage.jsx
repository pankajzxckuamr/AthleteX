import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { api } from "../services/api";
import { useFollowedPlayers } from "../hooks/useFollowedPlayers";
import { sports } from "../data/mockData";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AthleteCard from "../components/AthleteCard";
import { SkeletonAthleteCard } from "../components/SkeletonLoader";

export default function PlayersPage() {
  const [athletes,    setAthletes]    = useState([]);
  const [isLoading,   setIsLoading]   = useState(true);
  const [activeSport, setActiveSport] = useState("All Sports");
  const [searchQuery, setSearchQuery] = useState("");

  const { toggle, isFollowing } = useFollowedPlayers();

  useEffect(() => {
    setIsLoading(true);
    api.getAthletes({ sport: activeSport, search: searchQuery }).then((list) => {
      setAthletes(list);
      setIsLoading(false);
    });
  }, [activeSport, searchQuery]);

  return (
    <div className="page">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-5">
        <div className="flex gap-5">

          {/* Sidebar */}
          <Sidebar />

          <main className="flex-1 min-w-0">

            {/* Page heading */}
            <h1 className="font-bold text-lg mb-4" style={{ color: "var(--text-primary)" }}>
              Browse Athletes
            </h1>

            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                      style={{ color: "var(--text-faint)" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search athletes..."
                className="input pl-9 pr-9"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ color: "var(--text-faint)" }}>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sport filters */}
            <div className="flex flex-wrap gap-2 mb-5">
              {sports.map((sport) => (
                <button
                  key={sport}
                  onClick={() => setActiveSport(sport)}
                  className={`filter-pill ${activeSport === sport ? "filter-pill-active" : ""}`}
                >
                  {sport}
                </button>
              ))}
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonAthleteCard key={i} />)}
              </div>
            ) : athletes.length === 0 ? (
              <div className="text-center py-16" style={{ color: "var(--text-secondary)" }}>
                <p className="text-lg mb-1">No athletes found</p>
                <p className="text-sm">Try a different search or sport filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {athletes.map((athlete) => (
                  <AthleteCard
                    key={athlete.id}
                    athlete={athlete}
                    isFollowing={isFollowing(athlete.id)}
                    onToggleFollow={toggle}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
