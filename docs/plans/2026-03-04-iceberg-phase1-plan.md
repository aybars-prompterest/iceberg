# Iceberg Phase 1: Storybook Component Development - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build all Iceberg website components in isolation using Storybook, ready for mentor review before site assembly.

**Architecture:** Component-first development with Storybook 8. Atomic UI components first, then animation wrappers, layout components, and finally section components that compose them all. Dark theme default. Each component gets a `.tsx` file and a `.stories.tsx` file.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, Framer Motion, Storybook 8, TypeScript, Plus Jakarta Sans + Inter fonts

---

## Task 1: Project Setup

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- Create: `.storybook/main.ts`, `.storybook/preview.ts`
- Create: `src/styles/globals.css`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`

**Step 1: Initialize Next.js project**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Expected: Project scaffolded with Next.js 15, Tailwind CSS, TypeScript.

**Step 2: Install dependencies**

Run:
```bash
npm install framer-motion
npm install -D @storybook/react @storybook/nextjs @storybook/addon-essentials @storybook/addon-links @storybook/blocks storybook
```

**Step 3: Initialize Storybook**

Run:
```bash
npx storybook@latest init --builder @storybook/builder-webpack5
```

If Storybook init already handled by the install above, skip. Otherwise, follow prompts.

**Step 4: Configure Storybook for dark theme**

File: `.storybook/preview.ts`
```ts
import type { Preview } from "@storybook/react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#09090b" },
        { name: "surface", value: "#18181b" },
        { name: "light", value: "#fafafa" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

**Step 5: Add Google Fonts to globals.css**

File: `src/styles/globals.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

@import "tailwindcss";

@theme {
  --color-bg-primary: #09090b;
  --color-bg-surface: #18181b;
  --color-border: #27272a;
  --color-text-primary: #fafafa;
  --color-text-secondary: #a1a1aa;
  --color-accent: #40c5ff;
  --color-accent-hover: #33b0e6;

  --font-heading: 'Plus Jakarta Sans', sans-serif;
  --font-body: 'Inter', sans-serif;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}
```

**Step 6: Verify Storybook runs**

Run:
```bash
npm run storybook
```

Expected: Storybook opens at `localhost:6006` with dark background.

**Step 7: Verify Next.js dev server runs**

Run:
```bash
npm run dev
```

Expected: Next.js dev server at `localhost:3000`.

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: initialize project with Next.js, Tailwind, Storybook, Framer Motion"
```

---

## Task 2: Design Tokens & Utility Types

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/constants.ts`
- Create: `src/lib/cn.ts`

**Step 1: Create cn utility (classname merger)**

File: `src/lib/cn.ts`
```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Run: `npm install clsx tailwind-merge`

**Step 2: Create shared types**

File: `src/lib/types.ts`
```ts
export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  href: string;
  linkText: string;
}

export interface Testimonial {
  name: string;
  title: string;
  quote: string;
  rating: number;
  avatarUrl?: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Partner {
  name: string;
  logoUrl: string;
}

export interface BlogPost {
  title: string;
  category: string;
  date: string;
  href: string;
  imageUrl?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatarUrl?: string;
  linkedin?: string;
}
```

**Step 3: Create constants**

File: `src/lib/constants.ts`
```ts
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
```

**Step 4: Commit**

```bash
git add src/lib/
git commit -m "feat: add design tokens, utility types, and constants"
```

---

## Task 3: Button Component

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/Button.stories.tsx`

**Step 1: Build Button component**

File: `src/components/ui/Button.tsx`
```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-bg-primary hover:bg-accent-hover shadow-[0_0_20px_rgba(64,197,255,0.3)] hover:shadow-[0_0_30px_rgba(64,197,255,0.5)]",
  secondary:
    "bg-bg-surface text-text-primary border border-border hover:border-accent/50",
  ghost:
    "bg-transparent text-text-primary hover:bg-bg-surface",
  icon:
    "bg-bg-surface text-text-primary border border-border hover:border-accent/50 !p-2",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
```

**Step 2: Create Button story**

File: `src/components/ui/Button.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "icon"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Kesfet", variant: "primary" },
};

export const Secondary: Story = {
  args: { children: "Iletisime Gec", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "Devamini Oku", variant: "ghost" },
};

export const Icon: Story = {
  args: { children: "→", variant: "icon" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="icon">→</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
```

**Step 3: Verify in Storybook**

Run: `npm run storybook`
Navigate to UI/Button. Verify all variants render correctly on dark background.

**Step 4: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Button.stories.tsx
git commit -m "feat: add Button component with variants and stories"
```

---

## Task 4: Badge Component

**Files:**
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/Badge.stories.tsx`

**Step 1: Build Badge component**

File: `src/components/ui/Badge.tsx`
```tsx
import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
        variant === "default" && "bg-bg-surface text-text-secondary border border-border",
        variant === "accent" && "bg-accent/10 text-accent border border-accent/20",
        className
      )}
    >
      {children}
    </span>
  );
}
```

**Step 2: Create Badge story**

File: `src/components/ui/Badge.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "WeDo" },
};

export const Accent: Story = {
  args: { children: "Yeni", variant: "accent" },
};

export const Both: Story = {
  render: () => (
    <div className="flex gap-3">
      <Badge>Default</Badge>
      <Badge variant="accent">Accent</Badge>
    </div>
  ),
};
```

**Step 3: Commit**

```bash
git add src/components/ui/Badge.tsx src/components/ui/Badge.stories.tsx
git commit -m "feat: add Badge component with stories"
```

---

## Task 5: SectionHeading Component

**Files:**
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/SectionHeading.stories.tsx`

**Step 1: Build SectionHeading**

File: `src/components/ui/SectionHeading.tsx`
```tsx
import { Badge } from "./Badge";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <Badge variant="accent" className="mb-4">
          {label}
        </Badge>
      )}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-text-primary mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
