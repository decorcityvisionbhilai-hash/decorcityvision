"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import NextImage from "next/image";
import { MapPin, Map as MapIcon, Sparkles } from "lucide-react";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";

interface LocationMapProps {
  location?: string;
  latitude?: number;
  longitude?: number;
  zoom?: number;
  className?: string;
  tileProvider?: "openstreetmap" | "carto-light" | "carto-dark";
  defaultExpanded?: boolean;
  /** Brand accent — "gold" for the live studio, "moss" for Kerala (matches the color's meaning elsewhere on the site). */
  accent?: "gold" | "moss";
  /** Shows a "coming soon" placeholder instead of fetching real map tiles — for a location that isn't live yet. */
  comingSoon?: boolean;
  comingSoonLabel?: string;
  /** Fills its parent (w-full h-full) and stays permanently in the "expanded" state, with no click-to-toggle — for embedding as the primary map in a layout, rather than as a small teaser card. */
  embedded?: boolean;
  /** Tile grid radius around the center tile (1 = 3x3, 2 = 5x5, ...). Bump this up for embedded use on large screens so there's no blank edge. */
  tileRadius?: number;
}

// gold fill/glow below tracks tailwind.config.ts's `gold` token — old value
// was #c9a876 / rgba(201,168,118,...), kept here as a comment for reference:
// fill: "#c9a876", glowSoft: "rgba(201,168,118,0.35)", glowStrong: "rgba(201,168,118,0.6)"
const ACCENTS = {
  gold: {
    text: "text-gold",
    fill: "#c8a96a",
    glowSoft: "drop-shadow(0 0 4px rgba(200,169,106,0.35))",
    glowStrong: "drop-shadow(0 0 8px rgba(200,169,106,0.6))",
    underline: "from-gold/60 via-gold/25 to-transparent",
  },
  moss: {
    text: "text-moss",
    fill: "#4a5943",
    glowSoft: "drop-shadow(0 0 4px rgba(74,89,67,0.35))",
    glowStrong: "drop-shadow(0 0 8px rgba(74,89,67,0.6))",
    underline: "from-moss/60 via-moss/25 to-transparent",
  },
} as const;

function latLngToTile(lat: number, lng: number, zoom: number) {
  const n = 2 ** zoom;
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return { x, y };
}

