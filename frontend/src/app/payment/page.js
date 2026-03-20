"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import BookingSteps from "@/components/layout/BookingSteps";

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

  const ticketPrice = 3000;
  const serviceFee = 100;
  const total = ticketPrice + serviceFee;

  const handlePrevious = () => router.push("/details");
  const handleSubmit = (event) => {
    event.preventDefault();
    router.push("/confirmation");
  };

  return (
    <main
      className="min-h-screen bg-[var(--background)] py-12 px-4 text-[var(--foreground)]"
      style={{ backgroundImage: "var(--glow-gradient)" }}
    >
      <div className="mx-auto w-full max-w-5xl space-y-10">
        <section className="rounded-3xl bg-white/90 p-10 shadow-2xl">
          <BookingSteps currentStep="/payment" className="mb-12" />

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-6 shadow-inner">
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <input
                  type="text"
                  value={promo}
                  onChange={(event) => setPromo(event.target.value)}
                  placeholder="Promo code"
                  className="flex-1 rounded-2xl border border-blue-100 bg-white px-4 py-3 text-base text-gray-700 focus:border-blue-300 focus:outline-none"
                />
                <button
                  type="button"
                  className="rounded-2xl border border-blue-200 px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-white"
                >
                  Apply
                </button>
              </div>
              <div className="mt-6 space-y-3 rounded-2xl bg-white p-6 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Ticket Price (x2)</span>
                  <span className="font-semibold text-gray-800">{ticketPrice} LKR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Service Fee</span>
                  <span className="font-semibold text-gray-800">{serviceFee} LKR</span>
                </div>
                <div className="h-px bg-gray-100" />
                <div className="flex items-center justify-between text-base font-semibold text-gray-900">
                  <span>Total</span>
                  <span>{total} LKR</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-gray-600">Payment methods</p>
              <div className="mt-4 space-y-4">
                {paymentOptions.map((option) => {
                  const checked = selectedMethod === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-4 transition ${
                        checked ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="payment-method"
                          value={option.id}
                          checked={checked}
                          onChange={() => setSelectedMethod(option.id)}
                          className="mt-1 h-4 w-4 accent-blue-600"
                        />
                        <div>
                          <p className="text-base font-semibold text-gray-800">{option.label}</p>
                          <p className="text-sm text-gray-500">{option.description}</p>
                        </div>
                      </div>
                      {option.badge ? (
                        <span className="text-xs font-semibold text-blue-500">{option.badge}</span>
                      ) : null}
                    </label>
                  );
                })}
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                <span role="img" aria-label="lock">
                  🔒
                </span>
                We protect your payment information using encryption to provide bank-level security.
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrevious}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-blue-200 px-6 py-3 text-blue-600 transition hover:bg-blue-50 md:flex-none md:px-10"
              >
                ← Previous
              </button>
              <button
                type="submit"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-white shadow-lg transition hover:bg-blue-700 md:flex-none md:px-12"
              >
                Next →
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
