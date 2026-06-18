import "dotenv/config";
import { getDb, schema } from "../db";

const _db = getDb();
if (!_db) {
  console.error("❌ DATABASE_URL is not set. Set it in .env.local and try again.");
  process.exit(1);
}
const db = _db;

/* ────────── Categories ────────── */
const categoryData = [
  { slug: "world", label: "World" },
  { slug: "business", label: "Business" },
  { slug: "technology", label: "Technology" },
  { slug: "science", label: "Science" },
  { slug: "health", label: "Health" },
  { slug: "sports", label: "Sports" },
  { slug: "entertainment", label: "Entertainment" },
  { slug: "politics", label: "Politics" },
];

/* ────────── Sources ────────── */
const sourceData = [
  { name: "Reuters", provider: "newsapi", baseUrl: "https://reuters.com", language: "en", country: "us", enabled: true },
  { name: "Associated Press", provider: "newsapi", baseUrl: "https://apnews.com", language: "en", country: "us", enabled: true },
  { name: "BBC News", provider: "newsapi", baseUrl: "https://bbc.com/news", language: "en", country: "gb", enabled: true },
  { name: "Bloomberg", provider: "newsapi", baseUrl: "https://bloomberg.com", language: "en", country: "us", enabled: true },
  { name: "The Guardian", provider: "guardian", baseUrl: "https://theguardian.com", language: "en", country: "gb", enabled: true },
  { name: "Al Jazeera", provider: "newsapi", baseUrl: "https://aljazeera.com", language: "en", country: "qa", enabled: true },
  { name: "ESPN", provider: "newsapi", baseUrl: "https://espn.com", language: "en", country: "us", enabled: true },
  { name: "Wired", provider: "newsapi", baseUrl: "https://wired.com", language: "en", country: "us", enabled: true },
  { name: "The Verge", provider: "newsapi", baseUrl: "https://theverge.com", language: "en", country: "us", enabled: true },
];

/* ────────── Articles ────────── */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 200);
}

// Helper: offset date by minutes
function ago(minutes: number): Date {
  return new Date(Date.now() - minutes * 60_000);
}

