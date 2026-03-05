export interface BaseSectionProps {
  label?: string;
  title?: string;
  description?: string;
}

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
