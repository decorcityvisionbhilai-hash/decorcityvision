"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Play, Youtube } from "lucide-react";
import { youtubeVideos as staticVideos, youtubeChannelUrl as staticChannelUrl, type YoutubeVideo } from "@/lib/data";

export default function YouTubeTeaser({
  videos,
  channelUrl,
}: {
  /** From Sanity's `youtubeVideo` documents — falls back to the static list when empty/unset. */
  videos?: YoutubeVideo[] | null;
  channelUrl?: string;
}) {
  const resolvedVideos = videos && videos.length > 0 ? videos : staticVideos;
  const resolvedChannelUrl = channelUrl ?? staticChannelUrl;

  return (
    <section className="bg-sand py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5">
        <div className="mb-12 text-center">
          <p className="text-clayText text-xs tracking-[0.3em] uppercase mb-3">
            Kaam Ki Video
          </p>
          <h2 className="font-display text-3xl md:text-5xl">
            Site Visits, <span className="italic text-clayText">Dekhiye Live.</span>
          </h2>
          <p className="text-ink/70 mt-4 max-w-lg mx-auto">
            Site pe kaam kaisa hota hai — khud dekhiye, humare YouTube channel par.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {resolvedVideos.slice(0, 3).map((video, i) => (
            <motion.a
              key={video.title}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm"
            >
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-red-600 transition-transform duration-300 group-hover:scale-110">
                <Play size={20} fill="currentColor" className="ml-1" />
              </span>
              <span className="absolute bottom-4 left-4 right-4 text-sm font-medium leading-snug text-white">
                {video.title}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={resolvedChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-ink/85"
          >
            <Youtube size={17} /> YouTube Par Dekhein <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
