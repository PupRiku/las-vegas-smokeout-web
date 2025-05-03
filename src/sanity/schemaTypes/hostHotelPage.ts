import { defineField, defineType, defineArrayMember } from 'sanity';
import { HomeIcon } from '@sanity/icons'; // Example icon, change if desired

export default defineType({
  name: 'hostHotelPage',
  title: 'Host Hotel Page',
  type: 'document',
  icon: HomeIcon, // Optional: Assign an icon

  fields: [
    defineField({
      name: 'title',
      title: 'Title (Internal)',
      type: 'string',
      initialValue: 'Host Hotel',
      readOnly: true, // For Studio use only
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Display Title',
      type: 'string',
      description:
        'Optional: Title shown on the actual webpage (if different from "Host Hotel").',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction & Booking Info',
      type: 'blockContent', // Use shared rich text editor
      description:
        'Describe the hotel, location, and how to book (include phone number, code word here).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roomRates',
      title: 'Room Rates Grid',
      description: 'Enter room types and their rates for the main event days.',
      type: 'array', // An array field
      of: [
        { type: 'roomRateRow' }, // Each item in the array uses the 'roomRateRow' object type
      ],
    }),
    defineField({
      name: 'ratesCaption',
      title: 'Rates Caption',
      type: 'string',
      description:
        'Caption displayed below the rates grid (e.g., "Resort fee waived for Smokeout attendees").',
    }),
    defineField({
      name: 'hotelImages',
      title: 'Hotel Images',
      description: 'Upload images of the hotel, casino, rooms, pool, etc.',
      type: 'array', // An array for multiple images
      of: [
        // Define the structure for each item in the image array
        defineArrayMember({
          type: 'image',
          title: 'Hotel Image',
          options: {
            hotspot: true, // Allows selecting focal point for cropping
          },
          fields: [
            // Add fields directly to the image type in the array
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Required for accessibility. Describe the image.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              type: 'string',
              title: 'Caption',
              description: 'Optional caption displayed with this image.',
            }),
          ],
        }),
      ],
      options: {
        layout: 'grid', // Display images in a grid layout in the Studio
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Host Hotel Page Content',
        media: HomeIcon, // Show icon in preview lists
      };
    },
  },
});
