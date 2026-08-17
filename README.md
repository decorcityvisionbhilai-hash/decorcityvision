# Decorcity Vision — Premium Redesign (Next.js)

A high-end concept redesign of decorcityvision.in, built with Next.js 14 (App Router),
Tailwind CSS, Framer Motion animations, and a React Three Fiber 3D hero scene.

## What's inside

- **Hero** — animated 3D centerpiece (distorted metallic icosahedron, orbit rings,
  floating cubes) built with `@react-three/fiber` + `@react-three/drei`, plus
  scroll-aware navbar and staggered text reveals.
- **About** — parallax image, floating stat card, animated counters (founded year,
  projects delivered, years of craft, satisfaction rate).
- **Services** — bento-style cards with a subtle mouse-tilt 3D effect, rebuilt from the
  original site's six offerings (building planning, renovation, interior space,
  modular kitchens, small offices, free consultation).
- **Portfolio** — filterable masonry gallery with hover reveals (placeholder imagery —
  swap in real project photos when available).
- **Testimonials** — dual-direction marquee of real reviews from the current
  Google/site listings.
- **CTA + Footer** — real contact details (phone, email, WhatsApp, address) carried
  over from the live site.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm run start
```

## Notes

- Portfolio and about-section images currently point to royalty-free Unsplash photos
  as placeholders. Replace the URLs in `lib/data.ts` and `components/About.tsx` with
  real project photography before launch.
- Fonts use a system serif/sans stack (no external font requests) to keep the app
  fast and dependency-free; swap in `next/font/google` (Fraunces + Inter) or
  self-hosted font files if you want the exact display type shown in the design
  comps.
- All copy, services, and testimonials are sourced directly from the current
  decorcityvision.in site — update `lib/data.ts` as the business info changes.
