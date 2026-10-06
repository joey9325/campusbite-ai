# CampusBite AI — Design System & Direction

## 1. Product Purpose

CampusBite AI is a practical food-discovery utility for university students.

The current prototype uses one campus canteen dataset as proof of concept, but the visual identity must remain generic enough to work for other university canteens.

The primary user goal is simple:

**Find suitable food quickly.**

Users may search by:
- budget,
- food preference,
- stall,
- or natural-language requests.

Example:

"Budget 20 ribu, pengen ayam."

The interface must optimize for completing this task quickly, not for showcasing AI technology.

---

## 2. Design Principle

CampusBite should feel like a real food-discovery product, not an AI demo or SaaS landing page.

Design qualities:

- practical,
- warm,
- food-focused,
- lightweight,
- clear,
- student-friendly,
- modern without looking trendy for its own sake.

Every visual element must support either:

1. finding food,
2. understanding a recommendation,
3. navigating the interface.

If an element does none of these, remove it.

---

## 3. Primary Action

There should be ONE dominant action above the fold:

**Search for food.**

The search field is the visual and functional center of the homepage.

Example placeholder:

"Budget 20 ribu, pengen ayam..."

Do not place several equally prominent buttons around it.

Secondary actions such as example queries should be visually quieter.

---

## 4. Page Structure

Use a clear top-to-bottom information hierarchy.

Recommended structure:

### Header
- CampusBite wordmark/logo
- very minimal secondary information if needed

### Search Area
- short heading
- one sentence explaining the product
- large natural-language search input
- primary search button
- optional example queries

### Results Area
- result count or short recommendation context
- food results
- optional Agent Trace below or beside results

### Footer
- minimal project information

Do not create unnecessary navigation for a single-purpose prototype.

---

## 5. Visual Hierarchy

Visual priority must be:

1. Search
2. Food image
3. Menu name
4. Price
5. Stall
6. Recommendation explanation
7. Supporting metadata
8. Agent Trace

Price should be immediately scannable.

Agent Trace must never compete visually with the food recommendations.

Use size, weight, contrast, and spacing to communicate importance.

---

## 6. Layout & Grid

Use a centered content container.

Recommended maximum width:

`1180px–1240px`

Desktop:

- Use a structured grid.
- Search area should not stretch excessively.
- Results may use 2 or 3 columns depending on available width.

Tablet:

- Prefer 2 result columns.

Mobile:

- Use 1 column.
- Search fills available width.
- Food results stack vertically.
- Important controls must remain easy to tap.

Do not create random floating alignment.

All major elements must align to a consistent grid.

---

## 7. Spacing System

Use a consistent spacing scale instead of arbitrary values.

Preferred spacing values:

`4px`
`8px`
`12px`
`16px`
`24px`
`32px`
`48px`
`64px`

Use smaller spacing between related elements.

Example inside a menu result:

Image
↓ 16px
Menu name
↓ 8px
Price / stall

Use larger spacing between unrelated sections.

Internal spacing should generally be smaller than the external spacing around a group.

Do not use borders or boxes merely to compensate for poor spacing.

---

## 8. White Space

White space is intentional.

Use it to:

- separate different ideas,
- emphasize the search,
- make food imagery stand out,
- improve readability.

Do NOT interpret minimalism as simply leaving half the screen empty.

CampusBite is a utility interface, so information density should still feel efficient.

The page should feel calm, not empty.

---

## 9. Typography

Typography must be readable before being stylish.

Use a maximum of two font families.

Prefer:
- one distinctive but restrained heading font,
- one highly readable body/UI font.

Do not use oversized SaaS-style headlines.

Suggested scale:

- Main heading: 36–44px desktop
- Section heading: 24–28px
- Menu title: 18–22px
- Body: 16–18px
- Supporting text: 13–14px

Body line-height:

`1.4–1.6`

Use sentence case rather than ALL CAPS for normal headings.

Avoid excessive font weights.

---

## 10. Color System

Use a light interface.

Use mostly:

- warm neutral background,
- dark readable text,
- one restrained food-oriented accent color,
- subtle neutral borders.

Use semantic colors only when necessary for:
- error,
- success,
- warning.

Do not use:

- purple AI gradients,
- rainbow gradients,
- neon AI colors,
- multiple competing accent colors.

Only one accent should dominate a screen.

Ensure readable contrast.

---

## 11. Food Imagery

Food photography is the primary visual richness of CampusBite.

Do not compensate for weak layout using decorative graphics.

Images should:

- use consistent aspect ratios,
- fill their image area properly,
- avoid distortion,
- have appropriate alt text,
- crop consistently.

Recommended result image ratio:

`4:3` or `1:1`

Choose one and use it consistently.

Images should load responsively.

---

## 12. Food Result Design

Food results should resemble actual menu listings, not SaaS feature cards.

Each result should prioritize:

1. Food image
2. Menu name
3. Price
4. Stall
5. Short reason for recommendation

Avoid unnecessary metadata.

Do NOT invent:

