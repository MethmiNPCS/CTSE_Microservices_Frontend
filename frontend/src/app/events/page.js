import Link from "next/link";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import SectionHeader from "../../components/ui/SectionHeader";
import PageShell from "../../components/layout/PageShell";

const events = [
  {
    id: "neon-river",
    title: "Neon River Festival",
    description: "A riverside festival with immersive light art and global DJs.",
    startDate: "Aug 20, 2026",
    endDate: "Aug 22, 2026",
    location: "Colombo Waterfront",
    tags: ["Electro", "Live"],
    price: "$45",
  },
  {
    id: "skyline-soundscape",
    title: "Skyline Soundscape",
    description: "Rooftop stages, skyline visuals, and sunset sets.",
    startDate: "Sep 12, 2026",
    endDate: "Sep 12, 2026",
    location: "Galle Face Arena",
    tags: ["House", "Sunset"],
    price: "$60",
  },
  {
    id: "pulse-city",
    title: "Pulse of the City",
    description: "Street carnival meets night market with neon art lanes.",
    startDate: "Oct 05, 2026",
    endDate: "Oct 06, 2026",
    location: "Kandy Night Market",
    tags: ["Indie", "Carnival"],
    price: "$35",
  },
  {
    id: "lantern-drift",
    title: "Lantern Drift Party",
    description: "Glow docks, floating lanterns, and deep house grooves.",
    startDate: "Aug 28, 2026",
    endDate: "Aug 28, 2026",
    location: "Negombo Beach",
    tags: ["Beach", "Night"],
    price: "$38",
  },
  {
    id: "aurora-parade",
    title: "Aurora Street Parade",
    description: "DJ floats, confetti cannons, and sunrise brunch vibes.",
    startDate: "Sep 03, 2026",
    endDate: "Sep 03, 2026",
    location: "Colombo Fort",
    tags: ["Parade", "Day"],
    price: "$25",
  },
  {
    id: "midnight-mango",
    title: "Midnight Mango",
    description: "Tropical beats, rooftop lounges, and mango mocktails.",
    startDate: "Sep 18, 2026",
    endDate: "Sep 19, 2026",
    location: "Ella Ridge",
    tags: ["Rooftop", "Tropical"],
    price: "$52",
  },
];

const filters = [
  "All",
  "Electro",
  "House",
  "Indie",
  "Day Parties",
  "Sunset",
  "VIP",
];

export default function EventsPage() {
  return (
    <div>
      <section className="border-b border-white/10">
        <PageShell className="space-y-6">
          <SectionHeader
            eyebrow="Discover"
            title="Events listing"
            subtitle="Browse every festival drop and lock your tickets in seconds."
          />
          <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[var(--surface)]/60 p-4 md:flex-row md:items-center">
            <Input placeholder="Search by event, city, or tag" />
            <Button className="shrink-0">Search</Button>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <span
                key={filter}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-[var(--muted)]"
              >
                {filter}
              </span>
            ))}
          </div>
        </PageShell>
      </section>

      <section>
        <PageShell className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="flex h-full flex-col">
              <div className="h-40 rounded-2xl bg-[var(--surface-2)]/80" />
              <div className="mt-4 flex flex-1 flex-col gap-3">
                <div>
                  <div className="text-lg font-semibold">{event.title}</div>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {event.description}
                  </p>
                </div>
                <div className="text-sm text-[var(--muted)]">
                  {event.startDate} · {event.endDate}
                </div>
                <div className="text-sm text-[var(--muted)]">{event.location}</div>
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
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--brand)]">
                    {event.price}
                  </span>
                  <Link href={`/events/${event.id}`}>
                    <Button size="sm">View Event</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </PageShell>
      </section>
    </div>
  );
}
