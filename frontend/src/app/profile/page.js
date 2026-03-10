import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import SectionHeader from "../../components/ui/SectionHeader";
import PageShell from "../../components/layout/PageShell";

export default function ProfilePage() {
  return (
    <PageShell className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-6">
          <SectionHeader
            eyebrow="Profile"
            title="Account details"
            subtitle="Manage your personal information and preferences."
          />
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--surface-2)]/80 text-sm text-[var(--muted)]">
              Upload
            </div>
            <div>
              <div className="text-sm font-semibold">Profile Image</div>
              <div className="text-xs text-[var(--muted)]">
                JPG or PNG up to 5MB
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="First Name" />
            <Input placeholder="Last Name" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input type="email" placeholder="Email" />
            <Input type="tel" placeholder="Phone" />
          </div>
          <Input placeholder="Address" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Role" />
            <Input placeholder="Account Status" />
          </div>
          <Button className="w-full sm:w-auto">Update Profile</Button>
        </Card>

        <Card className="space-y-6">
          <SectionHeader
            eyebrow="Security"
            title="Change password"
            subtitle="Update your password regularly to stay secure."
          />
          <div className="space-y-4">
            <Input type="password" placeholder="Current Password" />
            <Input type="password" placeholder="New Password" />
            <Input type="password" placeholder="Confirm New Password" />
          </div>
          <Button className="w-full sm:w-auto">Change Password</Button>
        </Card>
      </section>
    </PageShell>
  );
}
