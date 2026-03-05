import React from "react";

export function SkeletonPost() {
  return (
    <div className="card p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="skeleton w-8 h-8 rounded-lg" />
        <div className="flex-1 space-y-1.5">
          <div className="skeleton h-3 w-1/3 rounded" />
          <div className="skeleton h-2 w-1/4 rounded" />
        </div>
      </div>
      <div className="skeleton h-3 w-full rounded" />
      <div className="skeleton h-3 w-5/6 rounded" />
      <div className="skeleton h-36 w-full rounded-lg" />
    </div>
  );
}

export function SkeletonAthleteCard() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-28 w-full" />
      <div className="p-3 space-y-2">
        <div className="skeleton h-3 w-2/3 rounded" />
        <div className="skeleton h-2 w-1/3 rounded" />
        <div className="skeleton h-7 w-full rounded-md" />
      </div>
    </div>
  );
}
