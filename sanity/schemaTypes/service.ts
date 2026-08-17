import { defineField, defineType } from "sanity";
import { PackageIcon } from "@sanity/icons";

// Mirrors lib/data.ts's `servicesV2` — the concise homepage teaser grid.
// The full trade-by-trade catalog lives in `serviceCategory` below.
export default defineType({
  name: "service",
  title: "Service (homepage teaser)",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "icon",
      type: "string",
      description: "Key into the lucide-react icon map used by ServicesV2.tsx",
      options: {
        list: [
          "sofa",
          "chef-hat",
          "wrench",
          "lightbulb",
          "paint-bucket",
          "message-circle-question",
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title", title: "Title (English)", type: "string" }),
    defineField({ name: "titleHi", title: "Title (Hindi)", type: "string" }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({
      name: "swatch",
      type: "string",
      options: { list: ["clay", "gold", "moss"] },
      initialValue: "clay",
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "titleHi" },
  },
});
