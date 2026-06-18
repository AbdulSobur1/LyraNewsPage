"use client";

import { useState } from "react";
import { tickerItems } from "@/lib/data";

export function Ticker() {
  const [paused, setPaused] = useState(false);

  // Duplicate items for seamless loop (CSS animates -50%)
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="ticker-wrap flex h-8 items-center overflow-hidden bg-gold">
      <div className="ticker-label flex h-full flex-shrink-0 items-center bg-[#0A0A0B] px-3.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-gold whitespace-nowrap">
        Breaking
      </div>
      <div
        className="flex-1 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className={`flex items-center gap-10 whitespace-nowrap pl-5 ${
            paused ? "animate-[none]" : "animate-ticker"
          }`}
          role="marquee"
          aria-live="off"
          aria-label="Breaking news headlines"
        >
          {items.map((text, i) => (
            <span key={i} className="text-[11px] font-medium tracking-[0.01em] text-[#0A0A0B]">
              {text}
              <span className="ml-10 text-[10px] text-black/30">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
