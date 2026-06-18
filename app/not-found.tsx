import Link from "next/link";
import { Ticker } from "@/components/ticker";
import { Nav } from "@/components/nav";
import { tickerItems } from "@/lib/data";

export default function NotFound() {
  return (
    <>
      <Ticker items={tickerItems} />
      <Nav />
      <main className="mx-auto flex min-h-[50vh] w-full max-w-[1440px] flex-col items-center justify-center px-4 py-20 text-center sm:px-5">
        <span className="mb-4 font-serif text-[56px] font-bold leading-none text-text-tertiary sm:text-[72px]">404</span>
        <h1 className="mb-3 font-serif text-2xl font-bold tracking-[-0.02em]">
          Page not found
        </h1>
        <p className="mb-8 max-w-sm text-[14px] text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-gold px-5 py-2.5 text-[13px] font-semibold text-[#0A0A0B] no-underline transition-opacity hover:opacity-90"
        >
          Back to homepage
        </Link>
      </main>
    </>
  );
}
