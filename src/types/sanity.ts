import type { PortableTextBlock } from '@portabletext/types';
import type { Image } from 'sanity';

export interface SiteSettings {
  _type: 'siteSettings';
  _id: string;
  siteTitle?: string;
  facebookGroupUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  footerText?: PortableTextBlock[]; // Use PortableTextBlock for block content
}

export interface HomePageData {
  _type: 'homePage';
  _id: string;
  welcomeHeadline?: string;
  mainImage?: Image & {
    alt?: string;
    asset?: {
      _id?: string;
      url?: string;
      metadata?: {
        dimensions?: {
          width?: number;
          height?: number;
        };
        lqip?: string;
      };
    };
  };
  briefDescription?: PortableTextBlock[];
  announcements?: PortableTextBlock[];
}

export interface RegistrationPageData {
  _type: 'registrationPage';
  _id: string;
  pageContent?: PortableTextBlock[];
  registrationOpenDate?: string; // Comes as ISO 8601 string
  preRegistrationText?: string;
  registrationUrl?: string;
  registrationButtonText?: string;
  openInNewWindow?: boolean;
}
