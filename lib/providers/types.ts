import type { ArticleItem } from "@/lib/data";

export interface NormalizedArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  source: string;
  publishedAt: string;
  category: string;
  imageUrl?: string;
}

export interface ProviderAdapter {
  name: string;
  fetchTopHeadlines(params: {
    category?: string;
    country?: string;
    pageSize?: number;
  }): Promise<NormalizedArticle[]>;
  fetchByCategory(
    category: string,
    params?: { pageSize?: number },
  ): Promise<NormalizedArticle[]>;
  search(
    query: string,
    params?: { pageSize?: number },
  ): Promise<NormalizedArticle[]>;
}

export function normalizeToArticle(
  source: NormalizedArticle,
  categorySlug: string,
): Omit<ArticleItem, "source" | "timeAgo" | "readTime"> & {
  sourceName: string;
} {
  return {
    slug: source.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 200),
    title: source.title,
    dek: source.description,
    content: source.content,
    category: source.category || categorySlug,
    categorySlug,
    sourceName: source.source,
    externalUrl: source.url,
    imageIcon: undefined,
  };
}