```

**Step 2: Create story**

File: `src/components/ui/SectionHeading.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SectionHeading } from "./SectionHeading";

const meta: Meta<typeof SectionHeading> = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SectionHeading>;

export const WithLabel: Story = {
  args: {
    label: "WeDo",
    title: "Ekibimizi, hikayemizi ve yaptigimiz isleri taniyin",
    description: "Her projemizde nasil deger yarattigimizi ve ekibimizin rolunu kesfedin.",
  },
};

export const WithoutLabel: Story = {
  args: {
    title: "Capture the Future with Your Website",
    description: "Commence our voyage to craft seamlessly complex web platforms.",
  },
};

export const LeftAligned: Story = {
  args: {
    label: "WeLog",
    title: "Bulteni Kesfedin",
    description: "En son secilmis blog yazilarini kesfedin.",
    align: "left",
  },
};
```

**Step 3: Commit**

```bash
git add src/components/ui/SectionHeading.tsx src/components/ui/SectionHeading.stories.tsx
git commit -m "feat: add SectionHeading component with stories"
```

---

## Task 6: Card Component

**Files:**
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Card.stories.tsx`

**Step 1: Build Card component**

File: `src/components/ui/Card.tsx`
```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article";
}

export function Card({ children, className, hover = true, as: Tag = "div" }: CardProps) {
  const Wrapper = hover ? motion.div : Tag;
  const hoverProps = hover
    ? {
        whileHover: { scale: 1.02, borderColor: "rgba(64,197,255,0.3)" },
        transition: { duration: 0.2 },
      }
    : {};

  return (
    <Wrapper
      className={cn(
        "rounded-2xl border border-border bg-bg-surface p-6 transition-shadow",
        hover && "cursor-pointer hover:shadow-[0_0_30px_rgba(64,197,255,0.08)]",
        className
      )}
      {...hoverProps}
    >
      {children}
    </Wrapper>
  );
}
```

**Step 2: Create story**

File: `src/components/ui/Card.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h6 className="text-lg font-semibold text-text-primary mb-2">Hizmetlerimiz</h6>
        <p className="text-text-secondary text-sm">
          Uctan uca urun tasarimi, gelistirme ve olceklendirme hepsi tek cati altinda.
        </p>
      </div>
    ),
  },
};

export const NoHover: Story = {
  args: {
    hover: false,
    children: <p className="text-text-secondary">Static card without hover effect</p>,
  },
};

export const FeatureCard: Story = {
  render: () => (
    <Card className="max-w-sm">
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
        <span className="text-accent text-xl">🔒</span>
      </div>
      <h6 className="text-lg font-semibold text-text-primary mb-2">Built with Security in Mind</h6>
      <p className="text-text-secondary text-sm">
        Security-first architecture at every layer from backend to user data.
      </p>
    </Card>
  ),
};
```

**Step 3: Commit**

```bash
git add src/components/ui/Card.tsx src/components/ui/Card.stories.tsx
git commit -m "feat: add Card component with hover animation and stories"
```

---

## Task 7: Input, Avatar, StarRating, NavLink, IconButton Components

**Files:**
- Create: `src/components/ui/Input.tsx` + story
- Create: `src/components/ui/Avatar.tsx` + story
- Create: `src/components/ui/StarRating.tsx` + story
- Create: `src/components/ui/NavLink.tsx` + story
- Create: `src/components/ui/IconButton.tsx` + story
- Create: `src/components/ui/index.ts` (barrel export)

**Step 1: Build Input component**

File: `src/components/ui/Input.tsx`
```tsx
import { cn } from "@/lib/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmit?: () => void;
  submitLabel?: string;
}

export function Input({ className, onSubmit, submitLabel = "Gonder", ...props }: InputProps) {
  return (
    <div className="flex items-center gap-0 rounded-xl border border-border bg-bg-surface overflow-hidden">
      <input
        className={cn(
          "flex-1 bg-transparent px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary outline-none",
          className
        )}
        {...props}
      />
      {onSubmit && (
        <button
          onClick={onSubmit}
          className="px-4 py-3 bg-accent text-bg-primary text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          {submitLabel}
        </button>
      )}
    </div>
  );
}
```

**Step 2: Build Avatar component**

File: `src/components/ui/Avatar.tsx`
```tsx
import { cn } from "@/lib/cn";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-14 h-14" };

export function Avatar({ src, alt = "", size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "rounded-full bg-bg-surface border-2 border-border overflow-hidden flex items-center justify-center",
        sizeMap[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-text-secondary text-xs">{alt?.charAt(0) || "?"}</span>
      )}
    </div>
  );
}
```

**Step 3: Build StarRating component**

File: `src/components/ui/StarRating.tsx`
```tsx
interface StarRatingProps {
  rating: number;
  max?: number;
}

export function StarRating({ rating, max = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-zinc-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}
```

**Step 4: Build NavLink component**

