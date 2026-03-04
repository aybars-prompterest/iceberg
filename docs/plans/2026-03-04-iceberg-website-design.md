# Iceberg - Website Design Document

## Overview
Iceberg is a company/agency website for a technology, software, and YouTube content business. The site is inspired by [WeStudio](https://westudio.dev/tr/) dark theme, built with a component-first approach using Storybook for mentor review before assembly.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, Framer Motion, Storybook 8, TypeScript

## Pages
1. Ana Sayfa (Home)
2. Hizmetler (Services)
3. Portfolyo (Portfolio)
4. Hakkimizda (About)
5. Blog
6. Iletisim (Contact)

## Design Tokens

### Colors (Dark Theme - Default)
| Token | Value | Usage |
|-------|-------|-------|
| `bg-primary` | `#09090b` (zinc-950) | Page background |
| `bg-surface` | `#18181b` (zinc-900) | Card backgrounds |
| `border` | `#27272a` (zinc-800) | Card borders, dividers |
| `text-primary` | `#fafafa` (zinc-50) | Headings, primary text |
| `text-secondary` | `#a1a1aa` (zinc-400) | Body text, descriptions |
| `accent` | `#40c5ff` | Links, CTAs, highlights |

### Typography
| Element | Font | Weight | Size | Letter Spacing |
|---------|------|--------|------|----------------|
| H1 | Plus Jakarta Sans | 700 | 48-60px | -0.04em |
| H2 | Plus Jakarta Sans | 600 | 32-40px | -0.03em |
| H3-H6 | Plus Jakarta Sans | 600 | 20-28px | -0.03em |
| Body | Inter | 400 | 16px | normal |
| Small | Inter | 400 | 14px | normal |

### Spacing & Layout
- Max width: 1200px
- Section padding: 80px vertical (desktop), 48px (mobile)
- Card border-radius: 16px
- Button border-radius: 12px

## Project Structure
```
iceberg/
├── src/
│   ├── components/
│   │   ├── ui/          # Atomic: Button, Badge, Input, Card, Avatar, StarRating, NavLink, IconButton
│   │   ├── layout/      # Navbar, Footer, SectionWrapper, MobileMenu
│   │   ├── sections/    # HeroSection, ServicesCards, CTABanner, TestimonialsCarousel,
│   │   │                # FeaturesGrid, PartnersMarquee, BlogPreview, AnnouncementBanner
│   │   └── animations/  # ScrollReveal, StaggerChildren, ParallaxLayer, PageTransition, HoverScale
│   ├── lib/             # utils, constants, types
│   └── styles/          # globals.css, font imports
├── .storybook/          # Storybook configuration (dark theme)
├── public/              # Static assets, images, icons
└── docs/plans/          # Design & planning docs
```

## Components

### Atomic UI Components
| Component | Variants | Key Features |
|-----------|----------|--------------|
| `Button` | primary, secondary, ghost, icon | Hover glow, scale animation |
| `Badge` | default, accent | Small label tags ("Yeni", "Announcement") |
| `SectionHeading` | - | Label + H2 title + description paragraph |
| `Card` | service, feature, blog, testimonial | Rounded border, hover scale/glow |
| `Input` | text, email | With inline submit button (newsletter) |
| `IconButton` | - | Social media icons, floating CTA |
| `Avatar` | sm, md, lg | Rounded profile photos |
| `StarRating` | - | 5-star display |
| `NavLink` | - | Hover underline slide-in animation |

### Layout Components
| Component | Key Features |
|-----------|--------------|
| `Navbar` | Sticky, logo + nav links + theme switch + hamburger (mobile) |
| `Footer` | Logo, page links, newsletter input, social icons |
| `SectionWrapper` | Max-width container, consistent padding |
| `MobileMenu` | Slide-in overlay menu with stagger animation |

### Animation Wrappers
| Component | Framer Motion Config |
|-----------|---------------------|
| `ScrollReveal` | `whileInView`: opacity 0->1, y 30->0, duration 0.6s, once: true |
| `StaggerChildren` | Parent `staggerChildren: 0.1`, children fade+slide |
| `ParallaxLayer` | `useScroll` + `useTransform`, speed multiplier prop |
| `PageTransition` | `AnimatePresence` fade + slide between routes |
| `HoverScale` | `whileHover`: scale 1.02, border-color transition |

### Section Components

#### Home Page Sections (in order)
1. **HeroSection** - Video/gradient background, large headline ("All in One Studio" equivalent), subtitle, 2 CTA buttons, avatar group, trust text
2. **AnnouncementBanner** - Sticky/floating announcement with badge + text + link
3. **ServicesCards** - 3 cards (Hizmetler, Portfolyo, Hakkimizda) with icon, title, description, link. Stagger reveal.
4. **CTABanner** - Dark surface card, "Let's Talk First" heading, description, schedule button, chat widget mockup
5. **TestimonialsCarousel** - Auto-scrolling cards with avatar, name, title, star rating, quote text
6. **FeaturesGrid** - Section heading + 2x3 grid of feature cards with icons
7. **PartnersMarquee** - Continuously scrolling partner logos, pause on hover
8. **BlogPreview** - Section heading + 2 latest blog post cards + "View all" link
9. **FooterSection** - Full footer

#### Other Pages
- **Services:** Hero + detailed service cards (expanded) + CTA
- **Portfolio:** Hero + project grid/carousel + category filter
- **About:** Hero + company story + team member cards + statistics counters
- **Blog:** Hero + blog card grid + category filter + pagination
- **Contact:** Hero + contact form + address/map + social links

## Animation Strategy

### Scroll Reveal
- Every section: `opacity: 0 -> 1`, `y: 30 -> 0`, `duration: 0.6s`
- Cards stagger: each card delayed by 0.1s
- `once: true` - animate only on first appearance

### Parallax
- Hero background: 50% scroll speed
- Gradient overlays: varying speeds

### Hover Effects
- Cards: `scale: 1.02`, border-color transition, subtle glow
- Buttons: glow effect + slight lift (`y: -2`)
- Links: underline slide-in from left

### Page Transitions
- `AnimatePresence` with fade + slide
- Navbar stays fixed, content transitions

### Partners Marquee
- CSS animation for continuous scroll
- Pause on hover

## Phase Plan

### Phase 1: Storybook Component Development (Current)
1. Project setup (Next.js + Tailwind + Storybook + Framer Motion + TypeScript)
2. Design tokens & global styles (colors, typography, spacing)
3. Atomic UI components with stories
4. Layout components with stories
5. Animation wrapper components with stories
6. Home page section components with stories
7. Other page section components with stories
8. **Mentor review** via Storybook

### Phase 2: Site Assembly (After Mentor Approval)
1. Next.js App Router page structure
2. Place components into pages
3. Responsive fine-tuning
4. Content integration
5. SEO & metadata
6. Deploy to Vercel

## Differentiators from WeStudio
- Video background in Hero (YouTube/content focus)
- Interactive portfolio case study cards
- YouTube video embeds in Blog section
- Dark theme as default (not toggle)
- Iceberg branding & identity
