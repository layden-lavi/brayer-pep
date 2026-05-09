/**
 * Brayer Performance Peptides — Shared Tailwind Config
 * Single source of truth for all design tokens.
 * Must be loaded via <script src="../shared/tailwind.config.js"> BEFORE the Tailwind CDN script.
 * The CDN reads window.tailwind.config on load.
 */
window.tailwind = {
  config: {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          /* ── Brand foundations ───────────────────────────── */
          "base":                        "#000000",  /* pure black base layer */
          "pure-white":                  "#ffffff",  /* true white for high-contrast CTAs */

          /* ── Primary (Deep Forest Green) ────────────────── */
          "primary":                     "#accfb3",
          "on-primary":                  "#183623",
          "primary-container":           "#0f2e1b",
          "on-primary-container":        "#76977e",
          "primary-fixed":               "#c8ebce",
          "primary-fixed-dim":           "#accfb3",
          "on-primary-fixed":            "#02210f",
          "on-primary-fixed-variant":    "#2f4d38",
          "inverse-primary":             "#46654f",
          "surface-tint":                "#accfb3",

          /* ── Secondary (Slate Gray) ─────────────────────── */
          "secondary":                   "#b9c7df",
          "on-secondary":                "#233144",
          "secondary-container":         "#3c4a5e",
          "on-secondary-container":      "#abb9d1",
          "secondary-fixed":             "#d5e3fc",
          "secondary-fixed-dim":         "#b9c7df",
          "on-secondary-fixed":          "#0d1c2e",
          "on-secondary-fixed-variant":  "#3a485b",

          /* ── Tertiary ────────────────────────────────────── */
          "tertiary":                    "#efb8c2",
          "on-tertiary":                 "#49262e",
          "tertiary-container":          "#401e26",
          "on-tertiary-container":       "#b3838c",
          "tertiary-fixed":              "#ffd9df",
          "tertiary-fixed-dim":          "#efb8c2",
          "on-tertiary-fixed":           "#311119",
          "on-tertiary-fixed-variant":   "#633b44",

          /* ── Error ───────────────────────────────────────── */
          "error":                       "#ffb4ab",
          "on-error":                    "#690005",
          "error-container":             "#93000a",
          "on-error-container":          "#ffdad6",

          /* ── Surfaces ────────────────────────────────────── */
          "background":                  "#121412",
          "on-background":               "#e3e3df",
          "surface":                     "#121412",
          "surface-dim":                 "#121412",
          "surface-bright":              "#383a37",
          "surface-container-lowest":    "#0d0f0d",
          "surface-container-low":       "#1a1c1a",
          "surface-container":           "#1e201e",
          "surface-container-high":      "#292a28",
          "surface-container-highest":   "#343533",
          "surface-variant":             "#343533",
          "on-surface":                  "#e3e3df",
          "on-surface-variant":          "#c2c8c0",
          "inverse-surface":             "#e3e3df",
          "inverse-on-surface":          "#2f312f",

          /* ── Outline ─────────────────────────────────────── */
          "outline":                     "#8c928b",
          "outline-variant":             "#424842"
        },

        /* ── Border radius: sharp per design spec ────────── */
        borderRadius: {
          "DEFAULT": "0px",
          "lg":      "0px",
          "xl":      "0px",
          "full":    "9999px"
        },

        /* ── Spacing scale (4px base unit) ───────────────── */
        spacing: {
          "unit":           "4px",
          "gutter":         "24px",
          "margin-mobile":  "20px",
          "margin-desktop": "64px",
          "container-max":  "1280px"
        },

        /* ── Font families ───────────────────────────────── */
        fontFamily: {
          "headline-xl":        ["Montserrat", "sans-serif"],
          "headline-lg":        ["Montserrat", "sans-serif"],
          "headline-lg-mobile": ["Montserrat", "sans-serif"],
          "body-md":            ["Inter", "sans-serif"],
          "body-sm":            ["Inter", "sans-serif"],
          "label-caps":         ["Inter", "sans-serif"],
          "data-mono":          ["Inter", "sans-serif"]
        },

        /* ── Type scale ──────────────────────────────────── */
        fontSize: {
          "headline-xl":        ["48px", { lineHeight: "1.1",  letterSpacing: "0.02em",  fontWeight: "800" }],
          "headline-lg":        ["32px", { lineHeight: "1.2",  letterSpacing: "0.01em",  fontWeight: "700" }],
          "headline-lg-mobile": ["24px", { lineHeight: "1.2",                            fontWeight: "700" }],
          "body-md":            ["16px", { lineHeight: "1.6",  letterSpacing: "0.01em",  fontWeight: "400" }],
          "body-sm":            ["14px", { lineHeight: "1.5",                            fontWeight: "400" }],
          "label-caps":         ["12px", { lineHeight: "1.0",  letterSpacing: "0.1em",   fontWeight: "600" }],
          "data-mono":          ["18px", { lineHeight: "1.0",  letterSpacing: "-0.02em", fontWeight: "700" }],
          /* Sub-scale: micro-labels and legal disclaimers */
          "label-xs":           ["10px", { lineHeight: "1.0",  letterSpacing: "0.08em",  fontWeight: "600" }],
          "disclaimer":         ["11px", { lineHeight: "1.4",                            fontWeight: "400" }]
        }
      }
    }
  }
};
