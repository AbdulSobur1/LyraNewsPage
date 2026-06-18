import { NextRequest, NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";
import { getDb, schema } from "@/db";
import { auth } from "@/lib/auth";

export const dynamic = "force-dynamic";

/**
 * GET /api/comments?slug=article-slug
 * Fetch all comments for a given article slug, newest first.
 * Includes the user's name via a join.
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
    return NextResponse.json({ comments: [], dbConfigured: false });
  }

  try {
    const results = await db
      .select({
        id: schema.comments.id,
        articleSlug: schema.comments.articleSlug,
        userId: schema.comments.userId,
        text: schema.comments.text,
        createdAt: schema.comments.createdAt,
        name: schema.users.name,
      })
      .from(schema.comments)
      .where(eq(schema.comments.articleSlug, slug))
      .innerJoin(schema.users, eq(schema.comments.userId, schema.users.id))
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
 * Create a new comment on an article. Requires authentication.
 * Body: { slug: string, text: string }
 */
export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "You must be signed in to comment." },
      { status: 401 },
    );
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const { slug, text } = body;

    if (!slug || !text) {
      return NextResponse.json(
        { error: "Missing required fields: slug, text" },
        { status: 400 },
      );
    }

    const trimmedText = text.trim().slice(0, 2000);

    if (!trimmedText) {
      return NextResponse.json(
        { error: "Comment cannot be empty" },
        { status: 400 },
      );
    }

    const userId = parseInt(session.user.id, 10);

    const [comment] = await db
      .insert(schema.comments)
      .values({
        articleSlug: slug,
        userId,
        text: trimmedText,
      })
      .returning();

    // Fetch the user name to return with the comment
    const [user] = await db
      .select({ name: schema.users.name })
      .from(schema.users)
      .where(eq(schema.users.id, userId))
      .limit(1);

    return NextResponse.json(
      {
        comment: {
          ...comment,
          name: user?.name || "Unknown",
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create comment:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/comments
 * Delete a comment. Only the comment author can delete their own comment.
 * Body: { id: number }
 */
export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "You must be signed in to delete comments." },
      { status: 401 },
    );
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json(
      { error: "Database not configured." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing comment id" },
        { status: 400 },
      );
    }

    const userId = parseInt(session.user.id, 10);

    // Fetch the comment to check ownership
    const [comment] = await db
      .select()
      .from(schema.comments)
      .where(eq(schema.comments.id, id))
      .limit(1);

    if (!comment) {
      return NextResponse.json(
        { error: "Comment not found" },
        { status: 404 },
      );
    }

    if (comment.userId !== userId) {
      return NextResponse.json(
        { error: "You can only delete your own comments" },
        { status: 403 },
      );
    }

    await db
      .delete(schema.comments)
      .where(eq(schema.comments.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
