'use client';

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool, type StructureResolver } from 'sanity/structure';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from './src/sanity/env';

import blockContent from '@/sanity/schemaTypes/blockContent';
import siteSettings from '@/sanity/schemaTypes/siteSettings';
import homePage from '@/sanity/schemaTypes/homePage';
import registrationPage from '@/sanity/schemaTypes/registrationPage';
import hostHotelPage from '@/sanity/schemaTypes/hostHotelPage';
import roomRateRow from '@/sanity/schemaTypes/roomRateRow';
import tshirtPage from '@/sanity/schemaTypes/tshirtPage';
import tshirtDesign from '@/sanity/schemaTypes/tshirtDesign';
import schedulePage from '@/sanity/schemaTypes/schedulePage';
import eventItem from '@/sanity/schemaTypes/eventItem';
import attendeesPage from '@/sanity/schemaTypes/attendeesPage';
import attendee from '@/sanity/schemaTypes/attendee';

/**
 * Custom Desk Structure Resolver
 * Defines how documents are organized in the Studio's sidebar.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content Management')
    .items([
      S.listItem()
        .title('Attendees Page')
        .id('attendeesPage')
        .icon(attendeesPage.icon) // Optional: use icon from schema
        .child(
          S.document()
            .schemaType('attendeesPage')
            .documentId('attendeesPage')
            .title('Attendees Page Content')
        ),
      S.listItem()
        .title('Schedule Page')
        .id('schedulePage')
        .icon(schedulePage.icon) // Optional: use icon from schema
        .child(
          S.document()
            .schemaType('schedulePage')
            .documentId('schedulePage')
            .title('Schedule Page Content')
        ),
      S.listItem()
        .title('T-Shirts Page')
        .id('tshirtPage')
        .icon(tshirtPage.icon) // Optional: use icon from schema
        .child(
          S.document()
            .schemaType('tshirtPage')
            .documentId('tshirtPage')
            .title('T-Shirts Page Content')
        ),
      S.listItem()
        .title('Host Hotel Page')
        .id('hostHotelPage')
        .icon(hostHotelPage.icon) // Optional: use icon from schema
        .child(
          S.document()
            .schemaType('hostHotelPage')
            .documentId('hostHotelPage')
            .title('Host Hotel Page Content')
        ),
      S.listItem()
        .title('Registration Page')
        .id('registrationPage')
        .icon(registrationPage.icon)
        .child(
          S.document()
            .schemaType('registrationPage')
            .documentId('registrationPage')
            .title('Registration Page Content')
        ),
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page Content')
        ),
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
        (listItem) =>
          ![
            'siteSettings',
            'homePage',
            'registrationPage',
            'hostHotelPage',
            'tshirtPage',
            'schedulePage',
            'attendeesPage',
          ].includes(listItem.getId() || '')
      ),
    ]);

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema: {
    types: [
      siteSettings,
      homePage,
      registrationPage,
      hostHotelPage,
      tshirtPage,
      tshirtDesign,
      schedulePage,
      eventItem,
      attendeesPage,
      attendee,
      blockContent,
      roomRateRow,
    ],
  },
  plugins: [
    structureTool({ structure }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
