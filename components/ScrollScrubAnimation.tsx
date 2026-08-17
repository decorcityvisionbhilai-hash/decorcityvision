"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import styles from "./ScrollScrubAnimation.module.css";

interface ScrollScrubAnimationProps {
  /** Total number of frames in the sequence. */
  frameCount?: number;
  /** Builds the src for a given 1-indexed frame number. */
  getFrameSrc?: (frameNumber: number) => string;
  /** Height of the scroll track, in viewport-heights. 400 = 400vh, i.e. 300vh of scroll (400 - the 100vh pin). */
  heightVh?: number;
  eyebrow?: string;
  title?: string;
  /** Rendered inside the pinned viewport once the sequence is mostly scrubbed through (progress > ~0.6) — a CTA, typically. */
  children?: ReactNode;
}

const DEFAULT_FRAME_COUNT = 11;
const defaultGetFrameSrc = (n: number) => `/frames/image_${String(n).padStart(2, "0")}.jpg`;

// Linear-interpolation easing factor for the displayed (smoothed) progress
// chasing the raw (scroll-derived) progress each animation frame. Lower =
// smoother/laggier, higher = snappier/closer to raw scroll.
const SMOOTHING = 0.18;

export default function ScrollScrubAnimation({
  frameCount = DEFAULT_FRAME_COUNT,
  getFrameSrc = defaultGetFrameSrc,
  heightVh = 400,
  eyebrow,
  title,
  children,
}: ScrollScrubAnimationProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [imagesReady, setImagesReady] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState({ title: 1, cta: 0 });

  // --- Decoded-image cache -------------------------------------------------
  // Canvas needs a fully-decoded HTMLImageElement, not a next/image URL, so
  // we preload with the native Image() constructor and keep the decoded
  // elements in a ref (not state) — state would re-render on every load and
  // we only care about the *complete* array once, for drawing.
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // --- Scroll/animation state, all refs so updates never trigger renders --
  const rawProgressRef = useRef(0); // 0..1, derived straight from scroll position
  const smoothProgressRef = useRef(0); // 0..1, eased toward rawProgressRef each tick
  const lastDrawnFrameRef = useRef(-1); // avoids redundant drawImage calls
  const rafIdRef = useRef<number | null>(null);
  const isInViewRef = useRef(false);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 }); // logical canvas size (CSS px)
  const reducedMotionRef = useRef(false);

  // --- 1. Preload every frame before anything renders on the canvas -------
  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let settled = 0;
    const total = frameCount;
    const loaded: HTMLImageElement[] = new Array(total);

    const onSettle = () => {
      settled += 1;
      if (settled === total) {
        imagesRef.current = loaded;
        setImagesReady(true);
      }
    };

    for (let i = 0; i < total; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = onSettle;
      // Still counts as "settled" on error so a single broken frame can't
      // hang the loading state forever — drawFrame() below guards for gaps.
      img.onerror = onSettle;
      img.src = getFrameSrc(i + 1);
      loaded[i] = img;
    }

    return () => {
      // Prevent late-arriving loads from touching state after unmount.
      loaded.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
    // frameCount/getFrameSrc are expected to be stable for the component's lifetime.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- 2. Canvas drawing: object-fit: cover, done manually with drawImage -
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIndex];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width: canvasW, height: canvasH } = sizeRef.current;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const canvasRatio = canvasW / canvasH;
    const imgRatio = imgW / imgH;

    // "Cover" math: scale so the image fully fills the canvas box, then
    // center-crop whichever axis overflows.
    let drawW: number;
    let drawH: number;
    if (imgRatio > canvasRatio) {
      drawH = canvasH;
      drawW = imgW * (canvasH / imgH);
    } else {
      drawW = canvasW;
      drawH = imgH * (canvasW / imgW);
    }
    const offsetX = (canvasW - drawW) / 2;
    const offsetY = (canvasH - drawH) / 2;

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  };

  // --- 3. Size the canvas's pixel buffer for the device, in logical CSS px
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const sticky = canvas?.parentElement;
    if (!canvas || !sticky) return;

    const width = sticky.clientWidth;
    const height = sticky.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR, 2x is plenty for a background plate

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset before re-scaling, or repeated resizes compound
      ctx.scale(dpr, dpr);
    }

    sizeRef.current = { width, height, dpr };
  };

  // --- 4. Scroll math: map the wrapper's position in the viewport to 0..1 -
  const computeRawProgress = () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    // Total scrollable distance the sticky frame is pinned for: the
    // wrapper's height minus the one viewport-height it's pinned within.
    const scrollableDistance = rect.height - window.innerHeight;
    if (scrollableDistance <= 0) {
      rawProgressRef.current = 0;
      return;
    }
    // rect.top is 0 when the wrapper's top just reaches the viewport top,
    // and goes negative as the user scrolls further into it.
    const scrolled = -rect.top;
    const progress = scrolled / scrollableDistance;
    rawProgressRef.current = Math.min(Math.max(progress, 0), 1);
  };

  // --- 5. The render loop: only alive while the section is in view --------
  const tick = () => {
    const eased = reducedMotionRef.current
      ? rawProgressRef.current // skip smoothing for reduced-motion users; still scrubs, just no lag
      : smoothProgressRef.current +
        (rawProgressRef.current - smoothProgressRef.current) * SMOOTHING;
    smoothProgressRef.current = eased;

    const frameIndex = Math.round(eased * (frameCount - 1));

    // The expensive part (drawImage) only runs when the target frame
    // actually changes — this is the "don't redraw every tick" guard.
    if (frameIndex !== lastDrawnFrameRef.current) {
      drawFrame(frameIndex);
      lastDrawnFrameRef.current = frameIndex;
    }

    // Fade the title out over the first ~40% and the CTA in over the last
    // ~35%, so there's always something legible (never a dead gap).
    setOverlayOpacity({
      title: 1 - Math.min(eased / 0.4, 1),
      cta: Math.max((eased - 0.65) / 0.3, 0),
    });

    const stillSettling = Math.abs(rawProgressRef.current - smoothProgressRef.current) > 0.001;
    if (isInViewRef.current || stillSettling) {
      rafIdRef.current = requestAnimationFrame(tick);
    } else {
      rafIdRef.current = null;
    }
  };

  const startLoop = () => {
    if (rafIdRef.current === null) {
      rafIdRef.current = requestAnimationFrame(tick);
    }
  };

  // --- 6. Wire up scroll/resize listeners + IntersectionObserver ----------
  useEffect(() => {
    if (!imagesReady) return;

    resizeCanvas();
    computeRawProgress();
    drawFrame(Math.round(rawProgressRef.current * (frameCount - 1)));

    // The scroll handler itself only updates a ref — no state, no drawing —
    // so it's cheap enough to run unthrottled. All actual canvas work
    // happens inside the rAF loop, gated by the in-view flag below.
    const handleScroll = () => computeRawProgress();
    const handleResize = () => {
      resizeCanvas();
      lastDrawnFrameRef.current = -1; // force a redraw at the new size
      computeRawProgress();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) startLoop();
      },
      { rootMargin: "0px" }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesReady]);

  return (
    <div ref={wrapperRef} className={styles.wrapper} style={{ height: `${heightVh}vh` }}>
      <div className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

        {!imagesReady && (
          <div className={styles.loading} role="status" aria-live="polite">
            <Loader2 size={28} className="animate-spin text-gold" strokeWidth={1.5} />
            <span className="sr-only">Loading animation…</span>
          </div>
        )}

        {imagesReady && (eyebrow || title) && (
          <div
            className={styles.overlay}
            style={{
              opacity: overlayOpacity.title,
              pointerEvents: overlayOpacity.title > 0.05 ? "auto" : "none",
            }}
          >
            {eyebrow && (
              <p className="text-gold/70 text-xs tracking-[0.3em] uppercase mb-3">{eyebrow}</p>
            )}
            {title && (
              <h2 className="font-display text-white text-3xl md:text-5xl leading-tight max-w-xl">
                {title}
              </h2>
            )}
          </div>
        )}

        {imagesReady && children && (
          <div
            className={styles.overlay}
            style={{
              opacity: overlayOpacity.cta,
              pointerEvents: overlayOpacity.cta > 0.05 ? "auto" : "none",
            }}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
