import { NextRequest, NextResponse } from "next/server";
import { getProvider } from "@/lib/providers";

/**
 * GET /api/news
 *
 * Query params:
 *   category  — filter by category slug (optional)
 *   q         — search query (optional)
 *   country   — country code (default: us)
 *   pageSize  — number of results (default: 20)
 *
 * Server-side only — never exposes API keys to the client.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const query = searchParams.get("q") || undefined;
  const country = searchParams.get("country") || "us";
  const pageSize = Math.min(
    Number(searchParams.get("pageSize")) || 20,
    100,
  );

  const provider = getProvider();

  // Validate the correct API key for the active provider
  const keyMap: Record<string, string> = {
    newsapi: process.env.NEWS_API_KEY || "",
    gnews: process.env.NEWS_API_KEY || "",
    guardian: process.env.GUARDIAN_API_KEY || "",
  };

  const apiKey = keyMap[provider.name];
  if (!apiKey) {
    return NextResponse.json(
      { error: `API key for "${provider.name}" is not configured.` },
      { status: 503 },
    );
  }

  try {
    let articles;

    if (query) {
      articles = await provider.search(query, { pageSize });
    } else if (category) {
      articles = await provider.fetchByCategory(category, { pageSize });
    } else {
      articles = await provider.fetchTopHeadlines({ country, pageSize });
    }

    return NextResponse.json({ articles, provider: provider.name });
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news from provider." },
      { status: 502 },
    );
  }
}
