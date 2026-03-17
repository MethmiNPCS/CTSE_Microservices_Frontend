
"use client";
import { useState } from "react";

import { useSearchParams } from "next/navigation";

export default function TicketSelection() {
  const [vipCount, setVipCount] = useState(3);
  const [standardCount, setStandardCount] = useState(2);
  const searchParams = useSearchParams();

  const eventTitle = searchParams.get("title") || "Event Title";
  const eventDate = searchParams.get("date") || "Event Date";
  const eventLocation = searchParams.get("location") || "Event Location";
  const eventImage = searchParams.get("image") || "https://images.unsplash.com/photo-1464983953574-0892a7162a1e?auto=format&fit=crop&w=400&q=80";

  const handleVipChange = (delta) => {
    setVipCount((prev) => Math.max(0, prev + delta));
  };

  const handleStandardChange = (delta) => {
    setStandardCount((prev) => Math.max(0, prev + delta));
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center py-10">
      <section className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
        {/* Stepper Navigation Bar */}
        <nav className="flex justify-between items-center mb-10" aria-label="Booking Steps">
          <a href="/ticket-selection" className="flex flex-col items-center group">
            <div className="bg-blue-100 p-2 rounded-full mb-1 group-hover:bg-blue-200 transition">
              <span className="text-blue-600 text-xl">🎟️</span>
            </div>
            <span className="text-blue-600 font-semibold text-xs group-hover:underline">Select Tickets</span>
          </a>
          <div className="w-8 h-1 bg-blue-200 mx-2 rounded" />
          <a href="/seat-selection" className="flex flex-col items-center group">
            <div className="bg-gray-100 p-2 rounded-full mb-1 group-hover:bg-gray-200 transition">
              <span className="text-gray-500 text-xl">🪑</span>
            </div>
            <span className="text-gray-500 font-semibold text-xs group-hover:underline">Seat Selection</span>
          </a>
          <div className="w-8 h-1 bg-gray-200 mx-2 rounded" />
          <a href="/details" className="flex flex-col items-center group">
            <div className="bg-gray-100 p-2 rounded-full mb-1 group-hover:bg-gray-200 transition">
              <span className="text-gray-500 text-xl">📝</span>
            </div>
            <span className="text-gray-500 font-semibold text-xs group-hover:underline">Details</span>
          </a>
          <div className="w-8 h-1 bg-gray-200 mx-2 rounded" />
          <a href="/payment" className="flex flex-col items-center group">
            <div className="bg-gray-100 p-2 rounded-full mb-1 group-hover:bg-gray-200 transition">
              <span className="text-gray-500 text-xl">💳</span>
            </div>
            <span className="text-gray-500 font-semibold text-xs group-hover:underline">Payment</span>
          </a>
          <div className="w-8 h-1 bg-gray-200 mx-2 rounded" />
          <a href="/confirmation" className="flex flex-col items-center group">
            <div className="bg-gray-100 p-2 rounded-full mb-1 group-hover:bg-gray-200 transition">
              <span className="text-gray-500 text-xl">💙</span>
            </div>
            <span className="text-gray-500 font-semibold text-xs group-hover:underline">Confirmation</span>
          </a>
        </nav>

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
                <button className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-xl font-bold hover:bg-gray-300 transition" onClick={() => handleVipChange(-1)}>-</button>
                <span className="w-10 text-center text-xl font-semibold">{vipCount.toString().padStart(2, '0')}</span>
                <button className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-xl font-bold hover:bg-gray-300 transition" onClick={() => handleVipChange(1)}>+</button>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-100 rounded-xl p-6 shadow-sm">
              <div>
                <div className="font-bold text-xl text-gray-800">Standing Tickets</div>
                <div className="text-gray-500 text-base">(1500 LKR)</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-xl font-bold hover:bg-gray-300 transition" onClick={() => handleStandardChange(-1)}>-</button>
                <span className="w-10 text-center text-xl font-semibold">{standardCount.toString().padStart(2, '0')}</span>
                <button className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full text-xl font-bold hover:bg-gray-300 transition" onClick={() => handleStandardChange(1)}>+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button className="w-full bg-blue-600 text-white py-4 rounded-xl text-xl font-semibold hover:bg-blue-700 transition">Next →</button>
      </section>
    </main>
  );
}
