"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const seatRows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
const seatsPerRow = 11;
const reservedSeats = new Set(["D6", "D7", "D8", "E5", "F5", "G5"]);
const initialSelectedSeats = ["H7", "H8"];

export default function SeatSelectionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const seatsParam = searchParams.get("seats") || "";
  const [selectedSeats, setSelectedSeats] = useState(() => {
    if (seatsParam) {
      return new Set(seatsParam.split(",").filter(Boolean));
    }
    return new Set(initialSelectedSeats);
  });

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

    let seatClasses = "w-8 h-8 rounded text-xs font-bold transition-all focus-visible:outline-none";

    if (isReserved) {
      seatClasses += " bg-amber-500/60 text-white border border-amber-500/40 cursor-not-allowed";
    } else if (isSelected) {
      seatClasses += " bg-[#4a9fd8] text-white border border-[#206eaa] shadow-lg shadow-[#206eaa]/40";
    } else {
      seatClasses += " bg-white/10 text-white/60 border border-white/20 hover:border-white/40 hover:bg-white/15";
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
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#050609] relative overflow-hidden py-12 px-4 flex items-center justify-center">
      
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#206eaa]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        
        {/* Main Card */}
        <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 via-white/3 to-white/[0.01] backdrop-blur-lg p-8 shadow-2xl shadow-[#206eaa]/20">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-1">Select Seats</h1>
            <p className="text-white/50 text-sm">{eventTitle}</p>
          </div>

          {/* Event Details */}
          <div className="flex gap-3 text-xs text-white/60 mb-8 pb-6 border-b border-white/10 flex-wrap justify-center">
            <span>📅 {eventDate}</span>
            <span>•</span>
            <span>⏰ {eventTime}</span>
            <span>•</span>
            <span>📍 {eventLocation}</span>
          </div>

          {/* Seat Grid */}
          <div className="mb-8">
            {/* Legend */}
            <div className="flex items-center justify-center gap-6 text-xs mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-white/20 border border-white/40"></span>
                <span className="text-white/60">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-500/60"></span>
                <span className="text-white/60">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#4a9fd8]"></span>
                <span className="text-white/60">Selected</span>
              </div>
            </div>

            {/* Theatre Layout */}
            <div className="p-6 rounded-lg bg-white/5 border border-white/10 flex justify-center">
              <div className="space-y-2">
                {seatRows.map((row) => (
                  <div key={row} className="flex items-center gap-3 justify-center">
                    <span className="w-6 text-center text-xs font-bold text-white/40">{row}</span>
                    <div className="flex gap-2">
                      {Array.from({ length: seatsPerRow }, (_, seatIndex) => renderSeat(row, seatIndex))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Seats */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-[#206eaa]/20 to-[#1a5a8f]/10 border border-[#206eaa]/20 mb-8">
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <span className="text-white/70 text-sm">Seats: {selectedSeats.size}/{maxSeats}</span>
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.from(selectedSeats)
                  .sort()
                  .map((seat) => (
                    <span key={seat} className="px-2 py-1 rounded text-xs font-semibold bg-[#206eaa]/40 text-[#4a9fd8] border border-[#206eaa]/30">
                      {seat}
                    </span>
                  ))}
                {selectedSeats.size === 0 && <span className="text-white/50 text-xs">No seats selected</span>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handlePrevious}
              className="px-6 py-3 rounded-lg border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-all"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={selectedSeats.size === 0}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#206eaa] to-[#1a5a8f] hover:from-[#1a5a8f] hover:to-[#0f3d5a] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all shadow-lg shadow-[#206eaa]/40"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
