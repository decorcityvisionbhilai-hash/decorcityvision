import type { Metadata } from "next";
import SubPageHeader from "@/components/SubPageHeader";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectsV2 from "@/components/ProjectsV2";
import StickyCTA from "@/components/StickyCTA";
import FooterV2 from "@/components/FooterV2";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: "Poora Portfolio — Decorcity Vision",
    description:
      "Decorcity Vision ke sabhi completed interior design, furniture aur renovation projects — Bhilai, Durg, Rajnandgaon se Kerala tak, ek hi jagah.",
    keywords: content.seoKeywords,
    alternates: { canonical: "/portfolio" },
  };
}

export default async function PortfolioPage() {
  const content = await getContent();

  return (
    <main>
      <SubPageHeader
        eyebrow="Hamara Portfolio"
        title={
          <>
            Poora <span className="italic text-gold">Portfolio.</span>
          </>
        }
        description="Har photo, har project — interior, plumbing, lighting ya renovation, Bhilai se Kerala tak."
      />

      <ProjectGrid items={content.gallery} whatsapp={content.contact.whatsapp} />

      <section className="bg-cream pt-0 pb-6">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">
            Hamare Projects
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Har Project Ki, <span className="italic text-clayText">Poori Kahani.</span>
          </h2>
        </div>
      </section>
      <ProjectsV2 variant="full" items={content.projects} whatsapp={content.contact.whatsapp} />

      <FooterV2 contact={content.contact} youtubeChannelUrl={content.youtubeChannelUrl} developerCreditPrefix={content.developerCreditPrefix} developerCreditName={content.developerCreditName} developerCreditUrl={content.developerCreditUrl} />
      <StickyCTA whatsapp={content.contact.whatsapp} phone={content.contact.phones[0]} />
    </main>
  );
}
