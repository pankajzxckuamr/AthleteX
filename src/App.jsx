import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage      from "./pages/LandingPage";
import LoginPage        from "./pages/LoginPage";
import SignupPage       from "./pages/SignupPage";
import Dashboard        from "./pages/Dashboard";
import PlayersPage      from "./pages/PlayersPage";
import PlayerProfile    from "./pages/PlayerProfile";
import SearchPage       from "./pages/SearchPage";
import TrendingPage     from "./pages/TrendingPage";

/* Placeholder for pages not yet built */
function PlaceholderPage({ title }) {
  return (
    <div className="page min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-3">🚧</div>
        <p className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{title}</p>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Coming soon</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<LandingPage />}   />
        <Route path="/login"     element={<LoginPage />}     />
        <Route path="/signup"    element={<SignupPage />}    />
        <Route path="/dashboard" element={<Dashboard />}     />
        <Route path="/players"   element={<PlayersPage />}   />
        <Route path="/player/:id" element={<PlayerProfile />} />
        <Route path="/search"    element={<SearchPage />}    />
        <Route path="/trending"  element={<TrendingPage />}  />
        <Route path="/settings"  element={<PlaceholderPage title="Settings" />} />
        <Route path="*"          element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
