"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Crest } from "./Crest";
import { useI18n } from "./I18nProvider";

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [videoOk, setVideoOk] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      className="grain relative flex h-[100svh] min-h-[600px] items-center justify-center overflow-hidden"
    >
      {/* Media layer - swap /media/hero.mp4 + /media/hero-poster.jpg with the real clip */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { scale: mediaScale }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_20%,#1a1d22_0%,#0d0f12_55%,#080a0c_100%)]" />
        {videoOk && (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-70"
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero-poster.jpg"
            onError={() => setVideoOk(false)}
          >
            <source src="/media/hero.mp4" type="video/mp4" />
          </video>
        )}
        {/* Legibility scrim */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,12,0.55)_0%,rgba(8,10,12,0.15)_35%,rgba(8,10,12,0.75)_100%)]" />
      </motion.div>

      {/* Overlay content */}
      <motion.div
        className="relative z-raised flex flex-col items-center px-6 text-center"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <Crest className="h-20 w-20 text-paper sm:h-24 sm:w-24" />
        <h1 className="display mt-6 text-[clamp(2.75rem,11vw,6rem)] tracking-wordmark">
          Amsterdam Tigers
        </h1>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.28em] text-muted">
          {t("hero.tagline")}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link href="/wedstrijden" className="btn">
            {t("hero.tickets")}
          </Link>
          <Link href="/team" className="btn-ghost inline-flex items-center gap-2 px-6 py-[0.95rem] font-mono text-[0.78rem] uppercase tracking-[0.14em]">
            {t("hero.viewTeam")} <span aria-hidden>&rarr;</span>
          </Link>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <div className="absolute bottom-24 left-1/2 z-raised flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-16">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.3em] text-muted-2">
          {t("hero.scroll")}
        </span>
        <motion.span
          className="block h-8 w-px bg-[linear-gradient(180deg,var(--muted-2),transparent)]"
          animate={reduce ? undefined : { scaleY: [0.4, 1, 0.4], opacity: [0.4, 1, 0.4] }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden
        />
      </div>
    </section>
  );
}
