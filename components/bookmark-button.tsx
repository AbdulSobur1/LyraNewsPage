"use client";

import type { ArticleItem } from "@/lib/data";
import { IconBookmark } from "@tabler/icons-react";
import { useBookmarkStore } from "@/store/bookmarks";
import { useEffect, useState } from "react";

interface BookmarkButtonProps {
  article: ArticleItem;
  variant?: "card" | "detail";
}

export function BookmarkButton({ article, variant = "card" }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const bookmarked = isBookmarked(article.slug);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    if (variant === "detail") {
      return <div className="h-8 w-8 rounded-lg border border-hairline border-[var(--border)]" />;
    }
    return <div className="h-6 w-6 rounded-md" />;
  }

  if (variant === "detail") {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleBookmark(article);
        }}
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-hairline transition-all duration-150 ${
          bookmarked
            ? "border-gold bg-gold-dim text-gold"
            : "border-[var(--border)] text-text-secondary hover:border-[var(--border-hover)] hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary"
        }`}
        aria-label={bookmarked ? "Remove bookmark" : "Bookmark this article"}
      >
        <IconBookmark
          className={`h-4 w-4 ${bookmarked ? "fill-gold" : ""}`}
          aria-hidden="true"
        />
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleBookmark(article);
      }}
      className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border transition-all duration-150 ${
        bookmarked
          ? "border-gold bg-gold-dim text-gold"
          : "border-[transparent] text-text-tertiary hover:border-[var(--border)] hover:bg-[rgba(255,255,255,0.07)] hover:text-text-primary"
      }`}
      aria-label={bookmarked ? "Remove bookmark" : `Bookmark ${article.title}`}
    >
      <IconBookmark
        className={`h-3.5 w-3.5 ${bookmarked ? "fill-gold" : ""}`}
        aria-hidden="true"
      />
    </button>
  );
}