File: `src/components/ui/NavLink.tsx`
```tsx
"use client";

import { cn } from "@/lib/cn";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export function NavLink({ href, children, active, className }: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "relative text-sm font-medium text-text-secondary hover:text-text-primary transition-colors group",
        active && "text-text-primary",
        className
      )}
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
    </a>
  );
}
```

**Step 5: Build IconButton component**

File: `src/components/ui/IconButton.tsx`
```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function IconButton({ children, className, ...props }: IconButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "w-10 h-10 rounded-full bg-bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors cursor-pointer",
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
```

**Step 6: Create barrel export**

File: `src/components/ui/index.ts`
```ts
export { Button } from "./Button";
export { Badge } from "./Badge";
export { SectionHeading } from "./SectionHeading";
export { Card } from "./Card";
export { Input } from "./Input";
export { Avatar } from "./Avatar";
export { StarRating } from "./StarRating";
export { NavLink } from "./NavLink";
export { IconButton } from "./IconButton";
```

**Step 7: Create stories for all new components**

File: `src/components/ui/Input.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: "info@iceberg.dev" },
};

export const WithSubmit: Story = {
  args: {
    placeholder: "info@iceberg.dev",
    onSubmit: () => alert("Submitted!"),
    submitLabel: "Gonder",
  },
};
```

File: `src/components/ui/Avatar.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Placeholder: Story = {
  args: { alt: "Ahmet" },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-3 items-center">
      <Avatar size="sm" alt="S" />
      <Avatar size="md" alt="M" />
      <Avatar size="lg" alt="L" />
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar size="md" alt="A" className="ring-2 ring-bg-primary" />
      <Avatar size="md" alt="B" className="ring-2 ring-bg-primary" />
      <Avatar size="md" alt="C" className="ring-2 ring-bg-primary" />
    </div>
  ),
};
```

File: `src/components/ui/StarRating.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { StarRating } from "./StarRating";

const meta: Meta<typeof StarRating> = {
  title: "UI/StarRating",
  component: StarRating,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const FiveStars: Story = { args: { rating: 5 } };
export const FourStars: Story = { args: { rating: 4 } };
export const ThreeStars: Story = { args: { rating: 3 } };
```

File: `src/components/ui/NavLink.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { NavLink } from "./NavLink";

const meta: Meta<typeof NavLink> = {
  title: "UI/NavLink",
  component: NavLink,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavLink>;

export const Default: Story = {
  args: { href: "/", children: "Ana Sayfa" },
};

export const Active: Story = {
  args: { href: "/", children: "Ana Sayfa", active: true },
};

export const NavBar: Story = {
  render: () => (
    <nav className="flex gap-6">
      <NavLink href="/" active>Ana Sayfa</NavLink>
      <NavLink href="/services">Hizmetler</NavLink>
      <NavLink href="/portfolio">Portfolyo</NavLink>
      <NavLink href="/about">Hakkimizda</NavLink>
      <NavLink href="/blog">Blog</NavLink>
      <NavLink href="/contact">Iletisim</NavLink>
    </nav>
  ),
};
```

File: `src/components/ui/IconButton.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from "./IconButton";

const meta: Meta<typeof IconButton> = {
  title: "UI/IconButton",
  component: IconButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
  args: { children: "X" },
};

export const SocialGroup: Story = {
  render: () => (
    <div className="flex gap-3">
      <IconButton>X</IconButton>
      <IconButton>in</IconButton>
      <IconButton>ig</IconButton>
    </div>
  ),
};
```

**Step 8: Commit**

```bash
git add src/components/ui/
git commit -m "feat: add Input, Avatar, StarRating, NavLink, IconButton components with stories"
```

---

## Task 8: Animation Wrapper Components

**Files:**
- Create: `src/components/animations/ScrollReveal.tsx` + story
- Create: `src/components/animations/StaggerChildren.tsx` + story
- Create: `src/components/animations/ParallaxLayer.tsx` + story
- Create: `src/components/animations/PageTransition.tsx` + story
- Create: `src/components/animations/HoverScale.tsx` + story
- Create: `src/components/animations/index.ts`

**Step 1: Build ScrollReveal**

File: `src/components/animations/ScrollReveal.tsx`
```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
}

const directionOffset = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
};

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Build StaggerChildren**

File: `src/components/animations/StaggerChildren.tsx`
```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

**Step 3: Build ParallaxLayer**

File: `src/components/animations/ParallaxLayer.tsx`
```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxLayer({ children, speed = 0.5, className }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
```

**Step 4: Build PageTransition**

File: `src/components/animations/PageTransition.tsx`
```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Step 5: Build HoverScale**

File: `src/components/animations/HoverScale.tsx`
```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}

export function HoverScale({ children, scale = 1.02, className }: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.2 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
```

**Step 6: Barrel export + stories**

File: `src/components/animations/index.ts`
```ts
export { ScrollReveal } from "./ScrollReveal";
export { StaggerChildren, StaggerItem } from "./StaggerChildren";
export { ParallaxLayer } from "./ParallaxLayer";
export { PageTransition } from "./PageTransition";
export { HoverScale } from "./HoverScale";
```

File: `src/components/animations/ScrollReveal.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ScrollReveal } from "./ScrollReveal";
import { Card } from "../ui/Card";

