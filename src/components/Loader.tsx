"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE, LOADER_HOLD_MS } from "@/lib/motion";

/**
 * Logo-to-site intro: the crest scales in, holds, then zooms up and fades while
 * the ink backdrop fades out, revealing the hero video underneath (as if the
 * site opens out of the logo). Plays once per session, locks scroll while
 * active, and degrades to a plain fade under prefers-reduced-motion.
 *
 * Timeline is internal (keyframes); the panel simply unmounts at LOADER_HOLD_MS,
 * which stays the shared handoff point for the nav/hero reveals.
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
    const finish = () => {
      document.body.style.overflow = "";
      sessionStorage.setItem("at:loaded", "1");
      setActive(false);
    };
    const id = window.setTimeout(finish, reduce ? 500 : LOADER_HOLD_MS);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-loader" aria-hidden>
      {/* Ink backdrop fades out late to reveal the hero video underneath */}
      <motion.div
        className="absolute inset-0 bg-ink grain"
        initial={{ opacity: 1 }}
        animate={reduce ? { opacity: 0 } : { opacity: [1, 1, 0] }}
        transition={
          reduce
            ? { duration: 0.4, ease: EASE.out }
            : { duration: 1.25, times: [0, 0.6, 1], ease: EASE.out }
        }
      />

      {/* Crest: scale-in -> hold -> zoom through + fade */}
      <div className="absolute inset-0 grid place-items-center">
        <motion.img
          src="/media/crest-white.png"
          alt=""
          className="h-24 w-24 object-contain will-change-transform sm:h-28 sm:w-28"
          draggable={false}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.72, rotateY: -18 }}
          animate={
            reduce
              ? { opacity: [0, 1, 0] }
              : { opacity: [0, 1, 1, 0], scale: [0.72, 1, 1, 10], rotateY: [-18, 0, 0, 0] }
          }
          transition={
            reduce
              ? { duration: 0.5, ease: EASE.out }
              : { duration: 1.25, times: [0, 0.16, 0.58, 1], ease: EASE.inOut }
          }
          style={{ transformPerspective: 900 }}
        />
      </div>
    </div>
  );
}
