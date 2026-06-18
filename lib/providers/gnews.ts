import type { ProviderAdapter, NormalizedArticle } from "./types";

const BASE_URL = "https://gnews.io/api/v4";

export const gnewsAdapter: ProviderAdapter = {
  name: "gnews",

  async fetchTopHeadlines({ category, country = "us", pageSize = 20 }) {
    const params = new URLSearchParams({
      apikey: process.env.NEWS_API_KEY || "",
      country: country,
      max: String(pageSize),
      lang: "en",
    });
    if (category) params.set("topic", category);

    const res = await fetch(`${BASE_URL}/top-headlines?${params}`);
    const data = await res.json();

    if (!data.articles) {
      console.error("GNews error:", data);
      return [];
    }

    return (data.articles || []).map(mapArticle);
  },

  async fetchByCategory(category, { pageSize = 20 } = {}) {
    return this.fetchTopHeadlines({ category, pageSize });
  },

  async search(query, { pageSize = 20 } = {}) {
    const params = new URLSearchParams({
      apikey: process.env.NEWS_API_KEY || "",
      q: query,
      max: String(pageSize),
      lang: "en",
    });

    const res = await fetch(`${BASE_URL}/search?${params}`);
    const data = await res.json();

    if (!data.articles) {
      console.error("GNews search error:", data);
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
    source: a.source?.name || a.source || "GNews",
    publishedAt: a.publishedAt || new Date().toISOString(),
    category: "",
    imageUrl: a.image || undefined,
  };
}