const meta: Meta<typeof ScrollReveal> = {
  title: "Animations/ScrollReveal",
  component: ScrollReveal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollReveal>;

export const Default: Story = {
  render: () => (
    <div className="space-y-8 py-20">
      <p className="text-text-secondary text-center">Scroll down to see reveal animations</p>
      {["up", "down", "left", "right"].map((dir) => (
        <ScrollReveal key={dir} direction={dir as any}>
          <Card>
            <p className="text-text-primary">Reveal from {dir}</p>
          </Card>
        </ScrollReveal>
      ))}
    </div>
  ),
};
```

File: `src/components/animations/StaggerChildren.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { StaggerChildren, StaggerItem } from "./StaggerChildren";
import { Card } from "../ui/Card";

const meta: Meta<typeof StaggerChildren> = {
  title: "Animations/StaggerChildren",
  component: StaggerChildren,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StaggerChildren>;

export const Default: Story = {
  render: () => (
    <StaggerChildren className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <StaggerItem key={i}>
          <Card>
            <p className="text-text-primary">Card {i}</p>
          </Card>
        </StaggerItem>
      ))}
    </StaggerChildren>
  ),
};
```

File: `src/components/animations/HoverScale.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { HoverScale } from "./HoverScale";
import { Card } from "../ui/Card";

const meta: Meta<typeof HoverScale> = {
  title: "Animations/HoverScale",
  component: HoverScale,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HoverScale>;

export const Default: Story = {
  render: () => (
    <HoverScale>
      <Card hover={false}>
        <p className="text-text-primary">Hover me to scale</p>
      </Card>
    </HoverScale>
  ),
};
```

**Step 7: Commit**

```bash
git add src/components/animations/
git commit -m "feat: add animation wrapper components (ScrollReveal, StaggerChildren, Parallax, PageTransition, HoverScale)"
```

---

## Task 9: Layout Components - SectionWrapper & Navbar

**Files:**
- Create: `src/components/layout/SectionWrapper.tsx` + story
- Create: `src/components/layout/Navbar.tsx` + story
- Create: `src/components/layout/MobileMenu.tsx`
- Create: `src/components/layout/index.ts`

**Step 1: Build SectionWrapper**

File: `src/components/layout/SectionWrapper.tsx`
```tsx
import { cn } from "@/lib/cn";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "main";
  id?: string;
}

export function SectionWrapper({
  children,
  className,
  as: Tag = "section",
  id,
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={cn("w-full py-16 md:py-20", className)}>
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">{children}</div>
    </Tag>
  );
}
```

**Step 2: Build MobileMenu**

File: `src/components/layout/MobileMenu.tsx`
```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "../ui/NavLink";
import { NAV_ITEMS } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-72 bg-bg-primary border-l border-border z-50 p-6 pt-20"
          >
            <div className="flex flex-col gap-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <NavLink href={item.href} className="text-lg">
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
```

**Step 3: Build Navbar**

File: `src/components/layout/Navbar.tsx`
```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "../ui/NavLink";
import { MobileMenu } from "./MobileMenu";
import { NAV_ITEMS } from "@/lib/constants";

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
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-xl font-bold text-text-primary tracking-tight">
            Iceberg
          </a>

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
```

**Step 4: Create stories**

File: `src/components/layout/SectionWrapper.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { SectionWrapper } from "./SectionWrapper";

const meta: Meta<typeof SectionWrapper> = {
  title: "Layout/SectionWrapper",
  component: SectionWrapper,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SectionWrapper>;

export const Default: Story = {
  args: {
    children: (
      <div className="border border-dashed border-border rounded-xl p-8 text-center text-text-secondary">
        Section content goes here (max-w 1200px, centered)
      </div>
    ),
  },
};
```

File: `src/components/layout/Navbar.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Layout/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <div className="pt-20 p-6">
        <p className="text-text-secondary">Page content below navbar</p>
      </div>
    </div>
  ),
};
```

**Step 5: Barrel export**

File: `src/components/layout/index.ts`
```ts
export { SectionWrapper } from "./SectionWrapper";
export { Navbar } from "./Navbar";
export { MobileMenu } from "./MobileMenu";
```

**Step 6: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add layout components (Navbar, SectionWrapper, MobileMenu) with stories"
```

---

## Task 10: Footer Component

**Files:**
- Create: `src/components/layout/Footer.tsx` + story

**Step 1: Build Footer**

File: `src/components/layout/Footer.tsx`
```tsx
import { SectionWrapper } from "./SectionWrapper";
import { NavLink } from "../ui/NavLink";
import { Input } from "../ui/Input";
import { IconButton } from "../ui/IconButton";
import { NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <a href="/" className="text-xl font-bold text-text-primary tracking-tight">
              Iceberg
            </a>
            <p className="text-text-secondary text-sm leading-relaxed">
              Yeni Nesil Teknoloji & Icerik Stüdyosu
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
            <p className="text-sm font-semibold text-text-primary">Iletisime Gecelim!</p>
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
```

**Step 2: Create story**

File: `src/components/layout/Footer.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Layout/Footer",
  component: Footer,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
```

**Step 3: Update barrel export**

Add to `src/components/layout/index.ts`:
```ts
export { Footer } from "./Footer";
```

**Step 4: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add Footer component with newsletter, nav links, and social icons"
```

---

## Task 11: HeroSection Component

**Files:**
- Create: `src/components/sections/HeroSection.tsx` + story

**Step 1: Build HeroSection**

File: `src/components/sections/HeroSection.tsx`
```tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";
import { SectionWrapper } from "../layout/SectionWrapper";

