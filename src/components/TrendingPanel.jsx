import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Avatar from "./Avatar";

export default function TrendingPanel() {
  const [trending, setTrending] = useState({ athletes: [], news: [], liveMatches: [] });
  const navigate = useNavigate();

  useEffect(() => { api.getTrending().then(setTrending); }, []);

  return (
    <div className="space-y-4">

      {/* ── Trending Athletes ── */}
      <div className="card-p">
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Trending Athletes
        </h3>
        <div className="space-y-2.5">
          {trending.athletes.map((athlete) => (
            <div
              key={athlete.id}
              onClick={() => navigate(`/player/${athlete.id}`)}
              className="flex items-center gap-2.5 cursor-pointer group rounded-lg p-1.5 -mx-1.5 transition hover:bg-white/5"
            >
              <Avatar initials={athlete.initials} color={athlete.avatarColor} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate transition group-hover:opacity-70"
                   style={{ color: "var(--text-primary)" }}>
                  {athlete.name}
                </p>
                <p className="text-xs" style={{ color: "var(--text-faint)" }}>
                  {athlete.sport}
                </p>
              </div>
              <button
                onClick={(e) => e.stopPropagation()}
                className="btn-follow-sm"
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trending News ── */}
      <div className="card-p">
        <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          Trending News
        </h3>
        <div className="space-y-3">
          {trending.news.map((item) => (
            <div key={item.id} className="cursor-pointer group">
              <p className="text-xs mb-0.5" style={{ color: "var(--text-faint)" }}>
                {item.tag}
              </p>
              <p className="text-xs font-medium transition group-hover:opacity-70"
                 style={{ color: "var(--text-primary)" }}>
                {item.title}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                {item.posts}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Live Matches ── */}
      <div className="card-p">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
            Live Matches
          </h3>
          <span className="badge-live">LIVE</span>
        </div>
        <div className="space-y-3">
          {trending.liveMatches.map((match) => (
            <div key={match.id}
                 className="rounded-lg p-2.5 border"
                 style={{ backgroundColor: "var(--bg-surface-2)", borderColor: "var(--border-default)" }}>
              <p className="text-xs mb-1.5" style={{ color: "var(--text-faint)" }}>
                {match.league}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                  {match.home}
                </span>
                <span className="text-xs font-bold px-2"
                      style={{ color: "var(--accent)" }}>
                  {match.homeScore} – {match.awayScore}
                </span>
                <span className="text-xs font-medium" style={{ color: "var(--text-primary)" }}>
                  {match.away}
                </span>
              </div>
              <p className="text-xs mt-1 text-center" style={{ color: "var(--text-faint)" }}>
                {match.time}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
