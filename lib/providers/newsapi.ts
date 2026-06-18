import type { ProviderAdapter, NormalizedArticle } from "./types";

const BASE_URL = "https://newsapi.org/v2";

export const newsapiAdapter: ProviderAdapter = {
  name: "newsapi",

  async fetchTopHeadlines({ category, country = "us", pageSize = 20 }) {
    const params = new URLSearchParams({
      apiKey: process.env.NEWS_API_KEY || "",
      country,
      pageSize: String(pageSize),
    });
    if (category) params.set("category", category);

    const res = await fetch(`${BASE_URL}/top-headlines?${params}`);
    const data = await res.json();

    if (data.status !== "ok") {
      console.error("NewsAPI error:", data);
      return [];
    }

    return (data.articles || []).map(mapArticle);
  },

  async fetchByCategory(category, { pageSize = 20 } = {}) {
    return this.fetchTopHeadlines({ category, pageSize });
  },

  async search(query, { pageSize = 20 } = {}) {
    const params = new URLSearchParams({
      apiKey: process.env.NEWS_API_KEY || "",
      q: query,
      pageSize: String(pageSize),
      sortBy: "publishedAt",
    });

    const res = await fetch(`${BASE_URL}/everything?${params}`);
    const data = await res.json();

    if (data.status !== "ok") {
      console.error("NewsAPI search error:", data);
      return [];
    }

    return (data.articles || []).map(mapArticle);
  },
};

function mapArticle(a: any): NormalizedArticle {
  return {
    title: a.title || "Untitled",
    description: a.description || "",
    content: a.content || a.description || "",
    url: a.url || "",
    source: a.source?.name || "NewsAPI",
    publishedAt: a.publishedAt || new Date().toISOString(),
    category: "",
    imageUrl: a.urlToImage || undefined,
  };
}
