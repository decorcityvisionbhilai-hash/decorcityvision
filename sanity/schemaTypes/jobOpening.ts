import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

// Mirrors lib/data.ts's `jobOpenings` — real, currently-open roles shown on
// /careers. Leave `active` off (or delete the document) once a role is
// filled instead of leaving a stale listing up.
export default defineType({
  name: "jobOpening",
  title: "Job Opening",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "department",
      type: "string",
      options: {
        list: [
          "Design",
          "Site Execution",
          "Sales & Consultation",
          "Project Management",
          "Carpentry & Furniture",
          "Office & Admin",
        ],
      },
    }),
    defineField({ name: "location", type: "string", initialValue: "Bhilai, Chhattisgarh" }),
    defineField({
      name: "type",
      type: "string",
      options: { list: ["Full-time", "Part-time", "Internship", "Contract"] },
      initialValue: "Full-time",
    }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({
      name: "requirements",
      title: "Requirements / what we're looking for",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "active",
      title: "Currently open",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide this listing from /careers without deleting it.",
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
  ],
  orderings: [
    { name: "orderAsc", title: "Order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "department", active: "active" },
    prepare({ title, subtitle, active }) {
      return { title, subtitle: active === false ? `${subtitle} (closed)` : subtitle };
    },
  },
});
