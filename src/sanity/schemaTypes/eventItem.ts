import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons'; // Example icon

export default defineType({
  name: 'eventItem',
  title: 'Event Item', // Name shown in the Studio list
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDateTime',
      title: 'Start Date & Time',
      type: 'datetime',
      description: 'The primary date/time used for sorting.',
      validation: (Rule) => Rule.required(),
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm', timeStep: 15 }, // Customize time steps
    }),
    defineField({
      name: 'endDateTime',
      title: 'End Date & Time (Optional)',
      type: 'datetime',
      description:
        "Leave blank if it's a single point in time or duration is unclear.",
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm', timeStep: 15 },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description:
        'E.g., "Tuscany Ballroom A", "Poolside", "Meet at Lobby", "TBA"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (Optional)',
      type: 'blockContent', // Use the shared rich text editor for details
    }),
    // --- Conditional Fields ---
    defineField({
      name: 'requiresExtraCost',
      title: 'Requires Extra Cost?',
      type: 'boolean',
      description: 'Check this box if the event has an additional fee.',
      initialValue: false, // Default to false
      options: { layout: 'checkbox' }, // Display as checkbox
    }),
    defineField({
      name: 'costDetails',
      title: 'Cost Details',
      type: 'string',
      description:
        'Only shown if "Requires Extra Cost" is checked. E.g., "$25 per person", "See organizer for details".',
      // Conditional visibility: hide this field unless the 'requiresExtraCost' field in the same document is true
      hidden: ({ parent }) => !parent?.requiresExtraCost,
    }),
    defineField({
      name: 'isOffSite',
      title: 'Is Off-Site?',
      type: 'boolean',
      description:
        'Check this box if the event takes place away from the host hotel.',
      initialValue: false,
      options: { layout: 'checkbox' },
    }),
    defineField({
      name: 'offSiteAddress',
      title: 'Off-Site Address',
      type: 'text', // Use 'text' for potentially multi-line addresses
      rows: 3,
      description: 'Only shown if "Is Off-Site" is checked.',
      // Conditional visibility: hide this field unless 'isOffSite' is true
      hidden: ({ parent }) => !parent?.isOffSite,
    }),
    // --- Optional Contact ---
    defineField({
      name: 'organizerContact',
      title: 'Organizer Contact (Optional)',
      type: 'string',
      description:
        'Optional: Name, email, or phone for the event contact person.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      startTime: 'startDateTime',
      location: 'location',
    },
    prepare({ title, startTime, location }) {
      // Format date/time for a readable preview subtitle
      const time = startTime
        ? new Date(startTime).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })
        : '';
      const date = startTime
        ? new Date(startTime).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })
        : '';
      const subtitle =
        `${date} ${time} ${location ? ' @ ' + location : ''}`.trim();
      return {
        title: title || 'Untitled Event',
        subtitle: subtitle,
        media: CalendarIcon, // Use the schema icon in previews
      };
    },
  },
  // Define default sorting for Event Items when viewed in lists in the Studio
  orderings: [
    {
      title: 'Start Time, Ascending',
      name: 'startTimeAsc',
      by: [{ field: 'startDateTime', direction: 'asc' }],
    },
    {
      title: 'Start Time, Descending',
      name: 'startTimeDesc',
      by: [{ field: 'startDateTime', direction: 'desc' }],
    },
  ],
});
