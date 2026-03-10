import Link from "next/link";
import { notFound } from "next/navigation";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import SectionHeader from "../../../components/ui/SectionHeader";
import PageShell from "../../../components/layout/PageShell";
import eventsData from "../../../data/events";

const { events } = eventsData;

const reviews = [
  {
    name: "Ishara P.",
    rating: 5,
    comment: "The lighting and sound were absolutely unreal.",
    date: "Aug 12, 2026",
  },
  {
    name: "Navin R.",
    rating: 4,
    comment: "Easy entry and great crowd energy the entire night.",
    date: "Aug 14, 2026",
  },
];

export default async function EventDetailPage({ params }) {
  const { id } = await params;
  const event = events.find((item) => item.id === id);

  if (!event) {
    notFound();
  }

  const relatedEvents = events.filter((item) => item.id !== event.id).slice(0, 3);

  return (
    <div>
      <section className="border-b border-white/10">
        <PageShell className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--brand-2)]">
              {event.status}
            </div>
            <h1 className="text-3xl font-semibold sm:text-4xl">
              {event.title}
            </h1>
            <p className="text-base text-[var(--muted)] sm:text-lg">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
              <span>
                {event.startDate} · {event.endDate}
              </span>
              <span>· {event.location}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg">Book Now</Button>
              <Button variant="secondary" size="lg">
                View Seat Map
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[var(--surface-2)]/80 p-6">
            <div
              className="absolute inset-0"
              style={{ backgroundImage: "var(--hero-gradient)", opacity: 0.25 }}
            />
            <div className="relative flex h-full items-end">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-[0.35em] text-white/70">
                  From
                </div>
                <div className="text-3xl font-semibold text-white">
                  {event.ticketPrice}
                </div>
                <div className="text-sm text-white/70">
                  Starts at general admission
                </div>
              </div>
            </div>
          </div>
        </PageShell>
      </section>

      <section>
        <PageShell className="space-y-8">
          <SectionHeader
            eyebrow="Gallery"
            title="Event gallery"
            subtitle="Swipe through the visual vibe before you book."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {event.galleryImages.map((label) => (
              <Card key={label} className="space-y-3">
                <div className="h-40 rounded-2xl bg-[var(--surface-2)]/80" />
                <div className="text-sm font-semibold">{label}</div>
              </Card>
            ))}
          </div>
        </PageShell>
      </section>

      {event.isSeated ? (
        <section className="border-y border-white/10 bg-[var(--surface)]/50">
          <PageShell className="space-y-6">
            <SectionHeader
              eyebrow="Seat Map"
              title="Choose your seat"
              subtitle="Pick the spot that matches your energy."
            />
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                  <tr>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Row</th>
                    <th className="px-4 py-3">Column</th>
                    <th className="px-4 py-3">Seat</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Features</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {event.seats.map((seat) => (
                    <tr key={seat.seatNumber} className="text-[var(--muted)]">
                      <td className="px-4 py-3 text-[var(--foreground)]">
                        {seat.type}
                      </td>
                      <td className="px-4 py-3">{seat.row}</td>
                      <td className="px-4 py-3">{seat.column}</td>
                      <td className="px-4 py-3">{seat.seatNumber}</td>
                      <td className="px-4 py-3">${seat.price}</td>
                      <td className="px-4 py-3 capitalize">
                        {seat.bookingStatus}
                      </td>
                      <td className="px-4 py-3">
                        {seat.features?.join(", ") || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </PageShell>
        </section>
      ) : null}

      <section>
        <PageShell className="space-y-8">
          <SectionHeader
            eyebrow="Related"
            title="Related events"
            subtitle="Keep the night rolling with these picks."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {relatedEvents.map((item) => (
              <Card key={item.id} className="space-y-3">
                <div className="h-32 rounded-2xl bg-[var(--surface-2)]/80" />
                <div className="text-base font-semibold">{item.title}</div>
                <div className="text-sm text-[var(--muted)]">
                  {item.startDate} · {item.location}
                </div>
                <Link href={`/events/${item.id}`}>
                  <Button size="sm">View Event</Button>
                </Link>
              </Card>
            ))}
          </div>
        </PageShell>
      </section>

      <section className="border-t border-white/10 bg-[var(--surface)]/50">
        <PageShell className="space-y-8">
          <SectionHeader
            eyebrow="Reviews"
            title="Review the experience"
            subtitle="Share your thoughts with the community."
          />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.name} className="space-y-2">
                  <div className="text-sm text-[var(--muted)]">
                    {"★".repeat(review.rating)}
                  </div>
                  <p className="text-sm">{review.comment}</p>
                  <div className="text-xs text-[var(--muted)]">
                    {review.name} · {review.date}
                  </div>
                </Card>
              ))}
            </div>
            <Card className="space-y-4">
              <div className="text-sm uppercase tracking-[0.3em] text-[var(--brand-2)]">
                Add Review
              </div>
              <div className="space-y-3">
                <Input placeholder="Your name" />
                <Input placeholder="Email" />
                <Input placeholder="Rating (1-5)" />
                <textarea
                  className="min-h-[120px] w-full rounded-2xl border border-white/10 bg-[var(--surface)]/80 px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                  placeholder="Write your review"
                />
              </div>
              <Button>Submit Review</Button>
            </Card>
          </div>
        </PageShell>
      </section>
    </div>
  );
}
