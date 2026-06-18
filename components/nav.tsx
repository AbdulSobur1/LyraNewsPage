"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconSearch, IconBookmark, IconMenu2, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { ThemeToggle } from "./theme-toggle";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-100 border-b border-hairline border-[var(--border)] bg-[rgba(10,10,11,0.95)] backdrop-blur-[12px]">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-7 px-5">
        {/* Brand */}
        <Link
          href="/"
          className="flex-shrink-0 font-serif text-[22px] font-bold tracking-[-0.02em] text-text-primary no-underline"
        >
          Lyra<span className="text-gold">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-0.5 md:flex md:flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-md px-2.5 py-1 text-[12px] font-medium uppercase tracking-[0.03em] no-underline transition-all duration-150 hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary ${
                isActive(link.href)
                  ? "text-gold"
                  : "text-text-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {/* Search */}
          <div className="relative hidden items-center sm:flex">
            <IconSearch
              className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-tertiary"
              aria-hidden="true"
            />
            <input
              readOnly
              onClick={() => window.location.href = '/search'}
              onKeyDown={(e) => { if (e.key === 'Enter') window.location.href = '/search'; }}
              placeholder="Search headlines…"
              className="w-[180px] cursor-pointer rounded-lg border border-hairline border-[var(--border)] bg-[rgba(255,255,255,0.05)] px-3 py-1.5 pl-8 text-[13px] text-text-secondary outline-none placeholder:text-text-tertiary focus:border-gold/50"
              tabIndex={0}
              aria-label="Search headlines"
            />
          </div>

          {/* Bookmarks */}
          <Link
            href="/saved"
            className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-hairline border-[var(--border)] bg-transparent text-text-secondary no-underline transition-all duration-150 hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary"
            aria-label="Bookmarks"
          >
            <IconBookmark className="h-4 w-4" aria-hidden="true" />
          </Link>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-hairline border-[var(--border)] bg-transparent text-text-secondary transition-all duration-150 hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <IconX className="h-4 w-4" aria-hidden="true" />
            ) : (
              <IconMenu2 className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-hairline border-[var(--border)] bg-[var(--obsidian)] px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2 text-[13px] font-medium text-text-secondary no-underline transition-colors hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/search"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-md px-3 py-2 text-[13px] font-medium text-text-secondary no-underline transition-colors hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary"
            >
              Search
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
