import { PackageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'originalPrice',
      type: 'number',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'mainImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: { type: 'category' } })],
    }),
    defineField({
      name: 'badge',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'New' },
          { title: 'Sale', value: 'Sale' },
          { title: 'Bestseller', value: 'Bestseller' },
          { title: 'Limited', value: 'Limited' },
        ],
      },
    }),
    defineField({
      name: 'details',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'howToWear',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'materials',
      type: 'text',
      rows: 4,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'mainImage',
      subtitle: 'price',
    },
    prepare({ title, media, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `₹${subtitle}` : '',
        media,
      }
    },
  },
})
