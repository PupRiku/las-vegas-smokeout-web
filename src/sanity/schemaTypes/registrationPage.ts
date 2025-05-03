import { defineField, defineType } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export default defineType({
  name: 'registrationPage',
  title: 'Registration Page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for the page in the Studio',
      initialValue: 'Registration',
      readOnly: true,
    }),
    defineField({
      name: 'pageContent',
      title: 'Page Content',
      type: 'blockContent',
      description:
        'Explain registration details: fees, policies, deadlines, etc.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'registrationOpenDate',
      title: 'Registration Opens Date & Time',
      type: 'datetime',
      description:
        'The date and time when the registration link/button should become active. Uses your local timezone.',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preRegistrationText',
      title: 'Text Before Registration Opens',
      type: 'string',
      description:
        'Text to display instead of the button BEFORE the "Registration Opens" date (e.g., "Registration opens May 10th!", "Details TBA").',
      initialValue: 'Registration Opens Soon',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'registrationUrl',
      title: 'External Registration URL',
      type: 'url',
      description:
        'The link to the external site where users register (only shown after the open date).',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
      // This field might be hidden in the frontend if internal registration is ever enabled
    }),
    defineField({
      name: 'registrationButtonText',
      title: 'Registration Button Text',
      type: 'string',
      description: 'Text for the button/link when registration IS open.',
      initialValue: 'Register Now',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openInNewWindow',
      title: 'Open Link in New Window?',
      type: 'boolean',
      description: 'Should the registration link open in a new browser tab?',
      initialValue: true,
    }),
    defineField({
      name: 'futureIntegrationNotes',
      title: 'Future Integration Notes (Internal)',
      type: 'text',
      description:
        'Internal notes about future plans (e.g., Stripe integration, payment system info). Not displayed on the website.',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Registration Page Content',
        media: DocumentTextIcon,
      };
    },
  },
});
