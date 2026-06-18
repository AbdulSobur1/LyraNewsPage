import type { ProviderAdapter, NormalizedArticle } from "./types";

const BASE_URL = "https://content.guardianapis.com";

export const guardianAdapter: ProviderAdapter = {
  name: "guardian",

  async fetchTopHeadlines({ category, country: _country, pageSize = 20 }) {
    const section = category
      ? category.toLowerCase()
      : "news";
    const params = new URLSearchParams({
      "api-key": process.env.GUARDIAN_API_KEY || "",
      "page-size": String(pageSize),
      "show-fields": "headline,trailText,bodyText,thumbnail,byline,publication",
      "order-by": "newest",
    });

    const res = await fetch(
      `${BASE_URL}/search?section=${section}&${params}`,
    );
    const data = await res.json();

    if (!data.response?.results) {
      console.error("Guardian API error:", data);
      return [];
    }

    return (data.response.results || []).map(mapArticle);
  },

  async fetchByCategory(category, { pageSize = 20 } = {}) {
    return this.fetchTopHeadlines({ category, pageSize });
  },

  async search(query, { pageSize = 20 } = {}) {
    const params = new URLSearchParams({
      "api-key": process.env.GUARDIAN_API_KEY || "",
      q: query,
      "page-size": String(pageSize),
      "show-fields": "headline,trailText,bodyText,thumbnail,byline,publication",
      "order-by": "relevance",
    });

    const res = await fetch(`${BASE_URL}/search?${params}`);
    const data = await res.json();

    if (!data.response?.results) {
      console.error("Guardian search error:", data);
      return [];
    }

    return (data.response.results || []).map(mapArticle);
  },
};

function mapArticle(a: any): NormalizedArticle {
  const fields = a.fields || {};
  return {
    title: fields.headline || a.webTitle || "Untitled",
    description: fields.trailText || "",
    content: fields.bodyText || fields.trailText || "",
    url: a.webUrl || "",
    source: fields.byline || "The Guardian",
    publishedAt: fields.publication || a.webPublicationDate || new Date().toISOString(),
    category: a.sectionId || "",
    imageUrl: fields.thumbnail || undefined,
  };
}
