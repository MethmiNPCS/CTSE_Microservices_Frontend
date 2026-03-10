import Link from "next/link";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import PageShell from "../../components/layout/PageShell";
import SectionHeader from "../../components/ui/SectionHeader";

export default function ResetPasswordPage() {
  return (
    <PageShell className="flex min-h-[70vh] items-center justify-center">
      <Card className="w-full max-w-md space-y-6">
        <SectionHeader
          eyebrow="Secure"
          title="Reset Password"
          subtitle="Choose a new password for your account."
        />
        <div className="space-y-4">
          <Input type="password" placeholder="New Password" />
          <Input type="password" placeholder="Confirm New Password" />
        </div>
        <Button className="w-full">Reset Password</Button>
        <div className="text-center text-xs text-[var(--muted)]">
          <Link href="/login" className="hover:text-[var(--foreground)]">
            Back to Login
          </Link>
        </div>
      </Card>
    </PageShell>
  );
}
