import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { api } from "../services/api";
import { useFollowedPlayers } from "../hooks/useFollowedPlayers";
import { sports } from "../data/mockData";
import AthleteCard from "../components/AthleteCard";
import Avatar from "../components/Avatar";
import { SkeletonAthleteCard } from "../components/SkeletonLoader";

export default function SignupPage() {
  const navigate = useNavigate();

  /* ── Form state ── */
  const [step,     setStep]     = useState("form"); /* "form" | "select" */
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);

  /* ── Athlete selection state ── */
  const [athletes,      setAthletes]      = useState([]);
  const [loadingList,   setLoadingList]   = useState(false);
  const [searchQuery,   setSearchQuery]   = useState("");
  const [activeSport,   setActiveSport]   = useState("All Sports");
  const { followedIds, toggle, isFollowing } = useFollowedPlayers();

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setStep("select");
  }

  /* Load athletes whenever sport filter changes */
  useEffect(() => {
    if (step !== "select") return;
    setLoadingList(true);
    api.getAthletes({ sport: activeSport, search: searchQuery }).then((list) => {
      setAthletes(list);
      setLoadingList(false);
    });
  }, [step, activeSport, searchQuery]);

  /* ══════════════════════════════════════════
     STEP 1 — Signup form
  ══════════════════════════════════════════ */
  if (step === "form") {
    return (
      <div className="page min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="card p-8">
            <h1 className="text-xl font-bold text-center mb-1"
                style={{ color: "var(--text-primary)" }}>
              Create Account
            </h1>
            <p className="text-xs text-center mb-6" style={{ color: "var(--text-secondary)" }}>
              Join AthleteX and follow your sports heroes
            </p>

            <form onSubmit={handleSignup} className="space-y-4">
              {[
                { label: "Full Name",  type: "text",     value: name,     set: setName,     ph: "John Doe"          },
                { label: "Email",      type: "email",    value: email,    set: setEmail,    ph: "your@email.com"    },
                { label: "Password",   type: "password", value: password, set: setPassword, ph: "••••••••"           },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs font-medium mb-1.5"
                         style={{ color: "var(--text-secondary)" }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    required
                    placeholder={field.ph}
                    className="input"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className="btn-purple w-full py-2.5 justify-center disabled:opacity-60"
              >
                {loading
                  ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : "Create Account"}
              </button>
            </form>

            <div className="border-t mt-5 pt-4" style={{ borderColor: "var(--border-default)" }}>
              <p className="text-xs text-center" style={{ color: "var(--text-secondary)" }}>
                Already have an account?{" "}
                <Link to="/login" className="font-semibold transition hover:opacity-70"
                      style={{ color: "var(--accent)" }}>
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════
     STEP 2 — Choose athletes
  ══════════════════════════════════════════ */
  return (
    <div className="page">
      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="font-bold text-2xl mb-1" style={{ color: "var(--text-primary)" }}>
            Choose Your Athletes
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Select athletes you want to follow
          </p>
        </div>

        {/* Search bar */}
        <div className="relative max-w-2xl mx-auto mb-5">
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
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
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

        {/* Main layout — athlete grid + favorites panel */}
        <div className="flex gap-6">

          {/* Athlete grid */}
          <div className="flex-1">
            <p className="text-xs font-medium mb-3" style={{ color: "var(--text-secondary)" }}>
              {activeSport === "All Sports" ? "All Athletes" : activeSport}
            </p>
            {loadingList ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonAthleteCard key={i} />)}
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
          </div>

          {/* Your Favorites panel (desktop only) */}
          {followedIds.length > 0 && (
            <div className="w-56 flex-shrink-0 hidden lg:block">
              <div className="card-p sticky top-20">
                <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
                  Your Favorites
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto mb-4">
                  {followedIds.map((id) => {
                    const a = athletes.find((x) => x.id === id);
                    if (!a) return null;
                    return (
                      <div key={id} className="flex items-center gap-2 rounded-lg p-1.5"
                           style={{ backgroundColor: "var(--bg-surface-2)" }}>
                        <Avatar initials={a.initials} color={a.avatarColor} size="xs" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
                            {a.name}
                          </p>
                          <p className="text-xs" style={{ color: "var(--text-faint)" }}>{a.sport}</p>
                        </div>
                        <button onClick={() => toggle(id)}
                                style={{ color: "var(--text-faint)" }}>
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="btn-purple w-full justify-center py-2 text-xs"
                >
                  Continue ({followedIds.length} selected)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile continue bar */}
        {followedIds.length > 0 && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 border-t"
               style={{ backgroundColor: "var(--bg-surface)", borderColor: "var(--border-default)" }}>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn-purple w-full justify-center py-2.5"
            >
              Continue ({followedIds.length} selected)
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
