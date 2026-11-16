# MiraiTech — company site

Marketing site for **MiraiTech**, an AI-focused software engineering team in Tokyo.
Built with Next.js (App Router), React 19, Tailwind CSS, Framer Motion, and MDX.

## Pages

| Route | What it shows |
|---|---|
| `/` | Hero, selected work, stack, writing & experiments, studio location, CTA |
| `/projects`, `/projects/[slug]` | Case studies (data in `lib/data.ts` + `lib/project-details.ts`) |
| `/ai-lab`, `/ai-lab/[slug]` | Experiments (data in `lib/data.ts` + `lib/experiment-details.ts`) |
| `/blog`, `/blog/[slug]` | Journal posts (metadata in `lib/data.ts`, body in `content/blog/*.mdx`) |
| `/team` | Leadership and engineers (data in `lib/team.ts`) |
| `/about` | Origin story, practice areas, toolkit, timeline, principles |
| `/contact` | Email-first contact page |

Brand name, email, location, and status badge live in `lib/site.ts`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
