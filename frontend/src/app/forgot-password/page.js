import Link from "next/link";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

export default function ForgotPasswordPage() {
  return (
    <PageShell className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md space-y-6">
        <SectionHeader
          eyebrow="Reset"
          title="Forgot Password"
          subtitle="We will email you a reset link."
        />
        <Input type="email" placeholder="Email" />
        <Button className="w-full">Send Reset Link</Button>
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
