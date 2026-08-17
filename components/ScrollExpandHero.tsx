"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollExpandHeroProps {
  mediaType?: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  eyebrow?: string;
  titleLead?: string;
  titleAccent?: string;
  scrollHint?: string;
  children?: ReactNode;
}

export default function ScrollExpandHero({
  mediaType = "video",
  mediaSrc,
  posterSrc,
  bgImageSrc,
  eyebrow,
  titleLead,
  titleAccent,
  scrollHint,
  children,
}: ScrollExpandHeroProps) {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const startWidth = isMobile ? 78 : 42;
  const startHeight = isMobile ? 48 : 52;

  const mediaWidth = useTransform(
    scrollYProgress,
    (p) => `${startWidth + p * (100 - startWidth)}vw`
  );
  const mediaHeight = useTransform(
    scrollYProgress,
    (p) => `${startHeight + p * (100 - startHeight)}vh`
  );
  const mediaRadius = useTransform(scrollYProgress, [0, 0.9, 1], [28, 12, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.55, 1], [1, 0.4, 0]);
  const videoScrim = useTransform(scrollYProgress, [0, 0.6, 1], [0.35, 0.2, 0]);

  const titleOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -24]);

  const ctaOpacity = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.55, 0.8], [24, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "220vh" }}>
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-ink">
        <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
          <Image src={bgImageSrc} alt="" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/80" />
        </motion.div>

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center">
          <motion.div
            className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
            style={{
              width: mediaWidth,
              height: mediaHeight,
              borderRadius: mediaRadius,
              boxShadow: "0px 0px 60px rgba(0, 0, 0, 0.45)",
            }}
          >
            {mediaType === "video" ? (
              <div className="relative h-full w-full pointer-events-none">
                <video
                  src={mediaSrc}
                  poster={posterSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="h-full w-full object-cover"
                  disablePictureInPicture
                  disableRemotePlayback
                />
                <motion.div className="absolute inset-0 bg-ink" style={{ opacity: videoScrim }} />
              </div>
            ) : (
              <div className="relative h-full w-full">
                <Image
                  src={mediaSrc}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <motion.div className="absolute inset-0 bg-ink" style={{ opacity: videoScrim }} />
              </div>
            )}
          </motion.div>

          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="relative z-10 flex flex-col items-center px-6 text-center"
          >
            <Image
              src="/logo-mark.png"
              alt="Decorcity Vision"
              width={128}
              height={128}
              className="mb-4 h-16 w-16 drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)] md:h-24 md:w-24"
              priority
            />
            {eyebrow && (
              <p
                className="text-gold/90 text-sm md:text-base tracking-[0.25em] uppercase mb-4 [text-shadow:0_2px_10px_rgba(0,0,0,0.65)]"
              >
                {eyebrow}
              </p>
            )}
            <h1 className="font-display text-white text-5xl md:text-7xl lg:text-8xl leading-[1.05] [text-shadow:0_2px_16px_rgba(0,0,0,0.4)]">
              {titleLead}{" "}
              {titleAccent && <span className="italic text-gold">{titleAccent}</span>}
            </h1>
            {scrollHint && (
              <p className="mt-6 text-white/70 text-sm md:text-base">{scrollHint}</p>
            )}
          </motion.div>

          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="absolute inset-x-0 bottom-0 z-10 px-6 pb-12 md:pb-16"
          >
            <div className="absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-ink/95 to-transparent" />
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
