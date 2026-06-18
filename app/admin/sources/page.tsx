"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

interface SourceItem {
  name: string;
  provider: string;
  enabled: boolean;
}

const defaultSources: SourceItem[] = [
  { name: "Reuters", provider: "newsapi", enabled: true },
  { name: "Associated Press", provider: "newsapi", enabled: true },
  { name: "BBC News", provider: "newsapi", enabled: true },
  { name: "Bloomberg", provider: "newsapi", enabled: true },
  { name: "The Guardian", provider: "guardian", enabled: false },
  { name: "Al Jazeera", provider: "newsapi", enabled: true },
  { name: "ESPN", provider: "newsapi", enabled: true },
  { name: "Wired", provider: "newsapi", enabled: true },
  { name: "The Verge", provider: "newsapi", enabled: true },
  { name: "GNews", provider: "gnews", enabled: false },
];

export default function AdminSourcesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sources, setSources] = useState<SourceItem[]>(defaultSources);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  if (status === "loading") return <p className="p-5 text-sm text-text-tertiary">Loading…</p>;
  if (!session) return null;

  const toggleSource = (name: string) => {
    setSources((prev) =>
      prev.map((s) => (s.name === name ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 py-7">
      <Link
        href="/admin"
        className="mb-2 flex items-center gap-1 text-[12px] text-text-tertiary transition-colors hover:text-text-primary"
      >
        <IconArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to dashboard
      </Link>
      <h1 className="mb-1 font-serif text-2xl font-bold tracking-[-0.02em]">
        Sources
      </h1>
      <p className="mb-6 text-[13px] text-text-tertiary">
        Toggle news providers on or off. Only enabled sources will be used when fetching articles.
      </p>

      <div className="overflow-hidden rounded-xl border border-hairline border-[var(--border)]">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-hairline border-[var(--border)] bg-[var(--obsidian)]">
              <th className="px-4 py-3 font-medium text-text-secondary">Name</th>
              <th className="px-4 py-3 font-medium text-text-secondary">Provider</th>
              <th className="px-4 py-3 font-medium text-text-secondary">Status</th>
              <th className="px-4 py-3 font-medium text-text-secondary">Toggle</th>
            </tr>
          </thead>
          <tbody>
            {sources.map((source) => (
              <tr
                key={source.name}
                className="border-b border-hairline border-[var(--border)] transition-colors last:border-none hover:bg-[rgba(255,255,255,0.02)]"
              >
                <td className="px-4 py-3 text-[var(--text-primary)]">{source.name}</td>
                <td className="px-4 py-3 text-text-secondary">{source.provider}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-[1px] text-[10px] font-semibold uppercase tracking-[0.05em] ${
                      source.enabled
                        ? "bg-green-900/30 text-green-400"
                        : "bg-red-900/30 text-red-400"
                    }`}
                  >
                    {source.enabled ? "Enabled" : "Disabled"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleSource(source.name)}
                    className={`cursor-pointer rounded-md px-3 py-1 text-[11px] font-medium transition-all ${
                      source.enabled
                        ? "border border-hairline border-red-900/50 text-red-400 hover:bg-red-900/20"
                        : "border border-hairline border-green-900/50 text-green-400 hover:bg-green-900/20"
                    }`}
                  >
                    {source.enabled ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-[11px] text-text-tertiary">
        Provider config is set via the <code className="text-gold">NEWS_PROVIDER</code> environment variable.
        Currently active: <span className="font-medium text-text-secondary">newsapi</span>.
      </p>
    </main>
  );
}
