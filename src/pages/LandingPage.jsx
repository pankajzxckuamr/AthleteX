import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Rss, Heart } from "lucide-react";
import { api } from "../services/api";
import { useFollowedPlayers } from "../hooks/useFollowedPlayers";
import Navbar from "../components/Navbar";
import AthleteCard from "../components/AthleteCard";
import Footer from "../components/Footer";

const howItWorksSteps = [
  { icon: <UserPlus className="w-5 h-5" />, label: "1. Choose Athletes",    desc: "Select your favorite athletes from various sports to follow" },
  { icon: <Rss className="w-5 h-5" />,     label: "2. Get Updates",        desc: "Receive real-time updates from all their social media and news" },
  { icon: <Heart className="w-5 h-5" />,   label: "3. Stay Connected",     desc: "Never miss a moment from your sports heroes" },
];

/* Featured athletes shown on landing — first 4 */
const FEATURED_COUNT = 4;

export default function LandingPage() {
  const navigate = useNavigate();
  const [featuredAthletes, setFeaturedAthletes] = useState([]);
  const { toggle, isFollowing } = useFollowedPlayers();

  useEffect(() => {
    api.getAthletes().then((list) => setFeaturedAthletes(list.slice(0, FEATURED_COUNT)));
  }, []);

  return (
    <div className="page">
      <Navbar />

      {/* ── Hero ── */}
      <section className="px-4 pt-16 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — headline + CTA */}
            <div>
              <h1 className="font-bold leading-tight mb-4"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 2.75rem)", color: "var(--text-primary)" }}>
                All Updates About Your Favorite Athletes in One Place
              </h1>
              <p className="text-sm leading-relaxed mb-8 max-w-md"
                 style={{ color: "var(--text-secondary)" }}>
                Follow athletes across all platforms. Get real-time updates, news, and social media
                posts in a single personalized feed.
              </p>
              <button
                onClick={() => navigate("/players")}
                className="btn-purple px-5 py-2.5 text-sm"
              >
                Get Started
              </button>
            </div>

            {/* Right — stadium/image placeholder */}
            <div
              className="hidden lg:flex items-center justify-center rounded-xl"
              style={{
                height: "280px",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-default)",
                color: "var(--text-faint)",
                fontSize: "0.875rem",
              }}
            >
              Sports Stadium Background
            </div>
          </div>
        </div>
      </section>

      {/* ── Follow Your Sports Heroes ── */}
      <section className="px-4 py-14"
               style={{ backgroundColor: "var(--bg-surface)" }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-semibold text-lg mb-8"
              style={{ color: "var(--text-primary)" }}>
            Follow Your Sports Heroes
          </h2>

          {/* Athlete grid — 2 cols on mobile, 4 on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredAthletes.map((athlete) => (
              <AthleteCard
                key={athlete.id}
                athlete={athlete}
                isFollowing={isFollowing(athlete.id)}
                onToggleFollow={toggle}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/players")}
              className="btn-outline-purple px-5 py-2 text-sm"
            >
              View All Athletes
            </button>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="px-4 py-14"
               style={{ backgroundColor: "var(--bg-surface-2)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center font-semibold text-lg mb-10"
              style={{ color: "var(--text-primary)" }}>
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {howItWorksSteps.map((step) => (
              <div key={step.label} className="text-center px-4">
                <div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: "var(--accent-dim)", color: "var(--accent)" }}
                >
                  {step.icon}
                </div>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>
                  {step.label}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
