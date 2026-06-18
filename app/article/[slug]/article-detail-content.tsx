"use client";

import type { ArticleItem } from "@/lib/data";
import { ShareButton } from "@/components/share-button";
import { BookmarkButton } from "@/components/bookmark-button";
import {
  IconClock,
  IconUser,
  IconExternalLink,
  IconGlobe,
  IconDeviceLaptop,
  IconChartLine,
  IconBallFootball,
} from "@tabler/icons-react";

interface Props {
  article: ArticleItem;
}

function getIcon(iconName?: string) {
  switch (iconName) {
    case "globe":
      return <IconGlobe className="h-12 w-12 text-white/8 sm:h-16 sm:w-16" aria-hidden="true" />;
    case "device-laptop":
      return <IconDeviceLaptop className="h-12 w-12 text-white/8 sm:h-16 sm:w-16" aria-hidden="true" />;
    case "chart-line":
      return <IconChartLine className="h-12 w-12 text-white/8 sm:h-16 sm:w-16" aria-hidden="true" />;
    case "ball-football":
      return <IconBallFootball className="h-12 w-12 text-white/8 sm:h-16 sm:w-16" aria-hidden="true" />;
    default:
      return (
        <IconGlobe className="h-12 w-12 text-white/8 sm:h-16 sm:w-16" aria-hidden="true" />
      );
  }
}

export function ArticleDetailContent({ article }: Props) {
  const hasImage = !!article.imageUrl;

  // Choose a decorative gradient for the header when there's no image
  const headerGradient =
    article.imageGradient ||
    (article.categorySlug === "world"
      ? "linear-gradient(135deg, #1A1A2E, #16213E, #0F3460)"
      : article.categorySlug === "business"
        ? "linear-gradient(135deg, #2a1e1e, #3a2a1e)"
        : article.categorySlug === "technology"
          ? "linear-gradient(135deg, #1e2a1e, #2a3a2e)"
          : article.categorySlug === "sports"
            ? "linear-gradient(135deg, #1e1e2a, #2a2a3e)"
            : article.categorySlug === "entertainment"
              ? "linear-gradient(135deg, #2a1e2a, #3e2a3e)"
              : "linear-gradient(135deg, #1A1A2E, #16213E)");

  return (
    <article>
      {/* Breadcrumb */}
      <nav
        className="mb-4 flex items-center gap-2 overflow-x-auto text-[12px] text-text-tertiary whitespace-nowrap"
        aria-label="Breadcrumb"
      >
        <a href="/" className="flex-shrink-0 transition-colors hover:text-text-primary">
          Home
        </a>
        <span aria-hidden="true" className="flex-shrink-0">/</span>
        <a
          href={`/${article.categorySlug}`}
          className="flex-shrink-0 transition-colors hover:text-text-primary"
        >
          {article.category}
        </a>
        <span aria-hidden="true" className="flex-shrink-0">/</span>
        <span className="truncate text-text-secondary">
          {article.title}
        </span>
      </nav>

      {/* Decorative header area — shows image or gradient+icon */}
      <div
        className="relative mb-6 -mx-4 flex h-[200px] items-center justify-center overflow-hidden sm:-mx-5 sm:h-[280px] sm:rounded-xl"
        style={hasImage ? undefined : { background: headerGradient }}
      >
        {hasImage ? (
          <img
            src={article.imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
            aria-hidden="true"
          />
        ) : (
          getIcon(article.imageIcon)
        )}
        {/* Overlay gradient for readability if image */}
        {hasImage && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        )}
      </div>

      {/* Category pill */}
      <span className="mb-4 inline-flex items-center rounded-[4px] bg-gold px-[9px] py-[3px] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0A0A0B]">
        {article.category}
      </span>

      {/* Headline */}
      <h1 className="mt-3 font-serif text-[26px] font-bold leading-[1.2] tracking-[-0.02em] text-[var(--text-primary)] sm:text-[32px] sm:leading-[1.15]">
        {article.title}
      </h1>

      {/* Dek */}
      <p className="mt-4 max-w-[680px] text-[15px] leading-relaxed text-text-secondary sm:text-[16px]">
        {article.dek}
      </p>

      {/* Meta bar */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-t border-hairline border-[var(--border)] py-4">
        <div className="flex items-center gap-2 text-[13px] text-text-secondary">
          <IconUser className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          <span className="font-medium text-text-primary">{article.source}</span>
        </div>
        <span className="hidden h-1 w-1 rounded-full bg-text-tertiary sm:block" aria-hidden="true" />
        <div className="flex items-center gap-1.5 text-[13px] text-text-tertiary">
          <IconClock className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          <span>{article.timeAgo}</span>
        </div>
        <span className="h-1 w-1 rounded-full bg-text-tertiary" aria-hidden="true" />
        <span className="text-[13px] text-text-tertiary">{article.readTime}</span>

        <div className="flex-1 min-w-0" />

        <div className="flex items-center gap-2">
          {article.externalUrl && (
            <a
              href={article.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md border border-hairline border-[var(--border)] px-3 py-1.5 text-[11px] text-text-secondary no-underline transition-all hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary"
            >
              <IconExternalLink className="h-3 w-3" aria-hidden="true" />
              Source
            </a>
          )}
          <BookmarkButton article={article} variant="detail" />
          <ShareButton
            title={article.title}
            url={`/article/${article.slug}`}
            variant="hero"
          />
        </div>
      </div>

      {/* Article body */}
      {article.content && (
        <div className="mt-8 max-w-[680px]">
          {article.content.split("\n\n").map((paragraph, i) => (
            <p
              key={i}
              className="mb-5 text-[15px] leading-[1.75] text-[var(--text-primary)] sm:text-[16px]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </article>
  );
}
