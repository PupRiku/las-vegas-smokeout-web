import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import groq from 'groq';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { HostHotelPageData } from '@/types/sanity';

const hostHotelQuery = groq`
  *[_type == "hostHotelPage" && _id == "hostHotelPage"][0] {
    _id,
    pageTitle,
    introduction,
    roomRates[]{
      _key,
      roomType,
      rateMonThruThurs,
      rateFriday,
      rateSaturday,
      rateSunThruMon
    },
    ratesCaption,
    hotelImages[]{
      _key,
      alt,
      caption,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    }
  }
`;

export default async function HostHotelPage() {
  const data: HostHotelPageData | null = await client.fetch(hostHotelQuery);

  if (!data) {
    return (
      <div>Host Hotel page content not found. Please add it in the Studio.</div>
    );
  }

  const { pageTitle, introduction, roomRates, ratesCaption, hotelImages } =
    data;
  const displayTitle = pageTitle || 'Host Hotel';

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>{displayTitle}</h1>

      {introduction && (
        <div style={{ margin: '2rem 0' }}>
          <PortableText value={introduction} />
        </div>
      )}

      {roomRates && roomRates.length > 0 && (
        <div style={{ margin: '3rem 0' }}>
          <h2>Room Rates</h2>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '1rem',
            }}
          >
            <thead>
              <tr
                style={{ borderBottom: '2px solid white', textAlign: 'left' }}
              >
                <th style={{ padding: '0.5rem' }}>Room Type</th>
                <th style={{ padding: '0.5rem' }}>Mon-Thurs</th>
                <th style={{ padding: '0.5rem' }}>Friday</th>
                <th style={{ padding: '0.5rem' }}>Saturday</th>
                <th style={{ padding: '0.5rem' }}>Sun-Mon</th>
              </tr>
            </thead>
            <tbody>
              {roomRates.map((row) => (
                <tr key={row._key} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>
                    {row.roomType || '-'}
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    {row.rateMonThruThurs || '-'}
                  </td>
                  <td style={{ padding: '0.5rem' }}>{row.rateFriday || '-'}</td>
                  <td style={{ padding: '0.5rem' }}>
                    {row.rateSaturday || '-'}
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    {row.rateSunThruMon || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {ratesCaption && (
            <p
              style={{
                marginTop: '0.5rem',
                fontSize: '0.9em',
                textAlign: 'center',
              }}
            >
              {ratesCaption}
            </p>
          )}
        </div>
      )}

      {hotelImages && hotelImages.length > 0 && (
        <div style={{ margin: '3rem 0' }}>
          <h2>Hotel Ammenities</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
              marginTop: '1rem',
            }}
          >
            {hotelImages.map((image) =>
              image.asset?.metadata?.dimensions?.width &&
              image.asset?.metadata?.dimensions?.height ? (
                <div key={image._key}>
                  <Image
                    src={urlFor(image)
                      .width(600)
                      .height(400)
                      .fit('crop')
                      .quality(75)
                      .url()}
                    alt={image.alt || 'Hotel image'}
                    width={image.asset.metadata.dimensions.width}
                    height={image.asset.metadata.dimensions.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                    placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
                    blurDataURL={image.asset.metadata?.lqip}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'cover',
                    }}
                  />
                  {image.caption && (
                    <p
                      style={{
                        fontSize: '0.85em',
                        marginTop: '0.25rem',
                        textAlign: 'center',
                      }}
                    >
                      {image.caption}
                    </p>
                  )}
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}
