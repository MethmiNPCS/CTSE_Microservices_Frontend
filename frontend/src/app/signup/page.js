import Link from "next/link";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

export default function SignupPage() {
  return (
    <PageShell className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-lg space-y-6">
        <SectionHeader
          eyebrow="Join the festival"
          title="Sign Up"
          subtitle="Create your EventWave account in minutes."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input placeholder="First Name" />
          <Input placeholder="Last Name" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input type="email" placeholder="Email" />
          <Input type="tel" placeholder="Phone" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Confirm Password" />
        </div>
        <Button className="w-full">Sign Up</Button>
        <div className="text-center text-xs text-[var(--muted)]">
          Already have an account?{" "}
          <Link href="/login" className="hover:text-[var(--foreground)]">
            Login
          </Link>
        </div>
      </Card>
    </PageShell>
  );
}
