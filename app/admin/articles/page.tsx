"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { allArticles } from "@/lib/data";
import { IconEdit, IconPlus, IconArrowLeft } from "@tabler/icons-react";

export default function AdminArticlesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  if (status === "loading") return <p className="p-5 text-sm text-text-tertiary">Loading…</p>;
  if (!session) return null;

  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 py-7">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            href="/admin"
            className="mb-2 flex items-center gap-1 text-[12px] text-text-tertiary transition-colors hover:text-text-primary"
          >
            <IconArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to dashboard
          </Link>
          <h1 className="font-serif text-2xl font-bold tracking-[-0.02em]">
            Articles
          </h1>
        </div>
        <button className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-gold px-3.5 py-2 text-[13px] font-semibold text-[#0A0A0B] transition-opacity hover:opacity-90">
          <IconPlus className="h-4 w-4" aria-hidden="true" />
          New article
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-hairline border-[var(--border)]">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-hairline border-[var(--border)] bg-[var(--obsidian)]">
              <th className="px-4 py-3 font-medium text-text-secondary">Title</th>
              <th className="px-4 py-3 font-medium text-text-secondary">Category</th>
              <th className="px-4 py-3 font-medium text-text-secondary">Source</th>
              <th className="px-4 py-3 font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allArticles.map((article) => (
              <tr
                key={article.slug}
                className="border-b border-hairline border-[var(--border)] transition-colors last:border-none hover:bg-[rgba(255,255,255,0.02)]"
              >
                <td className="px-4 py-3 text-[var(--text-primary)] max-w-xs truncate">
                  {article.title}
                </td>
                <td className="px-4 py-3 text-text-secondary">{article.category}</td>
                <td className="px-4 py-3 text-text-secondary">{article.source}</td>
                <td className="px-4 py-3">
                  <button className="flex cursor-pointer items-center gap-1 text-[12px] text-text-tertiary transition-colors hover:text-text-primary">
                    <IconEdit className="h-3.5 w-3.5" aria-hidden="true" />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
