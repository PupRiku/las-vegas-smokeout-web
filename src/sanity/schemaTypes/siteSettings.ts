import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      description: 'The main title for the website (e.g., in browser tabs).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'facebookGroupUrl',
      title: 'Facebook Group URL',
      type: 'url',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email Address',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone Number',
      type: 'string',
      // No validation, optional
    }),
    defineField({
      name: 'footerText',
      title: 'Additional Footer Text',
      description: 'Optional text/links to appear in the site footer.',
      type: 'blockContent', // Reference the basic block content schema
    }),
  ],
  // Optional: Add a preview configuration for easier identification in the Studio
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