const articleData = [
  // ── World ──
  {
    slug: slugify("Historic Climate Agreement Reached as 150 Nations Sign Landmark Emissions Treaty in Geneva"),
    title: "Historic Climate Agreement Reached as 150 Nations Sign Landmark Emissions Treaty in Geneva",
    dek: "In a breakthrough moment for global climate diplomacy, 150 countries have signed a binding emissions reduction treaty, pledging to cut carbon output by 55% by 2035.",
    content: `GENEVA — In what leaders are calling the most significant climate accord since Paris 2015, representatives from 150 nations gathered at the Palais des Nations on Thursday to sign the Geneva Climate Compact.\n\nThe treaty commits signatories to a binding 55% reduction in greenhouse gas emissions by 2035, with a long-term target of net-zero by 2050. The agreement includes a $200 billion annual climate fund financed by developed nations to support clean energy transitions in the Global South.\n\nUN Secretary-General António Guterres described the moment as "a turning point for humanity." The compact also introduces a carbon border adjustment mechanism and a transparent reporting framework with independent audits.\n\nEnvironmental groups have cautiously welcomed the deal, though many noted that enforcement mechanisms remain untested. "The words are ambitious — now we must see the follow-through," said Greta Thunberg in a statement.`,
    imageUrl: null,
    sourceName: "Reuters",
    categorySlug: "world",
    publishedAt: ago(120),
    isLocal: false,
    externalUrl: "https://reuters.com/article/climate-treaty-geneva",
  },
  {
    slug: slugify("UN Emergency Session Called Over Eastern Crisis as Humanitarian Corridors Collapse"),
    title: "UN Emergency Session Called Over Eastern Crisis as Humanitarian Corridors Collapse",
    dek: "The United Nations Security Council has convened an emergency session following the collapse of humanitarian corridors, leaving millions without access to food and medical aid.",
    content: `UNITED NATIONS — The Security Council met in emergency session late Wednesday after coordinated humanitarian corridors in Eastern Europe collapsed for the third time in as many weeks.\n\nAccording to the UN Office for the Coordination of Humanitarian Affairs, at least 2.3 million civilians are now cut off from regular food and medical supply routes. The World Food Programme has warned that grain reserves in the region are sufficient for only 18 more days.\n\nRussia and Ukraine traded accusations at the council table, each blaming the other for the corridor breaches. China called for an "immediate de-escalation" but stopped short of endorsing sanctions.\n\nFrance and the United Kingdom are circulating a draft resolution that would establish a UN-monitored no-fly zone over designated humanitarian routes. The U.S. has indicated it would support the measure.`,
    imageUrl: null,
    sourceName: "Associated Press",
    categorySlug: "world",
    publishedAt: ago(240),
    isLocal: false,
    externalUrl: "https://apnews.com/article/un-emergency-session",
  },
  {
    slug: slugify("China and US Announce Joint Space Station Agreement in Surprise Diplomatic Breakthrough"),
    title: "China and US Announce Joint Space Station Agreement in Surprise Diplomatic Breakthrough",
    dek: "In a stunning reversal of years of space policy rivalry, NASA and CNSA have agreed to collaborate on a shared orbital research module.",
    content: `BEIJING — In a diplomatic surprise that caught even close allies off guard, the United States and China have announced a joint agreement to co-develop a shared research module aboard China's Tiangong space station.\n\nThe memorandum of understanding, signed virtually between NASA Administrator Bill Nelson and CNSA Director Zhang Kejian, outlines plans for joint microgravity experiments, astronaut exchanges, and shared safety protocols. The first American astronauts could visit Tiangong as early as 2027.\n\nThe Wolf Amendment, which since 2011 has barred NASA from direct bilateral cooperation with China, was waived by executive order for this specific agreement. The move signals a broader thaw in U.S.-China relations.`,
    imageUrl: null,
    sourceName: "BBC News",
    categorySlug: "world",
    publishedAt: ago(47),
    isLocal: false,
    externalUrl: "https://bbc.com/news/us-china-space-agreement",
  },

  // ── Business ──
  {
    slug: slugify("Fed Holds Rates Steady as Inflation Cools to 18-Month Low"),
    title: "Fed Holds Rates Steady as Inflation Cools to 18-Month Low",
    dek: "The Federal Reserve kept interest rates unchanged at 4.25% as the latest CPI data showed inflation falling to 2.8%, its lowest level since December 2024.",
    content: `WASHINGTON — The Federal Reserve held its benchmark interest rate steady at 4.25% on Wednesday, pausing after three consecutive hikes as fresh data showed inflation cooling faster than expected.\n\nThe Consumer Price Index rose 2.8% year-over-year in May, down from 3.4% in April and well below the 3.1% analysts had forecast. Core CPI, which excludes food and energy, came in at 3.0% — the lowest reading in 18 months.\n\nFed Chair Jerome Powell struck a cautiously optimistic tone in his press conference, noting that "disinflation is broadening across goods and services" but warning that the central bank needs "sustained evidence" before considering rate cuts.\n\nMarkets rallied on the news, with the S&P 500 gaining 1.8% and the 10-year Treasury yield falling to 3.92%.`,
    imageUrl: null,
    sourceName: "Bloomberg",
    categorySlug: "business",
    publishedAt: ago(180),
    isLocal: false,
    externalUrl: "https://bloomberg.com/news/fed-rates-hold",
  },
  {
    slug: slugify("Global Markets Rally As Fed Signals Rate Pause Sending Dow Up 600 Points"),
    title: "Global Markets Rally As Fed Signals Rate Pause, Sending Dow Up 600 Points",
    dek: "Wall Street surged to session highs after the Fed's rate decision, with the Dow Jones Industrial Average closing above 42,000 for the first time.",
    content: `NEW YORK — Global equity markets staged a broad rally Thursday following the Federal Reserve's decision to hold rates steady, with the Dow Jones Industrial Average soaring 612 points to close at 42,147.\n\nThe S&P 500 rose 2.1% to 5,823, while the tech-heavy Nasdaq Composite gained 2.4%, driven by a massive rally in mega-cap technology stocks. Apple, Microsoft, and Nvidia each rose more than 3%.\n\nEuropean markets followed suit, with the Stoxx 600 gaining 1.8% and London's FTSE 100 reaching a new all-time high. Asian markets are expected to open sharply higher on Friday.\n\n"The Fed has threaded the needle — inflation is coming down without crushing the labor market," said Janet Thompson, chief investment officer at Pinnacle Wealth Management. "This is the soft landing scenario investors have been hoping for."`,
    imageUrl: null,
    sourceName: "Bloomberg",
    categorySlug: "business",
    publishedAt: ago(60),
    isLocal: false,
    externalUrl: "https://bloomberg.com/news/markets-rally-fed",
  },

  // ── Technology ──
  {
    slug: slugify("OpenAI Releases GPT-5 With Real-Time Reasoning Capabilities"),
    title: "OpenAI Releases GPT-5 With Real-Time Reasoning Capabilities",
    dek: "The latest model can process video, audio, and text simultaneously while explaining its reasoning step-by-step in real time.",
    content: `SAN FRANCISCO — OpenAI released GPT-5 on Tuesday, claiming the model represents a "generational leap" in artificial intelligence with native multimodal reasoning capabilities that allow it to process video, audio, and text streams simultaneously.\n\nIn live demonstrations, GPT-5 solved complex mathematics problems while explaining each step aloud, generated and debugged code from a whiteboard photo, and held a fluent conversation in 47 languages with near-zero latency.\n\n"The model doesn't just generate text — it thinks," said OpenAI CEO Sam Altman at the launch event. "GPT-5 can reason about the world in real time, ask clarifying questions when it's uncertain, and cite sources for every factual claim it makes."\n\nGPT-5 introduces a new "Chain of Thought" transparency mode that displays the model's internal reasoning process alongside its responses. Early benchmarks show the model scoring 94% on the MMLU benchmark and 89% on graduate-level reasoning tasks.`,
    imageUrl: null,
    sourceName: "The Verge",
    categorySlug: "technology",
    publishedAt: ago(60),
    isLocal: false,
    externalUrl: "https://theverge.com/openai-gpt5-release",
  },
  {
    slug: slugify("Apple Neural Engine Chip Sets New AI Benchmark Outperforming Dedicated GPU Clusters"),
    title: "Apple's Neural Engine Chip Sets New AI Benchmark, Outperforming Dedicated GPU Clusters",
    dek: "The next-generation M5 Ultra's Neural Engine has posted record-breaking MLPerf scores, outperforming server-grade NVIDIA H100 clusters on certain inference tasks.",
    content: `CUPERTINO — Apple's upcoming M5 Ultra chip has shattered industry AI benchmarks, with its 256-core Neural Engine achieving inference speeds that surpass server-grade NVIDIA H100 GPU clusters on key machine learning workloads.\n\nIn MLPerf Inference 4.0 results published Wednesday, the M5 Ultra scored 92,000 images per second on ResNet-50 — a 40% improvement over the M4 Max and 15% faster than an 8-way H100 configuration on the same task.\n\nThe breakthrough is attributed to Apple's new "Neural Fabric" architecture, which combines a unified memory pool with dynamically reconfigurable compute units. The chip can allocate between 128GB and 512GB of unified memory directly to the Neural Engine, eliminating the PCIe bottlenecks that limit discrete GPU solutions.\n\n"Apple has effectively built a data-center-class AI accelerator that fits in a laptop," said semiconductor analyst Mark Chen. "The implications for on-device AI are enormous."`,
    imageUrl: null,
    sourceName: "Wired",
    categorySlug: "technology",
    publishedAt: ago(120),
    isLocal: false,
    externalUrl: "https://wired.com/apple-neural-engine-benchmark",
  },
  {
    slug: slugify("Tech Giants Face New Antitrust Framework in EU Digital Markets Act Expansion"),
    title: "Tech Giants Face New Antitrust Framework in EU Digital Markets Act Expansion",
    dek: "The European Commission has proposed sweeping new rules targeting AI market concentration, cloud services bundling, and app store exclusivity.",
    content: `BRUSSELS — The European Commission proposed a significant expansion of the Digital Markets Act (DMA) on Wednesday, extending its regulatory reach to cover AI foundation models, cloud infrastructure, and connected device platforms.\n\nUnder the new framework, companies designated as "AI gatekeepers" would be required to open their foundation models to third-party auditors, publish detailed energy consumption data, and ensure interoperability with competing AI services.\n\n"The era of unchecked platform power in AI is over," said EU Competition Commissioner Margrethe Vestager. "These rules ensure that innovation in AI benefits all of Europe, not just a handful of Silicon Valley giants."\n\nThe proposal specifically targets the bundling of cloud services with AI capabilities — a practice the Commission says creates unfair lock-in effects. Apple, Google, Microsoft, Amazon, and OpenAI would all face new compliance obligations under the expanded regime.`,
    imageUrl: null,
    sourceName: "Associated Press",
    categorySlug: "technology",
    publishedAt: ago(300),
    isLocal: false,
    externalUrl: "https://apnews.com/eu-antitrust-tech-giants",
  },

  // ── Sports ──
  {
    slug: slugify("Nigeria Super Eagles Qualify for 2026 World Cup Final With Stunning Comeback Victory"),
    title: "Nigeria's Super Eagles Qualify for 2026 World Cup Final With Stunning Comeback Victory",
    dek: "Trailing 2-0 at halftime, Nigeria scored three unanswered goals to defeat Brazil 3-2 and book their place in the World Cup final for the first time in the nation's history.",
    content: `RIYADH, Saudi Arabia — In one of the greatest comebacks in World Cup semifinal history, Nigeria's Super Eagles overturned a 2-0 halftime deficit to defeat Brazil 3-2 and qualify for their first-ever World Cup final.\n\nBrazil dominated the first half with goals from Vinícius Jr. (23') and Rodrygo (41'), leaving the Nigerian side shell-shocked. But the Super Eagles emerged transformed after the break.\n\nVictor Osimhen pulled one back in the 52nd minute with a powerful header from a Moses Simon cross. Substitute Kelechi Iheanacho equalized in the 74th minute with a curling shot from outside the box. Then, in the 88th minute, Samuel Chukwueze completed the turnaround with a surging run and clinical finish that sent the Nigerian bench into delirium.\n\n"It's a dream come true," said Nigeria coach José Peseiro after the match. "These players never gave up. They have made history."\n\nNigeria will face either Argentina or France in Sunday's final.`,
    imageUrl: null,
    sourceName: "ESPN",
    categorySlug: "sports",
    publishedAt: ago(300),
    isLocal: false,
    externalUrl: "https://espn.com/nigeria-world-cup-semifinal",
  },

  // ── Science ──
  {
    slug: slugify("WHO Declares Mpox Variant Under Control After Rapid Multinational Response"),
    title: "WHO Declares Mpox Variant Under Control After Rapid Multinational Response",
    dek: "The World Health Organization has declared the Clade Ib mpox outbreak contained, crediting swift vaccine distribution and international coordination.",
    content: `GENEVA — The World Health Organization declared on Wednesday that the Clade Ib mpox variant outbreak is now under control, just 67 days after it was declared a Public Health Emergency of International Concern.\n\nThe rapid containment — the fastest in WHO history for a novel pathogen — was credited to pre-existing vaccine stockpiles, swift genomic surveillance, and unprecedented information sharing between affected nations.\n\nMore than 4.2 million vaccine doses were deployed to 28 countries within 45 days of the emergency declaration. Case numbers peaked at 2,100 per week globally and have now fallen to fewer than 200.\n\n"This is what global health solidarity looks like when we're prepared," said WHO Director-General Dr. Tedros Adhanom Ghebreyesus. "But we cannot afford to be complacent. Surveillance must continue."`,
    imageUrl: null,
    sourceName: "Associated Press",
    categorySlug: "health",
    publishedAt: ago(240),
    isLocal: false,
    externalUrl: "https://apnews.com/who-mpox-contained",
  },

  // ── Pakistan Floods ──
  {
    slug: slugify("Pakistan Floods Displace Estimated 2.3 Million as Monsoon Season Intensifies"),
    title: "Pakistan Floods Displace Estimated 2.3 Million as Monsoon Season Intensifies",
    dek: "Unprecedented monsoon rainfall has submerged vast areas of Sindh and Balochistan provinces, with authorities warning that the worst may be yet to come.",
    content: `ISLAMABAD — Catastrophic monsoon flooding in Pakistan has displaced an estimated 2.3 million people across Sindh and Balochistan provinces, with the Pakistan Meteorological Department warning that rainfall is expected to continue for at least another two weeks.\n\nEntire villages have been submerged, with only rooftops visible across vast areas of the Indus River plain. The Pakistani military has deployed 45,000 troops for rescue and relief operations, while international aid agencies are scrambling to provide shelter, clean water, and medical supplies.\n\n"This is a climate catastrophe of historic proportions," said Prime Minister Shehbaz Sharif after surveying the damage by helicopter. "We need the international community's full support."\n\nThe United Nations has launched a $620 million emergency appeal, and the U.S. Agency for International Development has pledged an initial $50 million in aid.`,
    imageUrl: null,
    sourceName: "Al Jazeera",
    categorySlug: "world",
    publishedAt: ago(360),
    isLocal: false,
    externalUrl: null,
  },
];

