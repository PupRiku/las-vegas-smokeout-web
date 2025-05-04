import { defineField, defineType } from 'sanity';
import { HeartIcon } from '@sanity/icons'; // Using HeartIcon to represent support

export default defineType({
  name: 'sponsor',
  title: 'Sponsor', // Name shown in the Studio list
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Sponsor Name',
      type: 'string',
      description:
        'The official name of the sponsoring organization or individual.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Sponsor Logo',
      type: 'image',
      description: "Upload the sponsor's logo image.",
      options: {
        hotspot: true, // Generally useful for images, though less critical for logos
      },
      validation: (Rule) => Rule.required(),
      fields: [
        // Add required alt text field
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description:
            "Required for accessibility. Please enter the sponsor's name.",
          // Removed dynamic initialValue due to potential inconsistencies
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL (Optional)',
      type: 'url',
      description: "Optional: Link to the sponsor's website.",
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }), // Validate URL format
    }),
  ],
  preview: {
    select: {
      title: 'name',
      level: 'sponsorLevel',
      media: 'logo',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Unnamed Sponsor',
        media: media || HeartIcon, // Show logo or default icon
      };
    },
  },
  // Define default sorting for Sponsors in the Studio lists
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    // Could add sorting by Level if desired
    // { title: 'Level', name: 'levelAsc', by: [{ field: 'sponsorLevel', direction: 'asc' }, { field: 'name', direction: 'asc' }] },
  ],
});
