import type { Variants } from "framer-motion";

/** Strong custom curves - the built-in CSS easings are too weak. */
export const EASE = {
  out: [0.23, 1, 0.32, 1],
  inOut: [0.77, 0, 0.175, 1],
  drawer: [0.32, 0.72, 0, 1],
} as const;

/** CSS cubic-bezier string for EASE.out, for use in inline/className transitions. */
export const EASE_OUT_CSS = "cubic-bezier(0.23,1,0.32,1)";

/** Launch/loader timing, shared so the nav entrance can't drift from the curtain. */
export const LOADER_HOLD_MS = 1400;
export const LOADER_EXIT_MS = 600;

/** Scroll-reveal: fade + short lift. Baseline is visible; this only enhances. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE.out },
  },
};

/** Stagger container for lists (30-80ms between children). */
export const stagger = (delay = 0.05): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: delay },
  },
});
