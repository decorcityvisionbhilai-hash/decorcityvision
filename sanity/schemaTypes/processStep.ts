import { defineField, defineType } from "sanity";
import { StackCompactIcon } from "@sanity/icons";

// Mirrors the STEPS array in components/Process.tsx.
export default defineType({
  name: "processStep",
  title: "Process Step",
  type: "document",
  icon: StackCompactIcon,
  fields: [
    defineField({ name: "number", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", type: "text", rows: 2 }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "number" },
  },
});
