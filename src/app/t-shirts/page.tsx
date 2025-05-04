import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import groq from 'groq';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { TShirtPageData } from '@/types/sanity';

const tShirtsQuery = groq`
  *[_type == "tshirtPage" && _id == "tshirtPage"][0] {
    _id, // Use _id as key if needed
    pageTitle,
    introduction,
    orderStartDate,
    orderEndDate,
    preOrderText,
    orderUrl,
    orderButtonText,
    postOrderText,
    openInNewWindow,
    // Expand the currentTshirt reference directly
    "currentDesign": currentTshirt-> {
      _id, year, description, designImage { alt, asset->{_id, url, metadata { dimensions, lqip }} }
    },
    // Fetch past designs using the parent reference (_ref) to exclude the current one
    "pastDesigns": *[_type == "tshirtDesign" && _id != ^.currentTshirt._ref] | order(year desc) {
       _id, year, description, designImage { alt, asset->{_id, url, metadata { dimensions, lqip }} }
    }
  }
`;

export default async function TShirtsPage() {
  const data: TShirtPageData | null = await client.fetch(tShirtsQuery);

  if (!data) {
    return (
      <div>T-Shirts page content not found. Please add it in the Studio.</div>
    );
  }

  const {
    pageTitle,
    introduction,
    orderStartDate,
    orderEndDate,
    preOrderText,
    orderUrl,
    orderButtonText,
    postOrderText,
    openInNewWindow,
    currentDesign,
    pastDesigns,
  } = data;

  const displayTitle = pageTitle || 'T-Shirts';

  const now = new Date();
  const startDate = orderStartDate ? new Date(orderStartDate) : null;
  const endDate = orderEndDate ? new Date(orderEndDate) : null;

  let showOrderButton = false;
  let orderStatusText = preOrderText || 'Ordering opens soon.';

  if (startDate && endDate) {
    if (now >= startDate && now <= endDate) {
      showOrderButton = true;
    } else if (now > endDate) {
      orderStatusText = postOrderText || 'Ordering closed.';
    }
  } else if (startDate && !endDate) {
    if (now >= startDate) {
      showOrderButton = true;
    }
  } else {
    // If no dates set, maybe default to pre-order text or hide entirely?
    // Let's stick with preOrderText default from above.
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>{displayTitle}</h1>
      {introduction && (
        <div style={{ margin: '2rem 0' }}>
          <PortableText value={introduction} />
        </div>
      )}

      {currentDesign?.designImage?.asset && (
        <div
          style={{
            margin: '3rem 0',
            textAlign: 'center',
            paddingBottom: '2rem',
            borderBottom: '1px solid #eee',
          }}
        >
          <h2>Current Design ({currentDesign.year || 'Year ?'})</h2>
          {currentDesign.description && (
            <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
              {currentDesign.description}
            </p>
          )}
          <div style={{ maxWidth: '500px', margin: '1rem auto' }}>
            <Image
              src={urlFor(currentDesign.designImage)
                .width(1000)
                .quality(80)
                .url()}
              alt={
                currentDesign.designImage.alt || `T-Shirt ${currentDesign.year}`
              }
              width={
                currentDesign.designImage.asset.metadata?.dimensions?.width ||
                500
              }
              height={
                currentDesign.designImage.asset.metadata?.dimensions?.height ||
                500
              }
              sizes="(max-width: 500px) 100vw, 500px"
              placeholder={
                currentDesign.designImage.asset.metadata?.lqip
                  ? 'blur'
                  : 'empty'
              }
              blurDataURL={currentDesign.designImage.asset.metadata?.lqip}
              style={{
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
              }}
            />
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            {showOrderButton && orderUrl ? (
              <a
                href={orderUrl}
                target={openInNewWindow ? '_blank' : '_self'}
                rel={openInNewWindow ? 'noopener noreferrer' : undefined}
                style={{
                  display: 'inline-block',
                  padding: '0.8rem 1.5rem',
                  backgroundColor: 'green',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                }}
              >
                {orderButtonText || 'Order Now'}
              </a>
            ) : (
              <p style={{ fontWeight: 'bold' }}>{orderStatusText}</p>
            )}
          </div>
        </div>
      )}

      {pastDesigns && pastDesigns.length > 0 && (
        <div style={{ margin: '3rem 0' }}>
          <h2>Past Designs</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginTop: '1rem',
            }}
          >
            {pastDesigns.map((design) =>
              design.designImage?.asset ? (
                <div key={design._id}>
                  <Image
                    src={urlFor(design.designImage)
                      .width(400)
                      .quality(75)
                      .url()}
                    alt={design.designImage.alt || `T-Shirt ${design.year}`}
                    width={
                      design.designImage.asset.metadata?.dimensions?.width ||
                      200
                    }
                    height={
                      design.designImage.asset.metadata?.dimensions?.height ||
                      200
                    }
                    sizes="(max-width: 480px) 50vw, 200px"
                    placeholder={
                      design.designImage.asset.metadata?.lqip ? 'blur' : 'empty'
                    }
                    blurDataURL={design.designImage.asset.metadata?.lqip}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'contain',
                    }}
                  />
                  <p
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      marginTop: '0.5rem',
                    }}
                  >
                    {design.year}
                  </p>
                  {design.description && (
                    <p style={{ fontSize: '0.85em', textAlign: 'center' }}>
                      {design.description}
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
