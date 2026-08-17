import { defineField, defineType } from "sanity";
import { PinIcon } from "@sanity/icons";

// Mirrors components/LocationMap.tsx usage in InquiryV2.tsx — the live Bhilai
// studio (comingSoon: false) and the Kerala studio placeholder (comingSoon: true).
export default defineType({
  name: "locationStudio",
  title: "Studio Location",
  type: "document",
  icon: PinIcon,
  fields: [
    defineField({ name: "name", title: "Label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "address", type: "text", rows: 2 }),
    defineField({ name: "latitude", type: "number" }),
    defineField({ name: "longitude", type: "number" }),
    defineField({
      name: "accent",
      type: "string",
      options: { list: ["gold", "moss"] },
      initialValue: "gold",
    }),
    defineField({
      name: "comingSoon",
      title: "Show as \"Coming Soon\" (no live map tiles)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "address" },
  },
});
