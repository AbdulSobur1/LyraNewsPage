"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ArticleItem } from "@/lib/data";

interface BookmarkState {
  bookmarks: ArticleItem[];
  isBookmarked: (slug: string) => boolean;
  toggleBookmark: (article: ArticleItem) => void;
  removeBookmark: (slug: string) => void;
  clearBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      isBookmarked: (slug: string) => {
        return get().bookmarks.some((b) => b.slug === slug);
      },

      toggleBookmark: (article: ArticleItem) => {
        const { bookmarks } = get();
        const exists = bookmarks.some((b) => b.slug === article.slug);
        if (exists) {
          set({ bookmarks: bookmarks.filter((b) => b.slug !== article.slug) });
        } else {
          set({ bookmarks: [article, ...bookmarks] });
        }
      },

      removeBookmark: (slug: string) => {
        set({ bookmarks: get().bookmarks.filter((b) => b.slug !== slug) });
      },

      clearBookmarks: () => {
        set({ bookmarks: [] });
      },
    }),
    {
      name: "lyranews-bookmarks",
    },
  ),
);
