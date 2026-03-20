"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import BookingSteps from "@/components/layout/BookingSteps";

export default function DetailsPage() {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const searchParams = useSearchParams();
  const eventTitle = searchParams.get("title") || "Event Title";
  const eventDate = searchParams.get("date") || "Event Date";
  const eventLocation = searchParams.get("location") || "Event Location";
  const eventImage = searchParams.get("image") || "https://images.unsplash.com/photo-1464983953574-0892a7162a1e?auto=format&fit=crop&w=400&q=80";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrevious = () => router.push(`/seat-selection?title=${encodeURIComponent(eventTitle)}&date=${encodeURIComponent(eventDate)}&location=${encodeURIComponent(eventLocation)}&image=${encodeURIComponent(eventImage)}`);

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push(`/payment?title=${encodeURIComponent(eventTitle)}&date=${encodeURIComponent(eventDate)}&location=${encodeURIComponent(eventLocation)}&image=${encodeURIComponent(eventImage)}`);
  };

  return (
    <main
      className="min-h-screen bg-[var(--background)] py-12 px-4 text-[var(--foreground)]"
      style={{ backgroundImage: "var(--glow-gradient)" }}
    >
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <section className="rounded-3xl bg-white/90 p-10 shadow-2xl">
          <BookingSteps currentStep="/details" className="mb-12" />

          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
            <header className="mb-8">
              <p className="text-sm font-medium text-blue-500">Ticket Details</p>
              <h1 className="text-2xl font-semibold text-gray-800">We just need a few more details</h1>
              <p className="text-sm text-gray-500">
                Share the attendee's information to keep the booking personalized.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">
                  Full Name
                  <input
                    type="text"
                    name="fullName"
                    value={formValues.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-base font-normal text-gray-800 shadow-inner focus:border-blue-400 focus:bg-white focus:outline-none"
                    required
                  />
                </label>
                <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">
                  Phone number
                  <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-inner focus-within:border-blue-400 focus-within:bg-white">
                    <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <span role="img" aria-label="Sri Lanka flag">
                        🇱🇰
                      </span>
                      +94
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formValues.phone}
                      onChange={handleChange}
                      placeholder="(555) 000-0000"
                      className="flex-1 bg-transparent text-base text-gray-800 outline-none"
                      required
                    />
                  </div>
                </label>
              </div>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-600">
                Email
                <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 shadow-inner focus-within:border-blue-400 focus-within:bg-white">
                  <span className="text-lg text-gray-400">✉️</span>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="email@gmail.com"
                    className="flex-1 bg-transparent text-base text-gray-800 outline-none"
                    required
                  />
                </div>
              </label>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center gap-2 rounded-2xl border border-blue-200 px-6 py-3 text-blue-600 transition hover:bg-blue-50"
                >
                  ← Previous
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-white shadow-lg transition hover:bg-blue-700 md:flex-none md:px-12"
                >
                  Next →
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
