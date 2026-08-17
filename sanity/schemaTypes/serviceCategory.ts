import { defineField, defineType } from "sanity";
import { UlistIcon } from "@sanity/icons";

// Mirrors lib/data.ts's `serviceCatalog` — the full trade-by-trade list shown
// on /services (False Ceiling, Furniture Work, Renovation Work, Civil Work,
// Paint Work, Windows, Railing, Decorative Items).
export default defineType({
  name: "serviceCategory",
  title: "Service Category",
  type: "document",
  icon: UlistIcon,
  fields: [
    defineField({ name: "category", title: "Category name", type: "string" }),
    defineField({
      name: "swatch",
      type: "string",
      options: { list: ["clay", "gold", "moss"] },
      initialValue: "clay",
    }),
    defineField({
      name: "items",
      title: "Line items",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "category", items: "items" },
    prepare({ title, items }) {
      return { title, subtitle: `${items?.length || 0} items` };
    },
  },
});
