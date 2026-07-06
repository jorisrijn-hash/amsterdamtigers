"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Crest } from "./Crest";
import { Scramble } from "./Scramble";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "./I18nProvider";
import { NAV_LEFT, NAV_RIGHT, NAV_ALL } from "@/lib/site";
import { EASE, LOADER_HOLD_MS } from "@/lib/motion";
import type { TranslationKey } from "@/lib/i18n";

function NavLink({
  href,
  label,
  active,
  revealed,
  index,
}: {
  href: string;
  label: string;
  active: boolean;
  revealed: boolean;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="group relative block py-2 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em]"
      style={{ color: active ? "var(--paper)" : "var(--muted)" }}
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">
          <Scramble text={label} play={revealed} delay={index * 70} />
        </span>
        <span
          aria-hidden
          className="absolute inset-0 block translate-y-full text-paper transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
        >
          {label}
        </span>
      </span>
      <span
        aria-hidden
        className={`absolute -bottom-0.5 left-0 h-px bg-red transition-[width] duration-300 ease-out ${
          active ? "w-full" : "w-0 group-hover:w-full group-focus-visible:w-full"
        }`}
      />
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion() ?? false;
  const { t } = useI18n();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 64));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (reduce) {
      setRevealed(true);
      return;
    }
    let loaderPlaying = false;
    try {
      loaderPlaying = !sessionStorage.getItem("at:loaded");
    } catch {
      /* sessionStorage unavailable */
    }
    const delay = loaderPlaying ? LOADER_HOLD_MS - 150 : 150;
    const id = window.setTimeout(() => setRevealed(true), delay);
    return () => window.clearTimeout(id);
  }, [reduce]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const solid = !isHome || scrolled;

  return (
    <header
      className="fixed inset-x-0 top-0 z-nav transition-colors duration-300 ease-out"
      style={{
        background: solid ? "color-mix(in oklch, var(--ink) 82%, transparent)" : "transparent",
        backdropFilter: solid ? "blur(10px)" : "none",
        borderBottom: solid ? "1px solid var(--hairline)" : "1px solid transparent",
      }}
    >
      <nav className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center md:h-[4.5rem]">
        {/* Left column */}
        <div className="flex items-center">
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LEFT.map((item, i) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={t(item.tKey as TranslationKey)}
                  active={pathname === item.href}
                  revealed={revealed}
                  index={i}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Center column: crest */}
        <Link
          href="/"
          aria-label="Amsterdam Tigers, home"
          className="justify-self-center text-paper"
        >
          <Crest className="h-9 w-9 md:h-10 md:w-10" />
        </Link>

        {/* Right column */}
        <div className="flex items-center justify-end gap-6">
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_RIGHT.map((item, i) => (
              <li key={item.href}>
                <NavLink
                  href={item.href}
                  label={t(item.tKey as TranslationKey)}
                  active={pathname === item.href}
                  revealed={revealed}
                  index={NAV_LEFT.length + i}
                />
              </li>
            ))}
          </ul>

          <LanguageToggle className="hidden lg:inline-flex" />

          <Link
            href="/vereniging"
            className="btn-ghost hidden items-center gap-2 px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] lg:inline-flex"
          >
            {t("nav.association")}
            <span aria-hidden>&rarr;</span>
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-overlay flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className="h-px w-6 bg-paper transition-transform duration-300 ease-out"
              style={{ transform: open ? "translateY(3px) rotate(45deg)" : "none" }}
            />
            <span
              className="h-px w-6 bg-paper transition-transform duration-300 ease-out"
              style={{ transform: open ? "translateY(-3px) rotate(-45deg)" : "none" }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-overlay bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.25, ease: EASE.out }}
          >
            <div className="shell flex h-full flex-col justify-center gap-1 pt-16">
              <div className="mb-6">
                <LanguageToggle />
              </div>
              {NAV_ALL.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE.out, delay: reduce ? 0 : 0.05 + i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="display block py-2 text-[13vw] leading-none text-paper"
                  >
                    {t(item.tKey as TranslationKey)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE.out, delay: reduce ? 0 : 0.05 + NAV_ALL.length * 0.05 }}
                className="mt-6"
              >
                <Link href="/vereniging" className="btn">
                  {t("nav.association")} <span aria-hidden>&rarr;</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
