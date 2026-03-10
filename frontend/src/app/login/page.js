import Link from "next/link";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

export default function LoginPage() {
  return (
    <PageShell className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md space-y-6">
        <SectionHeader
          eyebrow="Welcome back"
          title="Login"
          subtitle="Access your tickets, bookings, and saved events."
        />
        <div className="space-y-4">
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </div>
        <div className="flex items-center justify-between text-xs text-[var(--muted)]">
          <Link href="/forgot-password" className="hover:text-[var(--foreground)]">
            Forgot Password?
          </Link>
          <Link href="/signup" className="hover:text-[var(--foreground)]">
            Create account
          </Link>
        </div>
        <Button className="w-full">Login</Button>
      </Card>
    </PageShell>
  );
}
