import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import groq from 'groq';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { HomePageData } from '@/types/sanity';

const homePageQuery = groq`
  *[_type == "homePage" && _id == "homePage"][0] {
    _id, // Include _id if needed as key
    welcomeHeadline,
    mainImage {
      alt, // Get alt text defined in the image field
      asset->{ // Expand the reference to get asset details
        _id,
        url,
        metadata { // Get metadata like dimensions and LQIP
          dimensions,
          lqip
        }
      }
    },
    briefDescription,
    announcements
  }
`;

export default async function Page() {
  const data: HomePageData | null = await client.fetch(homePageQuery);

  if (!data) {
    return <div>Home page content not found. Please add it in the Studio.</div>;
  }

  const { welcomeHeadline, mainImage, briefDescription, announcements } = data;

  return (
    <div>
      {mainImage?.asset && (
        <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
          <Image
            src={urlFor(mainImage).width(1600).quality(80).url()}
            alt={mainImage.alt || 'Main event image'}
            width={mainImage.asset.metadata?.dimensions?.width}
            height={mainImage.asset.metadata?.dimensions?.height}
            sizes="(max-width: 800px) 100vw, 800px"
            priority
            placeholder={mainImage.asset.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={mainImage.asset.metadata?.lqip}
            style={{
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
            }}
          />
        </div>
      )}

      {welcomeHeadline && (
        <h1
          style={{ fontSize: '2.5rem', textAlign: 'center', margin: '2rem 0' }}
        >
          {welcomeHeadline}
        </h1>
      )}

      {briefDescription && (
        <div style={{ maxWidth: '700px', margin: '0 auto 2rem auto' }}>
          <PortableText value={briefDescription} />
        </div>
      )}

      {announcements && announcements.length > 0 && (
        <div
          style={{
            maxWidth: '700px',
            margin: '2rem auto',
            padding: '1rem',
            border: '1px solid lightgray',
          }}
        >
          <h2>Announcements</h2>
          {/* Since each item in announcements is a block object, render them together */}
          <PortableText value={announcements} />
        </div>
      )}
    </div>
  );
}
