import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Ticker } from "@/components/ticker";
import { Nav } from "@/components/nav";
import { ArticleDetailContent } from "./article-detail-content";
import { getArticleBySlug, allArticles } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
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
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Related articles: same category, excluding current, up to 3
  const related = allArticles
    .filter((a) => a.categorySlug === article.categorySlug && a.slug !== slug)
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
      <Ticker />
      <Nav />
      <main className="mx-auto w-full max-w-[1440px] px-5 py-7">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <ArticleDetailContent article={article} />

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-12 border-t border-hairline border-[var(--border)] pt-8" aria-label="Related articles">
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
