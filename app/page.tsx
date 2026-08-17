import { MessageCircle, Images, Palmtree } from "lucide-react";
import ScrollExpandHero from "@/components/ScrollExpandHero";
import About from "@/components/About";
import ServicesV2 from "@/components/ServicesV2";
import Differentiators from "@/components/Differentiators";
import ProjectGrid from "@/components/ProjectGrid";
import ProjectsV2 from "@/components/ProjectsV2";
import KeralaBanner from "@/components/KeralaBanner";
import TestimonialsV2 from "@/components/TestimonialsV2";
import Team from "@/components/Team";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import AboutBanner from "@/components/AboutBanner";
import YouTubeTeaser from "@/components/YouTubeTeaser";
import InquiryV2 from "@/components/InquiryV2";
import StickyCTA from "@/components/StickyCTA";
import FooterV2 from "@/components/FooterV2";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";

// Re-fetches from Sanity at most once a minute so Studio edits reach the
// live site without a full redeploy — this page is otherwise statically
// generated at build time.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: "Decorcity Vision — Dekhiye Humara Kaam",
    description:
      "Decorcity Vision — interior designer, furniture manufacturer aur modular kitchen dealer, Bhilai, Durg, Rajnandgaon, Raipur & Kerala mein. 500+ ghar aur office ka kaam, photo aur video ke saath.",
    keywords: content.seoKeywords,
    alternates: { canonical: "/" },
  };
}

export default async function Home() {
  const content = await getContent();
  const { hero } = content;

  return (
    <main>
      <ScrollExpandHero
        mediaType={hero.mediaType}
        bgImageSrc={hero.backgroundImage}
        mediaSrc={hero.mediaType === "video" ? hero.media ?? hero.backgroundImage : hero.mediaImage ?? hero.backgroundImage}
        posterSrc={hero.mediaPoster ?? undefined}
        eyebrow={hero.eyebrow}
        titleLead={hero.titleLead}
        titleAccent={hero.titleAccent}
        scrollHint={hero.scrollHint}
      >
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-moss/40 bg-moss/20 px-4 py-1.5 text-xs font-medium text-cream md:text-sm">
            <Palmtree size={14} /> {hero.badgeText}
          </span>
          <p className="text-white/85 text-lg md:text-xl">{hero.subtitle}</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#gallery"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-white text-ink font-medium px-8 py-4 rounded-full text-base hover:bg-gold transition-colors duration-300"
            >
              <Images size={18} /> {hero.galleryCtaLabel}
            </a>
            <a
              href={content.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-[#25D366] text-ink font-medium px-8 py-4 rounded-full text-base hover:brightness-95 transition"
            >
              <MessageCircle size={20} /> {hero.whatsappCtaLabel}
            </a>
          </div>
        </div>
      </ScrollExpandHero>
      <About
        image={content.gallery[3]}
        whatsapp={content.contact.whatsapp}
        callAvailability={content.contact.callAvailability}
      />
      <ServicesV2 services={content.services} whatsapp={content.contact.whatsapp} />
      <Differentiators items={content.differentiators} whatsapp={content.contact.whatsapp} />
      <ProjectGrid items={content.gallery} whatsapp={content.contact.whatsapp} />
      <ProjectsV2 items={content.projects} whatsapp={content.contact.whatsapp} />
      <KeralaBanner whatsapp={content.contact.whatsapp} />
      <TestimonialsV2 items={content.testimonials} whatsapp={content.contact.whatsapp} />
      <Team members={content.teamMembers} whatsapp={content.contact.whatsapp} />
      <Process steps={content.processSteps} whatsapp={content.contact.whatsapp} />
      <FAQ faqs={content.faqs} whatsapp={content.contact.whatsapp} />
      <AboutBanner trustPoints={content.trustPoints} contact={content.contact} />
      <YouTubeTeaser videos={content.youtubeVideos} channelUrl={content.youtubeChannelUrl} />
      <InquiryV2
        contact={content.contact}
        services={content.services}
        catalog={content.serviceCatalog}
        budget={content.budgetConfig}
      />
      <FooterV2 contact={content.contact} youtubeChannelUrl={content.youtubeChannelUrl} developerCreditPrefix={content.developerCreditPrefix} developerCreditName={content.developerCreditName} developerCreditUrl={content.developerCreditUrl} />
      <StickyCTA whatsapp={content.contact.whatsapp} phone={content.contact.phones[0]} />
    </main>
  );
}
