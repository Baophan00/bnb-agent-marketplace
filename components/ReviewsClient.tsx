"use client";

import { useState } from "react";
import { useReviews, type Review } from "@/lib/reviews";

function Stars({ value, onChange, readonly = false }: { value: number; onChange?: (v: number) => void; readonly?: boolean }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`text-lg ${star <= value ? "text-amber-400" : "text-slate-600"} ${readonly ? "cursor-default" : "cursor-pointer hover:text-amber-300"}`}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewForm({ agentId, onSubmitted }: { agentId: string; onSubmitted?: () => void }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");
  const { addReview } = useReviews(agentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !title.trim() || !body.trim() || !author.trim()) return;

    addReview({
      agentId,
      rating,
      title: title.trim(),
      body: body.trim(),
      author: author.trim(),
    });

    setRating(0);
    setTitle("");
    setBody("");
    setAuthor("");
    setOpen(false);
    onSubmitted?.();
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/5"
      >
        Write a review
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-4">
      <h4 className="text-sm font-semibold text-white">Write a review</h4>

      <div>
        <label className="block text-xs text-slate-400">Rating</label>
        <Stars value={rating} onChange={setRating} />
      </div>

      <div>
        <label className="block text-xs text-slate-400">Your name</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-white/25 focus:outline-none"
          placeholder="anon"
          required
        />
      </div>

      <div>
        <label className="block text-xs text-slate-400">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-white/25 focus:outline-none"
          placeholder="Short summary"
          required
        />
      </div>

      <div>
        <label className="block text-xs text-slate-400">Review</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-slate-400 focus:border-white/25 focus:outline-none"
          rows={4}
          placeholder="What was it like hiring this agent?"
          required
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
        >
          Submit review
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <Stars value={review.rating} readonly />
        <span className="text-xs text-slate-400">
          {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </span>
      </div>

      <h4 className="mt-3 font-semibold text-white">{review.title}</h4>
      <p className="mt-2 text-sm text-slate-300 leading-relaxed">{review.body}</p>

      <div className="mt-3 text-xs text-slate-400">
        by <span className="text-slate-300">{review.author}</span>
      </div>
    </div>
  );
}

export default function ReviewsClient({ agentId }: { agentId: string }) {
  const { reviews, loading, average } = useReviews(agentId);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Reviews</h3>
          <p className="mt-1 text-sm text-slate-400">
            {reviews.length > 0
              ? `${reviews.length} review${reviews.length !== 1 ? "s" : ""} · Average ${average.toFixed(1)}/5`
              : "No reviews yet. Be the first."}
          </p>
        </div>
        {!showForm && <button onClick={() => setShowForm(true)} className="rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/5">Write a review</button>}
      </div>

      {showForm && (
        <div className="mt-6">
          <ReviewForm agentId={agentId} onSubmitted={() => setShowForm(false)} />
        </div>
      )}

      <div className="mt-6 space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {!loading && reviews.length === 0 && !showForm && (
        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-400">
          No reviews yet. Reviews are stored locally in your browser.
        </div>
      )}
    </div>
  );
}
