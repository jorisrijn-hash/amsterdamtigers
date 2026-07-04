import Link from "next/link";
import { NEXT_GAME } from "@/lib/site";

export function StatusBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-sticky border-t border-line"
      style={{ background: "color-mix(in oklch, var(--ink) 88%, transparent)", backdropFilter: "blur(10px)" }}
    >
      <div className="shell flex h-14 items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <span className="hidden shrink-0 font-mono text-[0.62rem] uppercase tracking-[0.24em] text-muted-2 sm:inline">
            Next game
          </span>
          <span className="hidden h-4 w-px bg-line sm:block" aria-hidden />
          <span className="truncate font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
            {NEXT_GAME.status}
          </span>
        </div>
        <Link href={NEXT_GAME.ticketsHref} className="btn shrink-0 px-5 py-2.5 text-[0.72rem]">
          Tickets
        </Link>
      </div>
    </div>
  );
}
