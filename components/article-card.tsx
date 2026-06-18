import Link from "next/link";
import type { ArticleItem } from "@/lib/data";
import {
  IconDeviceLaptop,
  IconChartLine,
  IconBallFootball,
  IconGlobe,
} from "@tabler/icons-react";
import { ShareButton } from "./share-button";
import { BookmarkButton } from "./bookmark-button";

interface ArticleCardProps {
  article: ArticleItem;
}

function getIcon(iconName?: string) {
  switch (iconName) {
    case "device-laptop":
      return <IconDeviceLaptop className="h-9 w-9 text-white/7" aria-hidden="true" />;
    case "chart-line":
      return <IconChartLine className="h-9 w-9 text-white/7" aria-hidden="true" />;
    case "ball-football":
      return <IconBallFootball className="h-9 w-9 text-white/7" aria-hidden="true" />;
    case "globe":
      return <IconGlobe className="h-9 w-9 text-white/7" aria-hidden="true" />;
    default:
      return (
        <IconDeviceLaptop className="h-9 w-9 text-white/7" aria-hidden="true" />
      );
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  const hasImage = !!article.imageUrl;

  return (
    <Link
      href={`/article/${article.slug}`}
      className="group block overflow-hidden rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] transition-all duration-200 hover:translate-y-[-2px] hover:border-[var(--border-hover)]"
    >
      {/* Image area */}
      <div
        className="relative flex h-[120px] items-center justify-center overflow-hidden sm:h-[130px]"
        style={
          hasImage
            ? undefined
            : article.imageGradient
              ? { background: article.imageGradient }
              : { background: "var(--obsidian)" }
        }
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
        <span className="absolute left-2.5 top-2.5 rounded-[4px] bg-black/70 px-[7px] py-[2px] text-[9px] font-semibold uppercase tracking-[0.09em] text-white/75 backdrop-blur-[4px]">
          {article.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-3.5">
        <h3 className="mb-2.5 font-serif text-[14px] font-bold leading-[1.35] tracking-[-0.01em] text-[var(--text-primary)] line-clamp-3 sm:text-[15px]">
          {article.title}
        </h3>
        <div className="flex items-center justify-between text-[11px] text-text-tertiary">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold opacity-60"
              aria-hidden="true"
            />
            <span className="truncate">{article.source}</span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="hidden sm:inline">{article.timeAgo}</span>
            <div className="flex gap-1.5">
              <BookmarkButton article={article} />
              <ShareButton title={article.title} url={`/article/${article.slug}`} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
