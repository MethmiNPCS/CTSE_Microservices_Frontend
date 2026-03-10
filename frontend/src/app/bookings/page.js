import Card from "../../components/ui/Card";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

const bookings = [
  {
    customerName: "Ishara Perera",
    email: "ishara@example.com",
    phoneNumber: "+94 77 123 4567",
    eventId: "neon-river",
    eventName: "Neon River Festival",
    ticketPrice: "$45",
    bookingDate: "Aug 10, 2026",
    bookingTime: "19:30",
    status: "Confirmed",
  },
  {
    customerName: "Navin Rodrigo",
    email: "navin@example.com",
    phoneNumber: "+94 71 987 6543",
    eventId: "skyline-soundscape",
    eventName: "Skyline Soundscape",
    ticketPrice: "$60",
    bookingDate: "Aug 15, 2026",
    bookingTime: "18:00",
    status: "Confirmed",
  },
  {
    customerName: "Ayesha Malik",
    email: "ayesha@example.com",
    phoneNumber: "+94 76 555 8899",
    eventId: "midnight-mango",
    eventName: "Midnight Mango",
    ticketPrice: "$52",
    bookingDate: "Aug 18, 2026",
    bookingTime: "21:00",
    status: "Cancelled",
  },
];

export default function BookingsPage() {
  return (
    <PageShell className="space-y-8">
      <SectionHeader
        eyebrow="Bookings"
        title="My bookings"
        subtitle="Track your tickets and upcoming festival moments."
      />

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <Card key={`${booking.eventId}-${booking.email}`} className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">{booking.eventName}</div>
                <div className="text-sm text-[var(--muted)]">
                  Event ID: {booking.eventId}
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  booking.status === "Confirmed"
                    ? "bg-green-500/15 text-green-400"
                    : "bg-red-500/15 text-red-400"
                }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="grid gap-3 text-sm text-[var(--muted)] sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Customer</div>
                <div className="text-sm text-[var(--foreground)]">
                  {booking.customerName}
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
                  {booking.phoneNumber}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Ticket Price</div>
                <div className="text-sm text-[var(--foreground)]">
                  {booking.ticketPrice}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Booking Date</div>
                <div className="text-sm text-[var(--foreground)]">
                  {booking.bookingDate}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Booking Time</div>
                <div className="text-sm text-[var(--foreground)]">
                  {booking.bookingTime}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
