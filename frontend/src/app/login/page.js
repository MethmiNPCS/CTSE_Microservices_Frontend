"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const router = useRouter();
  const { saveToken } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setIsLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password.");
      }

      const payload = await response.json();
      const token =
        payload?.accessToken || payload?.token || payload?.data?.accessToken;

      if (!token) {
        throw new Error("Login succeeded but token was not returned.");
      }

      saveToken(token);
      router.push("/profile");
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
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
          <div className="mt-3 text-3xl font-semibold text-white">Login</div>
          <div className="mt-2 text-sm text-white/70">
            Access your tickets, bookings, and saved events.
          </div>
        </div>

        <div className="space-y-6 px-6 py-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <SectionHeader
              eyebrow="User access"
              title="Sign in"
              subtitle="Use your user credentials to continue."
            />
            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errorMessage ? (
                <p className="text-xs text-red-400">{errorMessage}</p>
              ) : null}
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "User Login"}
              </Button>
            </form>
            <div className="mt-4 flex items-center justify-between text-xs text-[var(--muted)]">
              <Link
                href="/forgot-password"
                className="hover:text-[var(--foreground)]"
              >
                Forgot Password?
              </Link>
              <Link href="/signup" className="hover:text-[var(--foreground)]">
                Create account
              </Link>
            </div>
          </div>

          {/* <div className="border-t border-white/10 pt-5 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
              Admin access
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Manage events, reviews, and platform insights.
            </p>
            <Link href="/admin/login" className="mt-4 inline-flex w-full">
              <Button variant="secondary" className="w-full">
                Login as Admin
              </Button>
            </Link>
          </div> */}
        </div>
      </Card>
    </PageShell>
  );
}
