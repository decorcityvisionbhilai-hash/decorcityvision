#!/usr/bin/env node
// Pushes the same dummy openings from lib/data.ts's `jobOpenings` into a
// connected Sanity dataset as real `jobOpening` documents. Safe to re-run —
// each document has a fixed _id (deterministic from the title), so this
// updates existing seeded docs instead of duplicating them.
//
// Requires a project already connected (see scripts/sanity-dev.sh /
// `npx sanity init --env`) and a write token:
//   1. Create a token at https://www.sanity.io/manage → API → Tokens
//      (Editor role is enough).
//   2. Add it to .env.local as SANITY_API_WRITE_TOKEN=...
//   3. Run: npm run sanity:seed-jobs

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadEnvLocal() {
  try {
    const text = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
    for (const line of text.split("\n")) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
    }
  } catch {
    // .env.local not present yet — fall through to the missing-var check below.
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.\n" +
      "Run `npx sanity init --env` first to connect a project, then add a\n" +
      "write token to .env.local as SANITY_API_WRITE_TOKEN (see this file's header comment)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

// Same four roles as lib/data.ts's `jobOpenings` fallback — keep both in sync
// by hand if you edit one.
const JOB_OPENINGS = [
  {
    title: "Interior Designer",
    department: "Design",
    location: "Bhilai, Chhattisgarh",
    type: "Full-time",
    description:
      "Client requirements se lekar final design tak — space planning, material selection aur mood boards par kaam karenge.",
    requirements: [
      "Interior Design mein diploma/degree ya equivalent experience",
      "AutoCAD aur SketchUp ya similar design software",
      "Client ke saath directly baat karne mein comfortable",
      "1-3 saal ka relevant experience preferred",
    ],
    order: 0,
  },
  {
    title: "3D Visualization Artist",
    department: "Design",
    location: "Bhilai, Chhattisgarh",
    type: "Full-time",
    description:
      "Design team ke saath milkar photorealistic 3D renders banayenge — clients ko unka final ghar dikhane ke liye.",
    requirements: [
      "3ds Max / SketchUp + V-Ray ya Corona render experience",
      "Lighting aur material texturing ki achi samajh",
      "Deadlines ke saath kaam karne ki capability",
    ],
    order: 1,
  },
  {
    title: "Site Supervisor",
    department: "Site Execution",
    location: "Bhilai, Chhattisgarh",
    type: "Full-time",
    description:
      "Site par daily execution ka poora dhyaan — quality, timeline aur karigar coordination sambhalenge.",
    requirements: [
      "Civil/Interior site execution ka hands-on experience",
      "Material aur labour coordination ka experience",
      "Bhilai/Durg/Rajnandgaon ke sites par travel karne ke liye ready",
    ],
    order: 2,
  },
  {
    title: "Sales & Client Relations Executive",
    department: "Sales & Consultation",
    location: "Bhilai, Chhattisgarh",
    type: "Full-time",
    description:
      "Naye leads ko handle karenge — site visits schedule karna, consultation dena aur client relationship maintain karna.",
    requirements: [
      "Achi communication skills — Hindi aur English dono mein",
      "Sales ya client-facing role ka experience preferred",
      "Two-wheeler aur valid license (site visits ke liye)",
    ],
    order: 3,
  },
];

function slugify(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function run() {
  const tx = client.transaction();
  for (const job of JOB_OPENINGS) {
    const _id = `jobOpening-${slugify(job.title)}`;
    tx.createOrReplace({ _id, _type: "jobOpening", active: true, ...job });
  }
  await tx.commit();
  console.log(`Seeded ${JOB_OPENINGS.length} job openings into dataset "${dataset}".`);
}

run().catch((err) => {
  console.error("Seed failed:", err.message || err);
  process.exit(1);
});
