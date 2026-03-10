import Link from "next/link";

import Button from "../ui/Button";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "My Bookings", href: "/bookings" },
  { label: "Profile", href: "/profile" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--surface)]/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--brand)] text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(255,106,0,0.7)]">
            EW
          </div>
          <div>
            <div className="text-sm font-semibold">EventWave</div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-[var(--muted)]">
              Festival
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-[var(--muted)] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[var(--foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="secondary" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="sm">Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
