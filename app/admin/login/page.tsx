"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ticker } from "@/components/ticker";
import { Nav } from "@/components/nav";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <>
      <Ticker />
      <Nav />
      <main className="mx-auto flex min-h-[60vh] w-full max-w-[400px] items-center justify-center px-5 py-20">
        <div className="w-full">
          <h1 className="mb-1 text-center font-serif text-2xl font-bold tracking-[-0.02em]">
            Admin sign in
          </h1>
          <p className="mb-8 text-center text-[13px] text-text-tertiary">
            LyraNews content management
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-[12px] font-medium text-text-secondary"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-hairline border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none placeholder:text-text-tertiary focus:border-gold/50"
                placeholder="admin@lyranews.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-[12px] font-medium text-text-secondary"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-hairline border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[14px] text-[var(--text-primary)] outline-none placeholder:text-text-tertiary focus:border-gold/50"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p className="text-center text-[13px] text-category-red" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer rounded-lg bg-gold px-4 py-2.5 text-[13px] font-semibold text-[#0A0A0B] transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
