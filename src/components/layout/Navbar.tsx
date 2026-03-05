"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "../ui/NavLink";
import { MobileMenu } from "./MobileMenu";
import { HamburgerButton } from "./HamburgerButton";
import { NAV_ITEMS } from "@/lib/constants";
import type { NavItem } from "@/lib/types";
import Link from "next/link";

interface NavbarProps {
  navItems?: NavItem[];
}

export function Navbar({ navItems = NAV_ITEMS }: NavbarProps) {
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
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <HamburgerButton onClick={() => setMobileOpen(!mobileOpen)} />
        </div>
      </motion.header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
