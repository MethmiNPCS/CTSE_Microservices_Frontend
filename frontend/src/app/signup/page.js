"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

export default function SignupPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    imageUrl: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
          imageUrl: formData.imageUrl,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Registration failed. Please check details and try again.");
      }

      router.push("/login");
    } catch (error) {
      setErrorMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageShell className="flex min-h-[75vh] items-center justify-center">
      <Card className="w-full max-w-2xl overflow-hidden p-0">
        <div className="bg-[var(--hero-gradient)] px-6 py-8 text-center">
          <div className="text-xs uppercase tracking-[0.35em] text-white/70">
            EventWave Portal
          </div>
          <div className="mt-3 text-3xl font-semibold text-white">Sign Up</div>
          <div className="mt-2 text-sm text-white/70">
            Create your EventWave account in minutes.
          </div>
        </div>

        <div className="space-y-6 px-6 py-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <SectionHeader
              eyebrow="User access"
              title="Create user account"
              subtitle="Use your personal details to get started."
            />
            <form className="mt-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Input
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="imageUrl"
                  placeholder="Image URL"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {errorMessage ? (
                <p className="mt-4 text-xs text-red-400">{errorMessage}</p>
              ) : null}
              <Button className="mt-5 w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create User Account"}
              </Button>
            </form>
            <div className="mt-4 text-center text-xs text-[var(--muted)]">
              Already have an account?{" "}
              <Link href="/login" className="hover:text-[var(--foreground)]">
                Login
              </Link>
            </div>
          </div>

          {/* <div className="border-t border-white/10 pt-5 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Admin access
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              For administrators and supervisors only.
            </p>
            <Link href="/admin/signup" className="mt-4 inline-flex w-full">
              <Button variant="secondary" className="w-full">
                Sign Up as Admin
              </Button>
            </Link>
          </div> */}
        </div>
      </Card>
    </PageShell>
  );
}
