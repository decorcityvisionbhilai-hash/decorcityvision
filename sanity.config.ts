"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "default",
  title: "Decorcity Vision",
  basePath: "/studio",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  schema: {
    types: schemaTypes,
  },

  plugins: [
    structureTool({ structure }),
    visionTool({
      defaultApiVersion: apiVersion,
    }),
  ],
});
