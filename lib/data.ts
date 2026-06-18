export interface ArticleItem {
  slug: string;
  title: string;
  dek: string;
  content?: string;
  category: string;
  categorySlug: string;
  source: string;
  timeAgo: string;
  readTime: string;
  imageIcon?: string;
  imageGradient?: string;
  externalUrl?: string;
}

export interface TrendingTopic {
  tag: string;
  label: string;
  count: string;
}

export interface CategoryItem {
  slug: string;
  label: string;
}

/* ── All full articles (with content for detail pages) ── */
export const allArticles: ArticleItem[] = [
  {
    slug: "climate-treaty-geneva",
    title: "Historic Climate Agreement Reached as 150 Nations Sign Landmark Emissions Treaty in Geneva",
    dek: "In a breakthrough moment for global climate diplomacy, 150 countries have signed a binding emissions reduction treaty, pledging to cut carbon output by 55% by 2035.",
    content: `GENEVA — In what leaders are calling the most significant climate accord since Paris 2015, representatives from 150 nations gathered at the Palais des Nations on Thursday to sign the Geneva Climate Compact.\n\nThe treaty commits signatories to a binding 55% reduction in greenhouse gas emissions by 2035, with a long-term target of net-zero by 2050. The agreement includes a $200 billion annual climate fund financed by developed nations to support clean energy transitions in the Global South.\n\nUN Secretary-General António Guterres described the moment as "a turning point for humanity." The compact also introduces a carbon border adjustment mechanism and a transparent reporting framework with independent audits.\n\nEnvironmental groups have cautiously welcomed the deal, though many noted that enforcement mechanisms remain untested. "The words are ambitious — now we must see the follow-through," said Greta Thunberg in a statement.\n\nEuropean Commission President Ursula von der Leyen called the agreement "Europe's finest hour of climate diplomacy," while U.S. Climate Envoy John Kerry fought back tears as the gavel fell. The treaty will enter into force once ratified by 55 countries representing at least 55% of global emissions.`,
    category: "World",
    categorySlug: "world",
    source: "Reuters",
    timeAgo: "2 hours ago",
    readTime: "5 min read",
    imageIcon: "globe",
  },
  {
    slug: "us-china-space-station",
    title: "China and US Announce Joint Space Station Agreement in Surprise Diplomatic Breakthrough",
    dek: "In a stunning reversal of years of space policy rivalry, NASA and CNSA have agreed to collaborate on a shared orbital research module.",
    content: `BEIJING — In a diplomatic surprise that caught even close allies off guard, the United States and China have announced a joint agreement to co-develop a shared research module aboard China's Tiangong space station.\n\nThe memorandum of understanding, signed virtually between NASA Administrator Bill Nelson and CNSA Director Zhang Kejian, outlines plans for joint microgravity experiments, astronaut exchanges, and shared safety protocols. The first American astronauts could visit Tiangong as early as 2027.\n\nThe Wolf Amendment, which since 2011 has barred NASA from direct bilateral cooperation with China, was waived by executive order for this specific agreement. The move signals a broader thaw in U.S.-China relations, coming just weeks after the two countries restarted climate negotiations.\n\n"This is what science diplomacy looks like," said Dr. Sarah Miller, a space policy expert at the Center for Strategic and International Studies. "When geopolitical rivals can cooperate in space, it sets a powerful precedent for collaboration on Earth."`,
    category: "World",
    categorySlug: "world",
    source: "BBC World",
    timeAgo: "47 min ago",
    readTime: "8 min read",
  },
  {
    slug: "un-emergency-session",
    title: "UN Emergency Session Called Over Eastern Crisis as Humanitarian Corridors Collapse",
    dek: "The United Nations Security Council has convened an emergency session following the collapse of humanitarian corridors, leaving millions without access to food and medical aid.",
    content: `UNITED NATIONS — The Security Council met in emergency session late Wednesday after coordinated humanitarian corridors in Eastern Europe collapsed for the third time in as many weeks.\n\nAccording to the UN Office for the Coordination of Humanitarian Affairs, at least 2.3 million civilians are now cut off from regular food and medical supply routes. The World Food Programme has warned that grain reserves in the region are sufficient for only 18 more days.\n\nRussia and Ukraine traded accusations at the council table, each blaming the other for the corridor breaches. China called for an "immediate de-escalation" but stopped short of endorsing sanctions.\n\nFrance and the United Kingdom are circulating a draft resolution that would establish a UN-monitored no-fly zone over designated humanitarian routes. The U.S. has indicated it would support the measure, signaling a potential shift in its stance on direct involvement.`,
    category: "World",
    categorySlug: "world",
    source: "Associated Press",
    timeAgo: "4 hours ago",
    readTime: "6 min read",
  },
  {
    slug: "pakistan-floods",
    title: "Pakistan Floods Displace Estimated 2.3 Million as Monsoon Season Intensifies",
    dek: "Unprecedented monsoon rainfall has submerged vast areas of Sindh and Balochistan provinces, with authorities warning that the worst may be yet to come.",
    content: `ISLAMABAD — Catastrophic monsoon flooding in Pakistan has displaced an estimated 2.3 million people across Sindh and Balochistan provinces, with the Pakistan Meteorological Department warning that rainfall is expected to continue for at least another two weeks.\n\nEntire villages have been submerged, with only rooftops visible across vast areas of the Indus River plain. The Pakistani military has deployed 45,000 troops for rescue and relief operations, while international aid agencies are scrambling to provide shelter, clean water, and medical supplies.\n\n"This is a climate catastrophe of historic proportions," said Prime Minister Shehbaz Sharif after surveying the damage by helicopter. "We need the international community's full support."\n\nThe United Nations has launched a $620 million emergency appeal, and the U.S. Agency for International Development has pledged an initial $50 million in aid. The World Bank has approved $350 million in emergency financing for reconstruction.`,
    category: "World",
    categorySlug: "world",
    source: "Al Jazeera",
    timeAgo: "6 hours ago",
    readTime: "5 min read",
  },
  {
    slug: "fed-rates-hold",
    title: "Fed Holds Rates Steady as Inflation Cools to 18-Month Low",
    dek: "The Federal Reserve kept interest rates unchanged at 4.25% as the latest CPI data showed inflation falling to 2.8%, its lowest level since December 2024.",
    content: `WASHINGTON — The Federal Reserve held its benchmark interest rate steady at 4.25% on Wednesday, pausing after three consecutive hikes as fresh data showed inflation cooling faster than expected.\n\nThe Consumer Price Index rose 2.8% year-over-year in May, down from 3.4% in April and well below the 3.1% analysts had forecast. Core CPI, which excludes food and energy, came in at 3.0% — the lowest reading in 18 months.\n\nFed Chair Jerome Powell struck a cautiously optimistic tone in his press conference, noting that "disinflation is broadening across goods and services" but warning that the central bank needs "sustained evidence" before considering rate cuts.\n\nMarkets rallied on the news, with the S&P 500 gaining 1.8% and the 10-year Treasury yield falling to 3.92%. Fed funds futures now price in a 72% probability of a rate cut at the September meeting.`,
    category: "Business",
    categorySlug: "business",
    source: "Bloomberg",
    timeAgo: "3h ago",
    readTime: "4 min read",
    imageIcon: "chart-line",
    imageGradient: "linear-gradient(135deg,#2a1e1e,#3a2a1e)",
  },
  {
    slug: "global-markets-rally-fed",
    title: "Global Markets Rally As Fed Signals Rate Pause, Sending Dow Up 600 Points",
    dek: "Wall Street surged to session highs after the Fed's rate decision, with the Dow Jones Industrial Average closing above 42,000 for the first time.",
    content: `NEW YORK — Global equity markets staged a broad rally Thursday following the Federal Reserve's decision to hold rates steady, with the Dow Jones Industrial Average soaring 612 points to close at 42,147.\n\nThe S&P 500 rose 2.1% to 5,823, while the tech-heavy Nasdaq Composite gained 2.4%, driven by a massive rally in mega-cap technology stocks. Apple, Microsoft, and Nvidia each rose more than 3%.\n\nEuropean markets followed suit, with the Stoxx 600 gaining 1.8% and London's FTSE 100 reaching a new all-time high. Asian markets are expected to open sharply higher on Friday.\n\n"The Fed has threaded the needle — inflation is coming down without crushing the labor market," said Janet Thompson, chief investment officer at Pinnacle Wealth Management. "This is the soft landing scenario investors have been hoping for."\n\nTreasury yields fell across the curve, with the 2-year yield dropping 12 basis points to 3.75%. The U.S. dollar index weakened 0.6% against a basket of major currencies.`,
    category: "Business",
    categorySlug: "business",
    source: "Bloomberg",
    timeAgo: "1 hour ago",
    readTime: "4 min read",
  },
  {
    slug: "openai-gpt5-release",
    title: "OpenAI Releases GPT-5 With Real-Time Reasoning Capabilities",
    dek: "The latest model can process video, audio, and text simultaneously while explaining its reasoning step-by-step in real time.",
    content: `SAN FRANCISCO — OpenAI released GPT-5 on Tuesday, claiming the model represents a "generational leap" in artificial intelligence with native multimodal reasoning capabilities that allow it to process video, audio, and text streams simultaneously.\n\nIn live demonstrations, GPT-5 solved complex mathematics problems while explaining each step aloud, generated and debugged code from a whiteboard photo, and held a fluent conversation in 47 languages with near-zero latency.\n\n"The model doesn't just generate text — it thinks," said OpenAI CEO Sam Altman at the launch event. "GPT-5 can reason about the world in real time, ask clarifying questions when it's uncertain, and cite sources for every factual claim it makes."\n\nGPT-5 introduces a new "Chain of Thought" transparency mode that displays the model's internal reasoning process alongside its responses. Early benchmarks show the model scoring 94% on the MMLU benchmark and 89% on graduate-level reasoning tasks.\n\nPricing starts at $0.50 per million input tokens and $2.00 per million output tokens — a 40% reduction from GPT-4 Turbo. The model is available immediately via API and will roll out to ChatGPT Plus subscribers within two weeks.`,
    category: "Technology",
    categorySlug: "technology",
    source: "The Verge",
    timeAgo: "1h ago",
    readTime: "4 min read",
    imageIcon: "device-laptop",
    imageGradient: "linear-gradient(135deg,#1e2a1e,#2a3a2e)",
  },
  {
    slug: "apple-neural-engine",
    title: "Apple's Neural Engine Chip Sets New AI Benchmark, Outperforming Dedicated GPU Clusters",
    dek: "The next-generation M5 Ultra's Neural Engine has posted record-breaking MLPerf scores, outperforming server-grade NVIDIA H100 clusters on certain inference tasks.",
    content: `CUPERTINO — Apple's upcoming M5 Ultra chip has shattered industry AI benchmarks, with its 256-core Neural Engine achieving inference speeds that surpass server-grade NVIDIA H100 GPU clusters on key machine learning workloads.\n\nIn MLPerf Inference 4.0 results published Wednesday, the M5 Ultra scored 92,000 images per second on ResNet-50 — a 40% improvement over the M4 Max and 15% faster than an 8-way H100 configuration on the same task.\n\nThe breakthrough is attributed to Apple's new "Neural Fabric" architecture, which combines a unified memory pool with dynamically reconfigurable compute units. The chip can allocate between 128GB and 512GB of unified memory directly to the Neural Engine, eliminating the PCIe bottlenecks that limit discrete GPU solutions.\n\n"Apple has effectively built a data-center-class AI accelerator that fits in a laptop," said semiconductor analyst Mark Chen. "The implications for on-device AI are enormous, especially for privacy-preserving inference."`,
    category: "Technology",
    categorySlug: "technology",
    source: "Wired",
    timeAgo: "2h ago",
    readTime: "4 min read",
  },
  {
    slug: "eu-antitrust-tech-giants",
    title: "Tech Giants Face New Antitrust Framework in EU Digital Markets Act Expansion",
    dek: "The European Commission has proposed sweeping new rules targeting AI market concentration, cloud services bundling, and app store exclusivity.",
    content: `BRUSSELS — The European Commission proposed a significant expansion of the Digital Markets Act (DMA) on Wednesday, extending its regulatory reach to cover AI foundation models, cloud infrastructure, and connected device platforms.\n\nUnder the new framework, companies designated as "AI gatekeepers" would be required to open their foundation models to third-party auditors, publish detailed energy consumption data, and ensure interoperability with competing AI services.\n\n"The era of unchecked platform power in AI is over," said EU Competition Commissioner Margrethe Vestager. "These rules ensure that innovation in AI benefits all of Europe, not just a handful of Silicon Valley giants."\n\nThe proposal specifically targets the bundling of cloud services with AI capabilities — a practice the Commission says creates unfair lock-in effects. Apple, Google, Microsoft, Amazon, and OpenAI would all face new compliance obligations under the expanded regime, with fines of up to 10% of global annual revenue for non-compliance.`,
    category: "Technology",
    categorySlug: "technology",
    source: "Associated Press",
    timeAgo: "5 hours ago",
    readTime: "5 min read",
  },
  {
    slug: "nigeria-world-cup-qualify",
    title: "Nigeria's Super Eagles Qualify for 2026 World Cup Final With Stunning Comeback Victory",
    dek: "Trailing 2-0 at halftime, Nigeria scored three unanswered goals to defeat Brazil 3-2 and book their place in the World Cup final for the first time in the nation's history.",
    content: `RIYADH, Saudi Arabia — In one of the greatest comebacks in World Cup semifinal history, Nigeria's Super Eagles overturned a 2-0 halftime deficit to defeat Brazil 3-2 and qualify for their first-ever World Cup final.\n\nBrazil dominated the first half with goals from Vinícius Jr. (23') and Rodrygo (41'), leaving the Nigerian side shell-shocked. But the Super Eagles emerged transformed after the break.\n\nVictor Osimhen pulled one back in the 52nd minute with a powerful header from a Moses Simon cross. Substitute Kelechi Iheanacho equalized in the 74th minute with a curling shot from outside the box. Then, in the 88th minute, Samuel Chukwueze completed the turnaround with a surging run and clinical finish that sent the Nigerian bench into delirium.\n\n"It's a dream come true," said Nigeria coach José Peseiro after the match. "These players never gave up. They have made history."\n\nNigeria will face either Argentina or France in Sunday's final. The country has declared a public holiday on Monday to celebrate the achievement, regardless of the final result.`,
    category: "Sports",
    categorySlug: "sports",
    source: "ESPN",
    timeAgo: "5h ago",
    readTime: "3 min read",
    imageIcon: "ball-football",
    imageGradient: "linear-gradient(135deg,#1e1e2a,#2a2a3e)",
  },
  {
    slug: "who-mpox-contained",
    title: "WHO Declares Mpox Variant Under Control After Rapid Multinational Response",
    dek: "The World Health Organization has declared the Clade Ib mpox outbreak contained, crediting swift vaccine distribution and international coordination.",
    content: `GENEVA — The World Health Organization declared on Wednesday that the Clade Ib mpox variant outbreak is now under control, just 67 days after it was declared a Public Health Emergency of International Concern.\n\nThe rapid containment — the fastest in WHO history for a novel pathogen — was credited to pre-existing vaccine stockpiles, swift genomic surveillance, and unprecedented information sharing between affected nations.\n\nMore than 4.2 million vaccine doses were deployed to 28 countries within 45 days of the emergency declaration. Case numbers peaked at 2,100 per week globally and have now fallen to fewer than 200.\n\n"This is what global health solidarity looks like when we're prepared," said WHO Director-General Dr. Tedros Adhanom Ghebreyesus. "But we cannot afford to be complacent. Surveillance must continue."\n\nThe WHO has established a permanent Rapid Response Framework based on lessons learned from the outbreak, including a $500 million contingency fund for future health emergencies.`,
    category: "Health",
    categorySlug: "health",
    source: "Reuters Health",
    timeAgo: "4h ago",
    readTime: "6 min read",
  },
  {
    slug: "tech-giants-ai-summit",
    title: "World Leaders Gather for Inaugural Global AI Safety Summit in London",
    dek: "Heads of state and tech CEOs convene at Bletchley Park to establish binding international AI safety standards for frontier models.",
    content: `LONDON — World leaders, AI researchers, and technology executives gathered at Bletchley Park on Monday for the inaugural Global AI Safety Summit, aiming to establish the first binding international framework for frontier AI development.\n\nThe summit, hosted by UK Prime Minister, builds on the 2023 Bletchley Declaration and seeks to translate voluntary commitments into enforceable regulations. Key agenda items include mandatory safety testing for models above certain compute thresholds, international incident reporting protocols, and a proposed Global AI Observatory to monitor emerging risks.\n\n"We stand at a crossroads," the Prime Minister said in his opening address. "The same technology that promises to cure cancer and solve the climate crisis also poses existential risks if left unchecked. International cooperation is not optional — it is imperative."\n\nNotable outcomes include an agreement by 32 countries to establish minimum safety standards for AI training runs exceeding 10^26 FLOPS, and a commitment from major AI labs to submit frontier models for pre-deployment auditing.`,
    category: "Technology",
    categorySlug: "technology",
    source: "BBC News",
    timeAgo: "8 hours ago",
    readTime: "7 min read",
  },
  {
    slug: "quantum-computing-breakthrough",
    title: "IBM and Google Announce Quantum Computing Milestone: 2,000 Qubit Error-Corrected Processor",
    dek: "The joint project has achieved the first practical demonstration of fault-tolerant quantum computing, opening the door to commercial quantum applications.",
    content: `In a joint announcement from IBM's Thomas J. Watson Research Center, IBM and Google revealed a 2,000-qubit quantum processor capable of sustained error-corrected operation — a milestone that researchers have pursued for over three decades.\n\nThe processor, code-named "Heron-2," demonstrated a logical error rate of just 0.03% per operation, below the threshold required for practical quantum advantage in chemistry simulation and optimization problems.\n\n"This is the transistor moment for quantum computing," said Dr. Dario Gil, IBM's Director of Research. "We have moved beyond the era of noisy intermediate-scale quantum devices into a new paradigm of fault-tolerant quantum computation."\n\nThe breakthrough combines IBM's superconducting qubit architecture with Google's error-correction protocols. The partners plan to make the processor available via cloud platforms within 18 months.`,
    category: "Science",
    categorySlug: "science",
    source: "Wired",
    timeAgo: "12 hours ago",
    readTime: "6 min read",
  },
];

