# Design QA — главная KLEIM PRO

- Source visual truth: Figma file `UZ8rengEDLAe1cOi05sm6o`, homepage node `286:905`, `1920 × 12026`.
- Implementation: `http://localhost:5173/`.
- Canonical Figma render: `audit/pixel-perfect-2026-08-10/figma-homepage-1920.png`.
- Final desktop implementation: `audit/pixel-perfect-2026-08-10/local-final-1920.png`.
- Section-by-section source/implementation comparison: `audit/pixel-perfect-2026-08-10/comparison-section-strips-1920.png`.
- Checked viewports: `1920 × 1080`, `877 × 777`, `390 × 844` CSS px.

## Visual comparison

The final comparison places the Figma reference on the left and the implementation on the right at the same `1920 px` viewport. Each row uses the same scroll coordinate and a `1080 px`-high crop. The page grid, section starts, image crops, card geometry, typography hierarchy, radii, and spacing were reviewed together rather than as isolated screenshots.

Desktop section geometry matches the Figma frame:

- hero: `top 0`, `height 1026`;
- company: `top 1026`, `height 1090`;
- partners: `top 2116`, `height 1332`;
- production: `top 3448`, `height 669`;
- products: `top 4297`, `height 980`;
- stores: `top 5277`, `height 2043`;
- benefits: `top 7320`, `height 1147`;
- blog: `top 8467`, `height 875`;
- FAQ: `top 9342`, `height 977`;
- contacts: `top 10319`, `height 683`;
- footer: `top 11082`, `height 944`.

## Findings and fixes

- No actionable P0, P1, or P2 visual issues remain.
- Exact Figma exports are used for the hero, company, all partner cards, production block, retailer cards, sales map, benefits, blog, FAQ decoration, contacts, footer, and catalog-menu promos.
- Supplied Bounded and Raleway font files are bundled through Vite and load correctly with the GitHub Pages base path.
- Blog copy, six FAQ rows, buttons, form treatments, and footer blueprint were aligned with the canonical desktop frame.
- The gray hero video circle is intentionally omitted at the user's explicit request.

## Responsive and interaction checks

- `877 × 777`: no document-level horizontal overflow; hero, header, company grid, card stacks, and typography remain inside the viewport.
- `390 × 844`: document `scrollWidth` equals `390`; horizontal overflow exists only inside the intentionally scrollable partner/product/blog carousels. The production heading was reduced and reflowed to a `350 px` content width.
- Catalog mega menu opens and reports `aria-expanded="true"`; Escape closes it.
- Company submenu is mutually exclusive with the catalog menu.
- FAQ items expand and update `aria-expanded`.
- Lead form accepts input and reaches the local `Заявка отправлена` state.
- Latest browser session produced no new console errors or warnings.
- `npm run build`: passed.

final result: passed
