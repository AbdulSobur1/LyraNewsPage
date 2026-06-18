import { mostReadArticles } from "@/lib/data";

export function MostReadList() {
  return (
    <div>
      <div className="grid-section-title mb-3.5 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary after:h-px after:flex-1 after:bg-[var(--border)] after:content-['']">
        Most read today
      </div>
      <div className="overflow-hidden rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)]">
        {mostReadArticles.map((article, index) => (
          <div
            key={article.slug}
            className="flex cursor-pointer items-start gap-3.5 border-b border-hairline border-[var(--border)] px-4 py-3.5 transition-colors duration-150 last:border-none hover:bg-[rgba(255,255,255,0.02)]"
          >
            <span className="mt-0.5 min-w-7 font-serif text-[22px] font-bold leading-none text-text-tertiary">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h4 className="font-serif text-[14px] font-bold leading-[1.35] text-[var(--text-primary)]">
                {article.title}
              </h4>
              <p className="mt-1 text-[11px] text-text-tertiary">
                {article.source} · {article.timeAgo} · {article.readTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
