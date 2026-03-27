"use client";

import { useEffect, useState } from "react";

import Card from "../../components/ui/Card";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

export default function BookingsPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadBookings = async () => {
      const token = window.localStorage.getItem("authToken");
      if (!token) {
        if (isMounted) {
          setBookings([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        setIsLoading(true);
        setErrorMessage("");
        const response = await fetch(`${apiBaseUrl}/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings.");
        }

        const payload = await response.json();
        const items = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.bookings)
            ? payload.bookings
            : [];
        if (isMounted) {
          setBookings(items);
        }
      } catch (error) {
        if (isMounted) {
          setBookings([]);
          setErrorMessage(error.message || "Failed to fetch bookings.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadBookings();

    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  return (
    <PageShell className="space-y-8">
      <SectionHeader
        eyebrow="Bookings"
        title="My bookings"
        subtitle="Track your tickets and upcoming festival moments."
      />

      <div className="grid gap-6">
        {isLoading ? (
          <Card>
            <p className="text-sm text-[var(--muted)]">Loading bookings...</p>
          </Card>
        ) : null}
        {!isLoading && errorMessage ? (
          <Card>
            <p className="text-sm text-red-400">{errorMessage}</p>
          </Card>
        ) : null}
        {!isLoading && !errorMessage && bookings.length === 0 ? (
          <Card>
            <p className="text-sm text-[var(--muted)]">No bookings found.</p>
          </Card>
        ) : null}
        {bookings.map((booking) => (
          <Card
            key={booking.booking_id || `${booking.event_id}-${booking.email}`}
            className="space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{booking.event_name}</div>
                <div className="text-sm text-[var(--muted)]">
                  Event ID: {booking.event_id}
                </div>
              </div>
              <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-semibold text-green-400">
                Confirmed
              </span>
            </div>

            <div className="grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Customer</div>
                <div className="text-sm text-[var(--foreground)]">
                  {booking.customer_name}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Email</div>
                <div className="text-sm text-[var(--foreground)]">
                  {booking.email}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Phone</div>
                <div className="text-sm text-[var(--foreground)]">
                  {booking.phone_number}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Ticket Price</div>
                <div className="text-sm text-[var(--foreground)]">
                  LKR {Number(booking.ticket_price || 0).toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Booking Date</div>
                <div className="text-sm text-[var(--foreground)]">
                  {booking.booking_date
                    ? new Date(booking.booking_date).toLocaleDateString()
                    : "-"}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Booking Time</div>
                <div className="text-sm text-[var(--foreground)]">
                  {booking.booking_time || "-"}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
