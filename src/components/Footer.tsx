// import Link from 'next/link';
import { PortableText } from '@portabletext/react'; // For rendering block content
import { SiteSettings } from '@/types/sanity'; // Assumes type definition

// Define props type for the component
interface FooterProps {
  settings: SiteSettings | null;
}

const Footer = ({ settings }: FooterProps) => {
  // Provide default values or handle null case
  const facebookUrl = settings?.facebookGroupUrl || '#';
  const contactEmail = settings?.contactEmail || 'Not Available';
  const contactPhone = settings?.contactPhone; // Optional
  const footerText = settings?.footerText; // Portable Text data

  return (
    <footer
      style={{
        padding: '2rem 1rem',
        borderTop: '1px solid #ccc',
        marginTop: '2rem',
      }}
    >
      <div>
        {/* Display Footer Content */}
        <p>
          For all inquiries contact: {contactEmail}
          {contactPhone && ` | Phone: ${contactPhone}`}
        </p>
        <p>
          Join our{' '}
          <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
            Facebook Group
          </a>{' '}
          to receive important updates and view comments from other members.
        </p>

        {/* Render Portable Text if it exists */}
        {footerText && (
          <div style={{ marginTop: '1rem', fontSize: '0.9em' }}>
            {/* You'll need to install @portabletext/react: npm install @portabletext/react */}
            {/* Configure components prop if needed for custom rendering */}
            <PortableText value={footerText} />
          </div>
        )}

        <p style={{ marginTop: '1rem', fontSize: '0.8em' }}>
          &copy; {new Date().getFullYear()} Las Vegas Smokeout. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
