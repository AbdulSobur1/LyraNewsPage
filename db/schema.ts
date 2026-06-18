import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  index,
} from "drizzle-orm/pg-core";

/**
 * News sources / providers.
 * Managed server-side; Admin can flip `enabled` in the dashboard.
 */
export const sources = pgTable("sources", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  provider: varchar("provider", { length: 100 }).notNull(),
  baseUrl: varchar("base_url", { length: 500 }),
  language: varchar("language", { length: 10 }).default("en"),
  country: varchar("country", { length: 10 }).default("us"),
  enabled: boolean("enabled").default(true).notNull(),
});

/**
 * Content categories.
 * Pre-seeded; Admin can add/edit via dashboard.
 */
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  label: varchar("label", { length: 255 }).notNull(),
});

/**
 * Articles — the core content entity.
 * `is_local` distinguishes manually-created articles from fetched ones.
 * `slug` is URL-safe and unique; generated from title on creation.
 * `external_url` points to the original source if not local.
 */
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 500 }).notNull().unique(),
  title: varchar("title", { length: 500 }).notNull(),
  dek: text("dek"),
  content: text("content"),
  imageUrl: varchar("image_url", { length: 2000 }),
  sourceId: integer("source_id").references(() => sources.id, {
    onDelete: "set null",
  }),
  categoryId: integer("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
  publishedAt: timestamp("published_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  externalUrl: varchar("external_url", { length: 2000 }),
  isLocal: boolean("is_local").default(false).notNull(),
});

/**
 * Users of the comment system.
 * Simple email/password auth — no email verification needed.
 */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  hashedPassword: varchar("hashed_password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

/**
 * Comments on articles.
 * Linked to a user for ownership.
 */
export const comments = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    articleSlug: varchar("article_slug", { length: 500 }).notNull(),
    userId: integer("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    text: text("text").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    articleSlugIdx: index("comments_article_slug_idx").on(table.articleSlug),
  }),
);

export type Source = typeof sources.$inferSelect;
export type NewSource = typeof sources.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
