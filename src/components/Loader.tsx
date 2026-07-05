"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE, LOADER_HOLD_MS, LOADER_EXIT_MS } from "@/lib/motion";

const BRACKETS = [
  "left-6 top-6 border-l border-t",
  "right-6 top-6 border-r border-t",
  "left-6 bottom-6 border-l border-b",
  "right-6 bottom-6 border-r border-b",
];

/**
 * Launch intro: viewfinder corner brackets draw in, the hero poster expands
 * from a small centered frame to full-bleed (clip-path inset), then the panel
 * fades to hand off to the Hero video playing behind it. Plays once per session,
 * locks scroll while active, degrades to a plain fade under reduced motion.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("at:loaded")) {
      setActive(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => setActive(false), LOADER_HOLD_MS);
    return () => window.clearTimeout(id);
  }, []);

  const release = () => {
    document.body.style.overflow = "";
    if (typeof window !== "undefined") sessionStorage.setItem("at:loaded", "1");
  };

  return (
    <AnimatePresence onExitComplete={release}>
      {active && (
        <motion.div
          className="fixed inset-0 z-loader overflow-hidden bg-ink"
          initial={false}
          exit={{ opacity: 0, transition: { duration: LOADER_EXIT_MS / 1000, ease: EASE.out } }}
        >
          {/* Poster expands from a centered frame to full-bleed */}
          <motion.div
            className="absolute inset-0"
            initial={reduce ? { clipPath: "inset(0% 0%)" } : { clipPath: "inset(42% 44%)" }}
            animate={{ clipPath: "inset(0% 0%)" }}
            transition={{ duration: 0.85, ease: EASE.drawer, delay: reduce ? 0 : 0.25 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/hero-poster.jpg"
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-[color-mix(in_oklch,var(--ink)_45%,transparent)]" />
          </motion.div>

          {/* Viewfinder corner brackets */}
          {BRACKETS.map((pos, i) => (
            <motion.span
              key={pos}
              aria-hidden
              className={`absolute h-9 w-9 border-white/60 ${pos}`}
              initial={reduce ? { opacity: 0.6 } : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE.out, delay: reduce ? 0 : 0.08 * i }}
            />
          ))}

          {/* Thin red status line */}
          <motion.span
            aria-hidden
            className="absolute bottom-6 left-1/2 block h-[2px] w-24 origin-center -translate-x-1/2 bg-red"
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: EASE.out, delay: reduce ? 0 : 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
