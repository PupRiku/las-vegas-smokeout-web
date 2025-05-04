import { defineField, defineType } from 'sanity';
import { FolderIcon } from '@sanity/icons'; // Example icon for a category/folder

export default defineType({
  name: 'linkCategory',
  title: 'Link Category',
  type: 'object', // This is an object type
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'categoryTitle',
      title: 'Category Title',
      type: 'string',
      description:
        'The heading for this group of links (e.g., "Las Vegas Cigar Shops").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array', // An array field
      description: 'The list of links within this category.',
      validation: (Rule) => Rule.required().min(1), // Require at least one link per category
      of: [
        { type: 'link' }, // Each item in the array must be of type 'link' (defined above)
      ],
    }),
  ],
  // Customize the preview for categories when shown inside an array
  preview: {
    select: {
      title: 'categoryTitle',
      linkCount: 'links.length', // Get the number of links in the array
    },
    prepare({ title, linkCount }) {
      const subtitle =
        typeof linkCount === 'number' ? `${linkCount} link(s)` : 'No links';
      return {
        title: title || 'Untitled Category',
        subtitle: subtitle,
        media: FolderIcon, // Use the icon in the preview
      };
    },
  },
});
