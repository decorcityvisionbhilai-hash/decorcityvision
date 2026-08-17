import type { Metadata } from "next";
import ServiceCatalog from "@/components/ServiceCatalog";
import SubPageHeader from "@/components/SubPageHeader";
import StickyCTA from "@/components/StickyCTA";
import FooterV2 from "@/components/FooterV2";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: "Poori Service List — Decorcity Vision",
    description:
      "Decorcity Vision ke sabhi services — interior design, false ceiling, furniture, renovation, civil, paint, windows, railing aur decor — Bhilai, Durg, Rajnandgaon aur Raipur mein.",
    keywords: content.seoKeywords,
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage() {
  const content = await getContent();

  return (
    <main>
      <SubPageHeader
        eyebrow="Hamari Services"
        title={
          <>
            Poori <span className="italic text-gold">Service List.</span>
          </>
        }
        description="False ceiling se lekar decor tak — ghar ya office ka har kaam, ek hi team se."
      />

      <ServiceCatalog catalog={content.serviceCatalog} whatsapp={content.contact.whatsapp} />

      <FooterV2 contact={content.contact} youtubeChannelUrl={content.youtubeChannelUrl} developerCreditPrefix={content.developerCreditPrefix} developerCreditName={content.developerCreditName} developerCreditUrl={content.developerCreditUrl} />
      <StickyCTA whatsapp={content.contact.whatsapp} phone={content.contact.phones[0]} />
    </main>
  );
}
