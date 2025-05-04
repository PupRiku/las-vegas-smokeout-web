import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import groq from 'groq';
import Image from 'next/image';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { AttendeesPageData, AttendeeData } from '@/types/sanity';

const attendeesPageQuery = groq`
  *[_type == "attendeesPage" && _id == "attendeesPage"][0] {
    _id,
    pageTitle,
    introduction,
    submissionEmail,
    currentYear
  }
`;

const allAttendeesQuery = groq`
  *[_type == "attendee"] | order(year desc, name asc) {
    _id,
    name,
    year,
    location,
    attendedCount,
    caption,
    photo { alt, asset->{_id, url, metadata { dimensions, lqip }} }
  }
`;

export default async function AttendeesPage() {
  const pageData: AttendeesPageData | null =
    await client.fetch(attendeesPageQuery);
  const allAttendees: AttendeeData[] = await client.fetch(allAttendeesQuery);

  if (!pageData) {
    return (
      <div>
        Attendees page content not found. Please add it in the Studio and set
        the &apos;Current Year&apos;.
      </div>
    );
  }

  const { pageTitle, introduction, submissionEmail, currentYear } = pageData;
  const displayTitle = pageTitle || 'Attendees';

  const currentAttendees = currentYear
    ? allAttendees.filter((a) => a.year === currentYear)
    : [];

  const pastYears = [
    ...new Set(
      allAttendees
        .map((a) => a.year)
        .filter((year): year is number => year !== undefined)
    ),
  ]
    .filter((year) => year !== currentYear)
    .sort((a, b) => b - a);

  function formatOrdinal(n?: number): string {
    if (typeof n !== 'number' || n <= 0) {
      return ''; // Return empty if input is not a positive number
    }
    const pr = new Intl.PluralRules('en-US', { type: 'ordinal' });
    const suffixes = new Map([
      ['one', 'st'],
      ['two', 'nd'],
      ['few', 'rd'],
      ['other', 'th'],
    ]);
    const rule = pr.select(n);
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>
        {displayTitle} {currentYear || 'Year ?'}
      </h1>
      {introduction && (
        <div style={{ margin: '2rem 0' }}>
          <PortableText value={introduction} />
        </div>
      )}
      {submissionEmail && (
        <p style={{ margin: '1rem 0', fontStyle: 'italic' }}>
          To submit your profile for the gallery, email your SFW photo and
          details (Name, Location, # Attended, Optional Caption) to:{' '}
          <a
            href={`mailto:${submissionEmail}?subject=Please add my photo to Las Vegas Smokeout ${currentYear}`}
          >
            {submissionEmail}
          </a>
        </p>
      )}
      {pastYears.length > 0 && (
        <div
          style={{
            margin: '3rem 0',
            paddingTop: '2rem',
            borderTop: '1px solid #eee',
          }}
        >
          <h2>Past Galleries</h2>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            {pastYears.map((year) => (
              <li key={year}>
                <Link
                  href={`/attendees/${year}`}
                  style={{ textDecoration: 'underline', color: 'blue' }}
                >
                  {year} Gallery
                </Link>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: '0.8em', marginTop: '0.5rem' }}>
            (Note: These links will work once the dynamic gallery page is
            created.)
          </p>
        </div>
      )}
      <div style={{ margin: '3rem 0' }}>
        <h2>
          {currentYear ? `${currentYear} Attendees` : 'Current Attendees'}
        </h2>
        {currentAttendees.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              marginTop: '1rem',
            }}
          >
            {currentAttendees.map((attendee) =>
              attendee.photo?.asset ? (
                <div key={attendee._id}>
                  <Image
                    src={urlFor(attendee.photo)
                      .width(400)
                      .height(400)
                      .fit('crop')
                      .quality(75)
                      .url()}
                    alt={
                      attendee.photo.alt || attendee.name || 'Attendee photo'
                    }
                    width={
                      attendee.photo.asset.metadata?.dimensions?.width || 200
                    }
                    height={
                      attendee.photo.asset.metadata?.dimensions?.height || 200
                    }
                    sizes="(max-width: 480px) 50vw, 200px"
                    placeholder={
                      attendee.photo.asset.metadata?.lqip ? 'blur' : 'empty'
                    }
                    blurDataURL={attendee.photo.asset.metadata?.lqip}
                    style={{
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '1 / 1',
                      objectFit: 'cover',
                      display: 'block',
                      borderRadius: '4px',
                    }}
                  />
                  <div style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                    <p style={{ fontWeight: 'bold', margin: '0.25rem 0' }}>
                      {attendee.name}
                    </p>
                    {attendee.location && (
                      <p style={{ fontSize: '0.9em', margin: '0.1rem 0' }}>
                        {attendee.location}
                      </p>
                    )}
                    {attendee.attendedCount && attendee.attendedCount > 0 && (
                      <p
                        style={{
                          fontSize: '0.85em',
                          margin: '0.1rem 0',
                        }}
                      >
                        {formatOrdinal(attendee.attendedCount)} year attending
                        SMOKEOUT
                      </p>
                    )}
                    {attendee.caption && (
                      <p
                        style={{
                          fontSize: '0.8em',
                          margin: '0.25rem 0',
                          fontStyle: 'italic',
                        }}
                      >
                        {attendee.caption}
                      </p>
                    )}
                  </div>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <p style={{ marginTop: '1rem' }}>
            No attendees found for {currentYear || 'the current year'}. Check
            back later or submit your profile!
          </p>
        )}
      </div>
    </div>
  );
}
