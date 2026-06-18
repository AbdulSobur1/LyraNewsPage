import type { MetadataRoute } from "next";
import { allArticles, allCategories } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://lyranews.vercel.app";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "hourly", priority: 1.0 },
    { url: `${siteUrl}/search`, lastModified: new Date(), changeFrequency: "daily", priority: 0.5 },
    { url: `${siteUrl}/saved`, lastModified: new Date(), changeFrequency: "daily", priority: 0.3 },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = allCategories
    .filter((c) => c.slug !== "all")
    .map((cat) => ({
      url: `${siteUrl}/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.8,
    }));

  // Article pages
  const articlePages: MetadataRoute.Sitemap = allArticles.map((article) => ({
    url: `${siteUrl}/article/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
