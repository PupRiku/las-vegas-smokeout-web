import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons'; // Example icon

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object', // This is an object type, used within other schemas
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Link Title',
      type: 'string',
      description: 'The text displayed for the link (e.g., "Google").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description:
        'The web address the link points to (e.g., "https://google.com").',
      // Add validation for URL format, allowing common schemes
      validation: (Rule) =>
        Rule.required().uri({
          allowRelative: false, // Typically want absolute URLs for external links
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'string',
      description: 'Optional short description or note about the link.',
    }),
  ],
  // Customize the preview for links when shown inside an array
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Link',
        subtitle: subtitle || 'No URL entered',
        media: LinkIcon, // Use the icon in the preview
      };
    },
  },
});
