"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { LINEUP } from "@/lib/players";
import { PlayerCard } from "./PlayerCard";
import { useI18n } from "./I18nProvider";

/**
 * Pinned horizontal scroll: the section is `100vh + trackDistance` tall; the
 * inner viewport is `sticky top-0 h-screen`, and the card row translates left
 * in lockstep with vertical scroll progress. The travel distance is measured
 * (track.scrollWidth - viewport.clientWidth), not hardcoded, so it stays exact
 * across breakpoints and card counts. Falls back to a normal horizontal-scroll
 * row before mount and under prefers-reduced-motion.
 */
export function TeamLineup() {
  const reduce = useReducedMotion();
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  const [mounted, setMounted] = useState(false);
  const [distance, setDistance] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const measure = () => {
      const track = trackRef.current;
      const vp = viewportRef.current;
      if (!track || !vp) return;
      setDistance(Math.max(0, track.scrollWidth - vp.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [mounted]);

  const pinned = mounted && !reduce && distance > 0;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  const Header = (
    <div className="shell flex flex-wrap items-end justify-between gap-6 pt-24 md:pt-28">
      <div>
        <span className="label">{t("team.label")}</span>
        <h2 className="display mt-3 text-[clamp(2.25rem,6vw,4rem)]">{t("team.title")}</h2>
      </div>
      <Link
        href="/team"
        className="btn-ghost inline-flex items-center gap-2 px-5 py-3 font-mono text-[0.74rem] uppercase tracking-[0.14em]"
      >
        {t("team.cta")} <span aria-hidden>&rarr;</span>
      </Link>
    </div>
  );

  const cards = LINEUP.map((player) => (
    <li
      key={player.name}
      className="relative aspect-[3/4] h-[clamp(18rem,58vh,36rem)] shrink-0"
    >
      <PlayerCard player={player} fill />
    </li>
  ));

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
      aria-label="Selectie"
    >
      <div
        ref={viewportRef}
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col overflow-hidden"
            : "flex flex-col"
        }
      >
        {Header}

        <div
          className={
            pinned
              ? "flex flex-1 items-center overflow-hidden"
              : "mt-12 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mt-16"
          }
        >
          <motion.ul
            ref={trackRef}
            style={pinned ? { x } : undefined}
            className="flex items-center gap-4 px-[6vw] md:gap-6"
          >
            {cards}
          </motion.ul>
        </div>

        {pinned && (
          <div className="shell pb-16 md:pb-20">
            <div className="h-px w-full bg-line">
              <motion.div
                className="h-px origin-left bg-red"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
