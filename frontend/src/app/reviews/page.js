"use client";

import { useState } from "react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import SectionHeader from "../../components/ui/SectionHeader";
import PageShell from "../../components/layout/PageShell";

const myReviews = [
  {
    id: "review-001",
    eventName: "Neon River Festival",
    eventId: "neon-river",
    rating: 5,
    date: "Aug 12, 2026",
    comment: "Insane light work and the crowd was electric all night.",
    status: "Published",
  },
  {
    id: "review-002",
    eventName: "Skyline Soundscape",
    eventId: "skyline-soundscape",
    rating: 4,
    date: "Aug 16, 2026",
    comment: "Great set list and visuals, entry line moved fast.",
    status: "Published",
  },
  {
    id: "review-003",
    eventName: "Midnight Mango",
    eventId: "midnight-mango",
    rating: 3,
    date: "Aug 20, 2026",
    comment: "Loved the vibe, wish the sound was a bit louder.",
    status: "Draft",
  },
];

const emptyForm = {
  eventName: "",
  eventId: "",
  rating: 0,
  date: "",
  comment: "",
  status: "Draft",
};

const selectClassName =
  "w-full rounded-2xl border border-white/10 bg-[var(--surface)]/80 px-4 py-2 text-sm text-[var(--foreground)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--ring)]";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(myReviews);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedRating = Math.min(
      5,
      Math.max(1, Number.parseInt(form.rating || 0, 10))
    );
    const payload = {
      ...form,
      rating: normalizedRating || 1,
    };

    if (editingId) {
      setReviews((current) =>
        current.map((review) =>
          review.id === editingId ? { ...review, ...payload } : review
        )
      );
    } else {
      setReviews((current) => [
        {
          id: `review-${Date.now()}`,
          ...payload,
        },
        ...current,
      ]);
    }

    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (review) => {
    setEditingId(review.id);
    setForm({
      eventName: review.eventName,
      eventId: review.eventId,
      rating: review.rating,
      date: review.date,
      comment: review.comment,
      status: review.status,
    });
  };

  const removeReview = (reviewId) => {
    setReviews((current) => current.filter((review) => review.id !== reviewId));
    if (editingId === reviewId) {
      setEditingId(null);
      setForm(emptyForm);
    }
  };

  const toggleStatus = (reviewId) => {
    setReviews((current) =>
      current.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status: review.status === "Published" ? "Draft" : "Published",
            }
          : review
      )
    );
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <PageShell className="space-y-10">
      <SectionHeader
        eyebrow="Review service"
        title="My reviews"
        subtitle="Manage your feedback, ratings, and status updates."
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <Card className="text-sm text-[var(--muted)]">
              No reviews yet. Create your first review to see it here.
            </Card>
          ) : null}

          {reviews.map((review) => (
            <Card key={review.id} className="space-y-3">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold">{review.eventName}</div>
                  <div className="text-xs text-[var(--muted)]">
                    Event ID: {review.eventId}
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    review.status === "Published"
                      ? "bg-green-500/15 text-green-400"
                      : "bg-amber-500/15 text-amber-400"
                  }`}
                >
                  {review.status}
                </span>
              </div>
              <div className="text-sm text-[var(--muted)]">
                {"★".repeat(review.rating)}
              </div>
              <p className="text-sm">{review.comment}</p>
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--muted)]">
                <span>{review.date}</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => startEdit(review)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => toggleStatus(review.id)}
                  >
                    {review.status === "Published" ? "Unpublish" : "Publish"}
                  </Button>
                  <Button size="sm" onClick={() => removeReview(review.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="space-y-4">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-2)]">
              {editingId ? "Edit review" : "New review"}
            </div>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <Input
                name="eventName"
                value={form.eventName}
                onChange={handleChange}
                placeholder="Event name"
                required
              />
              <Input
                name="eventId"
                value={form.eventId}
                onChange={handleChange}
                placeholder="Event ID"
                required
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    Rating
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            rating: value,
                          }))
                        }
                        className={`text-2xl leading-none transition ${
                          value <= form.rating
                            ? "text-[var(--brand-2)]"
                            : "text-white/30"
                        } hover:text-[var(--brand-2)]`}
                        aria-pressed={value <= form.rating}
                        aria-label={`${value} star${value > 1 ? "s" : ""}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <Input
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  placeholder="Review date"
                  required
                />
              </div>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={selectClassName}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
              <textarea
                name="comment"
                value={form.comment}
                onChange={handleChange}
                className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-[var(--surface)]/80 px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                placeholder="Write your review"
                required
              />
              <div className="flex flex-wrap items-center gap-2">
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Reset
                </Button>
                <Button type="submit">
                  {editingId ? "Update Review" : "Create Review"}
                </Button>
              </div>
            </form>
          </Card>

          <Card className="space-y-3">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-2)]">
              Review stats
            </div>
            <div className="grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Total</div>
                <div className="text-base text-[var(--foreground)]">
                  {reviews.length}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Published</div>
                <div className="text-base text-[var(--foreground)]">
                  {reviews.filter((review) => review.status === "Published").length}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Drafts</div>
                <div className="text-base text-[var(--foreground)]">
                  {reviews.filter((review) => review.status === "Draft").length}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Avg rating</div>
                <div className="text-base text-[var(--foreground)]">
                  {reviews.length
                    ? (
                        reviews.reduce(
                          (total, review) => total + review.rating,
                          0
                        ) / reviews.length
                      ).toFixed(1)
                    : "0.0"}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
