---
name: Brayer Elite Research
colors:
  surface: '#121412'
  surface-dim: '#121412'
  surface-bright: '#383a37'
  surface-container-lowest: '#0d0f0d'
  surface-container-low: '#1a1c1a'
  surface-container: '#1e201e'
  surface-container-high: '#292a28'
  surface-container-highest: '#343533'
  on-surface: '#e3e3df'
  on-surface-variant: '#c2c8c0'
  inverse-surface: '#e3e3df'
  inverse-on-surface: '#2f312f'
  outline: '#8c928b'
  outline-variant: '#424842'
  surface-tint: '#accfb3'
  primary: '#accfb3'
  on-primary: '#183623'
  primary-container: '#0f2e1b'
  on-primary-container: '#76977e'
  inverse-primary: '#46654f'
  secondary: '#b9c7df'
  on-secondary: '#233144'
  secondary-container: '#3c4a5e'
  on-secondary-container: '#abb9d1'
  tertiary: '#efb8c2'
  on-tertiary: '#49262e'
  tertiary-container: '#401e26'
  on-tertiary-container: '#b3838c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c8ebce'
  primary-fixed-dim: '#accfb3'
  on-primary-fixed: '#02210f'
  on-primary-fixed-variant: '#2f4d38'
  secondary-fixed: '#d5e3fc'
  secondary-fixed-dim: '#b9c7df'
  on-secondary-fixed: '#0d1c2e'
  on-secondary-fixed-variant: '#3a485b'
  tertiary-fixed: '#ffd9df'
  tertiary-fixed-dim: '#efb8c2'
  on-tertiary-fixed: '#311119'
  on-tertiary-fixed-variant: '#633b44'
  background: '#121412'
  on-background: '#e3e3df'
  surface-variant: '#343533'
typography:
  headline-xl:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  data-mono:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.02em
spacing:
  unit: 4px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  container-max: 1280px
---

## Brand & Style

The visual identity of this design system is defined by "Elite Fitness & Research." It positions the brand at the intersection of high-performance athletic coaching and rigorous clinical science. The aesthetic evokes a sense of disciplined authority—where the grit of the gym meets the sterility of the laboratory.

The design style is **Corporate Modern with Glassmorphism**. It utilizes a dark-mode default to emphasize premium exclusivity. Surfaces are treated with subtle transparency and backdrop blurs to create depth without sacrificing the "industrial" feel. Every element is governed by a strict 1px grid-based boundary system, ensuring the UI feels engineered rather than merely decorated. 

Targeting an audience that values both physical excellence and empirical data, the interface remains high-contrast, fast, and uncompromisingly precise.

## Colors

This design system utilizes a high-contrast dark palette designed for low-light environments and premium focus.

- **Primary (Deep Forest Green):** Used for primary navigation states and subtle branding accents. It represents the "Elite Fitness" pillar—grounded and authoritative.
- **Secondary (Slate Gray):** Reserved for UI structural elements, inactive states, and 1px borders. This provides the "Clinical" framework.
- **Backgrounds:** Pure Black (#000000) serves as the base layer to maximize contrast. Deep Charcoal (#121212) is used for card surfaces to create subtle elevation.
- **Accent (Acid Lime):** A high-visibility, "vitality" color used exclusively for primary CTAs, critical alerts, or active peptide status indicators. It should never exceed 5% of the screen real estate to maintain its impact.

## Typography

Typography is used to reinforce the "Industrial Science" aesthetic. 

Headings use **Montserrat** with a bold, wide stance and slight tracking (letter-spacing) to evoke a modern, powerful feel. All major headlines should be set in Uppercase to maintain a "Research Log" aesthetic.

Body text uses **Inter** for its geometric clarity and exceptional readability on dark backgrounds. 

Special "Data" styling is utilized for performance metrics (e.g., purity percentages, dosages). These should use tighter tracking and heavier weights to stand out as primary information points.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop to ensure content remains centered and focused, reflecting a laboratory report layout. 

- **Grid:** A 12-column grid system with 24px gutters.
- **Rhythm:** All spacing (padding, margins) must be increments of 4px. 
- **Desktop:** Generous 64px margins to allow the "pure black" background to frame the content.
- **Mobile:** Transition to a 4-column fluid grid with 20px margins.
- **Density:** High information density is encouraged within modules to mimic technical data sheets, but modules themselves should be separated by significant vertical whitespace to prevent cognitive overload.

## Elevation & Depth

Depth is conveyed through **Glassmorphism and Low-Contrast Outlines**.

1. **Base Layer:** Pure Black (#000000).
2. **Elevated Surfaces:** Deep Charcoal (#121212) with a 20% opacity white border (1px).
3. **Glass Effects:** For overlay components (modals, dropdowns), use a background blur of 12px combined with a semi-transparent Deep Forest Green tint (10% opacity).
4. **Shadows:** Avoid traditional drop shadows. Instead, use a subtle 1px "inner glow" or a light border on the top edge of cards to suggest a top-down light source from a sterile laboratory environment.

## Shapes

The shape language is strictly **Sharp (0px)**. 

To maintain the "grit" and "clinical precision," all UI elements—including buttons, input fields, and cards—utilize 90-degree angles. This rejection of softness communicates a brand that is serious, technical, and performance-oriented. Circular shapes are permitted only for functional icons or specific data visualizations (e.g., progress rings).

## Components

### Buttons
- **Primary:** Acid Lime background with Pure Black text. Sharp corners. No shadow.
- **Secondary:** Transparent background with a 1px Slate Gray border. Text is White.
- **Ghost:** White text with no border. On hover, a 10% opacity white fill appears.

### Cards
- **Research Card:** Deep Charcoal background, 1px Slate Gray border. Use 24px internal padding. Headers within cards should use the `label-caps` style for a technical feel.

### Input Fields
- Underline-only or fully bordered 1px Slate Gray rectangles. Active state changes the border color to Acid Lime. Typography within inputs should be high-contrast white.

### Status Indicators
- Use the Acid Lime accent for "Active," "Verified," or "Optimized" states.
- Use Slate Gray for "Neutral" or "Pending."
- Use a muted Red (sparingly) only for "Critical Lab Errors."

### Data Tables
- Minimalist design. No vertical lines. Horizontal 1px Slate Gray dividers only. Header row uses `label-caps` typography with a 10% Deep Forest Green background tint.

### Navigation
- Top-aligned, thin bar (48px height). Use the `label-caps` typography for links. Active state is indicated by an Acid Lime 2px bottom border.