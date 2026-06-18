import { Ticker } from "@/components/ticker";
import { Nav } from "@/components/nav";
import { DateBar } from "@/components/date-bar";
import { HeroCard } from "@/components/hero-card";
import { ArticleCard } from "@/components/article-card";
import { MostReadList } from "@/components/most-read-list";
import { Sidebar } from "@/components/sidebar";
import { latestArticles } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      <Ticker />
      <Nav />

      <main className="mx-auto w-full max-w-[1440px] px-5 py-7">
        <DateBar />
        <HeroCard />

        {/* Latest stories grid */}
        <div className="grid-section-title mb-3.5 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-text-tertiary after:h-px after:flex-1 after:bg-[var(--border)] after:content-['']">
          Latest stories
        </div>
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Two-column layout: Most read + sidebar */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
          <MostReadList />
          <Sidebar />
        </div>
      </main>
    </>
  );
}
