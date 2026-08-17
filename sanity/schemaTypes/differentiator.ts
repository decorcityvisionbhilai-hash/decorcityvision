import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons";

// Mirrors lib/data.ts's `differentiators` — the reviewer-praised points shown
// in Differentiators.tsx (3D previews, space planning, transparency, team).
export default defineType({
  name: "differentiator",
  title: "Differentiator",
  type: "document",
  icon: SparklesIcon,
  fields: [
    defineField({
      name: "icon",
      type: "string",
      options: { list: ["cuboid", "ruler", "eye", "users"] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "icon" },
  },
});
