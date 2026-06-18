import type { ProviderAdapter } from "./types";
import { newsapiAdapter } from "./newsapi";
import { gnewsAdapter } from "./gnews";
import { guardianAdapter } from "./guardian";

const providers: Record<string, ProviderAdapter> = {
  newsapi: newsapiAdapter,
  gnews: gnewsAdapter,
  guardian: guardianAdapter,
};

export function getProvider(): ProviderAdapter {
  const name = process.env.NEWS_PROVIDER || "newsapi";
  const adapter = providers[name];
  if (!adapter) {
    console.warn(
      `Unknown news provider "${name}". Falling back to NewsAPI.`,
    );
    return newsapiAdapter;
  }
  return adapter;
}

export { type ProviderAdapter, type NormalizedArticle } from "./types";
