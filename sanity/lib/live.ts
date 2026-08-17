import { defineLive } from "next-sanity";
import { client } from "./client";

// Powers "publish in Studio → the live site updates with no page refresh":
// `sanityFetch` (used inside sanity/lib/queries.ts) tags every fetch, and the
// <SanityLive /> component (rendered once in app/layout.tsx) holds an SSE
// connection to Sanity's Live Content API and calls router.refresh() the
// instant a tagged query's underlying data changes.
//
// Requires SANITY_API_READ_TOKEN in .env.local (a Viewer-role token from
// https://www.sanity.io/manage → API → Tokens) — without it, sanityFetch
// still works for one-off reads, but the live "no refresh needed" part won't
// activate.
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
});
