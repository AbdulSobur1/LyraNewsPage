import { NextRequest, NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";
import { getDb, schema } from "@/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/comments?slug=article-slug
 * Fetch all comments for a given article slug, newest first.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Missing 'slug' query parameter" },
      { status: 400 },
    );
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json(
      { comments: [], dbConfigured: false },
    );
  }

  try {
    const results = await db
      .select()
      .from(schema.comments)
      .where(eq(schema.comments.articleSlug, slug))
      .orderBy(desc(schema.comments.createdAt));

    return NextResponse.json({ comments: results, dbConfigured: true });
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { comments: [], dbConfigured: false, error: "Failed to fetch comments" },
      { status: 500 },
    );
  }
}

/**
 * POST /api/comments
 * Create a new comment on an article.
 * Body: { slug: string, name: string, text: string }
 */
export async function POST(request: NextRequest) {
  const db = getDb();
  if (!db) {
    return NextResponse.json(
      { error: "Database not configured. Set DATABASE_URL environment variable." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const { slug, name, text } = body;

    if (!slug || !name || !text) {
      return NextResponse.json(
        { error: "Missing required fields: slug, name, text" },
        { status: 400 },
      );
    }

    const trimmedName = name.trim().slice(0, 100);
    const trimmedText = text.trim().slice(0, 2000);

    if (!trimmedName || !trimmedText) {
      return NextResponse.json(
        { error: "Name and text cannot be empty" },
        { status: 400 },
      );
    }

    const [comment] = await db
      .insert(schema.comments)
      .values({
        articleSlug: slug,
        name: trimmedName,
        text: trimmedText,
      })
      .returning();

    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    console.error("Failed to create comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}
