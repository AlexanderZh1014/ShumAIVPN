"use client";

import { useState } from "react";

type Account = {
  id: string;
  vpnUsername: string;
  vpnPassword: string;
  server: string;
  secret: string;
  status: string;
  expiresAt: string | null;
  createdAt: string;
  user: {
    email: string;
  };
};

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [message, setMessage] = useState("");

  async function loadUsers() {
    const res = await fetch("/api/users", {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Failed to load users");
      return;
    }

    setAccounts(data.accounts);
    setMessage("");
  }

  async function extendUser(username: string, days: number) {
    const res = await fetch("/api/admin/extend-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secret}`,
      },
      body: JSON.stringify({
        username,
        days,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Failed to extend user");
      return;
    }

    setMessage(`${username} extended ${days} days`);
    await loadUsers();
  }


  async function shortenUser(username: string, days: number) {
  const res = await fetch("/api/admin/shorten-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${secret}`,
    },
    body: JSON.stringify({
      username,
      days,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setMessage(data.error || "Failed to shorten user");
    return;
  }

  setMessage(`${username} shortened ${days} days`);
  await loadUsers();
}


  return (
    <main className="min-h-screen bg-[#0e0100] px-6 py-8 text-[#fffbff]">
      <section className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-bold">
          ShumAI VPN Admin
        </h1>

        <div className="mt-8 flex gap-3">
          <input
            type="password"
            placeholder="Admin Secret"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="w-full max-w-md rounded-xl border border-[#ff7a1b]/30 bg-[#1e0800] px-4 py-3 outline-none"
          />

          <button
            onClick={loadUsers}
            className="rounded-xl bg-[#ff4002] px-5 py-3 font-semibold text-white"
          >
            Load Users
          </button>
        </div>

        {message && (
          <p className="mt-4 text-[#ffd7cd]">
            {message}
          </p>
        )}

        <div className="mt-10 overflow-x-auto rounded-3xl border border-[#ff7a1b]/20 bg-[#1e0800]/90">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-[#ff7a1b]/20 text-[#ffd7cd]">
              <tr>
                <th className="p-4">Email</th>
                <th className="p-4">VPN User</th>
                <th className="p-4">Status</th>
                <th className="p-4">Expires At</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {accounts.map((account) => (
                <tr
                  key={account.id}
                  className="border-b border-[#ff7a1b]/10"
                >
                  <td className="p-4">{account.user.email}</td>
                  <td className="p-4 font-mono">{account.vpnUsername}</td>
                  <td
                    className={`p-4 font-semibold ${
                      account.status === "active"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {account.status}
                  </td>
                  <td className="p-4">
                    {account.expiresAt
                      ? new Date(account.expiresAt).toLocaleString()
                      : "No expiration"}
                  </td>
                  <td className="flex gap-2 p-4">
                    <button
                      onClick={() => extendUser(account.vpnUsername, 7)}
                      className="rounded-lg border border-[#ff7a1b]/30 px-3 py-2 hover:border-[#ff4002]"
                    >
                      +7 Days
                    </button>

                    <button
                      onClick={() => extendUser(account.vpnUsername, 30)}
                      className="rounded-lg border border-[#ff7a1b]/30 px-3 py-2 hover:border-[#ff4002]"
                    >
                      +30 Days
                    </button>

                    <button
                      onClick={() => extendUser(account.vpnUsername, 365)}
                      className="rounded-lg border border-[#ff7a1b]/30 px-3 py-2 hover:border-[#ff4002]"
                    >
                      +1 Year
                    </button>

                    <button
  onClick={() => shortenUser(account.vpnUsername, 7)}
  className="rounded-lg border border-yellow-500/40 px-3 py-2 text-yellow-300 hover:border-yellow-400"
>
  -7 Days
</button>

<button
  onClick={() => shortenUser(account.vpnUsername, 30)}
  className="rounded-lg border border-yellow-500/40 px-3 py-2 text-yellow-300 hover:border-yellow-400"
>
  -30 Days
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

