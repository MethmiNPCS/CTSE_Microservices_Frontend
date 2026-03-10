import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import SectionHeader from "../components/ui/SectionHeader";
import PageShell from "../components/layout/PageShell";

const featuredEvents = [
  {
    title: "Neon River Festival",
    date: "Aug 20, 2026",
    location: "Colombo Waterfront",
    price: "$45",
  },
  {
    title: "Skyline Soundscape",
    date: "Sep 12, 2026",
    location: "Galle Face Arena",
    price: "$60",
  },
  {
    title: "Pulse of the City",
    date: "Oct 05, 2026",
    location: "Kandy Night Market",
    price: "$35",
  },
];

const upcomingEvents = [
  {
    title: "Lantern Drift Party",
    description: "Glow-in-the-dark dance floors with immersive art zones.",
    date: "Aug 28, 2026",
    location: "Negombo Beach",
    price: "$38",
  },
  {
    title: "Aurora Street Parade",
    description: "Live DJs, confetti bursts, and sunrise brunch lanes.",
    date: "Sep 03, 2026",
    location: "Colombo Fort",
    price: "$25",
  },
  {
    title: "Midnight Mango",
    description: "Tropical beats and rooftop lounges under neon skies.",
    date: "Sep 18, 2026",
    location: "Ella Ridge",
    price: "$52",
  },
];

const testimonials = [
  {
    name: "Ishara P.",
    quote: "Best booking experience ever. The vibe was unreal.",
  },
  {
    name: "Navin R.",
    quote: "Found my favorite festival in minutes. Super smooth.",
  },
  {
    name: "Ayesha M.",
    quote: "The lineup previews and visuals are so hype.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="border-b border-white/10">
        <PageShell className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[var(--brand-2)]">
              Festival Season 2026
            </div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Discover festivals that hit different.
            </h1>
            <p className="max-w-xl text-base text-[var(--muted)] sm:text-lg">
              Book the boldest experiences across Sri Lanka. Curated lineups,
              VIP upgrades, and instant access to the most electric nights.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg">Explore Events</Button>
              <Button variant="secondary" size="lg">
                View Lineup
              </Button>
            </div>
            <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-[var(--surface)]/60 p-4 sm:flex-row sm:items-center">
              <Input placeholder="Search by event, city, or vibe" />
              <Button size="md" className="shrink-0">
                Search
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[var(--surface-2)]/80 p-6">
            <div
              className="absolute inset-0"
              style={{ backgroundImage: "var(--hero-gradient)", opacity: 0.25 }}
            />
            <div className="relative space-y-4">
              <div className="text-xs uppercase tracking-[0.35em] text-white/70">
                Trending Now
              </div>
              <div className="space-y-3">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <div className="text-sm text-white/70">Tonight</div>
                  <div className="text-lg font-semibold text-white">
                    Night Bloom Carnivale
                  </div>
                  <div className="text-sm text-white/70">VIP from $75</div>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <div className="text-sm text-white/70">This Weekend</div>
                  <div className="text-lg font-semibold text-white">
                    Solar Echo Park
                  </div>
                  <div className="text-sm text-white/70">Starts $40</div>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <div className="text-sm text-white/70">Next Week</div>
                  <div className="text-lg font-semibold text-white">
                    Citrus Sound Yard
                  </div>
                  <div className="text-sm text-white/70">Starts $32</div>
                </div>
              </div>
            </div>
          </div>
        </PageShell>
      </section>

      <section>
        <PageShell className="space-y-8">
          <SectionHeader
            eyebrow="Featured"
            title="Featured events for your crew"
            subtitle="Handpicked festivals that sell out fast."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {featuredEvents.map((event) => (
              <Card key={event.title} className="space-y-4">
                <div className="h-40 rounded-2xl bg-[var(--surface-2)]/80" />
                <div className="space-y-2">
                  <div className="text-lg font-semibold">{event.title}</div>
                  <div className="text-sm text-[var(--muted)]">
                    {event.date} · {event.location}
                  </div>
                  <div className="text-sm font-semibold text-[var(--brand)]">
                    {event.price}
                  </div>
                </div>
                <Button size="sm">View Event</Button>
              </Card>
            ))}
          </div>
        </PageShell>
      </section>

      <section className="border-y border-white/10 bg-[var(--surface)]/50">
        <PageShell className="space-y-8">
          <SectionHeader
            eyebrow="Upcoming"
            title="Upcoming events"
            subtitle="Fresh drops every week. Grab tickets before the buzz.
            "
          />
          <div className="grid gap-6 md:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Card key={event.title} className="space-y-4">
                <div className="h-36 rounded-2xl bg-[var(--surface-2)]/80" />
                <div className="space-y-2">
                  <div className="text-lg font-semibold">{event.title}</div>
                  <p className="text-sm text-[var(--muted)]">
                    {event.description}
                  </p>
                  <div className="text-sm text-[var(--muted)]">
                    {event.date} · {event.location}
                  </div>
                  <div className="text-sm font-semibold text-[var(--brand)]">
                    {event.price}
                  </div>
                </div>
                <Button size="sm" variant="secondary">
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        </PageShell>
      </section>

      <section>
        <PageShell className="space-y-8">
          <SectionHeader
            eyebrow="Trending"
            title="Trending events carousel"
            subtitle="Swipe through the hottest stages right now."
          />
          <div className="flex gap-4 overflow-x-auto pb-2">
            {featuredEvents.map((event) => (
              <Card
                key={`${event.title}-trend`}
                className="min-w-[260px] shrink-0"
              >
                <div className="h-32 rounded-2xl bg-[var(--surface-2)]/80" />
                <div className="mt-4 text-sm font-semibold">{event.title}</div>
                <div className="text-xs text-[var(--muted)]">{event.date}</div>
              </Card>
            ))}
          </div>
        </PageShell>
      </section>

      <section className="border-y border-white/10 bg-[var(--surface)]/50">
        <PageShell className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Filters"
              title="Find your perfect vibe"
              subtitle="Sort by mood, genre, or crowd energy."
            />
            <div className="flex flex-wrap gap-3">
              {[
                "Electro",
                "House",
                "Afro Beats",
                "Indie",
                "Day Parties",
                "Sunset Sessions",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Card className="space-y-4">
            <div className="text-sm uppercase tracking-[0.3em] text-[var(--brand-2)]">
              Newsletter
            </div>
            <div className="text-xl font-semibold">Get the first drop.</div>
            <p className="text-sm text-[var(--muted)]">
              Weekly lineup reveals, early bird codes, and backstage perks.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Input placeholder="Your email address" />
              <Button className="shrink-0">Subscribe</Button>
            </div>
          </Card>
        </PageShell>
      </section>

      <section>
        <PageShell className="space-y-8">
          <SectionHeader
            eyebrow="Reviews"
            title="What the crowd says"
            subtitle="Real fans. Real feedback."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((review) => (
              <Card key={review.name} className="space-y-3">
                <div className="text-sm text-[var(--muted)]">★★★★★</div>
                <p className="text-sm">{review.quote}</p>
                <div className="text-xs font-semibold">{review.name}</div>
              </Card>
            ))}
          </div>
        </PageShell>
      </section>
    </div>
  );
}
