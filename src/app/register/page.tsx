"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Register failed");
    } else {
      setMessage("Verification email sent. Please check your inbox.");
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#0e0100] text-[#fffbff]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="text-2xl font-bold tracking-tight">
          ShumAI<span className="text-[#ff4002]">VPN</span>
        </a>

        <a href="/login" className="text-sm text-[#ffd7cd] hover:text-white">
          Login
        </a>
      </nav>

      <section className="relative flex min-h-[80vh] items-center justify-center px-6">
        <div className="absolute left-1/2 top-24 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-[#ff4002]/25 blur-3xl" />

        <div className="w-full max-w-md rounded-3xl border border-[#ff7a1b]/25 bg-[#1e0800]/90 p-8 shadow-2xl shadow-orange-950/40">
          <div className="mb-6 rounded-full border border-[#ff7a1b]/40 px-4 py-2 text-center text-sm text-[#ffd7cd]">
            Start secure access
          </div>

          <h1 className="text-center text-4xl font-bold">Create Account</h1>

          <p className="mt-3 text-center text-sm text-[#ffd7cd]">
            Verify your email to activate your VPN account.
          </p>

          <form onSubmit={handleRegister} className="mt-8 space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-[#ff7a1b]/25 bg-[#0e0100] px-4 py-3 text-[#fffbff] outline-none placeholder:text-[#cfa49a] focus:border-[#ff4002]"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-[#ff7a1b]/25 bg-[#0e0100] px-4 py-3 text-[#fffbff] outline-none placeholder:text-[#cfa49a] focus:border-[#ff4002]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#ff4002] py-3 font-semibold text-white shadow-lg shadow-orange-950/40 hover:bg-[#ff562a] disabled:opacity-60"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          {message && (
            <p className="mt-4 rounded-xl border border-[#ff7a1b]/30 bg-[#ff4002]/10 p-3 text-sm text-[#ffd7cd]">
              {message}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}