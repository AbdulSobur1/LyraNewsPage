import { IconGlobe } from "@tabler/icons-react";
import { heroArticle } from "@/lib/data";
import { ShareButton } from "./share-button";

export function HeroCard() {
  return (
    <div className="relative mb-5 h-[360px] cursor-pointer overflow-hidden rounded-[14px] border border-hairline border-[var(--border)] bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#0F3460]">
      <div className="absolute inset-0 flex items-center justify-center">
        <IconGlobe className="h-16 w-16 text-white/6" aria-hidden="true" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-7 pb-6">
        <span className="mb-3 inline-flex items-center rounded-[4px] bg-gold px-[9px] py-[3px] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0A0A0B]">
          {heroArticle.category}
        </span>
        <h1 className="max-w-[580px] font-serif text-[30px] font-bold leading-[1.22] tracking-[-0.02em] text-white">
          {heroArticle.title}
        </h1>
        <div className="mt-3 flex items-center gap-4 text-[12px] text-white/55">
          <span>{heroArticle.source}</span>
          <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden="true" />
          <span>{heroArticle.timeAgo}</span>
          <span className="h-[3px] w-[3px] rounded-full bg-white/30" aria-hidden="true" />
          <span>{heroArticle.readTime}</span>
          <div className="flex-1" />
          <ShareButton
            title={heroArticle.title}
            url={`/article/${heroArticle.slug}`}
            variant="hero"
          />
        </div>
      </div>
    </div>
  );
}
