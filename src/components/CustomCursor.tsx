"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Lowkey custom cursor: an exact-position dot for precision plus a spring-
 * trailed ring for flair. `mix-blend-difference` keeps it legible on both the
 * dark surfaces and the red/white accents. Desktop fine-pointer only; the
 * native cursor is left untouched on touch and under reduced motion.
 */
export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const visRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 400, damping: 30, mass: 0.35 });
  const ry = useSpring(y, { stiffness: 400, damping: 30, mass: 0.35 });

  useEffect(() => {
    if (reduce || typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("cursor-none");

    const setVis = (v: boolean) => {
      if (visRef.current !== v) {
        visRef.current = v;
        setVisible(v);
      }
    };

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVis(true);
      const el = e.target as Element | null;
      setHover(
        !!el?.closest?.("a,button,[data-cursor],input,textarea,select,label"),
      );
    };
    const enter = () => setVis(true);
    const leave = () => setVis(false);
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerenter", enter);
    document.addEventListener("pointerleave", leave);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerenter", enter);
      document.removeEventListener("pointerleave", leave);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  const ringScale = down ? 0.85 : hover ? 1.7 : 1;
  const dotScale = down ? 0.6 : hover ? 0 : 1;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease" }}
      aria-hidden
    >
      <motion.span
        className="absolute left-0 top-0 -ml-3.5 -mt-3.5 block h-7 w-7 rounded-full border border-white"
        style={{ x: rx, y: ry }}
        animate={{ scale: ringScale }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <motion.span
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] block h-1.5 w-1.5 rounded-full bg-white"
        style={{ x, y }}
        animate={{ scale: dotScale }}
        transition={{ type: "spring", stiffness: 800, damping: 30 }}
      />
    </div>
  );
}
