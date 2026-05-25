import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const cabinSchema = defineType({
  name: 'cabin',
  title: 'Cabaña',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la cabaña',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'pricePerNight',
      title: 'Precio por noche (COP)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'maxGuests',
      title: 'Máximo de huéspedes',
      type: 'number',
      validation: Rule => Rule.required().min(1),
    }),
    defineField({
      name: 'photos',
      title: 'Fotos',
      type: 'array',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [
          defineField({
            name: 'alt',
            title: 'Texto alternativo',
            type: 'string',
          })
        ]
      }],
    }),
    defineField({
      name: 'amenities',
      title: 'Comodidades',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: '🔥 Fogata', value: 'fireplace' },
          { title: '🛁 Jacuzzi', value: 'jacuzzi' },
          { title: '📶 WiFi', value: 'wifi' },
          { title: '🅿️ Parqueadero', value: 'parking' },
          { title: '🍳 Cocina equipada', value: 'kitchen' },
          { title: '🌄 Vista al bosque', value: 'forest_view' },
          { title: '🌄 Vista al jardín', value: 'garden_view' },
          { title: '🔥 BBQ', value: 'bbq' },
          { title: '🍳 Antesala', value: 'livingroom' },
        ]
      }
    }),
  ],
  preview: {
    select: { title: 'name', media: 'photos.0' },
  },
})