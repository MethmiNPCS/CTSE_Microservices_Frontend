"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import SectionHeader from "../components/ui/SectionHeader";
import PageShell from "../components/layout/PageShell";

const formatEventDate = (dateValue) => {
  if (!dateValue) {
    return "Date unavailable";
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return date.toLocaleString();
};

const formatLowestSeatPrice = (seats) => {
  if (!Array.isArray(seats) || seats.length === 0) {
    return "Price unavailable";
  }

  const prices = seats
    .map((seat) => Number(seat?.price))
    .filter((price) => Number.isFinite(price));

  if (!prices.length) {
    return "Price unavailable";
  }

  return `LKR ${Math.min(...prices).toLocaleString()}+`;
};

const getEventKey = (event, fallbackIndex, suffix = "") => {
  const base = event?._id || `${event?.title || "event"}-${event?.start || fallbackIndex}`;
  return suffix ? `${base}-${suffix}` : base;
};

export default function Home() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        setIsLoadingEvents(true);
        const response = await fetch(`${apiBaseUrl}/events`);

        if (!response.ok) {
          throw new Error("Failed to load events.");
        }

        const payload = await response.json();
        const eventList = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.events)
            ? payload.events
            : [];

        if (isMounted) {
          setEvents(eventList);
        }
      } catch {
        if (isMounted) {
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingEvents(false);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  useEffect(() => {
    let isMounted = true;

    const loadReviews = async () => {
      try {
        setIsLoadingReviews(true);
        const response = await fetch(`${apiBaseUrl}/reviews`);
        if (!response.ok) {
          throw new Error("Failed to load reviews.");
        }

        const payload = await response.json();
        const reviewList = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : Array.isArray(payload?.reviews)
              ? payload.reviews
              : [];

        if (isMounted) {
          setReviews(reviewList);
        }
      } catch {
        if (isMounted) {
          setReviews([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingReviews(false);
        }
      }
    };

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  const sortedEvents = useMemo(() => {
    return [...events].sort(
      (left, right) => new Date(left.start).getTime() - new Date(right.start).getTime()
    );
  }, [events]);

  const featuredEvents = useMemo(() => sortedEvents.slice(0, 3), [sortedEvents]);
  const upcomingEvents = useMemo(() => sortedEvents.slice(3, 6), [sortedEvents]);
  const carouselReviews = useMemo(() => {
    if (reviews.length <= 3) {
      return reviews;
    }

    const items = [];
    for (let i = 0; i < 3; i += 1) {
      const nextIndex = (reviewIndex + i) % reviews.length;
      items.push(reviews[nextIndex]);
    }
    return items;
  }, [reviewIndex, reviews]);

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
              <Link href="/events">
                <Button size="lg">Explore Events</Button>
              </Link>
              <Link href="/events">
                <Button variant="secondary" size="lg">
                  View Lineup
                </Button>
              </Link>
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
            {isLoadingEvents ? (
              <Card className="md:col-span-3">
                <p className="text-sm text-[var(--muted)]">Loading featured events...</p>
              </Card>
            ) : null}
            {featuredEvents.map((event, index) => (
              <Card key={getEventKey(event, index, "featured")} className="space-y-4">
                <div
                  className="h-40 rounded-2xl bg-[var(--surface-2)]/80 bg-cover bg-center"
                  style={{
                    backgroundImage: event?.coverImage
                      ? `url("${event.coverImage}")`
                      : "none",
                  }}
                />
                <div className="space-y-2">
                  <div className="text-lg font-semibold">{event.title}</div>
                  <div className="text-sm text-[var(--muted)]">
                    {formatEventDate(event.start)} · {event.location}
                  </div>
                  <div className="text-sm font-semibold text-[var(--brand)]">
                    {formatLowestSeatPrice(event.seats)}
                  </div>
                </div>
                <Link href={`/events/${event._id}`}>
                  <Button size="sm">View Event</Button>
                </Link>
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
            {upcomingEvents.map((event, index) => (
              <Card key={getEventKey(event, index, "upcoming")} className="space-y-4">
                <div
                  className="h-36 rounded-2xl bg-[var(--surface-2)]/80 bg-cover bg-center"
                  style={{
                    backgroundImage: event?.coverImage
                      ? `url("${event.coverImage}")`
                      : "none",
                  }}
                />
                <div className="space-y-2">
                  <div className="text-lg font-semibold">{event.title}</div>
                  <p className="text-sm text-[var(--muted)]">
                    {event.description}
                  </p>
                  <div className="text-sm text-[var(--muted)]">
                    {formatEventDate(event.start)} · {event.location}
                  </div>
                  <div className="text-sm font-semibold text-[var(--brand)]">
                    {formatLowestSeatPrice(event.seats)}
                  </div>
                </div>
                <Link href={`/events/${event._id}`}>
                  <Button size="sm" variant="secondary">
                    View Details
                  </Button>
                </Link>
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
            {featuredEvents.map((event, index) => (
              <Card
                key={getEventKey(event, index, "trend")}
                className="min-w-[260px] shrink-0"
              >
                <div
                  className="h-32 rounded-2xl bg-[var(--surface-2)]/80 bg-cover bg-center"
                  style={{
                    backgroundImage: event?.coverImage
                      ? `url("${event.coverImage}")`
                      : "none",
                  }}
                />
                <div className="mt-4 text-sm font-semibold">{event.title}</div>
                <div className="text-xs text-[var(--muted)]">
                  {formatEventDate(event.start)}
                </div>
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
          {!isLoadingReviews && reviews.length > 3 ? (
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() =>
                  setReviewIndex((current) =>
                    current === 0 ? reviews.length - 1 : current - 1
                  )
                }
              >
                Prev
              </Button>
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() =>
                  setReviewIndex((current) => (current + 1) % reviews.length)
                }
              >
                Next
              </Button>
            </div>
          ) : null}
          <div className="grid gap-6 md:grid-cols-3">
            {isLoadingReviews ? (
              <Card className="md:col-span-3">
                <p className="text-sm text-[var(--muted)]">Loading reviews...</p>
              </Card>
            ) : null}
            {!isLoadingReviews && reviews.length === 0 ? (
              <Card className="md:col-span-3">
                <p className="text-sm text-[var(--muted)]">
                  No reviews available right now.
                </p>
              </Card>
            ) : null}
            {!isLoadingReviews
              ? carouselReviews.map((review, index) => (
                  <Card
                    key={review.review_id || review._id || review.id || `home-review-${index}`}
                    className="space-y-3"
                  >
                    <div className="text-sm text-[var(--muted)]">
                      {"★".repeat(Number(review.rating) || 0)}
                    </div>
                    <p className="text-sm">{review.comment}</p>
                    <div className="text-xs font-semibold">{review.user_name}</div>
                  </Card>
                ))
              : null}
          </div>
        </PageShell>
      </section>
    </div>
  );
}
