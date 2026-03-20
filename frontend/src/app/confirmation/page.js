"use client";

import BookingSteps from "@/components/layout/BookingSteps";
import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const eventTitle = searchParams.get("title") || "Event Title";
  const eventDate = searchParams.get("date") || "Event Date";
  const eventLocation = searchParams.get("location") || "Event Location";
  const eventImage = searchParams.get("image") || "https://images.unsplash.com/photo-1464983953574-0892a7162a1e?auto=format&fit=crop&w=400&q=80";

  const userName = searchParams.get("fullName") || "";
  const userPhone = searchParams.get("phone") || "";
  const userEmail = searchParams.get("email") || "";

  const purchasedTickets = [
    {
      title: eventTitle,
      date: eventDate,
      time: "9:00 PM",
      zone: "A",
      row: "B",
      seat: "B12",
      location: eventLocation,
      holder: userName,
      phone: userPhone,
      email: userEmail,
      image: eventImage,
    },
    {
      title: eventTitle,
      date: eventDate,
      time: "9:00 PM",
      zone: "A",
      row: "B",
      seat: "B13",
      location: eventLocation,
      holder: userName,
      phone: userPhone,
      email: userEmail,
      image: eventImage,
    },
  ];

  const handleDownload = () => alert("Downloading ticket...");
  const handleShare = () => alert("Sharing ticket via email...");

  return (
    <main
      className="min-h-screen bg-[var(--background)] py-12 text-[var(--foreground)]"
      style={{ backgroundImage: "var(--glow-gradient)" }}
    >
      <div className="mx-auto w-full max-w-5xl space-y-10 px-4">
        <section className="rounded-3xl bg-white/90 p-10 shadow-2xl">
          <BookingSteps currentStep="/confirmation" className="mb-12" />

          <div className="rounded-3xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-4xl">
              🎉
            </div>
            <h1 className="mt-6 text-2xl font-semibold" style={{ color: '#b30000' }}>
              Thanks a lot for purchasing tickets
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              We have sent your tickets to your email. Present them at the venue entrance.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {purchasedTickets.map((ticket) => (
                <article
                  key={ticket.seat}
                  className="rounded-3xl border border-gray-100 bg-white shadow-inner"
                >
                  <img
                    src={ticket.image}
                    alt={ticket.title}
                    className="h-48 w-full rounded-t-3xl object-cover"
                  />
                  <div className="space-y-4 border-t border-dashed border-gray-200 px-6 py-6 text-left">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em]" style={{ color: '#003366' }}>Ticket</p>
                      <h2 className="text-xl font-semibold" style={{ color: '#003366' }}>{ticket.title}</h2>
                      <p className="text-sm" style={{ color: '#003366' }}>{ticket.location}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                      <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="font-semibold text-gray-800">{ticket.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Time</p>
                        <p className="font-semibold text-gray-800">{ticket.time}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Zone</p>
                        <p className="font-semibold text-gray-800">{ticket.zone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Row</p>
                        <p className="font-semibold text-gray-800">{ticket.row}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Seat</p>
                        <p className="font-semibold text-gray-800">{ticket.seat}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Name</p>
                        <p className="font-semibold text-gray-800">{ticket.holder}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <p className="font-semibold text-gray-800">{ticket.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="font-semibold text-gray-800">{ticket.email}</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-4 text-center text-sm text-gray-500">
                      SeatSnaps — Present this ticket at the entry gate.
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button
                type="button"
                onClick={() => {
                  window.history.back();
                }}
                className="flex items-center gap-2 rounded-2xl border border-blue-200 px-6 py-3 text-blue-600 transition hover:bg-blue-50"
              >
                ← Previous
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-2xl border border-blue-200 px-6 py-3 text-blue-600 transition hover:bg-blue-50"
              >
                Download Ticket
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-white shadow-lg transition hover:bg-blue-700"
              >
                Share to Mail
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="h-2 w-2 rounded-full bg-gray-200" />
              <span className="h-2 w-2 rounded-full bg-gray-200" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
