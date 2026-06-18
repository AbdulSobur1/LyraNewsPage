import Link from "next/link";
import { IconGlobe } from "@tabler/icons-react";
import type { ArticleItem } from "@/lib/data";
import { ShareButton } from "./share-button";

export function HeroCard({ article }: { article?: ArticleItem }) {
  if (!article) return null;

  const hasImage = article.imageUrl;

  return (
    <Link
      href={`/article/${article.slug}`}
      className="relative mb-5 flex h-[300px] cursor-pointer overflow-hidden rounded-[14px] border border-hairline border-[var(--border)] bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460] sm:h-[360px]"
    >
      {/* Background image if available */}
      {hasImage ? (
        <img
          src={article.imageUrl}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <IconGlobe className="h-16 w-16 text-white/6" aria-hidden="true" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 pb-5 sm:p-7 sm:pb-6">
        <span className="mb-2 inline-flex items-center rounded-[4px] bg-gold px-[9px] py-[3px] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0A0A0B] sm:mb-3">
          {article.category}
        </span>
        <h1 className="max-w-[580px] font-serif text-[22px] font-bold leading-[1.22] tracking-[-0.02em] text-white sm:text-[30px]">
          {article.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/55 sm:mt-3 sm:text-[12px]">
          <span>{article.source}</span>
          <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden="true" />
          <span>{article.timeAgo}</span>
          <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden="true" />
          <span>{article.readTime}</span>
          <div className="hidden flex-1 sm:block" />
          <ShareButton
            title={article.title}
            url={`/article/${article.slug}`}
            variant="hero"
          />
        </div>
      </div>
    </Link>
  );
}
