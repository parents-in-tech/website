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
  lib/              # site content and repo mapping helpers
  pages/
  styles/
```

## Content model

- `src/lib/site.ts` contains shared navigation, proof points, FAQ content, and roadmap themes.
- `src/lib/projects.ts` maps GitHub API responses into UI-friendly project summaries.

## Current routes

- `/` community-first homepage
- `/about` story, principles, and roadmap
- `/projects` API-backed project catalog
- `/invite` community onboarding and GitHub invite form
- `/contribute` contributor guidance and project preview

## Notes

- The GitHub invite flow and repo API contracts are unchanged.
- The projects UI depends on `GITHUB_TOKEN` being available in the same way as before.
- Cloudflare builds may warn about the `SESSION` KV binding and Sharp support; those warnings come from the current adapter configuration and do not block the site build.
