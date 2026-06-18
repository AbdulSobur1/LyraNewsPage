"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconLogout,
  IconRefresh,
  IconArticle,
  IconCategory,
  IconSourceCode,
  IconDashboard,
} from "@tabler/icons-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-[1440px] items-center justify-center px-5 py-20">
        <p className="text-sm text-text-tertiary">Loading…</p>
      </main>
    );
  }

  if (!session) return null;

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/news?pageSize=5");
      const data = await res.json();
      alert(`Fetched ${data.articles?.length || 0} articles from ${data.provider || "provider"}.`);
    } catch {
      alert("Failed to refresh from source.");
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 py-7">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold tracking-[-0.02em]">
            Admin dashboard
          </h1>
          <p className="mt-1 text-[13px] text-text-tertiary">
            Signed in as {session.user?.email}
          </p>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-hairline border-[var(--border)] px-3.5 py-2 text-[12px] text-text-secondary transition-all hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary"
        >
          <IconLogout className="h-3.5 w-3.5" aria-hidden="true" />
          Sign out
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Articles */}
        <Link
          href="/admin/articles"
          className="group rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:translate-y-[-2px] hover:border-[var(--border-hover)]"
        >
          <IconArticle className="mb-3 h-6 w-6 text-gold" aria-hidden="true" />
          <h2 className="mb-1 font-serif text-[16px] font-bold">Articles</h2>
          <p className="text-[12px] text-text-tertiary">
            Create, edit, and manage articles.
          </p>
        </Link>

        {/* Categories */}
        <Link
          href="/admin/categories"
          className="group rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:translate-y-[-2px] hover:border-[var(--border-hover)]"
        >
          <IconCategory className="mb-3 h-6 w-6 text-gold" aria-hidden="true" />
          <h2 className="mb-1 font-serif text-[16px] font-bold">Categories</h2>
          <p className="text-[12px] text-text-tertiary">
            Manage content categories.
          </p>
        </Link>

        {/* Sources */}
        <Link
          href="/admin/sources"
          className="group rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:translate-y-[-2px] hover:border-[var(--border-hover)]"
        >
          <IconSourceCode className="mb-3 h-6 w-6 text-gold" aria-hidden="true" />
          <h2 className="mb-1 font-serif text-[16px] font-bold">Sources</h2>
          <p className="text-[12px] text-text-tertiary">
            Toggle news providers on/off.
          </p>
        </Link>
      </div>

      {/* Refresh from source */}
      <div className="mt-8 rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-1 font-serif text-[16px] font-bold">
              Refresh from source
            </h2>
            <p className="text-[12px] text-text-tertiary">
              Fetch the latest articles from the active news provider.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-[13px] font-semibold text-[#0A0A0B] transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            <IconRefresh
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              aria-hidden="true"
            />
            {refreshing ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>
    </main>
  );
}
