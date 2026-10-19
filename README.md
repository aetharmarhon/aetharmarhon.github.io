# UX/UI Portfolio

A minimal portfolio foundation using Next.js App Router, React, TypeScript, Tailwind CSS, Motion, and Lucide React. Styling is intentionally provisional until Figma references are supplied.

## Local development

Use Node.js 24 (the version in `.nvmrc`) with npm. In a terminal:

```bash
cd /Users/aethar/Documents/ux-portfolio
npm install
npm run dev
```

Open http://localhost:3000 in Chrome. Keep the terminal running; changes to source files update the preview automatically. Press Control+C to stop the server. If port 3000 is occupied, use the URL printed by Next.js.

If `npm` is not found but Node is installed at `/usr/local/bin`, run `export PATH="/usr/local/bin:$PATH"` first in that terminal.

## Routes

- `/`: portfolio homepage
- `/about`: placeholder biography
- `/work/sample-project`: sample case study
- `/work/[slug]`: reusable case-study route; unknown projects show a 404

## Structure

- `src/app/`: pages, routing, global styles, metadata, and root layout
- `src/components/layout/`: shared navigation
- `src/components/ui/`: reusable layout primitives
- `src/components/motion/`: small client components for animation; respects reduced motion
- `src/data/case-studies.ts`: sample project content and slugs
- `public/images/`: future portfolio imagery

Use the `@/` import alias for files inside `src`. Pages are Server Components by default; add client boundaries only for interactive features. Tailwind theme settings live in `src/app/globals.css`.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run build` produces the production app. Run `npm start` after a successful build to preview production locally. Commit `package-lock.json` so installs remain reproducible.

## Publish to GitHub Pages

The intended repository is `aetharmarhon/aetharmarhon.github.io`, serving the portfolio at https://aetharmarhon.github.io/. Create it as a public repository with the default branch named `main`, without adding a README or other starter files.

Push this project to that repository, including `.github/workflows/deploy-pages.yml`. In the repository's **Settings → Pages**, choose **GitHub Actions** as the source. The workflow builds and publishes the site on pushes to `main`; its progress and published URL appear in the **Actions** tab. If the initial run happened before Pages was enabled, rerun it or use **Run workflow**. No personal access token belongs in the project.

To check the static export locally, stop the development server first, then run:

```bash
npm run build:pages
python3 -m http.server 4173 --directory out
```

Open http://localhost:4173/. Stop that preview with Control-C and use `npm run dev` for normal editing. `npm start` previews a regular `npm run build`, not the static `out` folder.

The Pages build exports every known case-study route as a directory with `index.html` so direct links work. Images are served as their original assets because GitHub Pages has no Next.js image optimization server. Local development and the regular production build retain Next.js image optimization. This root-domain configuration assumes the exact repository name above.

## Design workflow

Share one Figma section or screenshot at a time, ideally with desktop/mobile references, fonts, and exported assets. Replace placeholder content as the design is implemented.

## Tooling notes

Development and builds use Next.js’s supported Webpack compiler because Turbopack’s CSS worker could not start in the setup environment. Tailwind uses its PostCSS adapter.

The initial npm audit reports five related high-severity findings in the ESLint development dependency chain (`braces` via `micromatch` and `fast-glob`). The suggested automatic fix downgrades the Next.js lint configuration across major versions, so it was not applied. Recheck upstream updates before deployment.

## Before finishing the portfolio

- Resume navigation is connected to the Google Drive URL supplied October 17, 2026; it opens in a new tab.
- Replace the screenshot-extracted portrait with the original photo export when available.

## Project cards

The first two project cards are defined in `src/data/case-studies.ts` and link to `/work/personalized-dashboards` and `/work/quest-reimagined`. These destinations currently use the shared case-study placeholder. Card images use the original supplied PNG exports (983 × 720 for Personalized Dashboards; 2199 × 1638 for Quest Reimagined). Lossless card crops remove the exports’ outer shadow padding, while the untouched PNG exports are retained alongside them. Next.js serves responsive images at quality 90. Desktop hover lifts and fades the card and shows the destination in a cursor bubble. Keyboard focus exposes the same destination, and touch layouts use a visible arrow.

## Personalized Dashboards case study

`src/components/case-study/personalized-dashboards.tsx` renders the case study at `/work/personalized-dashboards`; content and media definitions live in `src/data/personalized-dashboards.ts`. The contents navigation follows the section in view. The page uses a Back link instead of the homepage navigation, matching the reference.

`ExpandableImage` uses native modal dialogs with keyboard focus containment, Escape and a top-right close button inside the expanded image. The fullscreen image viewer scales even small images up to fit the viewport without cropping. Opening locks background scrolling; closing restores the original scroll position and focus without navigation.

Case-study media is extracted from the supplied full-size screenshot. Replace these assets with original image exports and prototype recordings when available; the interaction previews are currently still images.

The Final Experience section uses `public/videos/personalized-dashboards-final.mp4` with native playback controls, inline mobile playback, and the browser’s fullscreen control. Replace that file to update the walkthrough.

The final video plays muted on a loop when at least 25% is in view and pauses offscreen or when the tab is hidden. Reduced-motion preferences leave playback manual. Contents links use smooth native anchor scrolling, with immediate scrolling for reduced-motion preferences. Image-dialog scroll restoration always remains immediate.

Screenshot images already contain their expand icons. The `control` metadata positions a transparent, keyboard-accessible button over that existing icon; no duplicate icon is drawn. For future clean exports without embedded icons, omit `control` to render the live glass button.
