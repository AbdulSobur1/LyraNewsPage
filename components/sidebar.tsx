import Link from "next/link";
import type { CategoryItem, TrendingTopic } from "@/lib/data";

export function Sidebar({
  categories,
  trending,
}: {
  categories?: CategoryItem[];
  trending?: TrendingTopic[];
}) {
  const cats = categories || [];
  const trends = trending || [];

  return (
    <aside className="sidebar">
      {/* Browse by category */}
      {cats.length > 0 && (
        <div className="mb-3 overflow-hidden rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] p-4">
          <h2 className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.09em] text-text-tertiary">
            Browse by category
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {cats.map((cat) => (
              <Link
                key={cat.slug}
                href={cat.slug === "all" ? "/" : `/${cat.slug}`}
                className={`rounded-[20px] border border-hairline px-3 py-1 text-[11px] font-medium no-underline transition-all duration-150 ${
                  cat.slug === "all"
                    ? "border-gold bg-gold-dim text-gold"
                    : "border-[var(--border)] text-text-secondary hover:border-gold hover:bg-gold-dim hover:text-gold"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Trending topics */}
      {trends.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] p-4">
          <h2 className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.09em] text-text-tertiary">
            Trending topics
          </h2>
          <div>
            {trends.map((topic) => (
              <div
                key={topic.tag}
                className="flex cursor-pointer items-center gap-2.5 border-b border-hairline border-[var(--border)] py-[7px] transition-all duration-150 last:border-none hover:[&_span:nth-child(2)]:text-gold"
              >
                <span className="min-w-6 font-mono text-[10px] font-semibold tracking-[0.05em] text-text-tertiary">
                  {topic.tag}
                </span>
                <span className="flex-1 text-[13px] text-text-secondary transition-colors duration-150">
                  {topic.label}
                </span>
                <span className="text-[11px] text-text-tertiary">{topic.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
