import { defineField, defineType } from 'sanity';
import { ClipboardIcon } from '@sanity/icons'; // Example icon

export default defineType({
  name: 'schedulePage',
  title: 'Schedule Page', // Name shown in the singleton list
  type: 'document',
  icon: ClipboardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title (Internal)',
      type: 'string',
      initialValue: 'Event Schedule',
      readOnly: true,
    }),
    defineField({
      name: 'pageTitle',
      title: 'Page Display Title',
      type: 'string',
      description:
        'Optional: Title shown on the webpage (if different from "Event Schedule").',
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction Text (Optional)',
      type: 'blockContent', // Use shared rich text editor
      description:
        'Optional text to display above the schedule list on the webpage.',
    }),
    defineField({
      name: 'schedulePdf',
      title: 'Schedule PDF Download',
      type: 'file', // Use the 'file' type for uploads
      description:
        'Optional: Upload the schedule as a PDF file for users to download.',
      options: {
        accept: '.pdf', // Restrict uploads to PDF files only
      },
      // You could add fields to the uploaded file object if needed, e.g., a description
      // fields: [
      //   defineField({ name: 'description', type: 'string', title: 'File Description' })
      // ]
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Schedule Page Content',
        media: ClipboardIcon,
      };
    },
  },
});
