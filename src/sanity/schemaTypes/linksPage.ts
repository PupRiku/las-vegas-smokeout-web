import { defineField, defineType } from 'sanity';
// Reuse LinkIcon or choose another like DocumentsIcon
import { LinkIcon as PageIcon } from '@sanity/icons';

export default defineType({
  name: 'linksPage',
  title: 'Links Page', // Name shown in the singleton list
  type: 'document',
  icon: PageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Internal)',
      type: 'string',
      initialValue: 'Links',
      readOnly: true,
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Display Title',
      type: 'string',
      description:
        'Optional: Title shown on the webpage (if different from "Links").',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction Text (Optional)',
      type: 'blockContent', // Use shared rich text editor
      description: 'Optional text to display above the list of links.',
    }),
    defineField({
      name: 'linkCategories',
      title: 'Link Categories',
      description: 'Add categories first, then add links within each category.',
      type: 'array', // An array field
      validation: (Rule) => Rule.required().min(1), // Require at least one category
      of: [
        { type: 'linkCategory' }, // Each item must be of type 'linkCategory' (defined above)
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Links Page Content',
        media: PageIcon,
      };
    },
  },
});
