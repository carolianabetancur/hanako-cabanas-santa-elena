import { defineType, defineField } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export const bookingSchema = defineType({
  name: "booking",
  title: "Reserva",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "cabin",
      title: "Cabaña",
      type: "reference",
      to: [{ type: "cabin" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "guestName",
      title: "Nombre del huésped",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "checkIn",
      title: "Fecha de entrada",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "checkOut",
      title: "Fecha de salida",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: [
          { title: "✅ Confirmada", value: "confirmed" },
          { title: "⏳ Pendiente", value: "pending" },
          { title: "❌ Cancelada", value: "cancelled" },
        ],
      },
      initialValue: "confirmed",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "guestName",
      subtitle: "checkIn",
      cabin: "cabin.name",
    },
    prepare({ title, subtitle, cabin }) {
      return {
        title: `${title} — ${cabin}`,
        subtitle: `Check-in: ${subtitle}`,
      };
    },
  },
});