import { defineField, defineType } from "sanity";
import { CheckmarkCircleIcon } from "@sanity/icons";

// Mirrors lib/data.ts's `trustPoints` — small badge grid on About/AboutBanner.
export default defineType({
  name: "trustPoint",
  title: "Trust Point",
  type: "document",
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: "icon",
      type: "string",
      description: "Key into the lucide-react icon map used by AboutBanner.tsx",
      options: {
        list: [
          "home",
          "star",
          "history",
          "shield-check",
          "award",
          "rupee",
          "phone-call",
          "palmtree",
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "label", subtitle: "icon" },
  },
});
