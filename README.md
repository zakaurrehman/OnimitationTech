# OnimitationTech.com

Marketing website for **Onimitation Tech DWC-LLC** (Dubai, UAE), built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and Motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages are statically prerendered)
npm start        # serve the production build
npm run lint
```

Copy `.env.example` to `.env.local` and adjust as needed.

## Before launch — content to supply

All verified company facts live in **`lib/site.ts`**. Nothing else needs to change when they are added:

| Item | Where | Current behaviour |
| --- | --- | --- |
| Official email | `site.contact.email` | Footer/contact page point visitors to the enquiry form |
| Official phone | `site.contact.phone` | Shows "Available on request"; hidden in footer |
| Social profiles (e.g. LinkedIn) | `site.social` | Hidden until URLs are added (also added to JSON-LD `sameAs`) |

Copy that should be reviewed/approved by the company: vision & mission (`app/about/page.tsx`), service capabilities (`lib/services.ts` — labelled "Proposed offering" on the site), and the Privacy Policy / Terms (`app/privacy-policy`, `app/terms` — have these reviewed by a legal advisor).

## Contact form

`app/contact/actions.ts` (server action) validates with the shared schema in `lib/contact.ts` and includes spam protection: a honeypot field, a minimum fill-time check, and per-IP rate limiting (in-memory; use Redis/Upstash for multi-instance hosting).

**Email delivery:** set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` (a sender on a domain verified in Resend). Until these are set, enquiries are only written to the server log — configure them before going live.

## Structure

```
app/                 routes: / about services ai-innovation contact privacy-policy terms
                     + sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg, apple-icon.tsx
components/
  layout/            navbar, footer, logo, CSS-only page loader
  home/              home page sections
  ai/                interactive pipeline + technology-horizons radar
  contact/           contact form
  visuals/           WebGL shader background, canvas neural globe, SVG illustrations
  ui/                buttons (magnetic), spotlight card, section headings, container
  motion/            scroll-reveal helpers
lib/                 site facts, service content, contact schema, metadata helpers
```

## Design system

Tokens are defined in `app/globals.css` (`@theme`): ink backgrounds `#070B14` / `#0D1422`, electric blue `#3478F6`, aqua `#19D4E5`, iris `#9275FF`, text `#F8FAFC` / `#94A3B8`. Fonts: Space Grotesk (display), Inter (body), Geist Mono (labels).

Visuals are custom code rather than third-party components: a GLSL flow-field shader (`shader-background.tsx`), a Canvas-2D 3D neural sphere (`neural-globe.tsx`), and procedural SVG art (`art.tsx`). Patterns such as the shader hero, spotlight borders, and magnetic buttons were informed by components on 21st.dev, implemented from scratch to avoid licence ambiguity and extra dependencies. Animated canvases pause off-screen and in background tabs, and all motion respects `prefers-reduced-motion`.
