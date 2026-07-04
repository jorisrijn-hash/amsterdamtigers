"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

const HOLD_MS = 1150;

export function Loader() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(true);
  const [pct, setPct] = useState(0);
  const skipped = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem("at:loaded")) {
      skipped.current = true;
      setActive(false);
      return;
    }

    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / HOLD_MS);
      setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const done = window.setTimeout(() => setActive(false), HOLD_MS);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(done);
    };
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
          initial={reduce ? { opacity: 1 } : false}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { y: "-100%", transition: { duration: 0.7, ease: EASE.drawer } }
          }
        >
          <div className="flex flex-col items-center gap-6">
            <motion.img
              src="/media/crest-white.png"
              alt="Amsterdam Tigers"
              className="h-28 w-28 object-contain sm:h-32 sm:w-32"
              draggable={false}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE.out }}
            />

            {/* red baseline grows in */}
            <motion.span
              className="block h-[2px] w-24 origin-center bg-red"
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, ease: EASE.out, delay: 0.15 }}
              aria-hidden
            />

            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-muted">
              <span>AMSTERDAM TIGERS</span>
              <span className="text-red tabular-nums">
                {String(pct).padStart(3, "0")}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
