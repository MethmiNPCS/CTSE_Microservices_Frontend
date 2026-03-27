"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

export default function ForgotPasswordPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/auth/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Failed to send reset instructions.");
      }

      setSuccessMessage(
        payload?.message ||
          "If an account with this email exists, you will receive an email with instructions to reset your password."
      );
      setTimeout(() => {
        router.push("/reset-password");
      }, 700);
    } catch (error) {
      setErrorMessage(error.message || "Failed to send reset instructions.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md space-y-6">
        <SectionHeader
          eyebrow="Reset"
          title="Forgot Password"
          subtitle="We will email you a reset link."
        />
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          {errorMessage ? (
            <p className="text-xs text-red-400">{errorMessage}</p>
          ) : null}
          {successMessage ? (
            <p className="text-xs text-green-400">{successMessage}</p>
          ) : null}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>
        <div className="text-center text-xs text-[var(--muted)]">
          Remembered your password?{" "}
          <Link href="/login" className="hover:text-[var(--foreground)]">
            Back to Login
          </Link>
        </div>
      </Card>
    </PageShell>
  );
}
