import { defineField, defineType } from 'sanity';
import { PresentationIcon } from '@sanity/icons'; // Using PresentationIcon for showcasing

export default defineType({
  name: 'sponsorsPage',
  title: 'Sponsors Page', // Name shown in the singleton list
  type: 'document',
  icon: PresentationIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Internal)',
      type: 'string',
      initialValue: 'Sponsors',
      readOnly: true,
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Display Title',
      type: 'string',
      description:
        'Optional: Title shown on the webpage (if different from "Sponsors").',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction Text (Optional)',
      type: 'blockContent', // Use shared rich text editor
      description:
        'Optional text to display above the sponsor logos on the webpage (e.g., "A huge thank you to our generous sponsors!").',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Sponsors Page Content',
        media: PresentationIcon,
      };
    },
  },
});
