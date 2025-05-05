import type { PortableTextBlock } from '@portabletext/types';
import type { Image as SanityImage } from 'sanity';

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
  mainImage?: SanityImage & {
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

export interface RoomRateRow {
  _key: string;
  roomType?: string;
  rateMonThruThurs?: string;
  rateFriday?: string;
  rateSaturday?: string;
  rateSunThruMon?: string;
}

export interface HotelImage {
  _key: string;
  alt?: string;
  caption?: string;
  // Expand asset data based on GROQ query
  asset?: SanityImage & {
    // Use base Sanity Image type
    _id?: string;
    url?: string;
    metadata?: {
      dimensions?: {
        width?: number;
        height?: number;
        aspectRatio?: number;
      };
      lqip?: string; // Low Quality Image Placeholder
    };
  };
}

export interface HostHotelPageData {
  _type: 'hostHotelPage';
  _id: string;
  pageTitle?: string;
  introduction?: PortableTextBlock[];
  roomRates?: RoomRateRow[];
  ratesCaption?: string;
  hotelImages?: HotelImage[];
}

export interface TShirtDesignData {
  _id: string;
  _type: 'tshirtDesign';
  year?: number;
  description?: string;
  designImage?: SanityImage & {
    alt?: string;
    asset?: {
      _id?: string;
      url?: string;
      metadata?: {
        dimensions?: { width?: number; height?: number; aspectRatio?: number };
        lqip?: string;
      };
    };
  };
}

export interface TShirtPageData {
  _type: 'tshirtPage';
  _id: string;
  pageTitle?: string;
  introduction?: PortableTextBlock[];
  orderStartDate?: string;
  orderEndDate?: string;
  preOrderText?: string;
  orderUrl?: string;
  orderButtonText?: string;
  postOrderText?: string;
  openInNewWindow?: boolean;
  currentDesign?: TShirtDesignData;
  pastDesigns?: TShirtDesignData[];
}

export interface SanityFileData {
  asset?: {
    url?: string;
    originalFilename?: string;
  };
}

export interface EventItemData {
  _id: string;
  _type: 'eventItem';
  title?: string;
  startDateTime?: string; // ISO 8601 date string from Sanity
  endDateTime?: string; // ISO 8601 date string
  location?: string;
  description?: PortableTextBlock[];
  requiresExtraCost?: boolean;
  costDetails?: string;
  isOffSite?: boolean;
  offSiteAddress?: string;
  organizerContact?: string;
}

export interface SchedulePageData {
  _type: 'schedulePage';
  _id: string;
  pageTitle?: string;
  introduction?: PortableTextBlock[];
  schedulePdf?: SanityFileData;
}

export interface EventsPageCombinedData {
  pageData: SchedulePageData | null; // Schedule page data might be null
  events: EventItemData[]; // Array of events, might be empty
}

export type GroupedEvents = {
  [dateKey: string]: EventItemData[]; // Key is formatted date, value is array of events for that date
};

export interface AttendeeData {
  _id: string;
  _type: 'attendee';
  name?: string;
  year?: number;
  location?: string;
  attendedCount?: number;
  caption?: string;
  photo?: SanityImage & {
    alt?: string;
    asset?: {
      _id?: string;
      url?: string;
      metadata?: {
        dimensions?: { width?: number; height?: number; aspectRatio?: number };
        lqip?: string;
      };
    };
  };
}

export interface AttendeesPageData {
  _type: 'attendeesPage';
  _id: string;
  pageTitle?: string;
  introduction?: PortableTextBlock[];
  submissionEmail?: string;
  currentYear?: number;
}

export interface SponsorData {
  _id: string;
  _type: 'sponsor';
  name?: string;
  websiteUrl?: string;
  sponsorLevel?: string;
  logo?: SanityImage & {
    alt?: string;
    asset?: {
      _id?: string;
      url?: string;
      metadata?: {
        dimensions?: { width?: number; height?: number; aspectRatio?: number };
        lqip?: string;
      };
    };
  };
}

export interface SponsorsPageInfo {
  _type: 'sponsorsPage';
  _id: string;
  pageTitle?: string;
  introduction?: PortableTextBlock[];
}

export interface SponsorsPageCombinedData {
  pageData: SponsorsPageInfo | null;
  sponsors: SponsorData[];
}
