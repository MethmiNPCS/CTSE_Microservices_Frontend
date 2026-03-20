"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import BookingSteps from "@/components/layout/BookingSteps";

const seatRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const seatsPerRow = 11;
const reservedSeats = new Set(["D6", "D7", "D8", "E5", "F5", "G5"]);
const initialSelectedSeats = ["H7", "H8"];

export default function SeatSelectionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState(() => new Set(initialSelectedSeats));

  const eventTitle = searchParams.get("title") || "March Gala Night";
  const eventDate = searchParams.get("date") || "March 15, 2025 - March 16, 2025";
  const eventTime = searchParams.get("time") || "9:00 AM - 5:00 PM";
  const eventLocation = searchParams.get("location") || "Cultural Hall Jaffna";
  const eventImage =
    searchParams.get("image") ||
    "https://images.unsplash.com/photo-1470223991230-32aaa7d6c9b7?auto=format&fit=crop&w=400&q=80";

  const vipCount = parseInt(searchParams.get("vipCount")) || 0;
  const standardCount = parseInt(searchParams.get("standardCount")) || 0;
  const totalTickets = vipCount + standardCount;

  const toggleSeat = (seatId) => {
    if (reservedSeats.has(seatId)) {
      return;
    }
    if (!selectedSeats.has(seatId) && selectedSeats.size >= maxSeats) {
      return;
    }

    setSelectedSeats((prev) => {
      const updated = new Set(prev);
      if (updated.has(seatId)) {
        updated.delete(seatId);
      } else {
        updated.add(seatId);
      }
      return updated;
    });
  };

  const handlePrevious = () => {
    router.push(`/ticket-selection?title=${encodeURIComponent(eventTitle)}&date=${encodeURIComponent(eventDate)}&location=${encodeURIComponent(eventLocation)}&image=${encodeURIComponent(eventImage)}&vipCount=${vipCount}&standardCount=${standardCount}`);
  };

  const handleNext = () => {
    const seats = Array.from(selectedSeats).join(",");
    router.push(`/details?title=${encodeURIComponent(eventTitle)}&date=${encodeURIComponent(eventDate)}&location=${encodeURIComponent(eventLocation)}&image=${encodeURIComponent(eventImage)}&vipCount=${vipCount}&standardCount=${standardCount}&seats=${encodeURIComponent(seats)}`);
  };

  const maxSeats = totalTickets;

  const renderSeat = (row, index) => {
    const seatNumber = `${row}${index + 1}`;
    const isReserved = reservedSeats.has(seatNumber);
    const isSelected = selectedSeats.has(seatNumber);

    let seatClasses = "w-10 h-10 rounded-lg border text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400";

    if (isReserved) {
      seatClasses += " bg-amber-100 text-amber-600 border-amber-200 cursor-not-allowed";
    } else if (isSelected) {
      seatClasses += " bg-blue-600 text-white border-blue-600";
    } else {
      seatClasses += " bg-gray-50 text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-600";
    }

    return (
      <button
        key={seatNumber}
        type="button"
        className={seatClasses}
        onClick={() => toggleSeat(seatNumber)}
        aria-pressed={isSelected}
        aria-label={`Seat ${seatNumber}${isReserved ? " reserved" : ""}`}
        disabled={isReserved}
      >
        {seatNumber}
      </button>
    );
  };

  return (
    <main
      className="min-h-screen bg-background py-12 text-foreground"
      style={{ backgroundImage: "var(--glow-gradient)" }}
    >
      <div className="mx-auto w-full max-w-5xl space-y-10 px-4">
        <section className="w-full rounded-3xl bg-white/90 p-10 shadow-2xl">
          <BookingSteps currentStep="/seat-selection" className="mb-10" />

          <div className="mb-8 flex flex-wrap gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <img
              src={eventImage}
              alt="event"
              className="h-32 w-48 rounded-2xl object-cover shadow-md"
            />
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">📅</span>
                <span className="font-medium">{eventDate}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-xl">⏰</span>
                <span>{eventTime}</span>
              </div>
              <div className="flex items-center gap-3 text-blue-700">
                <span className="text-xl">🏷️</span>
                <span className="text-lg font-semibold">{eventTitle}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <span className="text-xl">📍</span>
                <span>{eventLocation}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Select your Seats</p>
                <h2 className="text-2xl font-semibold text-gray-800">VIP Tickets</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="h-2 w-2 rounded-full bg-green-400" /> Available
                <span className="h-2 w-2 rounded-full bg-amber-400" /> Reserved
                <span className="h-2 w-2 rounded-full bg-blue-500" /> Selected
              </div>
            </div>

            <div className="mt-8 mx-auto w-full max-w-3xl space-y-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-6">
              {seatRows.map((row) => (
                <div key={row} className="flex items-center justify-center gap-4">
                  <span className="w-6 text-center text-sm font-medium text-gray-400">{row}</span>
                  <div className="flex flex-wrap justify-center gap-2">
                    {Array.from({ length: seatsPerRow }, (_, seatIndex) => renderSeat(row, seatIndex))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <strong className="text-gray-800">Selected:</strong>
                {Array.from(selectedSeats)
                  .sort()
                  .map((seat) => (
                    <span key={seat} className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                      {seat}
                    </span>
                  ))}
                {selectedSeats.size === 0 ? <span>No seats selected yet</span> : null}
              </div>
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">Change section ▼</button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">Standing Tickets</p>
                  <p className="text-base font-semibold text-gray-800">(Available)</p>
                </div>
                <span className="text-xl text-gray-400">⌄</span>
              </div>
            </div>
            <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-400">Legend</p>
                  <p className="text-base font-semibold text-gray-800">Seat status</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-white border border-gray-300" /> Available</span>
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-amber-400" /> Reserved</span>
                  <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-blue-500" /> Selected</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button
                type="button"
                onClick={handlePrevious}
                className="flex items-center gap-2 rounded-2xl border border-blue-200 px-6 py-3 text-blue-600 transition hover:bg-blue-50"
              >
                ← Previous
              </button>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 rounded-2xl bg-blue-600 px-10 py-3 text-white shadow-lg transition hover:bg-blue-700"
            >
              Next →
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
