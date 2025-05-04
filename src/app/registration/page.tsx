import { client } from '@/sanity/client';
import groq from 'groq';
import { PortableText } from '@portabletext/react';
import { RegistrationPageData } from '@/types/sanity';
// import Link from 'next/link';

const registrationQuery = groq`
  *[_type == "registrationPage" && _id == "registrationPage"][0] {
    _id,
    pageContent,
    registrationOpenDate,
    preRegistrationText,
    registrationUrl,
    registrationButtonText,
    openInNewWindow
  }
`;

export default async function RegistrationPage() {
  const data: RegistrationPageData | null =
    await client.fetch(registrationQuery);

  if (!data) {
    return (
      <div>
        Registration page content not found. Please add it in the Studio.
      </div>
    );
  }

  const {
    pageContent,
    registrationOpenDate,
    preRegistrationText,
    registrationUrl,
    registrationButtonText,
    openInNewWindow,
  } = data;

  const now = new Date();
  const openDate = registrationOpenDate ? new Date(registrationOpenDate) : null;
  const isRegistrationOpen = openDate ? now >= openDate : false;

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
      <h1>Registration</h1>
      {pageContent && (
        <div style={{ margin: '2rem 0' }}>
          <PortableText value={pageContent} />
        </div>
      )}

      <div
        style={{
          marginTop: '2rem',
          padding: '1.5rem',
          border: '1px solid #eee',
          textAlign: 'center',
        }}
      >
        {isRegistrationOpen ? (
          registrationUrl ? (
            <a
              href={registrationUrl}
              target={openInNewWindow ? '_blank' : '_self'}
              rel={openInNewWindow ? 'noopener noreferrer' : undefined}
              style={{
                display: 'inline-block',
                padding: '0.8rem 1.5rem',
                backgroundColor: 'blue',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
              }}
            >
              {registrationButtonText || 'Register Now'}
            </a>
          ) : (
            <p>
              Registration is open, but the link is missing. Please check back
              later.
            </p>
          )
        ) : (
          <p style={{ fontStyle: 'italic' }}>
            {preRegistrationText || 'Registration details coming soon.'}
          </p>
        )}
      </div>
    </div>
  );
}
