import React from "react";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

/* Platform icon mapping */
const platformIcons = {
  twitter:   "🐦",
  instagram: "📸",
  news:      "📰",
  youtube:   "🎬",
};

export default function PostCard({ post, style }) {
  const navigate = useNavigate();
  const platformIcon = platformIcons[post.platform] || "📰";

  return (
    <div className="card" style={style}>
      <div className="p-4">

        {/* Author row */}
        <div
          className="flex items-center gap-3 mb-3 cursor-pointer group"
          onClick={() => navigate(`/player/${post.athleteId}`)}
        >
          <Avatar
            initials={post.initials}
            color={post.avatarColor}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span
                className="text-sm font-semibold truncate transition group-hover:opacity-70"
                style={{ color: "var(--text-primary)" }}
              >
                {post.athleteName}
              </span>
              {/* Verified badge */}
              <span className="text-blue-400 text-xs">✓</span>
              <span className="text-xs" style={{ color: "var(--text-faint)" }}>
                {platformIcon}
              </span>
            </div>
            <p className="text-xs" style={{ color: "var(--text-faint)" }}>
              {post.timestamp}
            </p>
          </div>
        </div>

        {/* Post title (news articles) */}
        {post.title && (
          <h3 className="font-semibold text-sm mb-1.5 leading-snug"
              style={{ color: "var(--text-primary)" }}>
            {post.title}
          </h3>
        )}

        {/* Post content */}
        <p className="text-sm leading-relaxed line-clamp-3"
           style={{ color: "var(--text-secondary)" }}>
          {post.content}
        </p>

        {/* Image/media placeholder */}
        {post.hasImage && (
          <div
            className="mt-3 rounded-lg flex items-center justify-center text-xs font-medium"
            style={{
              height: "160px",
              backgroundColor: "var(--bg-surface-2)",
              border: "1px solid var(--border-default)",
              color: "var(--text-faint)",
            }}
          >
            {post.multiPhoto ? (
              <div className="flex gap-2 w-full h-full p-2">
                <div className="flex-1 rounded-md flex items-center justify-center text-xs"
                     style={{ backgroundColor: "var(--bg-hover)", color: "var(--text-faint)" }}>
                  Photo 1
                </div>
                <div className="flex-1 rounded-md flex items-center justify-center text-xs"
                     style={{ backgroundColor: "var(--bg-hover)", color: "var(--text-faint)" }}>
                  Photo 2
                </div>
              </div>
            ) : (
              post.imagePlaceholder
            )}
          </div>
        )}

        {/* Action bar */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t"
             style={{ borderColor: "var(--border-default)" }}>
          <div className="flex items-center gap-4">
            {post.likes != null && (
              <ActionButton icon={<Heart className="w-3.5 h-3.5" />}
                            label={formatCount(post.likes)} />
            )}
            {post.comments != null && (
              <ActionButton icon={<MessageCircle className="w-3.5 h-3.5" />}
                            label={String(post.comments)} />
            )}
            {post.saves != null && (
              <ActionButton icon={<Bookmark className="w-3.5 h-3.5" />}
                            label={String(post.saves)} />
            )}
          </div>
          <ActionButton icon={<Share2 className="w-3.5 h-3.5" />} label="Share" />
        </div>

      </div>
    </div>
  );
}

/* Small icon + label button used in the action bar */
function ActionButton({ icon, label }) {
  return (
    <button
      className="flex items-center gap-1.5 text-xs transition hover:opacity-70"
      style={{ color: "var(--text-faint)" }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

/* Format 24500 → "24.5K" */
function formatCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}
