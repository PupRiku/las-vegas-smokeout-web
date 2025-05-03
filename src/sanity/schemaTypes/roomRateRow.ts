import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'roomRateRow',
  title: 'Room Rate Row',
  type: 'object', // This is an object type, used within other schemas
  fields: [
    defineField({
      name: 'roomType',
      title: 'Room Type',
      type: 'string',
      description: 'e.g., Standard King, One Bedroom Suite',
      validation: (Rule) => Rule.required(),
    }),
    // Define fields for the relevant days of the week for rates. Adjust as needed.
    defineField({
      name: 'rateMonThruThurs',
      title: 'Mon-Thurs',
      type: 'string',
    }),
    defineField({
      name: 'rateFriday',
      title: 'Friday',
      type: 'string',
    }),
    defineField({
      name: 'rateSaturday',
      title: 'Saturday',
      type: 'string',
    }),
    defineField({
      name: 'rateSunThruMon',
      title: 'Sun-Mon',
      type: 'string',
    }),
  ],
  // Customize the preview for items in the array for better readability
  preview: {
    select: {
      // Select the fields you want to display in the preview
      title: 'roomType',
      monThurs: 'rateMonThruThurs',
      fri: 'rateFriday',
      sat: 'rateSaturday',
      sunMon: 'rateSunThruMon',
    },
    prepare({ title, monThurs, fri, sat, sunMon }) {
      // Combine the rates for a subtitle, filtering out empty ones
      const rates = [monThurs, fri, sat, sunMon].filter(Boolean).join(' | ');
      return {
        title: title || 'Unnamed Room Type',
        subtitle: rates || 'No rates entered',
      };
    },
  },
});
