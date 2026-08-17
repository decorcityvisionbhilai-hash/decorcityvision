import { defineField, defineType } from "sanity";
import { NumberIcon } from "@sanity/icons";

// Singleton — mirrors lib/data.ts's `budgetConfig` (the InquiryV2 budget slider bounds).
export default defineType({
  name: "budgetSettings",
  title: "Budget Slider Settings",
  type: "document",
  icon: NumberIcon,
  fields: [
    defineField({ name: "min", type: "number", initialValue: 10000 }),
    defineField({ name: "max", type: "number", initialValue: 2500000 }),
    defineField({ name: "step", type: "number", initialValue: 10000 }),
    defineField({ name: "defaultValue", title: "Default", type: "number", initialValue: 500000 }),
  ],
  preview: {
    prepare() {
      return { title: "Budget Slider Settings" };
    },
  },
});
