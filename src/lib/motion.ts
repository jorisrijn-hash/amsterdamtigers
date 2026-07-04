import type { Variants } from "framer-motion";

/** Strong custom curves - the built-in CSS easings are too weak. */
export const EASE = {
  out: [0.23, 1, 0.32, 1],
  inOut: [0.77, 0, 0.175, 1],
  drawer: [0.32, 0.72, 0, 1],
} as const;

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
