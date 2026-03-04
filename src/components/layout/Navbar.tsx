"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "../ui/NavLink";
import { MobileMenu } from "./MobileMenu";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-bg-primary/80 backdrop-blur-md"
      >
        <div className="mx-auto max-w-300 px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-text-primary tracking-tight"
          >
            Iceberg
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="w-5 h-0.5 bg-text-primary transition-transform" />
            <span className="w-5 h-0.5 bg-text-primary transition-opacity" />
            <span className="w-5 h-0.5 bg-text-primary transition-transform" />
          </button>
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
