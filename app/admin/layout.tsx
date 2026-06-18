"use client";

import { SessionProvider } from "next-auth/react";
import { Ticker } from "@/components/ticker";
import { Nav } from "@/components/nav";
import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <Ticker />
      <Nav />
      {children}
    </SessionProvider>
  );
}
