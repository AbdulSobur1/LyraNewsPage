"use client";

import Link from "next/link";
import { useBookmarkStore } from "@/store/bookmarks";
import { IconBookmark, IconBookmarkOff } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function SavedArticlesClient() {
  const { bookmarks, clearBookmarks } = useBookmarkStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-[200px] animate-pulse rounded-xl bg-[var(--surface)]"
          />
        ))}
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <IconBookmark className="mb-4 h-12 w-12 text-text-tertiary" aria-hidden="true" />
        <h2 className="mb-2 font-serif text-xl font-bold">No saved articles</h2>
        <p className="max-w-sm text-[13px] text-text-tertiary">
          Bookmark articles by tapping the bookmark icon on any article card or
          detail page.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[13px] text-text-tertiary">
          {bookmarks.length} saved article{bookmarks.length !== 1 ? "s" : ""}
        </p>
        <button
          onClick={clearBookmarks}
          className="flex cursor-pointer items-center gap-1.5 text-[12px] text-text-tertiary transition-colors hover:text-category-red"
          aria-label="Clear all bookmarks"
        >
          <IconBookmarkOff className="h-3.5 w-3.5" aria-hidden="true" />
          Clear all
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map((article) => (
          <Link
            key={article.slug}
            href={`/article/${article.slug}`}
            className="group block rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-200 hover:translate-y-[-2px] hover:border-[var(--border-hover)]"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-[4px] bg-gold/20 px-2 py-[1px] text-[9px] font-semibold uppercase tracking-[0.09em] text-gold">
                {article.category}
              </span>
            </div>
            <h3 className="mb-2 font-serif text-[15px] font-bold leading-[1.35] tracking-[-0.01em] text-[var(--text-primary)] line-clamp-3 group-hover:text-gold transition-colors">
              {article.title}
            </h3>
            <p className="mb-2 text-[12px] leading-relaxed text-text-secondary line-clamp-2">
              {article.dek}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-text-tertiary">
              <span>{article.source}</span>
              <span>·</span>
              <span>{article.timeAgo}</span>
              <span>·</span>
              <span>{article.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
