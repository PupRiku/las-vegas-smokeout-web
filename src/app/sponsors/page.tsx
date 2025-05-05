import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import groq from 'groq';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { SponsorsPageCombinedData } from '@/types/sanity';

const sponsorsQuery = groq`
  {
    // Fetch the singleton page data
    "pageData": *[_type == "sponsorsPage" && _id == "sponsorsPage"][0] {
      _id,
      pageTitle,
      introduction
    },
    // Fetch all sponsor documents, ordered by displayOrder then name
    // Sanity typically puts nulls last with 'asc' order for displayOrder
    "sponsors": *[_type == "sponsor"] | order(displayOrder asc, name asc) {
      _id,
      name,
      websiteUrl,
      sponsorLevel, // Fetch level if you might use it for styling/grouping
      logo {
        alt,
        asset->{ // Expand asset reference
          _id,
          url,
          metadata { dimensions, lqip }
        }
      }
    }
  }
`;

export default async function SponsorsPage() {
  const data: SponsorsPageCombinedData | null =
    await client.fetch(sponsorsQuery);

  const pageData = data?.pageData;
  const sponsors = data?.sponsors || [];
  const displayTitle = pageData?.pageTitle || 'Sponsors';

  return (
    <div style={{ maxWidth: '1000px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>{displayTitle}</h1>

      {pageData?.introduction && (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <PortableText value={pageData.introduction} />
        </div>
      )}
      <div style={{ margin: '3rem 0' }}>
        {sponsors.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
            }}
          >
            {sponsors.map((sponsor) =>
              sponsor.logo?.asset ? (
                <div key={sponsor._id} style={{ textAlign: 'center' }}>
                  {sponsor.websiteUrl ? (
                    <a
                      href={sponsor.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${sponsor.name}`}
                    >
                      <Image
                        src={urlFor(sponsor.logo)
                          .height(120)
                          .fit('max')
                          .quality(80)
                          .url()} // Set max height, let width adjust
                        alt={sponsor.logo.alt || sponsor.name || 'Sponsor logo'}
                        width={
                          sponsor.logo.asset.metadata?.dimensions?.width || 150
                        }
                        height={
                          sponsor.logo.asset.metadata?.dimensions?.height || 120
                        }
                        sizes="(max-width: 480px) 30vw, 150px"
                        placeholder={
                          sponsor.logo.asset.metadata?.lqip ? 'blur' : 'empty'
                        }
                        blurDataURL={sponsor.logo.asset.metadata?.lqip}
                        style={{
                          display: 'inline-block',
                          maxHeight: '120px',
                          width: 'auto',
                        }}
                      />
                    </a>
                  ) : (
                    <div>
                      <Image
                        src={urlFor(sponsor.logo)
                          .height(120)
                          .fit('max')
                          .quality(80)
                          .url()}
                        alt={sponsor.logo.alt || sponsor.name || 'Sponsor logo'}
                        width={
                          sponsor.logo.asset.metadata?.dimensions?.width || 150
                        }
                        height={
                          sponsor.logo.asset.metadata?.dimensions?.height || 120
                        }
                        sizes="(max-width: 480px) 30vw, 150px"
                        placeholder={
                          sponsor.logo.asset.metadata?.lqip ? 'blur' : 'empty'
                        }
                        blurDataURL={sponsor.logo.asset.metadata?.lqip}
                        style={{
                          display: 'inline-block',
                          maxHeight: '120px',
                          width: 'auto',
                        }}
                      />
                    </div>
                  )}
                  <p style={{ marginTop: '0.5rem', fontSize: '0.9em' }}>
                    {sponsor.name}
                  </p>
                </div>
              ) : (
                <div
                  key={sponsor._id}
                  style={{
                    textAlign: 'center',
                    fontStyle: 'italic',
                    color: '#666',
                  }}
                >
                  {sponsor.name || 'Sponsor logo missing'}
                </div>
              )
            )}
          </div>
        ) : (
          // Message if no sponsors found
          <p style={{ marginTop: '1rem', textAlign: 'center' }}>
            Sponsors will be listed here soon!
          </p>
        )}
      </div>
    </div>
  );
}
