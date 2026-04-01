"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const paymentOptions = [
  {
    id: "payhere",
    label: "Payhere",
    description: "You will be redirected to the Payhere website after submitting your order",
    badge: "PayHere",
  },
  {
    id: "bank",
    label: "Direct Bank Transfer",
    description: "Make payment directly through bank account",
  },
];

export default function PaymentPage() {
  const router = useRouter();
  const [promo, setPromo] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(paymentOptions[0].id);
  const searchParams = useSearchParams();
  const eventTitle = searchParams.get("title") || "Event Title";
  const eventDate = searchParams.get("date") || "Event Date";
  const eventLocation = searchParams.get("location") || "Event Location";
  const eventImage = searchParams.get("image") || "https://images.unsplash.com/photo-1464983953574-0892a7162a1e?auto=format&fit=crop&w=400&q=80";

  const vipCount = parseInt(searchParams.get("vipCount")) || 0;
  const standardCount = parseInt(searchParams.get("standardCount")) || 0;
  const totalTickets = vipCount + standardCount;
  const seats = searchParams.get("seats") || "";
  const vipPrice = 4000;
  const standardPrice = 1500;
  const ticketPrice = (vipCount * vipPrice) + (standardCount * standardPrice);
  const serviceFee = 100;
  const total = ticketPrice + serviceFee;

  const userName = searchParams.get("fullName") || "";
  const userPhone = searchParams.get("phone") || "";
  const userEmail = searchParams.get("email") || "";

  const handlePrevious = () => router.push(`/details?title=${encodeURIComponent(eventTitle)}&date=${encodeURIComponent(eventDate)}&location=${encodeURIComponent(eventLocation)}&image=${encodeURIComponent(eventImage)}&vipCount=${vipCount}&standardCount=${standardCount}`);
  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/confirmation?title=${encodeURIComponent(eventTitle)}&date=${encodeURIComponent(eventDate)}&location=${encodeURIComponent(eventLocation)}&image=${encodeURIComponent(eventImage)}&vipCount=${vipCount}&standardCount=${standardCount}&seats=${encodeURIComponent(seats)}&fullName=${encodeURIComponent(userName)}&phone=${encodeURIComponent(userPhone)}&email=${encodeURIComponent(userEmail)}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#0f1419] to-[#050609] relative overflow-hidden py-12 px-4">
      
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#206eaa]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Main Container - Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left - Booking Summary */}
          <div className="hidden md:block">
            <div className="sticky top-12">
              {/* Event Image */}
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-[#206eaa]/40 to-[#1a5a8f]/20 rounded-2xl blur-2xl"></div>
                <img
                  src={eventImage}
                  alt={eventTitle}
                  className="relative w-full h-72 object-cover rounded-2xl border border-white/15 shadow-2xl shadow-[#206eaa]/30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg">{eventTitle}</p>
                  <p className="text-white/60 text-xs mt-1">{eventDate}</p>
                </div>
              </div>

              {/* Booking Details Card */}
              <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 via-white/3 to-white/[0.01] backdrop-blur-lg p-6 shadow-2xl shadow-[#206eaa]/20">
                <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">Booking Summary</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">VIP Tickets</span>
                    <span className="text-white font-semibold">{vipCount}x</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Standard Tickets</span>
                    <span className="text-white font-semibold">{standardCount}x</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Seats</span>
                    <span className="text-white font-semibold text-xs">{seats}</span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Attendee</span>
                    <span className="text-white font-semibold text-xs">{userName}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Payment Card */}
          <div>
            <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 via-white/3 to-white/[0.01] backdrop-blur-lg p-8 shadow-2xl shadow-[#206eaa]/20">
              
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-1">Payment</h1>
                <p className="text-white/50 text-xs">Complete your booking</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Price Summary */}
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Tickets</span>
                    <span className="text-white font-semibold">{ticketPrice} LKR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Service Fee</span>
                    <span className="text-white font-semibold">{serviceFee} LKR</span>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-2xl font-black text-[#4a9fd8]">{total} LKR</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wide">Promo Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promo}
                      onChange={(event) => setPromo(event.target.value)}
                      placeholder="Optional"
                      className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/40 focus:border-[#206eaa] focus:bg-white/15 focus:ring-1 focus:ring-[#206eaa]/40 transition-all outline-none text-sm"
                    />
                    <button
                      type="button"
                      className="px-4 py-2.5 rounded-lg border border-white/20 text-white text-xs font-semibold hover:bg-white/10 transition-all"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-3 uppercase tracking-wide">Payment Method</label>
                  <div className="space-y-2">
                    {paymentOptions.map((option) => {
                      const checked = selectedMethod === option.id;
                      return (
                        <label
                          key={option.id}
                          className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all text-sm ${
                            checked
                              ? "border-[#206eaa] bg-[#206eaa]/10"
                              : "border-white/20 bg-white/5 hover:border-white/40"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment-method"
                            value={option.id}
                            checked={checked}
                            onChange={() => setSelectedMethod(option.id)}
                            className="mt-1 w-4 h-4 accent-[#206eaa] cursor-pointer"
                          />
                          <div className="flex-1">
                            <p className="text-white font-semibold text-xs">{option.label}</p>
                            <p className="text-white/50 text-xs mt-0.5">{option.description}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Security Message */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <span className="text-sm">🔒</span>
                  <p className="text-white/60">Bank-level security protection</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-2.5 rounded-lg border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#206eaa] to-[#1a5a8f] hover:from-[#1a5a8f] hover:to-[#0f3d5a] text-white text-sm font-semibold transition-all shadow-lg shadow-[#206eaa]/40"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
