"use client";

import { useState } from "react";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Input from "../../../components/ui/Input";
import SectionHeader from "../../../components/ui/SectionHeader";
import PageShell from "../../../components/layout/PageShell";

const initialBookings = [
  {
    id: "bk-1001",
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
    id: "bk-1002",
    customerName: "Navin Rodrigo",
    email: "navin@example.com",
    phoneNumber: "+94 71 987 6543",
    eventId: "skyline-soundscape",
    eventName: "Skyline Soundscape",
    ticketPrice: "$60",
    bookingDate: "Aug 15, 2026",
    bookingTime: "18:00",
    status: "Pending",
  },
  {
    id: "bk-1003",
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

const emptyBooking = {
  id: "",
  customerName: "",
  email: "",
  phoneNumber: "",
  eventId: "",
  eventName: "",
  ticketPrice: "",
  bookingDate: "",
  bookingTime: "",
  status: "Pending",
};

const cardClassName =
  "border-black/10 bg-white/85 shadow-[0_22px_45px_-30px_rgba(15,23,42,0.35)]";
const fieldClassName =
  "border-black/15 bg-white text-slate-900 placeholder:text-slate-500 shadow-sm";
const selectClassName =
  "w-full rounded-2xl border border-black/15 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--ring)]";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [form, setForm] = useState(emptyBooking);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      id: form.id.trim() || `bk-${Date.now()}`,
      customerName: form.customerName.trim(),
      email: form.email.trim(),
      phoneNumber: form.phoneNumber.trim(),
      eventId: form.eventId.trim(),
      eventName: form.eventName.trim(),
      ticketPrice: form.ticketPrice.trim(),
      bookingDate: form.bookingDate.trim(),
      bookingTime: form.bookingTime.trim(),
    };

    if (editingId) {
      setBookings((current) =>
        current.map((item) => (item.id === editingId ? payload : item))
      );
    } else {
      setBookings((current) => [payload, ...current]);
    }

    setForm(emptyBooking);
    setEditingId(null);
  };

  const startEdit = (booking) => {
    setEditingId(booking.id);
    setForm({ ...booking });
  };

  const removeBooking = (bookingId) => {
    setBookings((current) => current.filter((item) => item.id !== bookingId));
    if (editingId === bookingId) {
      setEditingId(null);
      setForm(emptyBooking);
    }
  };

  const updateStatus = (bookingId, nextStatus) => {
    setBookings((current) =>
      current.map((item) =>
        item.id === bookingId ? { ...item, status: nextStatus } : item
      )
    );
  };

  const resetForm = () => {
    setForm(emptyBooking);
    setEditingId(null);
  };

  return (
    <PageShell className="space-y-10">
      <SectionHeader
        eyebrow="Admin"
        title="Booking portal"
        subtitle="Review, confirm, and manage ticket bookings."
      />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <Card className={`text-sm text-[var(--muted)] ${cardClassName}`}>
              No bookings yet. Add a booking to get started.
            </Card>
          ) : null}

          {bookings.map((booking) => (
            <Card key={booking.id} className={`space-y-4 ${cardClassName}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-slate-900">
                    {booking.eventName}
                  </div>
                  <div className="text-xs text-slate-500">
                    Booking ID: {booking.id}
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    booking.status === "Confirmed"
                      ? "bg-green-500/15 text-green-600"
                      : booking.status === "Cancelled"
                      ? "bg-red-500/15 text-red-500"
                      : "bg-amber-500/15 text-amber-600"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="grid gap-3 text-sm text-slate-500 sm:grid-cols-2">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em]">Customer</div>
                  <div className="text-sm text-slate-900">
                    {booking.customerName}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em]">Email</div>
                  <div className="text-sm text-slate-900">{booking.email}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em]">Phone</div>
                  <div className="text-sm text-slate-900">
                    {booking.phoneNumber}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em]">Event ID</div>
                  <div className="text-sm text-slate-900">{booking.eventId}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em]">Schedule</div>
                  <div className="text-sm text-slate-900">
                    {booking.bookingDate} · {booking.bookingTime}
                  </div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em]">Price</div>
                  <div className="text-sm text-slate-900">
                    {booking.ticketPrice}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="text-slate-900">Status:</span>
                  <span>{booking.status}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => startEdit(booking)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => updateStatus(booking.id, "Confirmed")}
                  >
                    Confirm
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => updateStatus(booking.id, "Cancelled")}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => removeBooking(booking.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className={`space-y-4 ${cardClassName}`}>
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-2)]">
              {editingId ? "Edit booking" : "New booking"}
            </div>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <Input
                name="customerName"
                value={form.customerName}
                onChange={handleChange}
                placeholder="Customer name"
                className={fieldClassName}
                required
              />
              <Input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className={fieldClassName}
                required
              />
              <Input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="Phone number"
                className={fieldClassName}
                required
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  name="eventName"
                  value={form.eventName}
                  onChange={handleChange}
                  placeholder="Event name"
                  className={fieldClassName}
                  required
                />
                <Input
                  name="eventId"
                  value={form.eventId}
                  onChange={handleChange}
                  placeholder="Event ID"
                  className={fieldClassName}
                  required
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  name="bookingDate"
                  value={form.bookingDate}
                  onChange={handleChange}
                  placeholder="Booking date"
                  className={fieldClassName}
                  required
                />
                <Input
                  name="bookingTime"
                  value={form.bookingTime}
                  onChange={handleChange}
                  placeholder="Booking time"
                  className={fieldClassName}
                  required
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  name="ticketPrice"
                  value={form.ticketPrice}
                  onChange={handleChange}
                  placeholder="Ticket price"
                  className={fieldClassName}
                  required
                />
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className={selectClassName}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <Input
                name="id"
                value={form.id}
                onChange={handleChange}
                placeholder="Booking ID"
                className={fieldClassName}
              />
              <div className="flex flex-wrap items-center gap-2">
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Reset
                </Button>
                <Button type="submit">
                  {editingId ? "Update Booking" : "Create Booking"}
                </Button>
              </div>
            </form>
          </Card>

          <Card className={`space-y-3 ${cardClassName}`}>
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--brand-2)]">
              Booking stats
            </div>
            <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Total</div>
                <div className="text-base text-slate-900">
                  {bookings.length}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Pending</div>
                <div className="text-base text-slate-900">
                  {bookings.filter((item) => item.status === "Pending").length}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Confirmed</div>
                <div className="text-base text-slate-900">
                  {bookings.filter((item) => item.status === "Confirmed").length}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em]">Cancelled</div>
                <div className="text-base text-slate-900">
                  {bookings.filter((item) => item.status === "Cancelled").length}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
