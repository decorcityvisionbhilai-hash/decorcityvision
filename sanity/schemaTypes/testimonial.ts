import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

// Mirrors lib/data.ts's `testimonials` — real customer reviews. Enter actual
// reviews only; do not fabricate names or quotes here.
export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({ name: "name", title: "Customer name", type: "string" }),
    defineField({ name: "quote", type: "text", rows: 4 }),
    defineField({ name: "rating", type: "number", validation: (Rule) => Rule.min(1).max(5) }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "quote" },
  },
});
