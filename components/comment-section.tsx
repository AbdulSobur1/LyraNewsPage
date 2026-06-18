"use client";

import { useState, useEffect, useCallback } from "react";
import { IconMessage, IconSend, IconAlertCircle } from "@tabler/icons-react";

interface Comment {
  id: number;
  articleSlug: string;
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

export function CommentSection({ articleSlug }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load comments from API
  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/comments?slug=${encodeURIComponent(articleSlug)}`);
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
    // Restore commenter name from localStorage
    try {
      const savedName = localStorage.getItem("lyranews-commenter-name");
      if (savedName) setName(savedName);
    } catch {}
  }, [fetchComments]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedName = name.trim();
      const trimmedText = text.trim();
      if (!trimmedName || !trimmedText || submitting) return;

      setSubmitting(true);
      setError("");

      try {
        const res = await fetch("/api/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug: articleSlug, name: trimmedName, text: trimmedText }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to post");
        }

        const data = await res.json();
        setComments((prev) => [data.comment, ...prev]);
        setText("");

        // Store name for next time
        try {
          localStorage.setItem("lyranews-commenter-name", trimmedName);
        } catch {}
      } catch (err) {
        setError("Could not post comment. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
    [name, text, articleSlug, submitting],
  );

  // Delete not implemented — requires auth to prevent abuse

  if (!mounted) {
    return (
      <section className="mt-10 border-t border-hairline border-[var(--border)] pt-8 sm:mt-12">
        <div className="mb-6 flex items-center gap-2">
          <IconMessage className="h-5 w-5 text-text-tertiary" aria-hidden="true" />
          <h2 className="font-serif text-xl font-bold tracking-[-0.02em]">Comments</h2>
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
          Comments{!loading && comments.length > 0 && ` (${comments.length})`}
        </h2>
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-red-900/50 bg-red-900/10 px-4 py-3 text-[13px] text-red-400">
          <IconAlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={60}
            required
            className="w-full rounded-lg border border-hairline border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5 text-[13px] text-[var(--text-primary)] outline-none placeholder:text-text-tertiary focus:border-gold/50"
            aria-label="Your name"
          />
        </div>
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
            disabled={submitting || !name.trim() || !text.trim()}
            className="absolute bottom-2.5 right-2.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-gold text-[#0A0A0B] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Post comment"
          >
            <IconSend className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>

      {/* Comment list */}
      {loading ? (
        <div className="animate-pulse space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-[var(--surface)]" />
          ))}
        </div>
      ) : comments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--border)] py-10 text-center">
          <IconMessage className="mx-auto mb-2 h-6 w-6 text-text-tertiary" aria-hidden="true" />
          <p className="text-[13px] text-text-tertiary">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-xl border border-hairline border-[var(--border)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--border-hover)]"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/20 text-[11px] font-semibold text-gold">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[13px] font-medium text-[var(--text-primary)]">
                    {comment.name}
                  </span>
                  <span className="text-[11px] text-text-tertiary">
                    {formatTime(comment.createdAt)}
                  </span>
                </div>

              </div>
              <p className="pl-9 text-[13px] leading-relaxed text-text-secondary">
                {comment.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
