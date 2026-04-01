"use client";
import { useState } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#050609] relative overflow-hidden py-12 px-4 flex items-center justify-center">
      
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#206eaa]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        
        {/* Minimal Card */}
        <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 via-white/3 to-white/[0.01] backdrop-blur-lg p-8 shadow-2xl shadow-[#206eaa]/20">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Select Tickets</h1>
            <p className="text-white/60 text-sm">{eventTitle}</p>
          </div>

          {/* Ticket Cards - Minimal */}
          <div className="space-y-4 mb-10">
            
            {/* VIP Ticket */}
            <div className="flex items-center justify-between p-6 rounded-xl border border-white/15 bg-white/5 hover:border-[#206eaa]/40 hover:bg-white/8 transition-all">
              <div className="flex items-center gap-4">
                <span className="text-3xl">👑</span>
                <div>
                  <p className="text-white font-semibold">VIP Seating</p>
                  <p className="text-white/50 text-xs">4,000 LKR</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-2 border border-white/15">
                <button 
                  onClick={() => handleVipChange(-1)}
                  className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  −
                </button>
                <span className="w-8 text-center text-white font-bold">{vipCount}</span>
                <button 
                  onClick={() => handleVipChange(1)}
                  className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Standing Ticket */}
            <div className="flex items-center justify-between p-6 rounded-xl border border-white/15 bg-white/5 hover:border-[#206eaa]/40 hover:bg-white/8 transition-all">
              <div className="flex items-center gap-4">
                <span className="text-3xl">🎟️</span>
                <div>
                  <p className="text-white font-semibold">Standing Tickets</p>
                  <p className="text-white/50 text-xs">1,500 LKR</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-2 border border-white/15">
                <button 
                  onClick={() => handleStandardChange(-1)}
                  className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  −
                </button>
                <span className="w-8 text-center text-white font-bold">{standardCount}</span>
                <button 
                  onClick={() => handleStandardChange(1)}
                  className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Total Price */}
          <div className="mb-8 py-4 border-t border-b border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-white/70">Total</span>
              <span className="text-3xl font-black text-[#4a9fd8]">
                {((vipCount * 4000) + (standardCount * 1500)).toLocaleString()} LKR
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                const eventId = searchParams.get("id") || "";
                if (eventId) {
                  router.push(`/events/${eventId}`);
                } else {
                  router.push("/");
                }
              }}
              className="px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={vipCount === 0 && standardCount === 0}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-[#206eaa] to-[#1a5a8f] hover:from-[#1a5a8f] hover:to-[#0f3d5a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold transition-all shadow-lg shadow-[#206eaa]/40"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
