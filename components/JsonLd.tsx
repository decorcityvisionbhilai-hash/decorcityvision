import {
  contact as staticContact,
  serviceAreas as staticServiceAreas,
  seoKeywords as staticKeywords,
  siteUrl,
  youtubeChannelUrl as staticChannelUrl,
} from "@/lib/data";

export default function JsonLd({
  contact,
  serviceAreas,
  keywords,
  youtubeChannelUrl,
}: {
  /** From Sanity's `siteSettings` singleton — falls back to static contact info when unset. */
  contact?: Partial<typeof staticContact> | null;
  serviceAreas?: string[] | null;
  keywords?: string[] | null;
  youtubeChannelUrl?: string | null;
}) {
  const resolvedContact = { ...staticContact, ...contact };
  const resolvedServiceAreas = serviceAreas && serviceAreas.length > 0 ? serviceAreas : staticServiceAreas;
  const resolvedKeywords = keywords && keywords.length > 0 ? keywords : staticKeywords;
  const resolvedChannelUrl = youtubeChannelUrl ?? staticChannelUrl;

  const business = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${siteUrl}/#business`,
    name: "Decorcity Vision",
    image: `${siteUrl}/logo-full.png`,
    logo: `${siteUrl}/logo-mark.png`,
    url: siteUrl,
    telephone: resolvedContact.phones[0],
    email: resolvedContact.emails[0],
    description:
      "Interior designer, furniture manufacturer, painting studio and Vastu consultant serving Bhilai, Durg, Rajnandgaon and Raipur since 2011.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Decorcity Vision, Avantibai Chowk, near Ashirwad Tiles Shop, Kripal Nagar, Bhilai",
      addressLocality: "Bhilai",
      addressRegion: "Chhattisgarh",
      postalCode: "490023",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: resolvedContact.latitude,
      longitude: resolvedContact.longitude,
    },
    hasMap: resolvedContact.mapEmbedUrl,
    areaServed: [...resolvedServiceAreas, "Kerala"].map((name) => ({
      "@type": "City",
      name,
    })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "20:30",
    },
    sameAs: [resolvedChannelUrl, resolvedContact.socialLinks?.instagram, resolvedContact.socialLinks?.facebook].filter(
      Boolean
    ),
    keywords: resolvedKeywords.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      // Content is fully static/server-authored — no user input reaches this JSON.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
    />
  );
}
