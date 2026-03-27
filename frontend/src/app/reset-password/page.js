"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

export default function ResetPasswordPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Failed to reset password.");
      }

      setSuccessMessage(
        payload?.message ||
          "Password reset successfully. Please login with your new password"
      );
      setTimeout(() => router.push("/login"), 1200);
    } catch (error) {
      setErrorMessage(error.message || "Failed to reset password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md space-y-6">
        <SectionHeader
          eyebrow="Secure"
          title="Reset Password"
          subtitle="Choose a new password for your account."
        />
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="otp"
            placeholder="OTP"
            value={formData.otp}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errorMessage ? (
            <p className="text-xs text-red-400">{errorMessage}</p>
          ) : null}
          {successMessage ? (
            <p className="text-xs text-green-400">{successMessage}</p>
          ) : null}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
        <div className="text-center text-xs text-[var(--muted)]">
          <Link href="/login" className="hover:text-[var(--foreground)]">
            Back to Login
          </Link>
        </div>
      </Card>
    </PageShell>
  );
}
