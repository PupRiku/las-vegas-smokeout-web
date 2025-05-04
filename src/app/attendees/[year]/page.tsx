import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import groq from 'groq';
import Image from 'next/image';
import Link from 'next/link';
import { AttendeeData } from '@/types/sanity';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const attendeesByYearQuery = groq`
  *[_type == "attendee" && year == $yearParam] | order(name asc) {
    _id,
    name,
    year,
    location,
    attendedCount,
    caption,
    photo { alt, asset->{_id, url, metadata { dimensions, lqip }} }
  }
`;

function formatOrdinal(n?: number): string {
  if (typeof n !== 'number' || n <= 0) {
    return '';
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

interface PastAttendeesPageProps {
  params: {
    year: string;
  };
}

export async function generateMetadata({
  params,
}: PastAttendeesPageProps): Promise<Metadata> {
  const year = parseInt(params.year, 10);
  const pageTitle = `Attendees - ${isNaN(year) ? 'Unknown Year' : year}`;

  return {
    title: pageTitle,
  };
}

export default async function PastAttendeesPage({
  params: { year },
}: PastAttendeesPageProps) {
  const yearString = year;
  const yearParam = parseInt(yearString, 10);

  if (isNaN(yearParam)) {
    notFound();
  }

  const attendees: AttendeeData[] = await client.fetch(attendeesByYearQuery, {
    yearParam,
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>Attendees - {yearParam}</h1>

      <div style={{ margin: '1rem 0 2rem 0' }}>
        <Link
          href="/attendees"
          style={{ textDecoration: 'underline', color: 'blue' }}
        >
          &larr; Back to Current Attendees
        </Link>
      </div>
      {attendees.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            marginTop: '1rem',
          }}
        >
          {attendees.map((attendee) =>
            attendee.photo?.asset ? (
              <div key={attendee._id}>
                <Image
                  src={urlFor(attendee.photo)
                    .width(400)
                    .height(400)
                    .fit('crop')
                    .quality(75)
                    .url()}
                  alt={attendee.photo.alt || attendee.name || 'Attendee photo'}
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
        // Message if no attendees found for this specific year
        <p style={{ marginTop: '1rem' }}>
          No attendee profiles found for the year {yearParam}.
        </p>
      )}
    </div>
  );
}
