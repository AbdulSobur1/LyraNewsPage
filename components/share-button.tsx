"use client";

import { IconShare2 } from "@tabler/icons-react";

interface ShareButtonProps {
  title?: string;
  url?: string;
  variant?: "hero" | "card";
}

export function ShareButton({
  title,
  url,
  variant = "card",
}: ShareButtonProps) {
  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;

    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }

    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Clipboard not available — silently fail
    }
  };

  if (variant === "hero") {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleShare();
        }}
        className="flex cursor-pointer items-center gap-1.5 rounded-md border border-hairline border-white/15 bg-white/10 px-3 py-1 text-[11px] text-white/70 transition-all hover:bg-white/20"
        aria-label="Share this article"
      >
        <IconShare2 className="h-3 w-3" aria-hidden="true" />
        Share
      </button>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleShare();
      }}
      className="art-action flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border border-[transparent] bg-transparent text-[13px] text-text-tertiary transition-all duration-150 hover:border-[var(--border)] hover:bg-[rgba(255,255,255,0.07)] hover:text-text-primary"
      aria-label="Share this article"
    >
      <IconShare2 className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  );
}
