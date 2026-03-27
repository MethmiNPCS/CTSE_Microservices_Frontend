"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import SectionHeader from "../../components/ui/SectionHeader";
import PageShell from "../../components/layout/PageShell";

const filters = [
  "All",
  "Electro",
  "House",
  "Indie",
  "Day Parties",
  "Sunset",
  "VIP",
];

const formatDateRange = (start, end) => {
  if (!start || !end) {
    return "Date not available";
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return "Date not available";
  }

  const startLabel = startDate.toLocaleString();
  const endLabel = endDate.toLocaleString();
  return `${startLabel} - ${endLabel}`;
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

export default function EventsPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        setIsLoading(true);
        setErrorMessage("");

        const response = await fetch(`${apiBaseUrl}/events`);
        if (!response.ok) {
          throw new Error("Failed to load events.");
        }

        const payload = await response.json();
        const nextEvents = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.events)
            ? payload.events
            : [];

        if (isMounted) {
          setEvents(nextEvents);
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error.message || "Failed to load events.");
          setEvents([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  const filteredEvents = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) {
      return events;
    }

    return events.filter((event) => {
      const title = event?.title?.toLowerCase() || "";
      const location = event?.location?.toLowerCase() || "";
      const tags = Array.isArray(event?.tags)
        ? event.tags.join(" ").toLowerCase()
        : "";
      return (
        title.includes(normalizedSearch) ||
        location.includes(normalizedSearch) ||
        tags.includes(normalizedSearch)
      );
    });
  }, [events, searchTerm]);

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
            <Input
              placeholder="Search by event, city, or tag"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <Button className="shrink-0" type="button">
              Search
            </Button>
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
          {isLoading ? (
            <Card className="md:col-span-2 lg:col-span-3">
              <p className="text-sm text-[var(--muted)]">Loading events...</p>
            </Card>
          ) : null}

          {!isLoading && errorMessage ? (
            <Card className="md:col-span-2 lg:col-span-3">
              <p className="text-sm text-red-400">{errorMessage}</p>
            </Card>
          ) : null}

          {!isLoading && !errorMessage && filteredEvents.length === 0 ? (
            <Card className="md:col-span-2 lg:col-span-3">
              <p className="text-sm text-[var(--muted)]">
                No events found for your search.
              </p>
            </Card>
          ) : null}

          {!isLoading && !errorMessage
            ? filteredEvents.map((event) => (
                <Card key={event._id} className="flex h-full flex-col">
                  <div
                    className="h-40 rounded-2xl bg-[var(--surface-2)]/80 bg-cover bg-center"
                    style={{
                      backgroundImage: event?.coverImage
                        ? `url("${event.coverImage}")`
                        : "none",
                    }}
                  />
                  <div className="mt-4 flex flex-1 flex-col gap-3">
                    <div>
                      <div className="text-lg font-semibold">{event.title}</div>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {event.description}
                      </p>
                    </div>
                    <div className="text-sm text-[var(--muted)]">
                      {formatDateRange(event.start, event.end)}
                    </div>
                    <div className="text-sm text-[var(--muted)]">{event.location}</div>
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
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-semibold text-[var(--brand)]">
                        {formatLowestSeatPrice(event.seats)}
                      </span>
                      <Link href={`/events/${event._id}`}>
                        <Button size="sm">View Event</Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))
            : null}
        </PageShell>
      </section>
    </div>
  );
}
