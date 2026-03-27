import Link from "next/link";
import { notFound } from "next/navigation";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import SectionHeader from "../../../components/ui/SectionHeader";
import PageShell from "../../../components/layout/PageShell";
import EventReviewsSection from "../../../components/events/EventReviewsSection";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const formatDateTime = (value) => {
  if (!value) {
    return "Date unavailable";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString();
};

const formatPrice = (value) => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) {
    return "Price unavailable";
  }
  return `LKR ${amount.toLocaleString()}`;
};

const findLowestSeatPrice = (seats) => {
  if (!Array.isArray(seats) || seats.length === 0) {
    return "Price unavailable";
  }

  const prices = seats
    .map((seat) => Number(seat?.price))
    .filter((price) => Number.isFinite(price));

  if (!prices.length) {
    return "Price unavailable";
  }

  return `LKR ${Math.min(...prices).toLocaleString()}`;
};

export default async function EventDetailPage({ params }) {
  const { id } = await params;

  const eventResponse = await fetch(`${apiBaseUrl}/events/${id}`, {
    cache: "no-store",
  });

  if (!eventResponse.ok) {
    notFound();
  }

  const eventPayload = await eventResponse.json();
  const event = eventPayload?.event || eventPayload;

  if (!event) {
    notFound();
  }

  let relatedEvents = [];
  try {
    const eventsResponse = await fetch(`${apiBaseUrl}/events`, {
      cache: "no-store",
    });
    if (eventsResponse.ok) {
      const eventsPayload = await eventsResponse.json();
      const allEvents = Array.isArray(eventsPayload)
        ? eventsPayload
        : Array.isArray(eventsPayload?.events)
          ? eventsPayload.events
          : [];
      relatedEvents = allEvents.filter((item) => item?._id !== event._id).slice(0, 3);
    }
  } catch {}

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
                {formatDateTime(event.start)} · {formatDateTime(event.end)}
              </span>
              <span>· {event.location}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(event.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={`/ticket-selection?title=${encodeURIComponent(event.title)}&date=${encodeURIComponent(formatDateTime(event.start))}&location=${encodeURIComponent(event.location)}&image=${encodeURIComponent(event.galleryImages?.[0] || event.coverImage || "")}`}
              >
                <Button variant="primary" size="lg">
                  Book Tickets
                </Button>
              </Link>
              <Button variant="secondary" size="lg">
                View Seat Map
              </Button>
            </div>
          </div>
          <div
            className="relative min-h-[280px] overflow-hidden rounded-[32px] border border-white/10 bg-[var(--surface-2)]/80 bg-cover bg-center p-6"
            style={{
              backgroundImage: event?.coverImage
                ? `url("${event.coverImage}")`
                : undefined,
            }}
          >
            <div
              className="absolute inset-0 bg-[var(--surface-2)]/40"
              style={{ backgroundImage: "var(--hero-gradient)", opacity: 0.55 }}
            />
            <div className="relative flex h-full min-h-[220px] items-end">
              <div className="space-y-2 drop-shadow-md">
                <div className="text-xs uppercase tracking-[0.35em] text-white/90">
                  From
                </div>
                <div className="text-3xl font-semibold text-white">
                  {findLowestSeatPrice(event.seats)}
                </div>
                <div className="text-sm text-white/85">
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
            {(event.galleryImages || []).map((imageUrl, index) => (
              <Card key={`${imageUrl}-${index}`} className="overflow-hidden p-0">
                <img
                  src={imageUrl}
                  alt={`${event.title} gallery ${index + 1}`}
                  className="h-48 w-full object-cover"
                />
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
                      <td className="px-4 py-3">{formatPrice(seat.price)}</td>
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
              <Card key={item._id} className="space-y-3">
                <div
                  className="h-32 rounded-2xl bg-[var(--surface-2)]/80 bg-cover bg-center"
                  style={{
                    backgroundImage: item?.coverImage
                      ? `url("${item.coverImage}")`
                      : "none",
                  }}
                />
                <div className="text-base font-semibold">{item.title}</div>
                <div className="text-sm text-[var(--muted)]">
                  {formatDateTime(item.start)} · {item.location}
                </div>
                <Link href={`/events/${item._id}`}>
                  <Button size="sm">View Event</Button>
                </Link>
              </Card>
            ))}
          </div>
        </PageShell>
      </section>

      <EventReviewsSection eventId={id} eventName={event.title} />
    </div>
  );
}
