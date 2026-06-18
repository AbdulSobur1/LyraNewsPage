import { NextRequest, NextResponse } from "next/server";
import { getArticlesAsync } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

  try {
    const articles = await getArticlesAsync();

    // Limit to requested page size
    const limited = articles.slice(0, pageSize);

    const providerName = process.env.NEWS_PROVIDER || "newsapi";

    return NextResponse.json({
      provider: providerName,
      total: articles.length,
      articles: limited.map((a) => ({
        title: a.title,
        slug: a.slug,
        category: a.category,
        source: a.source,
        timeAgo: a.timeAgo,
        imageUrl: a.imageUrl || null,
        externalUrl: a.externalUrl || null,
      })),
    });
  } catch (error) {
    console.error("API news fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news articles" },
      { status: 500 },
    );
  }
}
