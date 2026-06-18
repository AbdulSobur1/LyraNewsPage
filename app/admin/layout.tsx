"use client";

import { SessionProvider } from "next-auth/react";
import { Ticker } from "@/components/ticker";
import { Nav } from "@/components/nav";
import { tickerItems } from "@/lib/data";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Ticker items={tickerItems} />
      <Nav />
      {children}
    </SessionProvider>
  );
}
