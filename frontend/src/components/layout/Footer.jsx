import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

const socials = [
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--surface)]/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-semibold">EventWave</div>
            <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
              Discover unforgettable festivals, live shows, and immersive experiences
              with tickets that move as fast as the beat.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-4 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <div>© 2026 EventWave. All rights reserved.</div>
          <div className="flex gap-3">
            {socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="rounded-full border border-white/10 px-3 py-1 transition hover:border-white/30 hover:text-[var(--foreground)]"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
