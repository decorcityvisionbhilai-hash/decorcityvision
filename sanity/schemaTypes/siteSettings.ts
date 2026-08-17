import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

// Singleton — mirrors lib/data.ts's `contact` export plus the SEO-facing
// fields (seoKeywords, siteUrl) that currently live as separate consts.
export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "businessName", type: "string", initialValue: "Decorcity Vision" }),
    defineField({
      name: "logo",
      title: "Logo mark",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "phones",
      title: "Phone numbers",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "emails",
      title: "Email addresses",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "address", title: "Studio address", type: "text", rows: 2 }),
    defineField({ name: "latitude", type: "number" }),
    defineField({ name: "longitude", type: "number" }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Maps embed URL",
      type: "url",
      description: "The src= value from Google Maps' \"Embed a map\" share dialog for this business's real listing.",
    }),
    defineField({ name: "whatsappLink", title: "WhatsApp link (wa.link/wa.me)", type: "url" }),
    defineField({
      name: "hours",
      title: "Studio visiting hours",
      type: "object",
      fields: [
        defineField({ name: "days", type: "string", initialValue: "Roz Khula" }),
        defineField({ name: "open", type: "string", initialValue: "09:00 AM" }),
        defineField({ name: "close", type: "string", initialValue: "08:30 PM" }),
      ],
    }),
    defineField({
      name: "callAvailability",
      title: "Phone/WhatsApp consultation availability",
      type: "string",
      initialValue: "24x7 Phone & WhatsApp Consultation",
    }),
    defineField({
      name: "serviceAreas",
      title: "Cities actively served",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["Bhilai", "Durg", "Rajnandgaon", "Raipur"],
    }),
    defineField({ name: "youtubeChannelUrl", title: "YouTube channel URL", type: "url" }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "object",
      description: "Leave a field blank to hide that icon everywhere on the site instead of showing a broken/placeholder link.",
      fields: [
        defineField({ name: "instagram", title: "Instagram URL", type: "url" }),
        defineField({ name: "facebook", title: "Facebook URL", type: "url" }),
      ],
    }),
    defineField({
      name: "careersEmail",
      title: "Careers email (resume applications)",
      type: "string",
      description: "Falls back to the first general contact email if left blank.",
    }),
    defineField({
      name: "developerCreditPrefix",
      title: "Footer developer credit — prefix text",
      type: "string",
      initialValue: "Developed and managed by",
    }),
    defineField({
      name: "developerCreditName",
      title: "Footer developer credit — company name (linked)",
      type: "string",
      initialValue: "Googlixlabs",
    }),
    defineField({
      name: "developerCreditUrl",
      title: "Footer developer credit — link URL",
      type: "url",
      initialValue: "https://googlixlabs.com",
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "keywords", type: "array", of: [{ type: "string" }] }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
