import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Ticker } from "@/components/ticker";
import { Nav } from "@/components/nav";
import { ArticleDetailContent } from "./article-detail-content";
import {
  getArticleBySlugAsync,
  getArticlesByCategoryAsync,
  getArticleBySlug,
  tickerItems,
} from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  // Try both async (with NewsAPI merge) and sync (mock-only) lookup
  const article = (await getArticleBySlugAsync(slug)) || getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };

  return {
    title: article.title,
    description: article.dek,
    openGraph: {
      title: article.title,
      description: article.dek,
      type: "article",
      authors: [article.source],
      section: article.category,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  // Try async first (with NewsAPI merge), fall back to mock-only for reliability
  let article = await getArticleBySlugAsync(slug);
  if (!article) {
    article = getArticleBySlug(slug);
  }

  if (!article) {
    notFound();
  }

  // Related articles: same category, excluding current, up to 3
  const categoryArticles = await getArticlesByCategoryAsync(article.categorySlug);
  const related = categoryArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.dek,
    author: { "@type": "Organization", name: article.source },
    publisher: {
      "@type": "Organization",
      name: "LyraNews",
      logo: {
        "@type": "ImageObject",
        url: "https://lyranews.vercel.app/logo.png",
      },
    },
    articleSection: article.category,
  };

  return (
    <>
      <Ticker items={tickerItems} />
      <Nav />
      <main className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-5 sm:py-7">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ArticleDetailContent article={article} />

        {/* Read full article call-to-action for external (NewsAPI) articles */}
        {article.externalUrl && (
          <div className="mt-8 rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] p-6 text-center">
            <p className="mb-4 text-[14px] text-text-secondary">
              This article was provided by{" "}
              <span className="font-medium text-text-primary">{article.source}</span>.
              Read the full story on the original site.
            </p>
            <a
              href={article.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-5 py-2.5 text-[13px] font-semibold text-[#0A0A0B] no-underline transition-opacity hover:opacity-90"
            >
              Read full article
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-10 border-t border-hairline border-[var(--border)] pt-8 sm:mt-12" aria-label="Related articles">
            <h2 className="mb-4 font-serif text-xl font-bold tracking-[-0.02em]">
              Related stories
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <RelatedArticleCard
                  key={a.slug}
                  slug={a.slug}
                  title={a.title}
                  source={a.source}
                  timeAgo={a.timeAgo}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

function RelatedArticleCard({
  slug,
  title,
  source,
  timeAgo,
}: {
  slug: string;
  title: string;
  source: string;
  timeAgo: string;
}) {
  return (
    <Link
      href={`/article/${slug}`}
      className="block rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-200 hover:translate-y-[-2px] hover:border-[var(--border-hover)]"
    >
      <h3 className="mb-2 font-serif text-[15px] font-bold leading-[1.35] tracking-[-0.01em] text-[var(--text-primary)] line-clamp-3">
        {title}
      </h3>
      <div className="flex items-center gap-2 text-[11px] text-text-tertiary">
        <span>{source}</span>
        <span>·</span>
        <span>{timeAgo}</span>
      </div>
    </Link>
  );
}