interface HeroSectionProps {
  tagline?: string;
  headlines: string[];
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  avatars?: { alt: string; src?: string }[];
  trustText?: string;
}

export function HeroSection({
  tagline = "Yeni Nesil Teknoloji Studyosu",
  headlines = ["All in One Studio", "Design", "Code", "Scale"],
  description = "Projenizi haftalar icinde gelistirip kuresel pazara tasiriz.",
  primaryCta = { label: "Kesfet", href: "#cards" },
  secondaryCta = { label: "Iletisime Gec", href: "/contact" },
  avatars = [],
  trustText = "100'den fazla kurumsal ve bagimsiz girisimin tercihi",
}: HeroSectionProps) {
  return (
    <SectionWrapper className="pt-32 md:pt-40 pb-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative text-center max-w-4xl mx-auto">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-text-secondary text-sm mb-6"
        >
          {tagline}
        </motion.p>

        {/* Headlines */}
        <div className="mb-6">
          {headlines.map((line, i) => (
            <motion.h1
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`text-4xl md:text-6xl font-bold tracking-[-0.04em] ${
                i > 0 ? "text-accent" : "text-text-primary"
              }`}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-text-secondary text-base md:text-lg mb-8 max-w-xl mx-auto"
        >
          {description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center gap-4 mb-10"
        >
          <Button variant="primary">{primaryCta.label} →</Button>
          <Button variant="secondary">{secondaryCta.label} →</Button>
        </motion.div>

        {/* Avatar group + trust text */}
        {avatars.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex -space-x-2">
              {avatars.map((avatar, i) => (
                <Avatar
                  key={i}
                  src={avatar.src}
                  alt={avatar.alt}
                  size="md"
                  className="ring-2 ring-bg-primary"
                />
              ))}
            </div>
            {trustText && (
              <p className="text-text-secondary text-sm">{trustText}</p>
            )}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
```

**Step 2: Create story**

File: `src/components/sections/HeroSection.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { HeroSection } from "./HeroSection";

const meta: Meta<typeof HeroSection> = {
  title: "Sections/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    tagline: "Yeni Nesil Teknoloji Studyosu",
    headlines: ["All in One Studio", "Design", "Code", "Scale"],
    description: "Projenizi haftalar icinde gelistirip kuresel pazara tasiriz.",
    primaryCta: { label: "Kesfet", href: "#" },
    secondaryCta: { label: "Iletisime Gec", href: "#" },
    avatars: [
      { alt: "Ahmet" },
      { alt: "Burak" },
      { alt: "Ceren" },
    ],
    trustText: "100'den fazla kurumsal ve bagimsiz girisimin tercihi",
  },
};

export const Minimal: Story = {
  args: {
    headlines: ["Iceberg Studio"],
    description: "Teknoloji, icerik ve yazilim dunniyasinda yeni nesil cozumler.",
    primaryCta: { label: "Baslayalim", href: "#" },
    secondaryCta: { label: "Hakkimizda", href: "#" },
  },
};
```

**Step 3: Commit**

```bash
git add src/components/sections/
git commit -m "feat: add HeroSection with animated headlines, CTAs, and avatar group"
```

---

## Task 12: AnnouncementBanner & ServicesCards Sections

**Files:**
- Create: `src/components/sections/AnnouncementBanner.tsx` + story
- Create: `src/components/sections/ServicesCards.tsx` + story

**Step 1: Build AnnouncementBanner**

File: `src/components/sections/AnnouncementBanner.tsx`
```tsx
"use client";

import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { cn } from "@/lib/cn";

interface AnnouncementBannerProps {
  badge: string;
  text: string;
  linkText: string;
  href: string;
  className?: string;
}

export function AnnouncementBanner({
  badge,
  text,
  linkText,
  href,
  className,
}: AnnouncementBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mx-auto max-w-[1200px] px-4 md:px-6",
        className
      )}
    >
      <a
        href={href}
        className="flex items-center gap-3 flex-wrap justify-center rounded-xl border border-border bg-bg-surface p-4 hover:border-accent/30 transition-colors"
      >
        <Badge variant="accent">{badge}</Badge>
        <span className="text-text-primary text-sm">{text}</span>
        <span className="text-accent text-sm font-medium flex items-center gap-1">
          {linkText} →
        </span>
      </a>
    </motion.div>
  );
}
```

**Step 2: Build ServicesCards**

File: `src/components/sections/ServicesCards.tsx`
```tsx
"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { StaggerChildren, StaggerItem } from "../animations/StaggerChildren";
import type { ServiceCard } from "@/lib/types";

interface ServicesCardsProps {
  label?: string;
  title: string;
  description?: string;
  cards: ServiceCard[];
}

export function ServicesCards({
  label = "WeDo",
  title = "Ekibimizi, hikayemizi ve yaptigimiz isleri taniyin",
  description = "Her projemizde nasil deger yarattigimizi ve ekibimizin rolunu kesfedin.",
  cards,
}: ServicesCardsProps) {
  return (
    <SectionWrapper id="cards">
      <SectionHeading label={label} title={title} description={description} />

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {cards.map((card) => (
          <StaggerItem key={card.title}>
            <a href={card.href}>
              <Card className="h-full flex flex-col justify-between min-h-[200px]">
                <div>
                  <h6 className="text-lg font-semibold text-text-primary mb-2">
                    {card.title}
                  </h6>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <span className="text-accent text-sm font-medium mt-4 flex items-center gap-1">
                  {card.linkText} →
                </span>
              </Card>
            </a>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
```

**Step 3: Create stories**

File: `src/components/sections/AnnouncementBanner.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { AnnouncementBanner } from "./AnnouncementBanner";

const meta: Meta<typeof AnnouncementBanner> = {
  title: "Sections/AnnouncementBanner",
  component: AnnouncementBanner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof AnnouncementBanner>;

export const Default: Story = {
  args: {
    badge: "Yeni",
    text: "Iceberg yeni ofisine tasindir!",
    linkText: "Devamini Oku",
    href: "#",
  },
};
```

File: `src/components/sections/ServicesCards.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { ServicesCards } from "./ServicesCards";

const meta: Meta<typeof ServicesCards> = {
  title: "Sections/ServicesCards",
  component: ServicesCards,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ServicesCards>;

export const Default: Story = {
  args: {
    cards: [
      {
        title: "Hizmetlerimiz",
        description: "Uctan uca urun tasarimi, gelistirme ve olceklendirme hepsi tek cati altinda.",
        href: "/services",
        linkText: "Hizmetlerimize Goz At",
      },
      {
        title: "Portfolyo",
        description: "Girisimlerden kuresel markalara, musterilerimizle birlikte gelistirdigimiz dijital urunleri kesfedin.",
        href: "/portfolio",
        linkText: "Projelerimizi Incele",
      },
      {
        title: "Hakkimizda",
        description: "Iceberg, uzman ekibiyle fikirleri guclu dijital urunlere donusturen bir teknoloji studyosudur.",
        href: "/about",
        linkText: "Ekibimizle Tanis",
      },
    ],
  },
};
```

**Step 4: Commit**

```bash
git add src/components/sections/
git commit -m "feat: add AnnouncementBanner and ServicesCards section components"
```

---

## Task 13: CTABanner & TestimonialsCarousel Sections

**Files:**
- Create: `src/components/sections/CTABanner.tsx` + story
- Create: `src/components/sections/TestimonialsCarousel.tsx` + story

**Step 1: Build CTABanner**

File: `src/components/sections/CTABanner.tsx`
```tsx
"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { Button } from "../ui/Button";
import { ScrollReveal } from "../animations/ScrollReveal";

interface CTABannerProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CTABanner({
  title = "Let's Talk First",
  description = "Book your free intro call and let's explore how we can bring your idea to life.",
  ctaLabel = "Schedule a Free Call",
  ctaHref = "#",
}: CTABannerProps) {
  return (
    <SectionWrapper>
      <ScrollReveal>
        <div className="rounded-2xl border border-border bg-bg-surface p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-lg">
            <h3 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight mb-3">
              {title}
            </h3>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>
          <Button variant="primary" size="lg">
            {ctaLabel} →
          </Button>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
```

**Step 2: Build TestimonialsCarousel**

File: `src/components/sections/TestimonialsCarousel.tsx`
```tsx
"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Avatar } from "../ui/Avatar";
import { StarRating } from "../ui/StarRating";
import { ScrollReveal } from "../animations/ScrollReveal";
import type { Testimonial } from "@/lib/types";

interface TestimonialsCarouselProps {
  label?: string;
  title?: string;
  description?: string;
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({
  label = "WeReviews",
  title = "Musterilerimizden Gelen Geri Bildirimler",
  description = "Degisimi bizimle deneyimleyen musterilerimizin hikayeleri.",
  testimonials,
}: TestimonialsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper>
      <ScrollReveal>
        <SectionHeading label={label} title={title} description={description} />
      </ScrollReveal>

      <div className="mt-12 overflow-hidden">
        <motion.div
          ref={scrollRef}
          className="flex gap-6 cursor-grab"
          drag="x"
          dragConstraints={scrollRef}
          whileTap={{ cursor: "grabbing" }}
        >
          {testimonials.map((t, i) => (
            <Card
              key={i}
              hover={false}
              className="min-w-[300px] md:min-w-[350px] flex-shrink-0"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar src={t.avatarUrl} alt={t.name} size="md" />
                <div>
                  <p className="text-text-primary font-medium text-sm">{t.name}</p>
                  <p className="text-text-secondary text-xs">{t.title}</p>
                </div>
              </div>
              <StarRating rating={t.rating} />
              <p className="text-text-secondary text-sm leading-relaxed mt-4">{t.quote}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
```

**Step 3: Create stories**

File: `src/components/sections/CTABanner.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { CTABanner } from "./CTABanner";

const meta: Meta<typeof CTABanner> = {
  title: "Sections/CTABanner",
  component: CTABanner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof CTABanner>;

export const Default: Story = {};
```

File: `src/components/sections/TestimonialsCarousel.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

const meta: Meta<typeof TestimonialsCarousel> = {
  title: "Sections/TestimonialsCarousel",
  component: TestimonialsCarousel,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof TestimonialsCarousel>;

export const Default: Story = {
  args: {
    testimonials: [
      {
        name: "Ahmet Yilmaz",
        title: "CTO, TechCorp",
        quote: "Iceberg ekibi ile calistigimizdan beri projelerimiz cok daha hizli ilerlemeye basladi. Hem vizyonlari hem de kusursuz icraatlari onlari rakiplerinden ayiriyor.",
        rating: 5,
      },
      {
        name: "Elif Demir",
        title: "Proje Koordinatoru",
        quote: "Teknik bilgiyi asan vizyoner bir yaklasimla cozumler uretiyor. Genc yeteneklerin bu capta projelerle sergiledigi girisimcilik ruhu bizler icin buyuk bir gurur kaynagi.",
        rating: 5,
      },
      {
        name: "Burak Kaya",
        title: "Co-Founder, StartupX",
        quote: "Hizli karar alma ve verimli teslimat yetenekleri bizi surekli destekliyor. Birlikte surecleri cok daha etkili ve saglam bir sekilde ilerlettik.",
        rating: 5,
      },
      {
        name: "Ceren Ozturk",
        title: "Founder, DesignHub",
        quote: "Startup dinamiklerini cok iyi anliyorlar. Hem urunumuz hem operasyonlarimiz cok daha saglam ve verimli bir sekilde buyuyor.",
        rating: 4,
      },
    ],
  },
};
```

**Step 4: Commit**

```bash
git add src/components/sections/
git commit -m "feat: add CTABanner and TestimonialsCarousel section components"
```

---

## Task 14: FeaturesGrid & PartnersMarquee Sections

**Files:**
- Create: `src/components/sections/FeaturesGrid.tsx` + story
- Create: `src/components/sections/PartnersMarquee.tsx` + story

**Step 1: Build FeaturesGrid**

File: `src/components/sections/FeaturesGrid.tsx`
```tsx
"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { StaggerChildren, StaggerItem } from "../animations/StaggerChildren";
import type { Feature } from "@/lib/types";

interface FeaturesGridProps {
  label?: string;
  title?: string;
  description?: string;
  features: Feature[];
}

export function FeaturesGrid({
  label = "Advanced Features",
  title = "Capture the Future with Your Website",
  description = "Commence our voyage to craft seamlessly complex web platforms.",
  features,
}: FeaturesGridProps) {
  return (
    <SectionWrapper>
      <SectionHeading label={label} title={title} description={description} />

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {features.map((f, i) => (
          <StaggerItem key={i}>
            <Card className="h-full">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h6 className="text-base font-semibold text-text-primary mb-2">{f.title}</h6>
              <p className="text-text-secondary text-sm leading-relaxed">{f.description}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
```

**Step 2: Build PartnersMarquee**

File: `src/components/sections/PartnersMarquee.tsx`
```tsx
"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import type { Partner } from "@/lib/types";
import { cn } from "@/lib/cn";

interface PartnersMarqueeProps {
  title?: string;
  description?: string;
  partners: Partner[];
}

export function PartnersMarquee({
  title = "Partnerlerimiz",
  description = "Dijital cozumler yaratma yolculugumuzda onde gelen markalar ve ortaklar tarafindan tavsiye ediliyoruz.",
  partners,
}: PartnersMarqueeProps) {
  return (
    <SectionWrapper>
      <SectionHeading title={title} description={description} />

      <div className="mt-12 relative overflow-hidden group">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

        <div className="flex gap-12 animate-marquee group-hover:[animation-play-state:paused]">
          {/* Duplicate for seamless loop */}
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center h-12 px-6 opacity-50 hover:opacity-100 transition-opacity"
            >
              {p.logoUrl ? (
                <img src={p.logoUrl} alt={p.name} className="h-8 w-auto object-contain" />
              ) : (
                <span className="text-text-secondary font-semibold text-lg whitespace-nowrap">
                  {p.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
```

Note: Add marquee keyframe to `globals.css`:
```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-marquee {
  animation: marquee 30s linear infinite;
}
```

**Step 3: Create stories**

File: `src/components/sections/FeaturesGrid.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { FeaturesGrid } from "./FeaturesGrid";

const meta: Meta<typeof FeaturesGrid> = {
  title: "Sections/FeaturesGrid",
  component: FeaturesGrid,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof FeaturesGrid>;

export const Default: Story = {
  args: {
    features: [
      { icon: <span className="text-accent">👥</span>, title: "End-to-End Product Teams", description: "We provide fullcycle teams including dev, design, and strategy ready from day one." },
      { icon: <span className="text-accent">🔒</span>, title: "Built with Security in Mind", description: "Security-first architecture at every layer from backend to user data." },
      { icon: <span className="text-accent">🎨</span>, title: "Sharp & Scalable Design", description: "Pixel-perfect interfaces that adapt across platforms, from MVP to enterprise." },
      { icon: <span className="text-accent">📊</span>, title: "Smart Project Control", description: "Manage priorities, track features, and iterate faster with transparent dashboards." },
      { icon: <span className="text-accent">🌍</span>, title: "Access Anywhere", description: "Web or mobile, your product is optimized for global reach from day one." },
      { icon: <span className="text-accent">✨</span>, title: "Simple for You, Seamless for Users", description: "We build intuitive experiences that just work for founders and end-users alike." },
    ],
  },
};
```

File: `src/components/sections/PartnersMarquee.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { PartnersMarquee } from "./PartnersMarquee";

const meta: Meta<typeof PartnersMarquee> = {
  title: "Sections/PartnersMarquee",
  component: PartnersMarquee,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof PartnersMarquee>;

export const Default: Story = {
  args: {
    partners: [
      { name: "Google", logoUrl: "" },
      { name: "BTM Tekmer", logoUrl: "" },
      { name: "Mobil Sanayi", logoUrl: "" },
      { name: "TechHub", logoUrl: "" },
      { name: "StartupIstanbul", logoUrl: "" },
    ],
  },
};
```

**Step 4: Commit**

```bash
git add src/components/sections/ src/styles/globals.css
git commit -m "feat: add FeaturesGrid and PartnersMarquee section components"
```

---

## Task 15: BlogPreview Section & Sections Barrel Export

**Files:**
- Create: `src/components/sections/BlogPreview.tsx` + story
- Create: `src/components/sections/index.ts`

**Step 1: Build BlogPreview**

File: `src/components/sections/BlogPreview.tsx`
```tsx
"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { StaggerChildren, StaggerItem } from "../animations/StaggerChildren";
import type { BlogPost } from "@/lib/types";

interface BlogPreviewProps {
  label?: string;
  title?: string;
  description?: string;
  posts: BlogPost[];
  viewAllHref?: string;
}

export function BlogPreview({
  label = "WeLog",
  title = "Bulteni Kesfedin",
  description = "En son secilmis blog yazilarini kesfedin.",
  posts,
  viewAllHref = "/blog",
}: BlogPreviewProps) {
  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeading label={label} title={title} description={description} align="left" />
        <Button variant="secondary" size="sm">
          Bultene Goz Atin →
        </Button>
      </div>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <StaggerItem key={post.title}>
            <a href={post.href}>
              <Card className="overflow-hidden">
                {post.imageUrl && (
                  <div className="h-48 bg-bg-surface rounded-xl mb-4 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <Badge variant="accent" className="mb-3">{post.category}</Badge>
                <h5 className="text-lg font-semibold text-text-primary mb-3">{post.title}</h5>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-xs">{post.date}</span>
                  <span className="text-accent text-sm font-medium">Read more →</span>
                </div>
              </Card>
            </a>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
```

**Step 2: Create story**

File: `src/components/sections/BlogPreview.stories.tsx`
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { BlogPreview } from "./BlogPreview";

const meta: Meta<typeof BlogPreview> = {
  title: "Sections/BlogPreview",
  component: BlogPreview,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof BlogPreview>;

export const Default: Story = {
  args: {
    posts: [
      {
        title: "Iceberg Yeni Ofisinde!",
        category: "Announcement",
        date: "5 Subat 2026",
        href: "#",
      },
      {
        title: "Iceberg Girisimlerinden Mobil Sanayi, Take Off Istanbul'da Sahne Aldi",
        category: "Announcement",
        date: "19 Aralik 2025",
        href: "#",
      },
    ],
  },
};
```

**Step 3: Barrel export**

File: `src/components/sections/index.ts`
```ts
export { HeroSection } from "./HeroSection";
export { AnnouncementBanner } from "./AnnouncementBanner";
export { ServicesCards } from "./ServicesCards";
export { CTABanner } from "./CTABanner";
export { TestimonialsCarousel } from "./TestimonialsCarousel";
export { FeaturesGrid } from "./FeaturesGrid";
export { PartnersMarquee } from "./PartnersMarquee";
export { BlogPreview } from "./BlogPreview";
```

**Step 4: Commit**

```bash
git add src/components/sections/
git commit -m "feat: add BlogPreview section and barrel exports for all sections"
```

---

## Task 16: Final Verification & Storybook Polish

**Step 1: Run Storybook and verify all components render**

Run: `npm run storybook`

Check each story category:
- UI/ (9 components: Button, Badge, SectionHeading, Card, Input, Avatar, StarRating, NavLink, IconButton)
- Animations/ (3 stories: ScrollReveal, StaggerChildren, HoverScale)
- Layout/ (3 components: Navbar, SectionWrapper, Footer)
- Sections/ (7 components: HeroSection, AnnouncementBanner, ServicesCards, CTABanner, TestimonialsCarousel, FeaturesGrid, PartnersMarquee, BlogPreview)

**Step 2: Fix any rendering issues found**

Common issues to check:
- Tailwind custom colors resolving (`bg-bg-primary`, `text-accent`, etc.)
- Framer Motion animations playing in Storybook
- Dark background showing correctly for all stories
- Responsive variants working (resize Storybook viewport)

**Step 3: Final commit**

```bash
git add -A
git commit -m "chore: finalize Phase 1 Storybook components for mentor review"
```

---

## Summary

| Task | Components | Commit Count |
|------|-----------|-------------|
| 1 | Project setup | 1 |
| 2 | Design tokens, types, constants | 1 |
| 3 | Button | 1 |
| 4 | Badge | 1 |
| 5 | SectionHeading | 1 |
| 6 | Card | 1 |
| 7 | Input, Avatar, StarRating, NavLink, IconButton | 1 |
| 8 | ScrollReveal, StaggerChildren, ParallaxLayer, PageTransition, HoverScale | 1 |
| 9 | SectionWrapper, Navbar, MobileMenu | 1 |
| 10 | Footer | 1 |
| 11 | HeroSection | 1 |
| 12 | AnnouncementBanner, ServicesCards | 1 |
| 13 | CTABanner, TestimonialsCarousel | 1 |
| 14 | FeaturesGrid, PartnersMarquee | 1 |
| 15 | BlogPreview + barrel exports | 1 |
| 16 | Final verification | 1 |

**Total: 16 tasks, ~22 components, 16 commits**

After all tasks complete, Storybook will be ready for mentor review with all Iceberg components visible and interactive.