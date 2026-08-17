export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

// Falls back to a placeholder instead of throwing at import time — this file
// is imported by sanity.config.ts, which the /studio route pulls in. Until a
// real .env.local is set up (see .env.local.example), `npm run build` and
// every other page must still succeed; only an actual visit to /studio (or a
// call to sanity/lib/queries.ts) should fail, with a clear message, when the
// project isn't configured yet.
export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || warnMissing("NEXT_PUBLIC_SANITY_DATASET");

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || warnMissing("NEXT_PUBLIC_SANITY_PROJECT_ID");

function warnMissing(name: string): string {
  if (typeof window === "undefined") {
    console.warn(
      `[sanity] Missing environment variable ${name} — copy .env.local.example to .env.local and fill in your Sanity project's values. /studio and any Sanity-backed data fetch will not work until then.`
    );
  }
  return "";
}