async function main() {
  console.log("🌱 Seeding LyraNews database...\n");

  // 1. Seed categories
  console.log("📁 Inserting categories...");
  for (const cat of categoryData) {
    await db
      .insert(schema.categories)
      .values(cat)
      .onConflictDoNothing({ target: schema.categories.slug });
  }
  const dbCategories = await db.select().from(schema.categories);
  const catMap = new Map(dbCategories.map((c) => [c.slug, c.id]));
  console.log(`   → ${dbCategories.length} categories ready`);

  // 2. Seed sources
  console.log("\n📰 Inserting sources...");
  for (const src of sourceData) {
    await db
      .insert(schema.sources)
      .values(src)
      .onConflictDoNothing({ target: schema.sources.name });
  }
  const dbSources = await db.select().from(schema.sources);
  const srcMap = new Map(dbSources.map((s) => [s.name, s.id]));
  console.log(`   → ${dbSources.length} sources ready`);

  // 3. Seed articles
  console.log("\n📄 Inserting articles...");
  let articleCount = 0;
  for (const art of articleData) {
    const sourceId = srcMap.get(art.sourceName) ?? null;
    const categoryId = catMap.get(art.categorySlug) ?? null;

    await db
      .insert(schema.articles)
      .values({
        slug: art.slug,
        title: art.title,
        dek: art.dek,
        content: art.content,
        imageUrl: art.imageUrl,
        sourceId,
        categoryId,
        publishedAt: art.publishedAt,
        externalUrl: art.externalUrl,
        isLocal: art.isLocal,
      })
      .onConflictDoNothing({ target: schema.articles.slug });
    articleCount++;
  }
  console.log(`   → ${articleCount} articles inserted`);

  console.log("\n✅ Seed complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
