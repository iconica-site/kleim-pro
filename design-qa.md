**Design QA — header menus**

- Source visual truth: `/var/folders/b1/lc980nsj7nj6pvds0h9m9xr40000gn/T/TemporaryItems/NSIRD_screencaptureui_AZZ3M5/Снимок экрана 2026-08-06 в 15.25.17.png`
- Implementation: `http://localhost:5173/`
- Implementation screenshots:
  - `/Users/krexa12/Documents/ChatGPT/Kleim-pro/audit/menu-2026-08-06/catalog-open-1920-final.png`
  - `/Users/krexa12/Documents/ChatGPT/Kleim-pro/audit/menu-2026-08-06/company-open-1920-final.png`
  - `/Users/krexa12/Documents/ChatGPT/Kleim-pro/audit/menu-2026-08-06/catalog-open-mobile-390.png`
- Viewports: desktop `1920 × 1080` CSS px; mobile `390 × 844` CSS px.
- Density normalization: source image is `1126 × 849` px. The catalog reference frame was cropped to `1024 × 576` and normalized to `1920 × 1080`. The company-dropdown reference was cropped to `1024 × 175` and normalized to `1920 × 328`. Browser screenshots were `1912 × 1080` because of the browser scrollbar and were normalized to `1920 × 1080` for the full-view comparison. Device scale factor was the browser default.
- States: catalog mega menu open; company dropdown open; mobile catalog drawer open.

**Full-view comparison evidence**

- Final desktop catalog comparison: `/Users/krexa12/Documents/ChatGPT/Kleim-pro/audit/menu-2026-08-06/catalog-compare-final.png`
- Final company-dropdown comparison: `/Users/krexa12/Documents/ChatGPT/Kleim-pro/audit/menu-2026-08-06/company-compare-final.png`
- The final comparisons align the source and implementation side by side at the same normalized scale.

**Focused region comparison evidence**

- The compact company dropdown was compared independently in `company-compare-final.png`; its trigger position, width, row rhythm, selected row, radius, and header alignment match the reference closely.
- No additional focused crop was needed for the mega menu because its typography, five filter columns, side promos, lower promos, sidebar, and CTA remain readable in `catalog-compare-final.png`.

**Findings**

- No actionable P0, P1, or P2 differences remain.
- [P3] The promo-card subjects use the closest branded assets supplied with the project rather than the exact layer exports visible in the Figma screenshot. Layout, crop treatment, background, labels, and card geometry are preserved. Exact source-layer export was unavailable because the Figma Starter-plan read limit was reached.

Required fidelity surfaces:

- Fonts and typography: Bounded is retained for display labels where used by the site, while compact navigation/menu copy uses the supplied Manrope family. Weights, casing, wrapping, and menu hierarchy follow the reference.
- Spacing and layout rhythm: header inset, 704 px mega-menu height, 360 px sidebar, five-column grid, promo spacing, radii, and bottom alignment were checked against the normalized source.
- Colors and tokens: white panel, light gray sidebar/cards, near-black CTA, muted headings, and KLEIM red use the existing site tokens and match the source balance.
- Image quality and asset fidelity: all visible imagery is raster source material already supplied in `public/assets`; no placeholder, CSS-drawn, inline-SVG, or emoji substitutes were introduced.
- Copy and content: category names, filter groups, CTA labels, promo labels, and company dropdown entries match the provided design.

**Comparison history**

1. Initial evidence: `/Users/krexa12/Documents/ChatGPT/Kleim-pro/audit/menu-2026-08-06/catalog-compare-01.png`
   - Earlier P2: the side-promo stack was too tall and compressed the large whitespace zone above the bottom promos.
   - Earlier P2: bottom promo imagery was cropped too aggressively and disturbed label readability.
   - Fixes: constrained the upper content track to 380 px, added a 32 px top offset to the side promos, kept the lower promo track at 160 px, and isolated/scaled the supplied product images inside each lower card.
   - Post-fix evidence: `catalog-compare-final.png`; major-region proportions and label readability now align with the reference.
2. Initial compact-dropdown evidence: `/Users/krexa12/Documents/ChatGPT/Kleim-pro/audit/menu-2026-08-06/company-compare-01.png`
   - Earlier P2: the clicked trigger retained a browser focus outline not present in the reference.
   - Fix: removed the default outline styling from the mouse-open state.
   - Post-fix evidence: `company-compare-final.png`; trigger and dropdown now match the source state.

**Interaction and responsive checks**

- Catalog and company menus are mutually exclusive.
- Both triggers update `aria-expanded`.
- Escape closes the company dropdown.
- Clicking outside the menu closes the mobile drawer.
- The mobile drawer is scrollable, exposes the secondary navigation links, has no horizontal overflow, and keeps the close control visible.
- Desktop and mobile checks found zero broken images and zero horizontal overflow.
- Browser console: no errors; only Vite/React development messages.
- Production build: passed with `npm run build`.

**Follow-up Polish**

- Replace the four secondary promo images with exact Figma layer exports when those assets become available.

final result: passed
