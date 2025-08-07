# AGENTS.md - Development Guidelines

## Build/Test Commands

- `npm run dev` - Start development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview build locally
- `npm run deploy` - Build and deploy to Cloudflare Pages
- `npm run astro check` - Run Astro type checking
- No test framework configured - verify changes manually with dev server

## Code Style Guidelines

- **Framework**: Astro with TypeScript (strict mode), Cloudflare adapter
- **Imports**: Use ES modules, relative imports for local files
- **Types**: Use TypeScript strict mode, define types for API routes
- **Naming**: kebab-case for files, camelCase for variables, PascalCase for components
- **Components**: Use .astro extension, scoped styles with `<style>` blocks
- **API Routes**: Export named functions (GET, POST) with APIRoute type
- **Error Handling**: Return Response objects with proper status codes and JSON
- **Environment**: Access env vars with `import.meta.env.VARIABLE_NAME`
- **Styling**: Use scoped CSS in .astro files, consistent color scheme (#883aee primary)
- **Structure**: Pages in src/pages/, components in src/components/, layouts in src/layouts/
