"use client";
import { useState } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import BookingSteps from "@/components/layout/BookingSteps";

export default function TicketSelection() {
  const [vipCount, setVipCount] = useState(3);
  const [standardCount, setStandardCount] = useState(2);
  const searchParams = useSearchParams();
  const router = useRouter();

  const eventTitle = searchParams.get("title") || "Event Title";
  const eventDate = searchParams.get("date") || "Event Date";
  const eventLocation = searchParams.get("location") || "Event Location";
  const eventImage = searchParams.get("image") || "https://images.unsplash.com/photo-1464983953574-0892a7162a1e?auto=format&fit=crop&w=400&q=80";
  const vipCountParam = searchParams.get("vipCount") || 0;
  const standardCountParam = searchParams.get("standardCount") || 0;
  const totalTickets = parseInt(vipCountParam) + parseInt(standardCountParam);

  const handleVipChange = (delta) => {
    setVipCount((prev) => Math.max(0, prev + delta));
  };

  const handleStandardChange = (delta) => {
    setStandardCount((prev) => Math.max(0, prev + delta));
  };

  const handleNext = () => {
    router.push(`/seat-selection?title=${encodeURIComponent(eventTitle)}&date=${encodeURIComponent(eventDate)}&location=${encodeURIComponent(eventLocation)}&image=${encodeURIComponent(eventImage)}&vipCount=${vipCount}&standardCount=${standardCount}`);
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center py-10 px-4 text-[var(--foreground)]"
      style={{
        backgroundColor: "var(--background)",
        backgroundImage: "var(--glow-gradient)",
      }}
    >
      <section className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
        <BookingSteps currentStep="/ticket-selection" className="mb-10" />

        {/* Event Info */}
        <div className="flex items-center gap-6 mb-8">
          <img src={eventImage} alt="event" className="w-32 h-32 rounded-xl object-cover border border-gray-200 shadow-sm" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-red-500 text-lg">📅</span>
              <span className="font-medium text-gray-700 text-base">{eventDate}</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-500 text-lg">🏷️</span>
              <span className="text-blue-700 font-semibold text-lg">{eventTitle}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500 text-lg">📍</span>
              <span className="text-gray-600 text-base">{eventLocation}</span>
            </div>
          </div>
        </div>

        {/* Ticket Selection */}
        <div className="mb-10">
          <span className="block mb-4 font-semibold text-lg text-gray-700">Select your tickets</span>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between bg-gray-100 rounded-xl p-6 shadow-sm">
              <div>
                <div className="font-bold text-xl text-gray-800">Vip Tickets</div>
                <div className="text-gray-500 text-base">(4000 LKR)</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-xl font-bold text-black hover:bg-gray-300 transition" onClick={() => handleVipChange(-1)}>-</button>
                <span className="w-10 text-center text-xl font-semibold text-black">{vipCount.toString().padStart(2, '0')}</span>
                <button className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-xl font-bold text-black hover:bg-gray-300 transition" onClick={() => handleVipChange(1)}>+</button>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-100 rounded-xl p-6 shadow-sm">
              <div>
                <div className="font-bold text-xl text-gray-800">Standing Tickets</div>
                <div className="text-gray-500 text-base">(1500 LKR)</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-xl font-bold text-black hover:bg-gray-300 transition" onClick={() => handleStandardChange(-1)}>-</button>
                <span className="w-10 text-center text-xl font-semibold text-black">{standardCount.toString().padStart(2, '0')}</span>
                <button className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-xl font-bold text-black hover:bg-gray-300 transition" onClick={() => handleStandardChange(1)}>+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          className="w-full bg-blue-600 text-white py-4 rounded-xl text-xl font-semibold hover:bg-blue-700 transition"
          onClick={handleNext}
        >
          Next →
        </button>
      </section>
    </main>
  );
}