/* ── Derived data from allArticles ── */

export const latestArticles: ArticleItem[] = allArticles.filter((a) =>
  ["openai-gpt5-release", "fed-rates-hold", "nigeria-world-cup-qualify"].includes(a.slug),
);

export const heroArticle: ArticleItem = allArticles[0];

export const mostReadArticles: ArticleItem[] = [
  allArticles.find((a) => a.slug === "us-china-space-station")!,
  allArticles.find((a) => a.slug === "apple-neural-engine")!,
  allArticles.find((a) => a.slug === "who-mpox-contained")!,
  allArticles.find((a) => a.slug === "pakistan-floods")!,
];

/* ── Breaking ticker items ── */
export const tickerItems: string[] = [
  "Global Markets Rally As Fed Signals Rate Pause",
  "UN Emergency Session Called Over Eastern Crisis",
  "Tech Giants Face New Antitrust Framework in EU",
  "Climate Summit Reaches Historic 150-Nation Agreement",
];

/* ── Categories ── */
export const allCategories: CategoryItem[] = [
  { slug: "all", label: "All" },
  { slug: "world", label: "World" },
  { slug: "business", label: "Business" },
  { slug: "technology", label: "Technology" },
  { slug: "science", label: "Science" },
  { slug: "health", label: "Health" },
  { slug: "sports", label: "Sports" },
  { slug: "entertainment", label: "Entertainment" },
];

