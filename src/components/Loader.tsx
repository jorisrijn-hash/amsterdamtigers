"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE, LOADER_HOLD_MS, LOADER_EXIT_MS } from "@/lib/motion";

const WORDS = ["Amsterdam", "Tigers"];

/**
 * Launch intro: crest snaps in, the wordmark reveals line-by-line via a masked
 * slide-up, a red accent bar wipes in, then the whole panel lifts to hand off to
 * the hero video. Plays once per session (sessionStorage), locks scroll while
 * active, and degrades to a plain fade under prefers-reduced-motion.
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
              className="h-16 w-16 object-contain sm:h-20 sm:w-20"
              draggable={false}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE.out }}
            />

            <div className="text-center leading-[0.88]">
              {WORDS.map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    className="display block text-[clamp(2.5rem,11vw,6.5rem)] uppercase tracking-wordmark"
                    initial={reduce ? { opacity: 0 } : { y: "115%" }}
                    animate={reduce ? { opacity: 1 } : { y: "0%" }}
                    transition={{
                      duration: 0.6,
                      ease: EASE.out,
                      delay: reduce ? 0 : 0.2 + i * 0.1,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </div>

            <motion.span
              className="block h-[3px] w-40 origin-left bg-red"
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: EASE.out, delay: reduce ? 0 : 0.45 }}
              aria-hidden
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
