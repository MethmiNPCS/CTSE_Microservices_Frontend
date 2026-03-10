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

export default function ReviewsPage() {
  return (
    <PageShell className="space-y-10">
      <SectionHeader
        eyebrow="Review service"
        title="My reviews"
        subtitle="Manage your feedback, ratings, and status updates."
      />

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {myReviews.map((review) => (
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
                  <Button size="sm" variant="secondary">
                    Edit
                  </Button>
                  <Button size="sm">Publish</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="space-y-4">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-2)]">
            New review
          </div>
          <div className="space-y-3">
            <Input placeholder="Event name" />
            <Input placeholder="Event ID" />
            <Input placeholder="Rating (1-5)" />
            <Input placeholder="Review date" />
            <textarea
              className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-[var(--surface)]/80 px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              placeholder="Write your review"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="secondary">Save Draft</Button>
            <Button>Submit Review</Button>
          </div>
        </Card>
      </section>
    </PageShell>
  );
}
