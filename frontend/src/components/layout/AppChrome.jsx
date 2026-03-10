"use client";

import { usePathname } from "next/navigation";

import AdminFooter from "./AdminFooter";
import AdminNavbar from "./AdminNavbar";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function AppChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {isAdmin ? <AdminNavbar /> : <Navbar />}
      <main className="flex-1">{children}</main>
      {isAdmin ? <AdminFooter /> : <Footer />}
    </>
  );
}
