import { cache } from "react";
import * as queries from "@/sanity/lib/queries";
import * as staticData from "@/lib/data";

// The single place the rest of the app asks for content. Every field is
// resolved here: try Sanity, fall back to lib/data.ts's static content on any
// error (unconfigured project, network issue, empty dataset) or when a
// document/collection simply hasn't been created in Studio yet. Nothing
// downstream needs to know or care which source it actually came from.
//
// Wrapped in React's cache() so calling getContent() from multiple Server
// Components in the same request (layout, page, nested pages) only hits
// Sanity once.

async function safe<T>(promise: Promise<T>): Promise<T | null> {
  try {
    return await promise;
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[sanity] fetch failed, using static fallback:", err);
    }
    return null;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

// `override` comes from an untyped `client.fetch()` call (effectively
// `unknown`); accept it loosely and merge whatever fields it has over
// `fallback`'s concrete shape, skipping anything null/unset — recursively,
// so a nested object (e.g. `contact.hours`) falls back field-by-field too.
// Filling in just `hours.days` in Studio and leaving `open`/`close` blank
// still shows the code defaults for those two, not a blank/missing value.
function mergeDefined<T>(fallback: T, override: unknown): T {
  if (!isPlainObject(fallback) || !isPlainObject(override)) return fallback;
  const result: Record<string, unknown> = { ...fallback };
  for (const key of Object.keys(override)) {
    const value = override[key];
    if (value === null || value === undefined) continue;
    const fallbackValue = (fallback as Record<string, unknown>)[key];
    result[key] =
      isPlainObject(fallbackValue) && isPlainObject(value)
        ? mergeDefined(fallbackValue, value)
        : value;
  }
  return result as T;
}

// `list` comes from an untyped `client.fetch()` call (effectively `unknown`);
// accept it loosely and always resolve to `fallback`'s concrete shape.
function pickList<T>(list: unknown, fallback: T[]): T[] {
  const value = list as T[] | null | undefined;
  return value && value.length > 0 ? value : fallback;
}

export const getContent = cache(async function getContent() {
  const [
    siteSettings,
    hero,
    budgetConfig,
    trustPoints,
    services,
    serviceCatalog,
    differentiators,
    processSteps,
    testimonials,
    teamMembers,
    gallery,
    projects,
    faqs,
    youtubeVideos,
    jobOpenings,
  ] = await Promise.all([
    safe(queries.getSiteSettings()),
    safe(queries.getHero()),
    safe(queries.getBudgetConfig()),
    safe(queries.getTrustPoints()),
    safe(queries.getServices()),
    safe(queries.getServiceCatalog()),
    safe(queries.getDifferentiators()),
    safe(queries.getProcessSteps()),
    safe(queries.getTestimonials()),
    safe(queries.getTeamMembers()),
    safe(queries.getGallery()),
    safe(queries.getProjects()),
    safe(queries.getFaqs()),
    safe(queries.getYoutubeVideos()),
    safe(queries.getJobOpenings()),
  ]);

  const settings = siteSettings as {
    serviceAreas?: string[];
    youtubeChannelUrl?: string;
    developerCreditPrefix?: string;
    developerCreditName?: string;
    developerCreditUrl?: string;
    seo?: { keywords?: string[] };
  } | null;

  const contact = mergeDefined(staticData.contact, siteSettings);
  const serviceAreas = pickList(settings?.serviceAreas, staticData.serviceAreas);
  const youtubeChannelUrl = settings?.youtubeChannelUrl || staticData.youtubeChannelUrl;
  const developerCreditPrefix = settings?.developerCreditPrefix || staticData.developerCreditPrefix;
  const developerCreditName = settings?.developerCreditName || staticData.developerCreditName;
  const developerCreditUrl = settings?.developerCreditUrl || staticData.developerCreditUrl;
  const seoKeywords = pickList(settings?.seo?.keywords, staticData.seoKeywords);

  const heroContent = mergeDefined(staticData.heroContent, hero);

  return {
    contact,
    serviceAreas,
    youtubeChannelUrl,
    developerCreditPrefix,
    developerCreditName,
    developerCreditUrl,
    seoKeywords,
    hero: heroContent,
    budgetConfig: (budgetConfig as typeof staticData.budgetConfig | null) ?? staticData.budgetConfig,
    trustPoints: pickList(trustPoints, staticData.trustPoints),
    services: pickList(services, [...staticData.servicesV2]),
    serviceCatalog: pickList(serviceCatalog, staticData.serviceCatalog.map((c) => ({ ...c, items: [...c.items] }))),
    differentiators: pickList(differentiators, staticData.differentiators),
    processSteps: pickList(processSteps, staticData.processSteps),
    testimonials: pickList(testimonials, staticData.testimonials),
    teamMembers: pickList(teamMembers, staticData.team),
    gallery: pickList(gallery, staticData.gallery),
    projects: pickList(projects, staticData.projectsV2),
    faqs: pickList(faqs, staticData.faqs),
    youtubeVideos: pickList(youtubeVideos, staticData.youtubeVideos),
    jobOpenings: pickList(jobOpenings, staticData.jobOpenings),
  };
});

export type Content = Awaited<ReturnType<typeof getContent>>;
