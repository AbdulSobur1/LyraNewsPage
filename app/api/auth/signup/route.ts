import { NextRequest, NextResponse } from "next/server";
import { getDb, schema } from "@/db";
import { eq } from "drizzle-orm";
import { hashPassword } from "@/lib/password";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/signup
 * Body: { email: string, name: string, password: string }
 * Creates a new user account and returns the user (so the client can sign in immediately).
 */
export async function POST(request: NextRequest) {
  const db = getDb();
  if (!db) {
    return NextResponse.json(
      { error: "Database not configured. Set DATABASE_URL to enable comments." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Missing required fields: email, name, password" },
        { status: 400 },
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim().slice(0, 100);
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedName || !trimmedPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (trimmedPassword.length < 4) {
      return NextResponse.json(
        { error: "Password must be at least 4 characters" },
        { status: 400 },
      );
    }

    // Check if email already exists
    const [existing] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, trimmedEmail))
      .limit(1);

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists. Sign in instead." },
        { status: 409 },
      );
    }

    const hashedPassword = await hashPassword(trimmedPassword);

    const [user] = await db
      .insert(schema.users)
      .values({
        email: trimmedEmail,
        name: trimmedName,
        hashedPassword,
      })
      .returning();

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 },
    );
  }
}
