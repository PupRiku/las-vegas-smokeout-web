import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons'; // Using TagIcon as an example

export default defineType({
  name: 'tshirtDesign',
  title: 'T-Shirt Design', // This will appear in the Studio list
  type: 'document',
  icon: TagIcon, // Optional icon
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'The year this T-shirt design was for (e.g., 2024).',
      // Basic validation: required, integer, positive, realistic year range
      validation: (Rule) =>
        Rule.required()
          .integer()
          .positive()
          .min(2000)
          .max(new Date().getFullYear() + 5),
    }),
    defineField({
      name: 'designImage',
      title: 'Design Image',
      type: 'image',
      options: { hotspot: true }, // Allow focal point selection
      validation: (Rule) => Rule.required(),
      fields: [
        // Add required alt text field to the image
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description:
            'Required for accessibility. Describe the T-shirt design.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'string',
      description:
        "Optional brief description about this year's design or theme.",
    }),
  ],
  preview: {
    select: {
      title: 'year',
      media: 'designImage',
      description: 'description',
    },
    prepare({ title, media, description }) {
      // Customize how each design appears in lists within the Studio
      return {
        title: `T-Shirt Design ${title || '(Unknown Year)'}`,
        subtitle: description,
        media: media || TagIcon, // Show image thumbnail or icon
      };
    },
  },
  // Define default sorting for lists of T-Shirt Designs in the Studio
  orderings: [
    {
      title: 'Year, Newest First',
      name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }],
    },
    {
      title: 'Year, Oldest First',
      name: 'yearAsc',
      by: [{ field: 'year', direction: 'asc' }],
    },
  ],
});
