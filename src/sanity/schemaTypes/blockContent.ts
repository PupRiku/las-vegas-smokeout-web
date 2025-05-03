import { defineType, defineArrayMember } from 'sanity';

/**
 * This is the schema definition for the rich text fields used for
 * most basic block content in the dataset.
 * */
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      // Styles let you set what textual styles are available (H1, H2, Normal, Quote, etc.)
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      // Lists let you specify list types
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      // Marks let you specify inline text styles
      marks: {
        // Decorators render inline styles like bold, italic.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
          { title: 'Subscript', value: 'sub' },
          { title: 'Superscript', value: 'sup' },
        ],
        // Annotations can be any object structure – e.g. links or internal references.
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types to the array, like images, if needed within rich text
    // defineArrayMember({
    //   type: 'image',
    //   options: {hotspot: true},
    // }),
  ],
});
