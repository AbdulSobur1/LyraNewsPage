import { Ticker } from "@/components/ticker";
import { Nav } from "@/components/nav";
import { ArticleCard } from "@/components/article-card";
import { searchArticlesAsync, tickerItems } from "@/lib/data";
import type { Metadata } from "next";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: "Search",
  description: "Search LyraNews for articles, topics, and sources.",
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const results = q ? await searchArticlesAsync(q) : [];

  return (
    <>
      <Ticker items={tickerItems} />
      <Nav />
      <main className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-5 sm:py-7">
        <h1 className="mb-6 font-serif text-2xl font-bold tracking-[-0.02em]">
          Search
        </h1>

        {/* Search form */}
        <form action="/search" method="GET" className="mb-8">
          <div className="relative max-w-md">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search headlines…"
              className="w-full rounded-lg border border-hairline border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 pl-10 text-[14px] text-[var(--text-primary)] outline-none placeholder:text-text-tertiary focus:border-gold/50"
              autoFocus
              aria-label="Search query"
            />
          </div>
        </form>

        {q && results.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-text-tertiary">
              No results found for &ldquo;{q}&rdquo;
            </p>
            <p className="mt-2 text-[13px] text-text-tertiary">
              Try a different search term or browse categories above.
            </p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <p className="mb-4 text-[13px] text-text-tertiary">
              {results.length} result{results.length !== 1 ? "s" : ""} for &ldquo;{q}&rdquo;
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
