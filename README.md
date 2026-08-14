# Parents in Tech San Francisco

Warm editorial Astro site for the Parents in Tech community. The site now uses:

- Astro with the Cloudflare adapter
- Astro React islands for interactive UI
- Tailwind CSS v4
- A `shadcn/ui`-style component foundation in `src/components/ui`

## Commands

```sh
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## Structure

```text
src/
  components/
    ui/             # shadcn-style primitives
  layouts/
  data/             # curated project catalog
  lib/              # shared site content
  pages/
  styles/
```

## Content model

- `src/lib/site.ts` contains shared navigation, proof points, FAQ content, and roadmap themes.
- `src/data/projects.ts` contains the curated project catalog used by the homepage and Projects page.

## Current routes

- `/` community-first homepage
- `/about` story, principles, and roadmap
- `/projects` curated project catalog
- `/contribute` contributor guidance and GitHub invite form

## Notes

- Project cards are rendered from checked-in data and do not call the GitHub API.
- Keep archived projects out of `src/data/projects.ts`, and only expose repository links for public GitHub repositories.
- `GITHUB_TOKEN` is required only for the GitHub organization invite flow.
- Cloudflare builds may warn about the `SESSION` KV binding and Sharp support; those warnings come from the current adapter configuration and do not block the site build.
