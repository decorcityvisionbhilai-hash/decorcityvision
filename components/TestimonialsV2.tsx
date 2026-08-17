"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Star, MessageCircle } from "lucide-react";
import { testimonials as staticTestimonials, contact as staticContact } from "@/lib/data";

type Testimonial = { name: string; quote: string };

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

function TestimonialsColumn({
  items,
  duration = 22,
  className = "",
}: {
  items: Testimonial[];
  duration?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: shouldReduceMotion ? "0%" : "-50%" }}
        transition={{
          duration: shouldReduceMotion ? 0 : duration,
          repeat: shouldReduceMotion ? 0 : Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="m-0 flex list-none flex-col gap-5 p-0"
      >
        {[0, 1].map((dup) =>
          items.map((t, i) => (
            <motion.li
              key={`${dup}-${t.name}`}
              aria-hidden={dup === 1}
              tabIndex={dup === 1 ? -1 : 0}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 20 } }}
              className="w-full max-w-xs shrink-0 select-none rounded-2xl border border-ink/10 bg-white p-6 shadow-sm"
            >
              <blockquote className="m-0 p-0">
                <div className="mb-3 flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-ink/75">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-5 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-clay/10 font-display text-xs text-clayText">
                    {initials(t.name)}
                  </span>
                  <cite className="font-display not-italic text-ink">{t.name}</cite>
                </footer>
              </blockquote>
            </motion.li>
          ))
        )}
      </motion.ul>
    </div>
  );
}

export default function TestimonialsV2({
  items,
  whatsapp,
}: {
  /** From Sanity's `testimonial` documents — falls back to the static list when empty/unset. */
  items?: Testimonial[] | null;
  whatsapp?: string;
}) {
  const resolvedTestimonials = items && items.length > 0 ? items : staticTestimonials;
  const columns = [
    resolvedTestimonials.slice(0, 2),
    resolvedTestimonials.slice(2, 4),
    resolvedTestimonials.slice(4, 6),
  ];

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-12 text-center">
          <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">
            Log Kya Kehte Hain
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Real Log, <span className="italic text-clayText">Real Reviews.</span>
          </h2>
        </div>

        <div
          className="flex max-h-[620px] justify-center gap-5 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
          role="region"
          aria-label="Google reviews"
        >
          <TestimonialsColumn items={columns[0]} duration={20} />
          <TestimonialsColumn items={columns[1]} duration={26} className="hidden sm:block" />
          <TestimonialsColumn items={columns[2]} duration={32} className="hidden lg:block" />
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={whatsapp ?? staticContact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-medium text-ink transition hover:brightness-95"
          >
            <MessageCircle size={17} /> Hume Bhi Mauka Dein
          </a>
        </div>
      </div>
    </section>
  );
}
