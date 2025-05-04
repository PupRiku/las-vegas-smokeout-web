import { defineField, defineType } from 'sanity';
import { UserIcon } from '@sanity/icons'; // Example icon

export default defineType({
  name: 'attendee',
  title: 'Attendee Profile', // Name shown in the Studio list
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: "Attendee's display name.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Event Year',
      type: 'number',
      description:
        'The year this profile is associated with (e.g., 2025). Used for grouping.',
      // Add validation for a realistic year range
      validation: (Rule) =>
        Rule.required()
          .integer()
          .positive()
          .min(2018)
          .max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'photo',
      title: 'Photo (SFW)',
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
            "Required for accessibility. Usually the attendee's name.",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'location',
      title: 'Location (City, State / Country)',
      type: 'string',
      description: 'Optional: E.g., "Chicago, IL", "London, UK"',
      // Make this optional unless explicitly required
    }),
    defineField({
      name: 'attendedCount',
      title: '# Smokeouts Attended',
      type: 'number',
      description:
        'Optional: How many Smokeouts has this person attended? (Enter a number)',
      validation: (Rule) => Rule.integer().positive().min(1), // Must be 1 or more if entered
    }),
    defineField({
      name: 'caption',
      title: 'Optional Caption',
      type: 'string',
      description:
        'Optional: Any additional text the attendee provided with their submission.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
      year: 'year',
      media: 'photo',
    },
    prepare({ title, subtitle, year, media }) {
      // Customize the preview in the Studio list view
      return {
        title: `${title || 'Unnamed Attendee'} (${year || 'Year ?'})`,
        subtitle: subtitle || 'Location not provided',
        media: media || UserIcon, // Show photo or default icon
      };
    },
  },
  // Define default sorting for Attendee Profiles in the Studio
  orderings: [
    {
      title: 'Year, Newest First',
      name: 'yearDesc',
      by: [
        { field: 'year', direction: 'desc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Year, Oldest First',
      name: 'yearAsc',
      by: [
        { field: 'year', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
    {
      title: 'Name Ascending',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Name Descending',
      name: 'nameDesc',
      by: [{ field: 'name', direction: 'desc' }],
    },
  ],
});
