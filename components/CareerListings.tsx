"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  Sparkles,
  Users,
  Wallet,
  GraduationCap,
  MapPin,
  Briefcase,
  Send,
} from "lucide-react";
import { jobOpenings as staticJobOpenings, contact as staticContact, type JobOpening } from "@/lib/data";

const PERKS = [
  {
    icon: Sparkles,
    title: "Real Projects, Real Impact",
    description: "Din 1 se hi live client projects par kaam — sirf training nahi, asli experience.",
  },
  {
    icon: GraduationCap,
    title: "3D Design & Site Skills",
    description: "Design software se lekar site execution tak — dono taraf ka hands-on kaam seekhein.",
  },
  {
    icon: Users,
    title: "Chhota, Close-Knit Team",
    description: "Har voice sunayi jaati hai — bade corporate setup jaisi bureaucracy nahi.",
  },
  {
    icon: Wallet,
    title: "Fair Pay, On Time",
    description: "Timely salary aur growth ke saath — jo kaam karta hai, use uski value milti hai.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Resume Bhejein",
    description: "Neeche diye button se apna resume email ya WhatsApp par bhejein.",
  },
  {
    number: "02",
    title: "Hum Review Karte Hain",
    description: "Hamari team aapka profile dekhti hai aur role se match karti hai.",
  },
  {
    number: "03",
    title: "Baat Cheet",
    description: "Match hone par hum call ya in-person milte hain — koi lambi process nahi.",
  },
  {
    number: "04",
    title: "Join Karein",
    description: "Offer finalize hone ke baad, seedha team mein shamil ho jayein.",
  },
];

function applyMailto(email: string, jobTitle?: string) {
  const subject = jobTitle
    ? `Application for ${jobTitle} — Decorcity Vision`
    : "Job Application — Decorcity Vision";
  const body = jobTitle
    ? `Namaste,\n\nMain "${jobTitle}" role ke liye apply karna chahta/chahti hoon. Mera resume attach kiya hai.\n\nDhanyawad.`
    : `Namaste,\n\nMain Decorcity Vision ke saath kaam karna chahta/chahti hoon. Mera resume attach kiya hai.\n\nDhanyawad.`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function JobCard({ job, email, index }: { job: JobOpening; email: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: (index % 4) * 0.08, duration: 0.5 }}
      className="rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl">{job.title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-ink/60">
            {job.department && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-clay/10 px-3 py-1 font-medium text-clayText">
                <Briefcase size={12} /> {job.department}
              </span>
            )}
            {job.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={12} /> {job.location}
              </span>
            )}
            {job.type && <span>{job.type}</span>}
          </div>
        </div>
      </div>

      {job.description && (
        <p className="mt-4 text-sm text-ink/70 leading-relaxed">{job.description}</p>
      )}

      {job.requirements && job.requirements.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {job.requirements.map((req) => (
            <li key={req} className="flex items-start gap-2 text-sm text-ink/70">
              <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-clay/60" />
              {req}
            </li>
          ))}
        </ul>
      )}

      <a
        href={applyMailto(email, job.title)}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-ink/85"
      >
        <Send size={14} /> Apply Karein
      </a>
    </motion.div>
  );
}

export default function CareerListings({
  jobs,
  careersEmail,
  whatsapp,
}: {
  /** From Sanity's `jobOpening` documents — no fabricated fallback listings. */
  jobs?: JobOpening[] | null;
  careersEmail?: string | null;
  whatsapp?: string;
}) {
  const resolvedJobs = jobs && jobs.length > 0 ? jobs : staticJobOpenings;
  const resolvedEmail = careersEmail ?? staticContact.careersEmail;
  const resolvedWhatsapp = whatsapp ?? staticContact.whatsapp;

  return (
    <>
      {/* Why join us */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-12">
            <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">
              Kyun Join Karein
            </p>
            <h2 className="font-display text-3xl md:text-5xl">
              Hamare Saath, <span className="italic text-clayText">Grow Karein.</span>
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PERKS.map((perk, i) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-ink/5 bg-white p-6 shadow-sm"
              >
                <perk.icon size={22} strokeWidth={1.25} className="text-clayText" />
                <h3 className="mt-4 font-display text-lg">{perk.title}</h3>
                <p className="mt-2 text-sm text-ink/70 leading-relaxed">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="bg-sand py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-5">
          <div className="text-center mb-12">
            <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">
              Open Positions
            </p>
            <h2 className="font-display text-3xl md:text-5xl">
              Abhi <span className="italic text-clayText">Hiring Mein.</span>
            </h2>
          </div>

          {resolvedJobs.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {resolvedJobs.map((job, i) => (
                <JobCard key={job.title} job={job} email={resolvedEmail} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-ink/10 bg-white p-10 text-center shadow-sm">
              <p className="font-display text-xl">Abhi koi specific opening nahi hai.</p>
              <p className="mt-2 text-sm text-ink/70">
                Lekin hum hamesha talented log ko milne ke liye open hain — apna resume
                bhejein, jab bhi role khulega hum sabse pehle aapko contact karenge.
              </p>
              <a
                href={applyMailto(resolvedEmail)}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
              >
                <Mail size={17} /> Resume Bhejein
              </a>
            </div>
          )}
        </div>
      </section>

      {/* How to apply */}
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 text-center">
          <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">
            Apply Kaise Karein
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Aasan <span className="italic text-clayText">4 Steps.</span>
          </h2>

          <div className="relative mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-ink/10 lg:block" />
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative text-left"
              >
                <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-clay bg-cream font-display text-lg text-clayText">
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-ink/70 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={applyMailto(resolvedEmail)}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-ink/85"
            >
              <Mail size={17} /> Email Par Bhejein
            </a>
            <a
              href={resolvedWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
            >
              <MessageCircle size={17} /> WhatsApp Par Bhejein
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
