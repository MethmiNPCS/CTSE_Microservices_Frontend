"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blogs" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  // Helper to determine if a link is active
  const isLinkActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#206eaa]/20 bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-sm shadow-md dark:from-[#0b0b12]/95 dark:to-[#0b0b12]/90 dark:border-[#206eaa]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#206eaa]/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo & Branding */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#206eaa] to-[#1a5a8f] text-sm font-bold text-white shadow-lg shadow-[#206eaa]/30 group-hover:shadow-xl group-hover:shadow-[#206eaa]/50 group-hover:scale-110 transition-all duration-300">
            EW
          </div>
          <div className="hidden sm:block group-hover:translate-x-1 transition-transform duration-300">
            <div className="text-base font-bold text-[#171717] dark:text-[#f5f5f5]">
              EventWave
            </div>
            <div className="text-xs font-medium tracking-wider text-[#206eaa]">
              EVENTS
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  text-sm font-semibold transition-all duration-300 relative group
                  ${active 
                    ? "text-[#206eaa] font-bold" 
                    : "text-[#6b7280] hover:text-[#4a90c2]"
                  }
                `}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                <span
                  className={`
                    absolute bottom-0 left-0 h-0.5 rounded-full
                    transition-all duration-300
                    ${active 
                      ? "w-full bg-gradient-to-r from-[#206eaa] via-[#1a5a8f] to-[#206eaa] shadow-lg shadow-[#206eaa]/50" 
                      : "w-0 group-hover:w-full bg-gradient-to-r from-[#4a90c2] to-[#206eaa]"
                    }
                  `}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {isLoading ? null : isAuthenticated ? (
            <>
              <Link href="/profile">
                <Button variant="secondary" size="md">
                  👤 Profile
                </Button>
              </Link>
              <Button size="md" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="secondary" size="md">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="md">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-[#206eaa]/10 rounded-lg transition-all duration-300 hover:shadow-md active:scale-95"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <svg
            className="w-6 h-6 text-[#206eaa]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#206eaa]/20 bg-white dark:bg-[#141421] px-6 py-4 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  block py-3 px-4 text-sm font-semibold transition-all duration-300 rounded-lg
                  ${active 
                    ? "text-[#206eaa] bg-[#206eaa]/10 border-l-4 border-[#206eaa] font-bold" 
                    : "text-[#6b7280] hover:text-[#4a90c2] hover:bg-[#4a90c2]/5 hover:border-l-4 hover:border-[#4a90c2]"
                  }
                `}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="border-t border-[#206eaa]/20 pt-4 space-y-2">
            {isLoading ? null : isAuthenticated ? (
              <>
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" size="md" className="w-full">
                    👤 Profile
                  </Button>
                </Link>
                <Button size="md" onClick={handleLogout} className="w-full">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="secondary" size="md" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="md" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}