"use client";

import { useTheme } from "next-themes";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="flex h-[34px] w-[34px] items-center justify-center rounded-lg border border-hairline border-[var(--border)] bg-transparent text-text-secondary transition-all duration-150 hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary"
        aria-label="Toggle theme"
        disabled
      >
        <IconSun className="h-4 w-4" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-lg border border-hairline border-[var(--border)] bg-transparent text-text-secondary transition-all duration-150 hover:bg-[rgba(255,255,255,0.05)] hover:text-text-primary"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
    </button>
  );
}
