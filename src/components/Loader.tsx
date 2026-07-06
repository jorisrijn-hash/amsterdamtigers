"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE, LOADER_HOLD_MS, LOADER_EXIT_MS } from "@/lib/motion";

/**
 * Black launch screen: the crest animates in (scale + fade) with a red accent
 * line, holds, then the whole panel lifts to open the website. Plays once per
 * session, locks scroll while active, degrades to a plain fade under
 * prefers-reduced-motion. The site (hero) underneath is static; the nav decodes
 * in as the curtain clears (see Nav).
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
          className="fixed inset-0 z-loader grid place-items-center bg-ink grain"
          initial={false}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { y: "-100%", transition: { duration: LOADER_EXIT_MS / 1000, ease: EASE.drawer } }
          }
        >
          <div className="flex flex-col items-center gap-6">
            <motion.img
              src="/media/crest-white.png"
              alt="Amsterdam Tigers"
              className="h-24 w-24 object-contain sm:h-28 sm:w-28"
              draggable={false}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE.out }}
            />

            <motion.span
              className="block h-[3px] w-28 origin-center bg-red"
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: EASE.out, delay: reduce ? 0 : 0.25 }}
              aria-hidden
            />

            <motion.span
              className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-muted-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE.out, delay: reduce ? 0 : 0.45 }}
            >
              Amsterdam Tigers
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
