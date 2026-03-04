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
              Yeni Nesil Teknoloji &amp; İçerik Stüdyosu
            </p>
            <div className="flex gap-3">
              <IconButton>X</IconButton>
              <IconButton>in</IconButton>
              <IconButton>ig</IconButton>
            </div>
          </div>

          {/* Pages */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-text-primary">Sayfalar</p>
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
              Iletisime Gecelim!
            </p>
            <p className="text-text-secondary text-sm">
              Hizli bir ucretsiz tanisma toplantisi talep edin
            </p>
            <Input
              placeholder="info@iceberg.dev"
              onSubmit={() => {}}
              submitLabel="Gonder"
            />
            <p className="text-text-secondary text-xs">
              Giris yaparak gizlilik sozlesmemizi kabul etmis sayilirsiniz.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border text-center">
          <p className="text-text-secondary text-xs">
            Iceberg &copy;{new Date().getFullYear()} Tum haklari saklidir
          </p>
        </div>
      </SectionWrapper>
    </footer>
  );
}
