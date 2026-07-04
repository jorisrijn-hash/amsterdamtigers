"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { LINEUP } from "@/lib/players";
import { PlayerCard } from "./PlayerCard";
import { Reveal } from "./Reveal";

export function TeamLineup() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const rowRotateX = useTransform(scrollYProgress, [0, 1], [9, 0]);
  const rowY = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const rowOpacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="label">De selectie</span>
            <h2 className="display mt-3 text-[clamp(2.25rem,6vw,4rem)]">
              The Team
            </h2>
          </div>
          <Link
            href="/team"
            className="btn-ghost inline-flex items-center gap-2 px-5 py-3 font-mono text-[0.74rem] uppercase tracking-[0.14em]"
          >
            Meet the team <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>
      </div>

      {/* 3D perspective track */}
      <div
        className="mt-12 md:mt-16"
        style={{ perspective: "1400px" }}
      >
        <motion.ul
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--pad)] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={
            reduce
              ? undefined
              : { rotateX: rowRotateX, y: rowY, opacity: rowOpacity, transformStyle: "preserve-3d" }
          }
        >
          {LINEUP.map((player, i) => (
            <li key={player.number} className="[transform-style:preserve-3d]">
              <PlayerCard player={player} index={i} />
            </li>
          ))}
          {/* trailing spacer so the last card can snap clear of the edge */}
          <li aria-hidden className="w-px shrink-0" />
        </motion.ul>
      </div>
    </section>
  );
}
