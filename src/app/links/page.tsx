import { client } from '@/sanity/client';
import groq from 'groq';
import { PortableText } from '@portabletext/react';
import { LinksPageData } from '@/types/sanity';

const linksQuery = groq`
  *[_type == "linksPage" && _id == "linksPage"][0] {
    _id,
    pageTitle,
    introduction,
    linkCategories[]{ // Select the array of categories
      _key, // Include key for React lists
      categoryTitle,
      links[]{ // Select the array of links within each category
        _key, // Include key for React lists
        title,
        url,
        description
      }
    }
  }
`;

export default async function LinksPage() {
  const data: LinksPageData | null = await client.fetch(linksQuery);

  if (!data) {
    return (
      <div>Links page content not found. Please add it in the Studio.</div>
    );
  }

  const { pageTitle, introduction, linkCategories } = data;
  const displayTitle = pageTitle || 'Useful Links';

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h1>{displayTitle}</h1>

      {introduction && (
        <div style={{ margin: '2rem 0' }}>
          <PortableText value={introduction} />
        </div>
      )}

      <div style={{ marginTop: '3rem' }}>
        {linkCategories && linkCategories.length > 0 ? (
          linkCategories.map((category) => (
            // Render each category section
            <section key={category._key} style={{ marginBottom: '3rem' }}>
              {/* Category Title */}
              {category.categoryTitle && (
                <h2
                  style={{
                    borderBottom: '2px solid #eee',
                    paddingBottom: '0.5rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  {category.categoryTitle}
                </h2>
              )}

              {/* List of Links within Category */}
              {category.links && category.links.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {category.links.map((link) => (
                    <li key={link._key} style={{ marginBottom: '1rem' }}>
                      {/* Link Title and URL */}
                      {link.url && link.title ? (
                        <a
                          href={link.url}
                          target="_blank" // Open external links in new tab
                          rel="noopener noreferrer" // Security best practice for target="_blank"
                          style={{
                            fontSize: '1.1em',
                            textDecoration: 'underline',
                            color: 'blue',
                          }}
                        >
                          {link.title}
                        </a>
                      ) : (
                        // Display title even if URL is missing (though URL is required by schema)
                        <span style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
                          {link.title || 'Missing Link Title'}
                        </span>
                      )}

                      {/* Optional Link Description */}
                      {link.description && (
                        <p
                          style={{
                            fontSize: '0.9em',
                            margin: '0.25rem 0 0 0',
                            color: '#555',
                          }}
                        >
                          {link.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                // Message if a category has no links (shouldn't happen if required)
                <p>No links found in this category.</p>
              )}
            </section>
          ))
        ) : (
          // Message if no categories are found on the page
          <p>No link categories found. Add some in the Studio!</p>
        )}
      </div>
    </div>
  );
}