function getTileUrl(provider: string, x: number, y: number, z: number) {
  switch (provider) {
    case "carto-dark":
      return `https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/${z}/${x}/${y}.png`;
    case "openstreetmap":
      return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`;
    default:
      return `https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/${z}/${x}/${y}.png`;
  }
}

function formatCoordinates(lat: number, lng: number) {
  const latDir = lat >= 0 ? "N" : "S";
  const lngDir = lng >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
}

export function LocationMap({
  location = "Bhilai, Chhattisgarh",
  latitude = 21.2189,
  longitude = 81.3462,
  zoom = 14,
  className,
  tileProvider = "carto-light",
  defaultExpanded = false,
  accent = "gold",
  comingSoon = false,
  comingSoonLabel = "Coming Soon",
  embedded = false,
  tileRadius = 1,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [tilesLoaded, setTilesLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = ACCENTS[accent];
  const expanded = embedded || isExpanded;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8]);
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8]);

  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const coordinates = useMemo(
    () => formatCoordinates(latitude, longitude),
    [latitude, longitude]
  );

  const tiles = useMemo(() => {
    if (comingSoon) return [];
    const centerTile = latLngToTile(latitude, longitude, zoom);
    const tileUrls: { url: string; offsetX: number; offsetY: number }[] = [];
    for (let dy = -tileRadius; dy <= tileRadius; dy++) {
      for (let dx = -tileRadius; dx <= tileRadius; dx++) {
        tileUrls.push({
          url: getTileUrl(tileProvider, centerTile.x + dx, centerTile.y + dy, zoom),
          offsetX: dx,
          offsetY: dy,
        });
      }
    }
    return tileUrls;
  }, [latitude, longitude, zoom, tileProvider, comingSoon, tileRadius]);

  const tileGridPx = (tileRadius * 2 + 1) * 256;

  // Preload tiles (skipped entirely for the "coming soon" placeholder — there's
  // nothing real to fetch yet).
  useEffect(() => {
    if (comingSoon || tiles.length === 0) return;
    let loadedCount = 0;
    const totalTiles = tiles.length;

    tiles.forEach((tile) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      const onSettle = () => {
        loadedCount++;
        if (loadedCount === totalTiles) setTilesLoaded(true);
      };
      img.onload = onSettle;
      img.onerror = onSettle;
      img.src = tile.url;
    });
  }, [tiles, comingSoon]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative select-none ${embedded ? "h-full w-full" : "cursor-pointer"} ${className ?? ""}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={embedded ? undefined : () => setIsExpanded((v) => !v)}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl border border-ink/12 bg-white ${embedded ? "h-full w-full" : ""}`}
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
        animate={embedded ? undefined : { width: isExpanded ? 300 : 230, height: isExpanded ? 230 : 132 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-ink/[0.03] via-transparent to-ink/[0.06]" />

        <AnimatePresence>
          {expanded && !comingSoon && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute"
                  style={{
                    width: `${tileGridPx}px`,
                    height: `${tileGridPx}px`,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {tiles.map((tile, index) => (
                    <motion.div
                      key={tile.url}
                      className="absolute"
                      style={{
                        width: "256px",
                        height: "256px",
                        left: `${(tile.offsetX + tileRadius) * 256}px`,
                        top: `${(tile.offsetY + tileRadius) * 256}px`,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: tilesLoaded ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <NextImage
                        src={tile.url}
                        alt=""
                        width={256}
                        height={256}
                        unoptimized
                        crossOrigin="anonymous"
                        className="h-full w-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              {!tilesLoaded && <div className="absolute inset-0 animate-pulse bg-ink/5" />}

              <motion.div
                className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}
              >
                <MapPin
                  size={32}
                  fill={theme.fill}
                  strokeWidth={1.5}
                  stroke={theme.fill}
                  style={{ filter: theme.glowStrong }}
                />
              </motion.div>

              <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-transparent to-transparent opacity-70" />
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/50 via-transparent to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Coming-soon placeholder: same shell/interaction, no real geodata. */}
        <AnimatePresence>
          {expanded && comingSoon && (
            <motion.div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <motion.div
                className="flex flex-col items-center gap-2 text-center"
                initial={{ scale: 0.85, y: 8 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.15 }}
              >
                <Sparkles
                  size={26}
                  className={theme.text}
                  strokeWidth={1.5}
                  style={{ filter: theme.glowSoft }}
                />
                <span className="font-display text-lg text-ink">{comingSoonLabel}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid pattern — subtle when collapsed, a touch more present as the
            "canvas" for the coming-soon state (there's no map to show instead). */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: expanded ? (comingSoon ? 0.07 : 0) : 0.04 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id={`grid-${accent}`} width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" className="stroke-ink" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${accent})`} />
          </svg>
        </motion.div>

        <div className="relative z-20 flex h-full flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <motion.div
              animate={{ opacity: expanded ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{ filter: isHovered ? theme.glowStrong : theme.glowSoft }}
                transition={{ duration: 0.3 }}
              >
                <MapIcon size={18} strokeWidth={1.75} className={theme.text} />
              </motion.div>
            </motion.div>

            {comingSoon && !expanded && (
              <span
                className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${theme.text}`}
                style={{ borderColor: "currentColor" }}
              >
                {comingSoonLabel}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <motion.h3
              className="font-medium text-ink text-sm tracking-tight"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {expanded && !comingSoon && (
                <motion.p
                  className="font-mono text-ink/70 text-xs"
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              className={`h-px bg-gradient-to-r ${theme.underline}`}
              initial={{ scaleX: 0.3, originX: 0 }}
              animate={{ scaleX: isHovered || expanded ? 1 : 0.3 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default LocationMap;
