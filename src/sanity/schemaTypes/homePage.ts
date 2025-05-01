import { defineField, defineType, defineArrayMember } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  // No singleton property needed - handled by Desk Structure

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal title for the Home Page document in the Studio',
      initialValue: 'Home Page',
      // You could make this readOnly if it never needs changing:
      // readOnly: true,
    }),
    defineField({
      name: 'welcomeHeadline',
      title: 'Welcome Headline',
      type: 'string',
      description: 'The main large text headline for the page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      description: 'The primary visual for the home page.',
      options: {
        hotspot: true, // Allows selecting focal point for image cropping
      },
      fields: [
        // Adding an explicit alt text field is good practice for accessibility
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description:
            'Important for SEO and accessiblity. Describe the image.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'briefDescription',
      title: 'Brief Event Description',
      type: 'blockContent', // Use the shared blockContent schema
      description: 'A short introductory paragraph about the event.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'announcements',
      title: 'Announcements',
      description:
        'Add short announcements or updates here. They will appear on the home page.',
      type: 'array',
      of: [
        // Define the allowed 'block' type directly within this array
        defineArrayMember({
          // Using defineArrayMember helper
          title: 'Announcement Text', // Title for the item type within the array
          type: 'block', // Specify the 'block' type directly
          // Keep styling options simple for announcements
          styles: [{ title: 'Normal', value: 'normal' }],
          // Disallow lists within announcements? (Optional)
          lists: [],
          // Allow basic marks (bold, italic) and links
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [{ title: 'URL', name: 'href', type: 'url' }],
              },
            ],
          },
        }),
        // If you wanted to allow simple images within announcements too, you could add:
        // defineArrayMember({
        //   type: 'image',
        //   options: {hotspot: true}
        // })
      ],
    }),
  ],
  preview: {
    // Customizes the preview title in the Studio list (though we link directly)
    prepare() {
      return {
        title: 'Home Page Content',
      };
    },
  },
});
