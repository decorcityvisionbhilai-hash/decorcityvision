import { sanityFetch } from "./live";

// Each function below returns data shaped to match the corresponding export
// in lib/data.ts exactly (same field names/types), so swapping a component
// from the static import to one of these is a mechanical, same-shape change:
//
//   - import { contact } from "@/lib/data";
//   + import { getSiteSettings } from "@/sanity/lib/queries";
//   + const contact = await getSiteSettings();
//
// Every fetch goes through `sanityFetch` (see sanity/lib/live.ts) so it's
// tagged for Sanity's Live Content API — publishing in Studio pushes an
// update to any open page via <SanityLive />, no manual refresh needed.

async function fetchLive(query: string) {
  const { data } = await sanityFetch({ query });
  return data;
}

export async function getSiteSettings() {
  return fetchLive(`*[_type == "siteSettings"][0]{
    businessName,
    "logo": logo.asset->url,
    phones,
    emails,
    address,
    latitude,
    longitude,
    mapEmbedUrl,
    "whatsapp": whatsappLink,
    hours,
    callAvailability,
    serviceAreas,
    youtubeChannelUrl,
    socialLinks,
    careersEmail,
    developerCreditPrefix,
    developerCreditName,
    developerCreditUrl,
    seo
  }`);
}

export async function getBudgetConfig() {
  return fetchLive(`*[_type == "budgetSettings"][0]{
    min,
    max,
    step,
    "default": defaultValue
  }`);
}

export async function getHero() {
  return fetchLive(`*[_type == "hero"][0]{
    "backgroundImage": backgroundImage.asset->url,
    mediaType,
    "media": media.asset->url,
    "mediaPoster": mediaPoster.asset->url,
    "mediaImage": mediaImage.asset->url,
    eyebrow,
    titleLead,
    titleAccent,
    scrollHint,
    badgeText,
    subtitle,
    galleryCtaLabel,
    whatsappCtaLabel
  }`);
}

export async function getProcessSteps() {
  return fetchLive(`*[_type == "processStep"] | order(order asc){ number, title, description }`);
}

export async function getTrustPoints() {
  return fetchLive(`*[_type == "trustPoint"] | order(order asc){ icon, label }`);
}

export async function getServices() {
  return fetchLive(`*[_type == "service"] | order(order asc){
    icon, title, titleHi, description, swatch
  }`);
}

export async function getServiceCatalog() {
  return fetchLive(`*[_type == "serviceCategory"] | order(order asc){
    category, swatch, items
  }`);
}

export async function getDifferentiators() {
  return fetchLive(`*[_type == "differentiator"] | order(order asc){
    icon, title, description
  }`);
}

export async function getTestimonials() {
  return fetchLive(`*[_type == "testimonial"] | order(order asc){ name, quote, rating }`);
}

export async function getTeamMembers() {
  return fetchLive(`*[_type == "teamMember"] | order(order asc){
    "id": _id, name, role, "photo": photo.asset->url
  }`);
}

export async function getGallery() {
  return fetchLive(`*[_type == "galleryImage"] | order(order asc){
    title, category, "image": image.asset->url
  }`);
}

export async function getProjects() {
  return fetchLive(`*[_type == "project"] | order(order asc){
    title, location, tags, "images": images[].asset->url
  }`);
}

export async function getFeaturedProjects() {
  return fetchLive(`*[_type == "project" && featured == true] | order(order asc){
    title, location, tags, "images": images[].asset->url
  }`);
}

export async function getFaqs() {
  return fetchLive(`*[_type == "faq"] | order(order asc){ q, a }`);
}

export async function getLocations() {
  return fetchLive(`*[_type == "locationStudio"]{
    name, address, latitude, longitude, accent, comingSoon
  }`);
}

export async function getYoutubeVideos() {
  return fetchLive(`*[_type == "youtubeVideo"] | order(order asc){
    title, "thumbnail": thumbnail.asset->url, url
  }`);
}

export async function getJobOpenings() {
  return fetchLive(`*[_type == "jobOpening" && active != false] | order(order asc){
    title, department, location, type, description, requirements
  }`);
}
