'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool, type StructureResolver } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env';

import blockContent from './src/sanity/schemaTypes/blockContent';
import siteSettings from './src/sanity/schemaTypes/siteSettings';

/**
 * Custom Desk Structure Resolver
 * Defines how documents are organized in the Studio's sidebar.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management') // Title for the main sidebar list
    .items([
      // Manually add the Site Settings singleton item
      S.listItem()
        .title('Site Settings')
        .id('siteSettings') // Use a unique ID (schema name is good)
        .child(
          // When clicked, open this specific document
          S.document()
            .schemaType('siteSettings') // Use the schema type name
            .documentId('siteSettings') // Use the schema name as the document ID for the singleton
            .title('Site Settings') // Title for the editor pane
        ),

      // Add a visual separator
      S.divider(),

      // Add the rest of the document types automatically,
      // but filter out the one we handled manually ('siteSettings')
      ...S.documentTypeListItems().filter(
        (listItem) => !['siteSettings'].includes(listItem.getId() || '')
      ),
    ]);

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    types: [siteSettings, blockContent],
  },
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
