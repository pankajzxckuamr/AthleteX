import { useState, useCallback } from "react";

const STORAGE_KEY = "athletex_followed";

function loadFromStorage() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveToStorage(ids) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch {}
}

export function useFollowedPlayers() {
  const [followedIds, setFollowedIds] = useState(loadFromStorage);

  const toggle = useCallback((id) => {
    setFollowedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      saveToStorage(next);
      return next;
    });
  }, []);

  const isFollowing = useCallback((id) => followedIds.includes(id), [followedIds]);

  return { followedIds, toggle, isFollowing };
}
