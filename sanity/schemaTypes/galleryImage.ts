import { defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

// Mirrors lib/data.ts's `gallery` — the filterable photo grid (ProjectGrid.tsx).
export default defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "category",
      type: "string",
      description:
        "Free text — the filter pills on the site's Photo Gallery are generated automatically from whatever categories exist here. Common ones so far: Kitchen, Living Room, Bedroom, Office, Exterior. Type a new one (e.g. \"Custom Work\") to add a new filter.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
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
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
