"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import SectionHeader from "../../components/ui/SectionHeader";
import PageShell from "../../components/layout/PageShell";
import { useAuth } from "../../context/AuthContext";

const cardClassName =
  "border-black/10 bg-white/85 shadow-[0_22px_45px_-30px_rgba(15,23,42,0.35)]";

const formatDate = (value) => {
  if (!value) {
    return "—";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "—";
  }
  return date.toLocaleString();
};

const getReviewId = (review) =>
  review.review_id || review._id || review.id || "";

export default function ReviewsPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const { user, token, isLoading: authLoading } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ rating: "5", comment: "" });
  const [actionError, setActionError] = useState("");
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const userId = user?.id;

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      if (authLoading) {
        return;
      }

      if (!token || !userId) {
        if (isMounted) {
          setReviews([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");
        const response = await fetch(`${apiBaseUrl}/reviews/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 404) {
          if (isMounted) {
            setReviews([]);
          }
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load your reviews.");
        }

        const payload = await response.json();
        const items = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.reviews)
            ? payload.reviews
            : [];

        if (isMounted) {
          setReviews(items);
        }
      } catch (error) {
        if (isMounted) {
          setReviews([]);
          setErrorMessage(error.message || "Failed to load reviews.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl, authLoading, token, userId]);

  const buildUpdatePayload = (review, rating, comment) => ({
    user_id: user?.id,
    user_name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || review.user_name,
    email: user?.email || review.email,
    event_id: review.event_id,
    event_name: review.event_name,
    rating,
    comment,
  });

  const startEdit = (review) => {
    const id = getReviewId(review);
    if (!id) {
      return;
    }
    setActionError("");
    setEditingId(id);
    setEditForm({
      rating: String(Number(review.rating) || 1),
      comment: review.comment || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ rating: "5", comment: "" });
    setActionError("");
  };

  const handleUpdate = async (review) => {
    const reviewId = getReviewId(review);
    if (!reviewId || !token || !user) {
      setActionError("Unable to update review.");
      return;
    }

    const rating = Number.parseInt(editForm.rating, 10);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      setActionError("Rating must be between 1 and 5.");
      return;
    }

    setSavingId(reviewId);
    setActionError("");

    try {
      const response = await fetch(`${apiBaseUrl}/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildUpdatePayload(review, rating, editForm.comment)),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.message || "Failed to update review.");
      }

      setReviews((current) =>
        current.map((item) =>
          getReviewId(item) === reviewId ? { ...item, ...payload, rating, comment: editForm.comment } : item
        )
      );
      cancelEdit();
    } catch (error) {
      setActionError(error.message || "Failed to update review.");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (review) => {
    const reviewId = getReviewId(review);
    if (!reviewId || !token) {
      return;
    }
    if (!window.confirm("Delete this review? This cannot be undone.")) {
      return;
    }

    setDeletingId(reviewId);
    setActionError("");

    try {
      const response = await fetch(`${apiBaseUrl}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.message || "Failed to delete review.");
      }

      setReviews((current) => current.filter((item) => getReviewId(item) !== reviewId));
      if (editingId === reviewId) {
        cancelEdit();
      }
    } catch (error) {
      setActionError(error.message || "Failed to delete review.");
    } finally {
      setDeletingId(null);
    }
  };

  const stats = useMemo(() => {
    const total = reviews.length;
    const avgRating =
      total > 0
        ? (
            reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / total
          ).toFixed(1)
        : "0.0";
    return { total, avgRating };
  }, [reviews]);

  if (!authLoading && !token) {
    return (
      <PageShell className="space-y-8">
        <SectionHeader
          eyebrow="Reviews"
          title="My reviews"
          subtitle="Sign in to see reviews you have submitted."
        />
        <Card className={cardClassName}>
          <p className="text-sm text-[var(--muted)]">
            You need to be logged in to view your reviews.
          </p>
          <Link href="/login" className="mt-4 inline-block">
            <Button>Go to login</Button>
          </Link>
        </Card>
      </PageShell>
    );
  }

  return (
    <PageShell className="space-y-10">
      <SectionHeader
        eyebrow="Review service"
        title="My reviews"
        subtitle="Reviews you have submitted for events."
      />

      {isLoading ? (
        <Card className={`text-sm text-[var(--muted)] ${cardClassName}`}>
          Loading your reviews...
        </Card>
      ) : null}

      {!isLoading && errorMessage ? (
        <Card className={`text-sm text-red-400 ${cardClassName}`}>
          {errorMessage}
        </Card>
      ) : null}

      {!isLoading && !errorMessage && reviews.length === 0 ? (
        <Card className={`text-sm text-[var(--muted)] ${cardClassName}`}>
          No reviews yet. Submit a review from an event page.
        </Card>
      ) : null}

      {actionError ? (
        <Card className={`text-sm text-red-400 ${cardClassName}`}>{actionError}</Card>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {reviews.map((review, index) => {
            const rid = getReviewId(review);
            const isEditing = editingId === rid;

            return (
              <Card
                key={rid || `review-${index}`}
                className={`space-y-3 ${cardClassName}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold">{review.event_name}</div>
                    <div className="text-xs text-[var(--muted)]">
                      Event ID: {review.event_id}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/events/${review.event_id}`}>
                      <Button size="sm" variant="secondary">
                        View event
                      </Button>
                    </Link>
                    {isEditing ? (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          type="button"
                          onClick={cancelEdit}
                          disabled={savingId === rid}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          type="button"
                          onClick={() => handleUpdate(review)}
                          disabled={savingId === rid}
                        >
                          {savingId === rid ? "Saving..." : "Save"}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="secondary"
                          type="button"
                          onClick={() => startEdit(review)}
                          disabled={Boolean(deletingId) || Boolean(savingId)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          type="button"
                          onClick={() => handleDelete(review)}
                          disabled={deletingId === rid || Boolean(savingId)}
                        >
                          {deletingId === rid ? "Deleting..." : "Delete"}
                        </Button>
                      </>
                    )}
                  </div>
                </div>
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      name="rating"
                      value={editForm.rating}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, rating: e.target.value }))
                      }
                    />
                    <textarea
                      name="comment"
                      value={editForm.comment}
                      onChange={(e) =>
                        setEditForm((f) => ({ ...f, comment: e.target.value }))
                      }
                      className="min-h-[100px] w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                      placeholder="Your comment"
                    />
                  </div>
                ) : (
                  <>
                    <div className="text-sm text-[var(--muted)]">
                      {"★".repeat(Number(review.rating) || 0)}
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </>
                )}
                <div className="text-xs text-[var(--muted)]">
                  {formatDate(review.createdAt)}
                </div>
              </Card>
            );
          })}
        </div>

        <Card className={`space-y-3 ${cardClassName}`}>
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-2)]">
            Review stats
          </div>
          <div className="grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2">
            <div>
              <div className="text-xs uppercase tracking-[0.2em]">Total</div>
              <div className="text-base text-[var(--foreground)]">{stats.total}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em]">Avg rating</div>
              <div className="text-base text-[var(--foreground)]">
                {stats.avgRating}
              </div>
            </div>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