/* ── Trending topics ── */
export const trendingTopics: TrendingTopic[] = [
  { tag: "#1", label: "Climate Treaty", count: "12.4k" },
  { tag: "#2", label: "Federal Reserve", count: "8.1k" },
  { tag: "#3", label: "World Cup 2026", count: "6.7k" },
  { tag: "#4", label: "GPT-5", count: "5.9k" },
  { tag: "#5", label: "Space Diplomacy", count: "4.2k" },
];

/* ── Nav links ── */
export const navLinks: { label: string; href: string }[] = [
  { label: "Top", href: "/" },
  { label: "World", href: "/world" },
  { label: "Business", href: "/business" },
  { label: "Technology", href: "/technology" },
  { label: "Sports", href: "/sports" },
  { label: "Science", href: "/science" },
];

/* ── Helper functions ── */

export function getArticleBySlug(slug: string): ArticleItem | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): ArticleItem[] {
  if (categorySlug === "all") return allArticles;
  return allArticles.filter((a) => a.categorySlug === categorySlug);
}

export function searchArticles(query: string): ArticleItem[] {
  const q = query.toLowerCase();
  return allArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.dek.toLowerCase().includes(q) ||
      (a.content && a.content.toLowerCase().includes(q)) ||
      a.source.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q),
  );
}

export function getCategoryLabel(slug: string): string {
  return allCategories.find((c) => c.slug === slug)?.label ?? slug;
}

export function computeReadTime(text: string): string {
  const wpm = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / wpm));
  return `${minutes} min read`;
}
