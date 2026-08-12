# Design QA — KLEIM PRO

## Reference

- Figma file: `UZ8rengEDLAe1cOi05sm6o`, page `286:904`
- Reference frames reviewed: homepage `286:905`, categories `437:1073`, catalog `454:1613`, product `454:2925`, about `470:1489`, wholesale `538:1860`, advertising `547:1241`, packaging `555:1493`, selector `582:2452`, career/company subpages `534:3325`–`534:3586`, documents `559:3003`, blog `582:3083`, article `582:3458`, contacts `582:3795`.
- Exact Figma source assets were exported for the implemented routes. Full-frame references used during comparison are in `public/assets/figma-reference/`.

## Implemented routes

- `#/`
- `#/catalog`
- `#/catalog/glue`
- `#/product/pva-d3`
- `#/about`
- `#/wholesale`
- `#/advertising`
- `#/packaging`
- `#/selector`
- `#/career`
- `#/suppliers`
- `#/ambassadors`
- `#/charity`
- `#/documents`
- `#/blog`
- `#/blog/article`
- `#/contacts`

## Visual comparison

Compared source frames and live implementation at desktop (1440 × 900), tablet (768 × 1024), and mobile (390 × 844). Checked the same top-of-page state, typography, spacing, card radii, asset crop, navigation hierarchy, responsive stacking and overflow.

### Artifact regression — 2026-08-12

- Page/state: `#/wholesale`, top of page.
- Reported viewport: 1990 × 1171; implementation capture: 1990 × 1168.
- Before evidence: `audit/artifact-fix-2026-08-12/before.png`.
- After evidence: `audit/artifact-fix-2026-08-12/after.png`.
- Combined before/after comparison: `audit/artifact-fix-2026-08-12/before-after.png`.
- Figma full-frame source: `audit/artifact-fix-2026-08-12/figma-wholesale.png`.
- Focused finding: the descendant image rule for the wholesale hero also selected the CTA arrow icon, stretching it to the hero-media dimensions. The selector is now restricted to the hero's direct image child.
- Follow-up finding: CSS Grid tracks using plain fractional columns retained min-content width on narrow screens. Tracks now use `minmax(0, 1fr)`, grid children are shrinkable, and long headings wrap safely.
- Comparison history: pass 1 removed the stretched CTA arrow; pass 2 removed mobile min-content overflow in product, about, wholesale, packaging, selector, company information, and blog layouts; pass 3 found no broken images or document-level horizontal overflow across all 17 routes at 390, 768, and 1440 px.

## Functional checks

- Every route renders exactly one primary heading.
- All 17 routes render content and remain free of document-level horizontal overflow at 390, 768 and 1440 px.
- Catalog mega-menu opens, matches the Figma hierarchy and links to the catalog route.
- Company dropdown routes to five implemented company pages.
- Category → listing → product navigation works.
- Filters, selector choices, color choices, accordion/menu state and lead form acknowledgement work.
- No browser console errors found.
- Production build passes.

## Final result

passed
