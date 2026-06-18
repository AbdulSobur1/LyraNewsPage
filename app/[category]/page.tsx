import { notFound, redirect } from "next/navigation";
import { Ticker } from "@/components/ticker";
import { Nav } from "@/components/nav";
import { DateBar } from "@/components/date-bar";
import { ArticleCard } from "@/components/article-card";
import { Sidebar } from "@/components/sidebar";
import {
  getArticlesByCategory,
  getCategoryLabel,
  allCategories,
} from "@/lib/data";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const label = getCategoryLabel(category);
  return {
    title: label,
    description: `Latest ${label} news and analysis from LyraNews.`,
  };
}

export async function generateStaticParams() {
  return allCategories
    .filter((c) => c.slug !== "all")
    .map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  // Redirect "all" to homepage
  if (category === "all") {
    redirect("/");
  }

  // Validate category exists
  const isValidCategory = allCategories.some((c) => c.slug === category);
  if (!isValidCategory) {
    notFound();
  }

  const label = getCategoryLabel(category);
  const articles = getArticlesByCategory(category);

  return (
    <>
      <Ticker />
      <Nav />
      <main className="mx-auto w-full max-w-[1440px] px-5 py-7">
        <DateBar />
        <h1 className="mb-6 font-serif text-2xl font-bold tracking-[-0.02em]">
          {label}
        </h1>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_280px]">
          <div>
            {articles.length === 0 ? (
              <p className="py-12 text-center text-sm text-text-tertiary">
                No articles found in this category yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </div>
          <Sidebar />
        </div>
      </main>
    </>
  );
}