- ratings,
- review counts,
- nutrition information,
- popularity scores,
- stock availability,
- delivery times,
- opening hours.

Use a simple container only when it improves grouping.

Avoid cards inside cards.

Do not give every small piece of information its own rounded pill.

---

## 13. Search Component

Search must be prominent immediately when the page opens.

The input should be large enough to clearly invite natural-language queries.

Example:

"20 ribu, mau makanan ayam yang mengenyangkan"

Search button must have a clear visual priority.

Minimum interactive target should be comfortable for touch use.

Provide visible:
- hover,
- focus,
- loading,
- disabled states.

Pressing Enter should submit the query.

---

## 14. Example Queries

Example queries may be provided to teach users how to interact.

Examples:

- "20 ribu mau ayam"
- "Japanese Food di bawah 30 ribu"
- "Menu paling murah"
- "Apa saja stall yang tersedia?"

Treat these as secondary actions.

Do not make them visually equal to the main search button.

Avoid excessive pill-shaped chips.

---

## 15. Agent Trace

Agent Trace exists to demonstrate agentic AI behavior for the challenge.

It is NOT the primary user experience.

Prefer:

- collapsible disclosure,
- compact secondary panel,
- subtle monospace details.

Example:

Agent action:
Search menu

Constraints:
keyword = ayam
budget ≤ 20000

Results:
7 matches

Avoid:
- large terminal-style panels dominating the page,
- bright technical colors,
- placing trace before recommendations.

Users should see useful food results first.

---

## 16. States

Design these intentionally.

### Initial
Show a useful, inviting search interface.

### Loading
Use restrained loading feedback.

Do not use elaborate AI animations.

### Results
Show recommendations clearly.

### No Results
Explain:

"No menu in the current dataset matches those criteria."

Offer a useful next action such as changing budget or keyword.

### Error
Use a concise human-readable message.

Do not expose raw server errors to normal users.

---

## 17. Interaction

Motion should communicate feedback, not decoration.

Allowed:

- subtle hover transition,
- small result reveal,
- loading feedback,
- focus transitions.

Avoid:

- floating elements,
- constant animation,
- gradient movement,
- excessive parallax,
- bouncing icons.

Prefer interaction speed over spectacle.

---

## 18. Accessibility

All interactive elements must:

- be keyboard accessible,
- show visible focus,
- have sufficient contrast,
- have meaningful labels,
- provide alt text for relevant imagery.

Do not rely on color alone to communicate state.

Touch targets should be comfortably selectable on mobile.

---

## 19. Responsive Rules

### Desktop
Use available horizontal space efficiently.

### Tablet
Reduce columns and spacing naturally.

### Mobile
- one result column,
- search near the top,
- full-width primary controls,
- no horizontal scrolling,
- readable menu names and prices,
- Agent Trace collapsed by default.

Design mobile intentionally rather than merely shrinking desktop.

---

## 20. Anti AI-Slop Rules

Explicitly avoid these common AI-generated patterns:

- giant gradient hero section,
- purple/blue AI gradient,
- glassmorphism,
- excessive rounded rectangles,
- cards nested inside cards,
- every label shown as a pill,
- generic sparkle icons,
- robot/brain AI imagery,
- meaningless dashboard statistics,
- testimonial sections,
- fake user avatars,
- fake ratings,
- fake social proof,
- excessive feature grids,
- overly enthusiastic marketing copy,
- huge empty hero space,
- unnecessary navigation,
- decorative gradients behind every section.

CampusBite is a utility.

If something does not help students find food, it probably should not be there.

---

## 21. Content Style

Copy should be:

- short,
- natural,
- direct,
- useful.

Avoid generic AI marketing copy such as:

"Revolutionize your dining experience with the power of AI."

Prefer:

"Find food that fits your budget."

Do not over-explain Gemini or Agentic AI in the main interface.

Technical information belongs in Agent Trace or project documentation.

---

## 22. Design Consistency

Use reusable design tokens for:

- colors,
- spacing,
- typography,
- radius,
- borders,
- shadows.

Keep border radius restrained.

Suggested:

- small: 6px
- medium: 10px
- large: 14px maximum for main surfaces

Avoid giving everything the same large rounded radius.

Use shadows sparingly.

Prefer subtle borders and spacing.

---

## 23. Final Design Review

Before declaring the frontend finished, audit the page.

Ask:

### Purpose
- Is the main user task obvious immediately?
- Can a student search without explanation?

### Hierarchy
- Is search clearly the main action?
- Are price and food imagery easy to scan?

### Simplicity
- Can anything be removed without reducing usability?

### Spacing
- Are related objects visually grouped?
- Are different sections clearly separated?

### Consistency
- Are spacing, colors, typography, radius, and components consistent?

### AI-Slop
- Does any section look like a generic AI SaaS template?
- Are there unnecessary cards, pills, gradients, or AI decorations?

### Mobile
- Is the interface genuinely usable on a phone?

### Data Integrity
- Are all menu names, prices, stalls, and images derived from the dataset?

If any answer is unsatisfactory, fix it before adding more features.