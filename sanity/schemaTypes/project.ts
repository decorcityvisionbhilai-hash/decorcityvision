import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

// Mirrors lib/data.ts's `projectsV2` — named case-study projects shown on the
// homepage teaser and the full /portfolio listing.
export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "tags",
      title: "Service tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({ name: "featured", title: "Show in homepage teaser", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "images.0" },
    prepare({ title, subtitle, media }) {
      return { title: title || "Untitled Project", subtitle, media };
    },
  },
});
