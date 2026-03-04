import type { NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hizmetler", href: "/services" },
  { label: "Portfolyo", href: "/portfolio" },
  { label: "Hakkimizda", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Iletisim", href: "/contact" },
];

export const ANIMATION = {
  reveal: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },
  stagger: {
    parent: { staggerChildren: 0.1 },
    child: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
  },
  hover: {
    scale: { scale: 1.02, transition: { duration: 0.2 } },
    lift: { y: -2, transition: { duration: 0.2 } },
  },
} as const;
