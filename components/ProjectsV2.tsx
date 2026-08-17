"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Palmtree } from "lucide-react";
import { projectsV2 as staticProjects, FEATURED_PROJECTS_COUNT, contact as staticContact, type ProjectV2 } from "@/lib/data";
import ProjectCarousel from "./ProjectCarousel";

export default function ProjectsV2({
  variant = "home",
  items,
  whatsapp,
}: {
  variant?: "home" | "full";
  /** From Sanity's `project` documents — falls back to the static list when empty/unset. */
  items?: ProjectV2[] | null;
  whatsapp?: string;
}) {
  const resolvedProjects = items && items.length > 0 ? items : staticProjects;
  const projects = variant === "home" ? resolvedProjects.slice(0, FEATURED_PROJECTS_COUNT) : resolvedProjects;

  return (
    <section
      id="projects"
      className={
        variant === "home"
          ? "pt-12 md:pt-16 pb-16 md:pb-24 bg-sand"
          : "py-16 md:py-24 bg-cream"
      }
    >
      <div className="mx-auto max-w-6xl px-5">
        {variant === "home" && (
          <div className="text-center mb-12">
            <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">
              Hamare Projects
            </p>
            <h2 className="font-display text-3xl md:text-5xl">
              Har Project Ki, <span className="italic text-clayText">Poori Kahani.</span>
            </h2>
            <p className="text-ink/70 mt-4 max-w-lg mx-auto">
              Photos ghumaake dekhein aur jaanein kaunsa kaam kiya gaya —
              interior, plumbing, lighting ya renovation. Bhilai se Kerala tak.
            </p>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => {
            const isKerala = project.location?.includes("Kerala") ?? false;
            return (
              <motion.div
                key={project.title || project.images[0] || i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 2) * 0.1 }}
                className="rounded-3xl overflow-hidden border border-ink/5 bg-white shadow-sm"
              >
                <ProjectCarousel images={project.images} alt={project.title || "Project photo"} />

                <div className="p-6">
                  {project.title && (
                    <h3 className="font-display text-xl">{project.title}</h3>
                  )}
                  {project.location && (
                    <p
                      className={`flex items-center gap-1.5 text-sm mt-1 ${
                        isKerala ? "text-moss" : "text-ink/70"
                      }`}
                    >
                      <MapPin size={13} /> {project.location}
                      {isKerala && <Palmtree size={13} aria-hidden="true" />}
                    </p>
                  )}

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-3 py-1.5 rounded-full bg-clay/10 text-clayText"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {variant === "home" && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-cream transition-colors hover:bg-ink/85"
            >
              Sabhi Projects Dekhein <ArrowRight size={15} />
            </Link>
            <a
              href={whatsapp ?? staticContact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-ink transition hover:brightness-95"
            >
              <MessageCircle size={15} /> WhatsApp Karein
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
