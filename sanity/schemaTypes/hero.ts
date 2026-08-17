import { defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";

// Singleton — the home page hero (components/ScrollExpandHero.tsx via app/page.tsx).
// Two independent visuals: a full-bleed background image (always a photo, sets
// the mood behind the expanding panel) and the panel's own media, which can be
// either a short looping video or a static photo.
export default defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "backgroundImage",
      title: "Full-bleed background image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "mediaType",
      title: "Expanding panel media type",
      type: "string",
      options: { list: ["video", "image"], layout: "radio" },
      initialValue: "video",
    }),
    defineField({
      name: "media",
      title: "Panel video",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description:
        "Keep this small — under ~5MB, 10-15s loop, 720p. A heavy video here will slow down the homepage's first paint the same way the old hotlinked one did. Only used when media type is \"video\".",
      hidden: ({ document }) => document?.mediaType !== "video",
    }),
    defineField({
      name: "mediaPoster",
      title: "Video poster frame",
      type: "image",
      options: { hotspot: true },
      description: "Shown while the video loads — also improves perceived load speed.",
      hidden: ({ document }) => document?.mediaType !== "video",
    }),
    defineField({
      name: "mediaImage",
      title: "Panel image",
      type: "image",
      options: { hotspot: true },
      description: "Only used when media type is \"image\".",
      hidden: ({ document }) => document?.mediaType !== "image",
    }),
    defineField({ name: "eyebrow", type: "string", initialValue: "Decorcity Vision · Bhilai, Durg & Rajnandgaon" }),
    defineField({ name: "titleLead", type: "string", initialValue: "Ghar Ho To" }),
    defineField({ name: "titleAccent", type: "string", initialValue: "Aisa." }),
    defineField({ name: "scrollHint", type: "string", initialValue: "Scroll Karke Kaam Dekhein" }),
    defineField({ name: "badgeText", type: "string", initialValue: "Ab Kerala Mein Bhi Available" }),
    defineField({
      name: "subtitle",
      type: "text",
      rows: 2,
      initialValue: "Bhilai, Durg aur Rajnandgaon mein 500+ ghar aur office — khud aankhon se dekhiye.",
    }),
    defineField({ name: "galleryCtaLabel", type: "string", initialValue: "Hamara Kaam Dekhein" }),
    defineField({ name: "whatsappCtaLabel", type: "string", initialValue: "WhatsApp Karein" }),
  ],
  preview: {
    prepare() {
      return { title: "Hero" };
    },
  },
});
