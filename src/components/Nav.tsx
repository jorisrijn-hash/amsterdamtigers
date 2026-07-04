"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Crest } from "./Crest";
import { NAV_LEFT, NAV_RIGHT, NAV_ALL } from "@/lib/site";
import { EASE } from "@/lib/motion";

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className="group relative py-2 font-mono text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors duration-200 ease-out"
      style={{ color: active ? "var(--paper)" : "var(--muted)" }}
    >
      <span className="transition-colors group-hover:text-paper">{label}</span>
      <span
        className="absolute -bottom-0.5 left-0 h-px bg-red transition-[width] duration-300 ease-out"
        style={{ width: active ? "100%" : "0%" }}
        aria-hidden
      />
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      <nav className="shell flex h-16 items-center justify-between md:h-[4.5rem]">
        {/* Left links (desktop) */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LEFT.map((item) => (
            <li key={item.href}>
              <NavLink {...item} active={pathname === item.href} />
            </li>
          ))}
        </ul>

        {/* Centered crest */}
        <Link
          href="/"
          aria-label="Amsterdam Tigers, home"
          className="text-paper lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          <Crest className="h-9 w-9 md:h-10 md:w-10" />
        </Link>

        {/* Right links + login (desktop) */}
        <div className="hidden items-center gap-7 lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_RIGHT.map((item) => (
              <li key={item.href}>
                <NavLink {...item} active={pathname === item.href} />
              </li>
            ))}
          </ul>
          <Link
            href="/vereniging"
            className="btn-ghost inline-flex items-center gap-2 px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.16em]"
          >
            Vereniging
            <span aria-hidden>&rarr;</span>
          </Link>
        </div>

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
                    {item.label}
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
                  Vereniging login <span aria-hidden>&rarr;</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
