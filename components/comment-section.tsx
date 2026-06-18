"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  IconMessage,
  IconSend,
  IconAlertCircle,
  IconTrash,
  IconUser,
  IconLogout,
} from "@tabler/icons-react";

interface Comment {
  id: number;
  articleSlug: string;
  userId: number;
  name: string;
  text: string;
  createdAt: string;
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

interface CommentSectionProps {
  articleSlug: string;
  articleTitle: string;
}

type AuthMode = "signin" | "signup";

export function CommentSection({ articleSlug }: CommentSectionProps) {
  const { data: session, status } = useSession();
  const isAuthed = status === "authenticated" && session?.user?.role === "user";
  const userId = isAuthed ? parseInt(session!.user.id, 10) : null;

  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Auth form state
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [authEmail, setAuthEmail] = useState("");
  const [authName, setAuthName] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Load comments from API
  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/comments?slug=${encodeURIComponent(articleSlug)}`,
      );
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setComments(data.comments || []);
      setError("");
    } catch {
      setError("Could not load comments. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [articleSlug]);

  useEffect(() => {
    setMounted(true);
    fetchComments();
  }, [fetchComments]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedText = text.trim();
      if (!trimmedText || submitting || !isAuthed) return;

      setSubmitting(true);
      setError("");

      try {
        const res = await fetch("/api/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: articleSlug, text: trimmedText }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to post");
        }

        const data = await res.json();
        setComments((prev) => [data.comment, ...prev]);
        setText("");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Could not post comment.",
        );
      } finally {
        setSubmitting(false);
      }
    },
    [text, articleSlug, submitting, isAuthed],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      if (!isAuthed) return;

      // Optimistic removal
      setComments((prev) => prev.filter((c) => c.id !== id));

      try {
        const res = await fetch("/api/comments", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });

        if (!res.ok) {
          // Revert on failure
          fetchComments();
        }
      } catch {
        fetchComments();
      }
    },
    [isAuthed, fetchComments],
  );

  const handleAuth = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setAuthError("");
      setAuthLoading(true);

      try {
        if (authMode === "signup") {
          // First create the account
          const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: authEmail,
              name: authName,
              password: authPassword,
            }),
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || "Failed to create account");
          }
        }

        // Then sign in
        const result = await signIn("credentials", {
          email: authEmail,
          password: authPassword,
          redirect: false,
        });

        if (result?.error) {
          throw new Error("Invalid email or password.");
        }
      } catch (err) {
        setAuthError(
          err instanceof Error ? err.message : "Authentication failed.",
        );
      } finally {
        setAuthLoading(false);
      }
    },
    [authMode, authEmail, authName, authPassword],
  );

  // Show skeleton during SSR / hydration
  if (!mounted) {
    return (
      <section className="mt-10 border-t border-hairline border-[var(--border)] pt-8 sm:mt-12">
        <div className="mb-6 flex items-center gap-2">
          <IconMessage className="h-5 w-5 text-text-tertiary" aria-hidden="true" />
          <h2 className="font-serif text-xl font-bold tracking-[-0.02em]">
            Comments
          </h2>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-[var(--surface)]" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="comments"
      className="mt-10 border-t border-hairline border-[var(--border)] pt-8 sm:mt-12"
    >
      <div className="mb-6 flex items-center gap-2">
        <IconMessage className="h-5 w-5 text-text-tertiary" aria-hidden="true" />
        <h2 className="font-serif text-xl font-bold tracking-[-0.02em]">
          Comments
          {!loading && comments.length > 0 && ` (${comments.length})`}
        </h2>
      </div>

      {/* Auth gate — show sign in / sign up if not logged in */}
      {!isAuthed && status !== "loading" && (
        <div className="mb-8 rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="mb-4 flex items-center gap-2">
            <IconUser className="h-4 w-4 text-text-tertiary" aria-hidden="true" />
            <span className="text-[13px] font-medium text-text-secondary">
              {authMode === "signin"
                ? "Sign in to join the discussion"
                : "Create an account to join the discussion"}
            </span>
          </div>

          <form onSubmit={handleAuth} className="space-y-3">
            {authMode === "signup" && (
              <input
                type="text"
                value={authName}
                onChange={(e) => setAuthName(e.target.value)}
                placeholder="Your display name"
                required
                minLength={1}
                maxLength={60}
                className="w-full rounded-lg border border-hairline border-[var(--border)] bg-[var(--obsidian)] px-3.5 py-2.5 text-[13px] text-[var(--text-primary)] outline-none placeholder:text-text-tertiary focus:border-gold/50"
                aria-label="Display name"
              />
            )}
            <input
              type="email"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              placeholder="Email address"
              required
              className="w-full rounded-lg border border-hairline border-[var(--border)] bg-[var(--obsidian)] px-3.5 py-2.5 text-[13px] text-[var(--text-primary)] outline-none placeholder:text-text-tertiary focus:border-gold/50"
              aria-label="Email"
            />
            <input
              type="password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              placeholder="Password"
              required
              minLength={4}
              className="w-full rounded-lg border border-hairline border-[var(--border)] bg-[var(--obsidian)] px-3.5 py-2.5 text-[13px] text-[var(--text-primary)] outline-none placeholder:text-text-tertiary focus:border-gold/50"
              aria-label="Password"
            />

            {authError && (
              <p className="flex items-center gap-1.5 text-[12px] text-red-400" role="alert">
                <IconAlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                {authError}
              </p>
            )}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={authLoading}
                className="cursor-pointer rounded-lg bg-gold px-4 py-2 text-[12px] font-semibold text-[#0A0A0B] transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {authLoading
                  ? "Please wait…"
                  : authMode === "signin"
                    ? "Sign in"
                    : "Create account"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === "signin" ? "signup" : "signin");
                  setAuthError("");
                }}
                className="cursor-pointer text-[12px] text-text-tertiary underline transition-colors hover:text-gold"
              >
                {authMode === "signin"
                  ? "No account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Loading auth state */}
      {status === "loading" && (
        <div className="mb-8 h-24 animate-pulse rounded-xl bg-[var(--surface)]" />
      )}

      {/* Signed in — show user info and comment form */}
      {isAuthed && (
        <>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20 text-[10px] font-semibold text-gold">
                {session!.user!.name!.charAt(0).toUpperCase()}
              </div>
              <span className="text-[13px] text-text-secondary">
                Signed in as{" "}
                <span className="font-medium text-text-primary">
                  {session?.user?.name || "User"}
                </span>
              </span>
            </div>
            <button
              onClick={() => signOut()}
              className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-[11px] text-text-tertiary transition-colors hover:text-red-400"
              aria-label="Sign out"
            >
              <IconLogout className="h-3.5 w-3.5" aria-hidden="true" />
              Sign out
            </button>
          </div>

          {/* Comment form */}
          <form onSubmit={handleSubmit} className="mb-8">
            {error && (
              <div className="mb-3 flex items-start gap-2.5 rounded-lg border border-red-900/50 bg-red-900/10 px-4 py-3 text-[13px] text-red-400">
                <IconAlertCircle
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>{error}</span>
              </div>
            )}
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your thoughts on this article…"
                maxLength={2000}
                required
                rows={3}
                className="w-full resize-none rounded-lg border border-hairline border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 pr-12 text-[13px] text-[var(--text-primary)] outline-none placeholder:text-text-tertiary focus:border-gold/50"
                aria-label="Your comment"
              />
              <button
                type="submit"
                disabled={submitting || !text.trim()}
                className="absolute bottom-2.5 right-2.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-gold text-[#0A0A0B] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Post comment"
              >
                <IconSend className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        </>
      )}

      {/* Comment list */}
      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-[var(--surface)]" />
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--border)] py-10 text-center">
          <IconMessage
            className="mx-auto mb-2 h-6 w-6 text-text-tertiary"
            aria-hidden="true"
          />
          <p className="text-[13px] text-text-tertiary">
            No comments yet.
            {isAuthed
              ? " Be the first to share your thoughts!"
              : " Sign in to start the discussion."}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => {
            const isOwner = isAuthed && userId === comment.userId;
            return (
              <div
                key={comment.id}
                className="rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--border-hover)]"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-[11px] font-semibold text-gold">
                      {comment.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <span className="text-[13px] font-medium text-[var(--text-primary)]">
                      {comment.name}
                    </span>
                    <span className="text-[11px] text-text-tertiary">
                      {formatTime(comment.createdAt)}
                    </span>
                  </div>

                  {isOwner && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md text-text-tertiary transition-colors hover:text-red-400"
                      aria-label="Delete comment"
                    >
                      <IconTrash className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
                <p className="pl-9 text-[13px] leading-relaxed text-text-secondary">
                  {comment.text}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
