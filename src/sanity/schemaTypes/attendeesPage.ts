import { defineField, defineType } from 'sanity';
import { UsersIcon } from '@sanity/icons'; // Example icon

export default defineType({
  name: 'attendeesPage',
  title: 'Attendees Page', // Name shown in the singleton list
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Internal)',
      type: 'string',
      initialValue: 'Attendees',
      readOnly: true,
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Display Title',
      type: 'string',
      description:
        'Optional: Title shown on the webpage (if different from "Attendees").',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction / Submission Info',
      type: 'blockContent', // Use shared rich text editor
      description:
        'Optional text describing the gallery and explaining how attendees can submit their photo/info.',
    }),
    defineField({
      name: 'submissionEmail',
      title: 'Submission Email Address',
      type: 'email', // Use built-in email type for basic format validation
      description:
        'The email address attendees should use to submit their profile info.',
      validation: (Rule) => Rule.required(), // Make email required for the page's purpose
    }),
    defineField({
      name: 'currentYear',
      title: 'Current Event Year',
      type: 'number',
      description:
        'IMPORTANT: Specify the year for which attendees should be displayed on the main gallery page. This controls the main view.',
      // Add validation for a realistic year range
      validation: (Rule) =>
        Rule.required()
          .integer()
          .positive()
          .min(2018)
          .max(new Date().getFullYear() + 1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Attendees Page Content',
        media: UsersIcon,
      };
    },
  },
});
