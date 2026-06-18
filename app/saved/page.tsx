import { Ticker } from "@/components/ticker";
import { Nav } from "@/components/nav";
import { SavedArticlesClient } from "./saved-articles-client";
import { tickerItems } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Articles",
  description: "Your bookmarked articles from LyraNews.",
};

export default function SavedPage() {
  return (
    <>
      <Ticker items={tickerItems} />
      <Nav />
      <main className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-5 sm:py-7">
        <h1 className="mb-1 font-serif text-2xl font-bold tracking-[-0.02em]">
          Saved articles
        </h1>
        <p className="mb-8 text-[13px] text-text-tertiary">
          Articles you&apos;ve bookmarked for later reading.
        </p>
        <SavedArticlesClient />
      </main>
    </>
  );
}
