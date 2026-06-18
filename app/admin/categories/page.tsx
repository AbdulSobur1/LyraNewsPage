"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { allCategories } from "@/lib/data";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";

export default function AdminCategoriesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/admin/login");
  }, [status, router]);

  if (status === "loading") return <p className="p-5 text-sm text-text-tertiary">Loading…</p>;
  if (!session) return null;

  return (
    <main className="mx-auto w-full max-w-[1440px] px-5 py-7">
      <Link
        href="/admin"
        className="mb-2 flex items-center gap-1 text-[12px] text-text-tertiary transition-colors hover:text-text-primary"
      >
        <IconArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Back to dashboard
      </Link>
      <h1 className="mb-6 font-serif text-2xl font-bold tracking-[-0.02em]">
        Categories
      </h1>

      <div className="overflow-hidden rounded-xl border border-hairline border-[var(--border)]">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-hairline border-[var(--border)] bg-[var(--obsidian)]">
              <th className="px-4 py-3 font-medium text-text-secondary">Slug</th>
              <th className="px-4 py-3 font-medium text-text-secondary">Label</th>
              <th className="px-4 py-3 font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allCategories.map((cat) => (
              <tr
                key={cat.slug}
                className="border-b border-hairline border-[var(--border)] transition-colors last:border-none hover:bg-[rgba(255,255,255,0.02)]"
              >
                <td className="px-4 py-3 text-[var(--text-primary)]">{cat.slug}</td>
                <td className="px-4 py-3 text-text-secondary">{cat.label}</td>
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
