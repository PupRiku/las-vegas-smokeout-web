import type { PortableTextBlock } from '@portabletext/types';

export interface SiteSettings {
  _type: 'siteSettings';
  _id: string;
  siteTitle?: string;
  facebookGroupUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  footerText?: PortableTextBlock[]; // Use PortableTextBlock for block content
}

// Add other types here as you build pages...
