# Repository Guidelines

## Project Structure & Module Organization
Astro source lives in `src/` with `pages/` for routes, `components/` for reusable UI, and `layouts/` for shared chrome. Static assets sit in `public/` and ship untouched. Build artifacts are written to `dist/`; avoid committing changes there. Global configuration resides in `astro.config.mjs`, while Cloudflare deployment settings live in `wrangler.toml`.

## Build, Test & Development Commands
Use `npm run dev` to start the local server at `localhost:4321` with hot reload. Run `npm run build` to produce the static site in `dist/` and `npm run preview` to smoke-test that build. `npm run deploy` wraps the production build and publishes to Cloudflare Pages. Type safety checks run with `npm run astro check`.

## Coding Style & Naming Conventions
Write Astro and TypeScript in strict mode with ES module imports. Follow kebab-case for files, camelCase for variables, and PascalCase for components. Co-locate component-specific styles inside `.astro` files using scoped `<style>` blocks; keep the primary accent color `#883aee`. Prefer small, typed utility modules in `src/components` or `src/lib` (create the latter if needed) and pull environment values via `import.meta.env`.

## Testing Guidelines
No automated test harness is configured yet; validate changes manually through `npm run dev` or `npm run preview`. When adding tests in the future, name files `*.test.ts` alongside the code they cover and document commands in this guide.

## Commit & Pull Request Guidelines
Model commits after the existing history: concise lowercase prefixes such as `feat:`, `fix:`, or `chore:` followed by a short imperative summary. Every pull request should describe the change, list manual verification steps, and link any GitHub issues. Include screenshots or recordings when you alter visual components.

## Security & Configuration Tips
Guard API keys and secrets by using `wrangler secrets` and never hard-coding credentials. Review Cloudflare bindings before deployment, and confirm that any new environment variable is documented in the README and Cloudflare dashboard.
