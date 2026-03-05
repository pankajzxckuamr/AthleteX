import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";

export default function AthleteCard({ athlete, isFollowing, onToggleFollow }) {
  const navigate = useNavigate();

  return (
    <div className="card-hover overflow-hidden cursor-pointer"
         onClick={() => navigate(`/player/${athlete.id}`)}>

      {/* Photo area */}
      <div
        className="flex items-center justify-center"
        style={{ height: "120px", backgroundColor: "var(--bg-surface-2)" }}
      >
        <div className="flex flex-col items-center gap-2">
          <Avatar initials={athlete.initials} color={athlete.avatarColor} size="2xl" />
          <span className="text-xs" style={{ color: "var(--text-faint)" }}>Athlete Photo</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
          {athlete.name}
        </h3>
        <p className="sport-tag mb-3">{athlete.sport}</p>

        {/* Follow button — stops propagation so clicking it doesn't navigate */}
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
