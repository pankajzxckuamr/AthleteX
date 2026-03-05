import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, ArrowRight } from "lucide-react";
import { api } from "../services/api";
import { useFollowedPlayers } from "../hooks/useFollowedPlayers";
import Navbar from "../components/Navbar";
import Avatar from ".//../components/Avatar";
import Footer from "../components/Footer";
import { SkeletonAthleteCard } from "../components/SkeletonLoader";

const searchTabs = ["All", "Athletes", "Teams", "News"];

/* Search result card — used for athletes, teams, news in screenshot */
function SearchResultCard({ type, athlete, onToggleFollow, isFollowing, navigate }) {
  if (type === "athlete" && athlete) {
    return (
      <div className="card overflow-hidden cursor-pointer group"
           onClick={() => navigate(`/player/${athlete.id}`)}>
        <div className="flex items-center justify-center"
             style={{ height: "100px", backgroundColor: "var(--bg-surface-2)" }}>
          <div className="flex flex-col items-center gap-1.5">
            <Avatar initials={athlete.initials} color={athlete.avatarColor} size="lg" />
            <span className="text-xs" style={{ color: "var(--text-faint)" }}>Athlete Photo</span>
          </div>
        </div>
        <div className="p-3">
          <p className="font-semibold text-sm truncate transition group-hover:opacity-70"
             style={{ color: "var(--text-primary)" }}>
            {athlete.name}
          </p>
          <p className="sport-tag mb-2">{athlete.sport} · {athlete.team}</p>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFollow(athlete.id); }}
            className={isFollowing ? "btn-following-sm w-full justify-center" : "btn-follow-sm w-full justify-center"}
          >
            {isFollowing ? "✓ Following" : "+ Follow"}
          </button>
        </div>
      </div>
    );
  }
  return null;
}

export default function SearchPage() {
  const navigate = useNavigate();
  const [query,      setQuery]      = useState("");
  const [activeTab,  setActiveTab]  = useState("All");
  const [results,    setResults]    = useState({ athletes: [], posts: [] });
  const [isLoading,  setIsLoading]  = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);

  const { toggle, isFollowing } = useFollowedPlayers();

  /* Auto-focus search input */
  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    if (!query.trim()) { setResults({ athletes: [], posts: [] }); setHasSearched(false); return; }
    setIsLoading(true);
    setHasSearched(true);
    const timer = setTimeout(() => {
      api.search(query).then((data) => {
        setResults(data);
        setIsLoading(false);
      });
    }, 300); /* debounce */
    return () => clearTimeout(timer);
  }, [query]);

  const filteredAthletes = activeTab === "News" ? [] : results.athletes;

  return (
    <div className="page min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Search input */}
        <div className="relative mb-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                  style={{ color: "var(--text-faint)" }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for athletes, teams, or news..."
            className="input pl-10 pr-10 py-3 text-sm rounded-lg"
          />
          {query && (
            <button onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--text-faint)" }}>
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {searchTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`filter-pill ${activeTab === tab ? "filter-pill-active" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Results */}
        {isLoading ? (
          <div>
            <p className="text-xs mb-3" style={{ color: "var(--text-faint)" }}>Search Results</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => <SkeletonAthleteCard key={i} />)}
            </div>
          </div>
        ) : hasSearched ? (
          filteredAthletes.length > 0 ? (
            <div>
              <p className="text-xs mb-3" style={{ color: "var(--text-faint)" }}>Search Results</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredAthletes.map((athlete) => (
                  <SearchResultCard
                    key={athlete.id}
                    type="athlete"
                    athlete={athlete}
                    isFollowing={isFollowing(athlete.id)}
                    onToggleFollow={toggle}
                    navigate={navigate}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                No results for "{query}"
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Try searching by athlete name, sport, or team.
              </p>
            </div>
          )
        ) : (
          /* Empty state — before any search */
          <div className="text-center py-16">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-20"
                    style={{ color: "var(--text-secondary)" }} />
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              Search for your favorite athletes, teams, or news
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
