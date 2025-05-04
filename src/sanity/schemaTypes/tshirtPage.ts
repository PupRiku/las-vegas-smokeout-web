import { defineField, defineType } from 'sanity';
import { TagIcon } from '@sanity/icons'; // Example icon

export default defineType({
  name: 'tshirtPage',
  title: 'T-Shirts Page', // This will appear in the singleton list
  type: 'document',
  icon: TagIcon, // Optional icon

  fields: [
    defineField({
      name: 'title',
      title: 'Title (Internal)',
      type: 'string',
      initialValue: 'T-Shirts',
      readOnly: true,
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Display Title',
      type: 'string',
      description:
        'Optional: Title shown on the webpage (if different from "T-Shirts").',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction Text',
      type: 'blockContent', // Use shared rich text editor
      description:
        'Describe the T-shirt ordering process. **Remember to include the last day to order here.**',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currentTshirt',
      title: "Current Year's T-Shirt Design",
      type: 'reference', // Link to a 'tshirtDesign' document
      description:
        'Select the T-shirt design document for the current event year.',
      to: [{ type: 'tshirtDesign' }], // Specifies that this must reference a tshirtDesign
      validation: (Rule) => Rule.required(),
      options: {
        // Optional: Prevent users from creating *new* designs directly from this page
        disableNew: true,
      },
    }),

    // --- Ordering Window ---
    defineField({
      name: 'orderStartDate',
      title: 'Ordering Opens Date & Time',
      type: 'datetime',
      description: 'When the order button/link should become active.',
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm', timeStep: 30 }, // Customize calendar options
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orderEndDate',
      title: 'Ordering Ends Date & Time',
      type: 'datetime',
      description:
        'When the order button/link should become inactive (deadline).',
      options: { dateFormat: 'YYYY-MM-DD', timeFormat: 'HH:mm', timeStep: 30 },
      validation: (Rule) => Rule.required(),
    }),

    // --- Order Link & Conditional Texts ---
    defineField({
      name: 'preOrderText',
      title: 'Text Before Ordering Opens',
      type: 'string',
      description:
        'Text displayed instead of button BEFORE the Order Start Date (e.g., "Ordering opens June 1st!").',
      initialValue: 'Ordering Opens Soon',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orderUrl',
      title: 'External Store URL',
      type: 'url',
      description:
        'Link to the site where T-shirts are ordered (this link is active during the order window).',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }).required(),
    }),
    defineField({
      name: 'orderButtonText',
      title: 'Order Button Text (During Window)',
      type: 'string',
      description: 'Text for the button/link when ordering IS active.',
      initialValue: 'Order Your T-Shirt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'postOrderText',
      title: 'Text After Ordering Ends',
      type: 'string',
      description:
        'Text displayed instead of button AFTER the Order End Date (e.g., "Ordering for this year has closed.").',
      initialValue: 'Ordering Closed',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openInNewWindow',
      title: 'Open Link in New Window?',
      type: 'boolean',
      description: 'Should the order link open in a new browser tab?',
      initialValue: true, // Default to true
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'T-Shirts Page Content',
        media: TagIcon,
      };
    },
  },
});
