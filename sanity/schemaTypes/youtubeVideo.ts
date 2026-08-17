import { defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";

// Mirrors lib/data.ts's `youtubeVideos` — thumbnails shown in YouTubeTeaser.tsx.
export default defineType({
  name: "youtubeVideo",
  title: "YouTube Video",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", media: "thumbnail" },
  },
});
