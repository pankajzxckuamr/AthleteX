import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    navigate("/dashboard");
  }

  return (
    <div className="page min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Card */}
        <div className="card p-8">
          <h1 className="text-xl font-bold text-center mb-1"
              style={{ color: "var(--text-primary)" }}>
            Welcome Back 👋
          </h1>
          <p className="text-xs text-center mb-6" style={{ color: "var(--text-secondary)" }}>
            Sign in to your AthleteX account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1.5"
                     style={{ color: "var(--text-secondary)" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="input"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5"
                     style={{ color: "var(--text-secondary)" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="input"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-purple w-full py-2.5 justify-center disabled:opacity-60"
            >
              {loading
                ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : "Sign In"}
            </button>
          </form>

          <p className="text-xs text-center mt-4" style={{ color: "var(--text-faint)" }}>
            Forgot password?
          </p>

          <div className="border-t mt-5 pt-4" style={{ borderColor: "var(--border-default)" }}>
            <p className="text-xs text-center" style={{ color: "var(--text-secondary)" }}>
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold transition hover:opacity-70"
                    style={{ color: "var(--accent)" }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
