import { createClient } from 'next-sanity';

// Read projectId and dataset from environment variables
// Ensure environment variables are defined by asserting non-null '!'
// or add checks/defaults if needed.
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-01'; // Use current date format YYYY-MM-DD

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: process.env.NODE_ENV === 'production', // Use CDN only in production
  // If you need perspective Browse for drafts/preview:
  // perspective: 'published', // Default 'raw' requires token, 'published' is simplest for read-only data
  // token: process.env.SANITY_API_READ_TOKEN // Required for 'raw' perspective or drafts
  // stega: { // Enable/disable stega based on environment (optional, for visual editing/overlays)
  //   enabled: process.env.NODE_ENV === 'development',
  //   studioUrl: '/studio' // Or your studio location
  // }
});
