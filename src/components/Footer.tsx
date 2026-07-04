import Link from "next/link";
import { Crest } from "./Crest";
import { CLUB, NAV_ALL } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-line pb-24 pt-20">
      <div className="shell grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="Amsterdam Tigers, home" className="inline-flex items-center gap-3 text-paper">
            <Crest className="h-10 w-10" />
            <span className="display text-lg tracking-wordmark">Amsterdam Tigers</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {CLUB.tagline}. IJshockey op de Jaap Edenbaan, hartje Amsterdam.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-3">
          {NAV_ALL.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted transition-colors duration-200 ease-out hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="label">Volg</span>
          <a
            href={CLUB.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted transition-colors duration-200 ease-out hover:text-paper"
          >
            {CLUB.handle}
          </a>
          <Link
            href="/vereniging"
            className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted transition-colors duration-200 ease-out hover:text-paper"
          >
            Vereniging login
          </Link>
        </div>
      </div>

      <div className="shell mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-2">
          &copy; {new Date().getFullYear()} {CLUB.name}
        </span>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-2">
          {CLUB.domain}
        </span>
      </div>
    </footer>
  );
}
