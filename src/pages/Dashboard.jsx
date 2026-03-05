import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import TrendingPanel from "../components/TrendingPanel";
import { SkeletonPost } from "../components/SkeletonLoader";
import { api } from "../services/api";
import { useFollowedPlayers } from "../hooks/useFollowedPlayers";

export default function DashboardPage() {
  const [posts,     setPosts]     = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { followedIds } = useFollowedPlayers();

  useEffect(() => {
    setIsLoading(true);
    api.getFeed({ athleteIds: followedIds }).then((data) => {
      setPosts(data);
      setIsLoading(false);
    });
  }, [followedIds.join(",")]);

  return (
    <div className="page">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* Three-column layout: sidebar | feed | trending */}
        <div className="flex gap-5">

          {/* ── Left sidebar ── */}
          <Sidebar />

          {/* ── Main feed ── */}
          <main className="flex-1 min-w-0 space-y-4">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => <SkeletonPost key={i} />)
            ) : posts.length === 0 ? (
              <EmptyState />
            ) : (
              posts.map((post, i) => (
                <PostCard
                  key={post.id}
                  post={post}
                  style={{ animationDelay: `${i * 80}ms` }}
                  className="animate-fade-up"
                />
              ))
            )}
          </main>

          {/* ── Right trending panel ── */}
          <aside className="w-64 flex-shrink-0 hidden xl:block">
            <TrendingPanel />
          </aside>

        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20">
      <div className="text-4xl mb-3">🏆</div>
      <p className="font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        Your feed is empty
      </p>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Go to Players and follow some athletes to see their updates here.
      </p>
    </div>
  );
}
