# MiraiTech website

The website of MiraiTech, a small software engineering team in Tokyo.
Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS and MDX.

## Where things live

| Route | Content |
|---|---|
| `/` | Intro, selected work, services, the team, latest writing and experiments |
| `/projects`, `/projects/[slug]` | Case studies. Card data is in `lib/data.ts`, case-study text in `lib/project-details.ts` |
| `/ai-lab`, `/ai-lab/[slug]` | Experiments. List data is in `lib/data.ts`, detail text in `lib/experiment-details.ts` |
| `/blog`, `/blog/[slug]` | Writing. Titles and summaries are in `lib/data.ts`, articles in `content/blog/*.mdx` |
| `/team` | People and how we work, from `lib/team.ts` |
| `/about` | Background, principles, timeline and tools, from `lib/about.ts` |
| `/contact` | Email address and studio details |

The company name, email, address and availability are in `lib/site.ts`.
Colors are defined once in `app/globals.css` (light and dark), and `tailwind.config.ts` maps them to class names.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Scripts

- `npm run dev` starts the development server
- `npm run build` makes a production build
- `npm run start` serves the production build
- `npm run lint` runs ESLint
