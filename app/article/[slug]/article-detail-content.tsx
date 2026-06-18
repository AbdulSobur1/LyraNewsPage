"use client";

import type { ArticleItem } from "@/lib/data";
import { ShareButton } from "@/components/share-button";
import { BookmarkButton } from "@/components/bookmark-button";
import { IconClock, IconUser } from "@tabler/icons-react";

interface Props {
  article: ArticleItem;
}

export function ArticleDetailContent({ article }: Props) {
  return (
    <article>
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-[12px] text-text-tertiary" aria-label="Breadcrumb">
        <a href="/" className="transition-colors hover:text-text-primary">
          Home
        </a>
        <span aria-hidden="true">/</span>
        <a
          href={`/${article.categorySlug}`}
          className="transition-colors hover:text-text-primary"
        >
          {article.category}
        </a>
        <span aria-hidden="true">/</span>
        <span className="max-w-[200px] truncate text-text-secondary">
          {article.title}
        </span>
      </nav>

      {/* Category pill */}
      <span className="mb-4 inline-flex items-center rounded-[4px] bg-gold px-[9px] py-[3px] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0A0A0B]">
        {article.category}
      </span>

      {/* Headline */}
      <h1 className="mt-3 font-serif text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[38px]">
        {article.title}
      </h1>

      {/* Dek */}
      <p className="mt-4 max-w-[680px] text-[16px] leading-relaxed text-text-secondary">
        {article.dek}
      </p>

      {/* Meta bar */}
      <div className="mt-6 flex flex-wrap items-center gap-4 border-b border-t border-hairline border-[var(--border)] py-4">
        <div className="flex items-center gap-2 text-[13px] text-text-secondary">
          <IconUser className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="font-medium text-text-primary">{article.source}</span>
        </div>
        <span className="h-1 w-1 rounded-full bg-text-tertiary" aria-hidden="true" />
        <div className="flex items-center gap-1.5 text-[13px] text-text-tertiary">
          <IconClock className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{article.timeAgo}</span>
        </div>
        <span className="h-1 w-1 rounded-full bg-text-tertiary" aria-hidden="true" />
        <span className="text-[13px] text-text-tertiary">{article.readTime}</span>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <BookmarkButton article={article} variant="detail" />
          <ShareButton
            title={article.title}
            url={`/article/${article.slug}`}
            variant="hero"
          />
        </div>
      </div>

      {/* Article body */}
      <div className="mt-8 max-w-[680px]">
        {article.content?.split("\n\n").map((paragraph, i) => (
          <p
            key={i}
            className="mb-5 text-[16px] leading-[1.75] text-[var(--text-primary)]"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
