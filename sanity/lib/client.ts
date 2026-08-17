import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // CDN is fine for published, public marketing content — flip to false if
  // you need to preview drafts with a read token.
  useCdn: true,
});
