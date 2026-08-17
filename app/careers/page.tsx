import type { Metadata } from "next";
import SubPageHeader from "@/components/SubPageHeader";
import CareerListings from "@/components/CareerListings";
import StickyCTA from "@/components/StickyCTA";
import FooterV2 from "@/components/FooterV2";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: "Careers — Decorcity Vision",
    description:
      "Decorcity Vision ke saath career banayein — design, site execution, sales aur project management roles Bhilai mein. Apna resume email ya WhatsApp par bhejein.",
    keywords: content.seoKeywords,
    alternates: { canonical: "/careers" },
  };
}

export default async function CareersPage() {
  const content = await getContent();

  return (
    <main>
      <SubPageHeader
        eyebrow="Careers"
        title={
          <>
            Hamari Team <span className="italic text-gold">Join Karein.</span>
          </>
        }
        description="Design se lekar site execution tak — Decorcity Vision mein aapke liye growth aur real experience, dono hain."
      />

      <CareerListings
        jobs={content.jobOpenings}
        careersEmail={content.contact.careersEmail}
        whatsapp={content.contact.whatsapp}
      />

      <FooterV2
        contact={content.contact}
        youtubeChannelUrl={content.youtubeChannelUrl}
        developerCreditPrefix={content.developerCreditPrefix}
        developerCreditName={content.developerCreditName}
        developerCreditUrl={content.developerCreditUrl}
      />
      <StickyCTA whatsapp={content.contact.whatsapp} phone={content.contact.phones[0]} />
    </main>
  );
}
