"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import SectionHeader from "../../components/ui/SectionHeader";
import PageShell from "../../components/layout/PageShell";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  const { user, isLoading, token } = useAuth();
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    imageUrl: "",
  });
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    setProfileForm({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      phone: user?.phone || "",
      address: user?.address || "",
      imageUrl: user?.imageUrl || "",
    });
  }, [user]);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setProfileError("");
    setProfileSuccess("");

    if (!token) {
      setProfileError("You must be logged in to update profile.");
      return;
    }

    setIsUpdatingProfile(true);

    try {
      const response = await fetch(`${apiBaseUrl}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: profileForm.firstName,
          lastName: profileForm.lastName,
          phone: profileForm.phone,
          address: profileForm.address,
          imageUrl: profileForm.imageUrl,
        }),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(payload?.message || "Failed to update profile.");
      }

      setProfileSuccess(payload?.message || "Profile updated successfully.");
    } catch (error) {
      setProfileError(error.message || "Failed to update profile.");
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }

    if (!token) {
      setPasswordError("You must be logged in to change the password.");
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await fetch(`${apiBaseUrl}/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.message || "Failed to change password.");
      }

      setPasswordSuccess(payload?.message || "Password changed successfully");
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      setPasswordError(error.message || "Failed to change password.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <PageShell className="space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-6">
          <SectionHeader
            eyebrow="Profile"
            title="Account details"
            subtitle="Manage your personal information and preferences."
          />
          {isLoading ? (
            <p className="text-sm text-[var(--muted)]">Loading profile...</p>
          ) : null}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--surface-2)]/80 text-sm text-[var(--muted)]">
              {profileForm.firstName?.[0] || user?.firstName?.[0] || "U"}
            </div>
            <div>
              <div className="text-sm font-semibold">Profile Image</div>
              <div className="text-xs text-[var(--muted)]">
                {profileForm.imageUrl || "No image URL available"}
              </div>
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleProfileSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                name="firstName"
                value={profileForm.firstName}
                onChange={handleProfileChange}
                placeholder="First Name"
                required
              />
              <Input
                name="lastName"
                value={profileForm.lastName}
                onChange={handleProfileChange}
                placeholder="Last Name"
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input type="email" value={user?.email || ""} placeholder="Email" readOnly />
              <Input
                type="tel"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
                placeholder="Phone"
                required
              />
            </div>
            <Input
              name="address"
              value={profileForm.address}
              onChange={handleProfileChange}
              placeholder="Address"
              required
            />
            <Input
              name="imageUrl"
              value={profileForm.imageUrl}
              onChange={handleProfileChange}
              placeholder="Image URL"
              required
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Input value={user?.role || ""} placeholder="Role" readOnly />
              <Input
                value={user?.isActive ? "Active" : "Inactive"}
                placeholder="Account Status"
                readOnly
              />
            </div>
            {profileError ? <p className="text-xs text-red-400">{profileError}</p> : null}
            {profileSuccess ? (
              <p className="text-xs text-green-400">{profileSuccess}</p>
            ) : null}
            <Button className="w-full sm:w-auto" type="submit" disabled={isUpdatingProfile}>
              {isUpdatingProfile ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Card>

        <Card className="space-y-6">
          <SectionHeader
            eyebrow="Security"
            title="Change password"
            subtitle="Update your password regularly to stay secure."
          />
          <form className="space-y-4" onSubmit={handlePasswordSubmit}>
            <Input
              type="password"
              name="oldPassword"
              placeholder="Current Password"
              value={passwordForm.oldPassword}
              onChange={handlePasswordChange}
              required
            />
            <Input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              required
            />
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
            {passwordError ? (
              <p className="text-xs text-red-400">{passwordError}</p>
            ) : null}
            {passwordSuccess ? (
              <p className="text-xs text-green-400">{passwordSuccess}</p>
            ) : null}
            <Button
              className="w-full sm:w-auto"
              type="submit"
              disabled={isChangingPassword}
            >
              {isChangingPassword ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeader
            eyebrow="Bookings"
            title="View my bookings"
            subtitle="Check ticket details, dates, and booking status."
          />
          <Link href="/bookings">
            <Button>Go to My Bookings</Button>
          </Link>
        </Card>

        <Card className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeader
            eyebrow="Reviews"
            title="View my reviews"
            subtitle="Manage your ratings and feedback submissions."
          />
          <Link href="/reviews">
            <Button variant="secondary">Go to My Reviews</Button>
          </Link>
        </Card>
      </section>
    </PageShell>
  );
}
