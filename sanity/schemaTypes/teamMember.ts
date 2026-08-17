import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

// Mirrors components/Team.tsx's TEAM array — real employees, real photos only.
export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "role", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "photo",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
