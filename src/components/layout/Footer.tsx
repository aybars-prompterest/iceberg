"use client";

import { SectionWrapper } from "./SectionWrapper";
import { NavLink } from "../ui/NavLink";
import { Input } from "../ui/Input";
import { IconButton } from "../ui/IconButton";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-xl font-bold text-text-primary tracking-tight"
            >
              Iceberg
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              Next-Gen Technology &amp; Content Studio
            </p>
            <div className="flex gap-3">
              <IconButton>X</IconButton>
              <IconButton>in</IconButton>
              <IconButton>ig</IconButton>
            </div>
          </div>

          {/* Pages */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-text-primary">Pages</p>
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-text-primary">
              Let's Connect!
            </p>
            <p className="text-text-secondary text-sm">
              Request a quick free intro meeting
            </p>
            <Input
              placeholder="info@iceberg.dev"
              onSubmit={() => {}}
              submitLabel="Send"
            />
            <p className="text-text-secondary text-xs">
              By submitting you agree to our privacy policy.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-text-secondary text-xs">
            Iceberg &copy;{new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </SectionWrapper>
    </footer>
  );
}
