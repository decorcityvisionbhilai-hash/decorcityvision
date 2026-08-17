import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

// Deliberately NOT force-static: this route reads NEXT_PUBLIC_SANITY_PROJECT_ID
// / DATASET at request time. Keeping it dynamic means a missing/unset env var
// only breaks a request to /studio itself, not the whole `next build`.

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
