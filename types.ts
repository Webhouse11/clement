import React from 'react';

export interface ServiceItem {
  id: string;
  title: string;
  icon?: React.ReactNode; // Optional because stored JSON won't have ReactNode
  iconName?: string; // For identifying icons in admin
  tagline?: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  description?: string;
  details?: {
    problem: string;
    solution: string;
    outcome: string;
  };
}

export interface PortfolioItem {
  id: string | number;
  title: string;
  category: string;
  image: string;
  description: string;
  result: string;
}

export interface BlogPost {
  id: string | number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  serviceInterest: string;
  message: string;
  date: string;
  read: boolean;
}

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  align: string;
}

export interface AboutPageData {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  introText: string;
  stats: { label: string; value: string }[];
}

export interface ContactPageData {
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  whatsapp: string;
  sidebarImage: string;
  quote: string;
  quoteAuthor: string;
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  date: string;
  type: 'image' | 'video' | 'document';
}