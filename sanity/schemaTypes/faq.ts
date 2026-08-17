import { defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

// Mirrors components/FAQ.tsx's question/answer list.
export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({ name: "q", title: "Question", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "a", title: "Answer", type: "text", rows: 4 }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "q" },
  },
});
