"use client";

import { useEffect, useMemo, useState } from "react";

import Button from "../ui/Button";
import Card from "../ui/Card";
import Input from "../ui/Input";
import SectionHeader from "../ui/SectionHeader";
import PageShell from "../layout/PageShell";

const formatReviewDate = (value) => {
  if (!value) {
    return "Recently";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }
  return date.toLocaleDateString();
};

export default function EventReviewsSection({ eventId, eventName }) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    rating: "5",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = useMemo(() => {
    if (typeof window === "undefined") {
      return "";
    }
    return window.localStorage.getItem("authToken") || "";
  }, []);

  const loadReviews = async () => {
    try {
      setIsLoadingReviews(true);
      const response = await fetch(`${apiBaseUrl}/reviews/${eventId}`, {
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error("Failed to load reviews.");
      }
      const payload = await response.json();
      const items = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.reviews)
          ? payload.reviews
          : [];
      setReviews(items);
    } catch {
      setReviews([]);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [apiBaseUrl, eventId]);

  useEffect(() => {
    const loadCurrentUser = async () => {
      if (!token) {
        setCurrentUser(null);
        return;
      }
      try {
        const response = await fetch(`${apiBaseUrl}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        const payload = await response.json();
        setCurrentUser(payload);
      } catch {
        setCurrentUser(null);
      }
    };

    loadCurrentUser();
  }, [apiBaseUrl, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!token) {
      setErrorMessage("Please login to submit a review.");
      return;
    }

    if (!currentUser?.id || !currentUser?.email) {
      setErrorMessage("Unable to load current user details.");
      return;
    }

    const ratingValue = Number(formData.rating);
    if (!Number.isInteger(ratingValue) || ratingValue < 1 || ratingValue > 5) {
      setErrorMessage("Rating must be between 1 and 5.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUser.id,
          user_name: `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim(),
          email: currentUser.email,
          event_id: eventId,
          event_name: eventName,
          rating: ratingValue,
          comment: formData.comment,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Failed to submit review.");
      }

      setFormData({ rating: "5", comment: "" });
      setSuccessMessage("Review submitted successfully.");
      setReviews((prev) => [payload, ...prev]);
    } catch (error) {
      setErrorMessage(error.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="border-t border-white/10 bg-[var(--surface)]/50">
      <PageShell className="space-y-8">
        <SectionHeader
          eyebrow="Reviews"
          title="Review the experience"
          subtitle="Share your thoughts with the community."
        />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            {isLoadingReviews ? (
              <Card>
                <p className="text-sm text-[var(--muted)]">Loading reviews...</p>
              </Card>
            ) : null}
            {!isLoadingReviews && reviews.length === 0 ? (
              <Card>
                <p className="text-sm text-[var(--muted)]">
                  No reviews yet for this event.
                </p>
              </Card>
            ) : null}
            {reviews.map((review, index) => (
              <Card
                key={review.review_id || review._id || review.id || `review-${index}`}
                className="space-y-2"
              >
                <div className="text-sm text-[var(--muted)]">
                  {"★".repeat(Number(review.rating) || 0)}
                </div>
                <p className="text-sm">{review.comment}</p>
                <div className="text-xs text-[var(--muted)]">
                  {review.user_name} · {formatReviewDate(review.createdAt)}
                </div>
              </Card>
            ))}
          </div>

          <Card className="space-y-4">
            <div className="text-sm uppercase tracking-[0.3em] text-[var(--brand-2)]">
              Add Review
            </div>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <Input
                placeholder="Your name"
                value={
                  currentUser
                    ? `${currentUser.firstName || ""} ${currentUser.lastName || ""}`.trim()
                    : ""
                }
                readOnly
              />
              <Input placeholder="Email" value={currentUser?.email || ""} readOnly />
              <Input
                type="number"
                name="rating"
                min="1"
                max="5"
                placeholder="Rating (1-5)"
                value={formData.rating}
                onChange={handleChange}
                required
              />
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-[var(--surface)]/80 px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                placeholder="Write your review"
                required
              />
              {errorMessage ? (
                <p className="text-xs text-red-400">{errorMessage}</p>
              ) : null}
              {successMessage ? (
                <p className="text-xs text-green-400">{successMessage}</p>
              ) : null}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </Card>
        </div>
      </PageShell>
    </section>
  );
}
