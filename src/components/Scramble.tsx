"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Monospace-safe noise glyphs (full-width in JetBrains Mono).
const GLYPHS = "█▓▒░▚▞▛▜#%&*+=/<>";
const randGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

const scrambleAll = (text: string) =>
  text
    .split("")
    .map((c) => (c === " " ? " " : randGlyph()))
    .join("");

/**
 * Decode/scramble reveal. Renders the final text on the server and until
 * `play` flips true (crawlable, no hydration skew), then resolves left-to-right
 * from noise glyphs to the target. `delay` staggers the start.
 */
export function Scramble({
  text,
  play,
  delay = 0,
  className,
}: {
  text: string;
  play: boolean;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (reduce) {
      setDisplay(text);
      return;
    }
    if (!play) {
      // Encrypted holding state before the reveal is triggered.
      if (mounted.current) setDisplay(scrambleAll(text));
      return;
    }

    const durationMs = Math.max(420, text.length * 45);
    const startTime = performance.now() + delay;
    let raf = 0;
    let last = 0;

    const loop = (now: number) => {
      if (now - last >= 33) {
        last = now;
        const p = Math.max(0, Math.min(1, (now - startTime) / durationMs));
        const resolved = Math.floor(p * text.length);
        setDisplay(
          text
            .split("")
            .map((c, i) => (c === " " ? " " : i < resolved ? c : randGlyph()))
            .join(""),
        );
        if (p >= 1) {
          setDisplay(text);
          return;
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [text, play, delay, reduce]);

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{display}</span>
    </span>
  );
}
