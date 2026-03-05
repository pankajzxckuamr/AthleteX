import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { api } from "../services/api";
import { useFollowedPlayers } from "../hooks/useFollowedPlayers";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import Avatar from "../components/Avatar";
import { SkeletonPost } from "../components/SkeletonLoader";

export default function PlayerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [athlete,  setAthlete]  = useState(null);
  const [posts,    setPosts]    = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts,   setLoadingPosts]   = useState(true);

  const { toggle, isFollowing } = useFollowedPlayers();

  useEffect(() => {
    setLoadingProfile(true);
    api.getAthleteById(id).then((data) => {
      setAthlete(data);
      setLoadingProfile(false);
    });
    setLoadingPosts(true);
    api.getFeedForAthlete(id).then((data) => {
      setPosts(data);
      setLoadingPosts(false);
    });
  }, [id]);

  if (loadingProfile) return <LoadingSkeleton />;
  if (!athlete) return <NotFound />;

  const following = isFollowing(athlete.id);

  return (
    <div className="page">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm mb-5 transition hover:opacity-70"
          style={{ color: "var(--text-secondary)" }}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {/* ── Profile card ── */}
        <div className="card overflow-hidden mb-4">

          {/* Cover photo area */}
          <div
            className="flex items-center justify-center text-xs"
            style={{
              height: "120px",
              backgroundColor: "var(--bg-surface-2)",
              color: "var(--text-faint)",
            }}
          >
            Cover Photo
          </div>

          {/* Info row */}
          <div className="px-5 py-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <Avatar
                  initials={athlete.initials}
                  color={athlete.avatarColor}
                  size="xl"
                />
                <div>
                  <h1 className="font-bold text-lg leading-tight"
                      style={{ color: "var(--text-primary)" }}>
                    {athlete.name}
                  </h1>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {athlete.role} | {athlete.team}
                  </p>
                  <button
                    onClick={() => toggle(athlete.id)}
                    className={`mt-2 btn text-xs px-3 py-1.5 ${following ? "btn-following-sm" : "btn-outline-purple"}`}
                  >
                    {following ? "✓ Following" : "+ Follow"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {athlete.statLabels.map((label, i) => {
            const statValues = Object.values(athlete.stats);
            return (
              <div key={label} className="card-p text-center">
                <p className="font-bold text-base" style={{ color: "var(--text-primary)" }}>
                  {typeof statValues[i] === "number"
                    ? statValues[i].toLocaleString()
                    : statValues[i]}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-faint)" }}>
                  {label}
                </p>
              </div>
            );
          })}
        </div>

        {/* ── About ── */}
        <div className="card-p mb-4">
          <h2 className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>
            About
          </h2>
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {athlete.bio}
          </p>
        </div>

        {/* ── Recent Posts ── */}
        <h2 className="font-semibold text-sm mb-3" style={{ color: "var(--text-primary)" }}>
          Recent Posts
        </h2>
        {loadingPosts ? (
          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, i) => <SkeletonPost key={i} />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="card-p text-center py-8">
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              No posts yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        )}

      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="page">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
        <div className="card overflow-hidden">
          <div className="skeleton h-28 w-full" />
          <div className="p-5 space-y-2">
            <div className="skeleton h-5 w-1/3 rounded" />
            <div className="skeleton h-3 w-1/2 rounded" />
          </div>
        </div>
        <div className="skeleton h-20 rounded-xl" />
        <SkeletonPost />
      </div>
    </div>
  );
}

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="page min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          Athlete not found
        </p>
        <button onClick={() => navigate("/players")} className="btn-outline-purple px-4 py-2 text-sm">
          Browse Athletes
        </button>
      </div>
    </div>
  );
}
