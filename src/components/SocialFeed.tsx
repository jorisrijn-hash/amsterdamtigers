"use client";

import { CLUB } from "@/lib/site";
import { Reveal } from "./Reveal";
import { useI18n } from "./I18nProvider";
import type { Locale } from "@/lib/i18n";

/**
 * Feed integration:
 *   The tiles below are a graceful fallback. To wire the real feed, drop in a
 *   Behold (behold.so) or Elfsight widget where marked, or use Instagram oEmbed.
 */

type Tile = {
  kind: "Reel" | "Post" | "Announcement";
  caption: Record<Locale, string>;
  image: string;
};

const TILES: Tile[] = [
  { kind: "Announcement", caption: { nl: "Player announcement", en: "Player announcement" }, image: "/media/players/justin-van-baarsen.webp" },
  { kind: "Reel", caption: { nl: "Wedstrijddag", en: "Matchday" }, image: "/media/action-game.webp" },
  { kind: "Post", caption: { nl: "Selectie compleet", en: "Roster complete" }, image: "/media/players/nils-schramm.webp" },
  { kind: "Reel", caption: { nl: "Behind the glass", en: "Behind the glass" }, image: "/media/action-goal.webp" },
  { kind: "Post", caption: { nl: "Face-off", en: "Faceoff" }, image: "/media/players/mick-vastenhouw.webp" },
  { kind: "Announcement", caption: { nl: "Nieuwe aanwinst", en: "New signing" }, image: "/media/players/samu-poutanen.webp" },
];

function FeedTile({
  tile,
  caption,
  follow,
}: {
  tile: Tile;
  caption: string;
  follow: string;
}) {
  return (
    <a href={CLUB.instagram} target="_blank" rel="noreferrer" className="group block">
      <div className="relative aspect-square overflow-hidden bg-ink-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={tile.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 z-0 h-full w-full object-cover object-top transition-[filter] duration-300 ease-out group-hover:brightness-110"
          draggable={false}
        />
        <span className="absolute left-3 top-3 z-10 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/80">
          {tile.kind}
        </span>

        {(tile.kind === "Reel" || tile.kind === "Announcement") && (
          <span
            className="absolute right-3 top-3 z-10 grid h-6 w-6 place-items-center border border-white/40 text-paper"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 z-10 bg-[linear-gradient(180deg,transparent,rgba(8,10,12,0.92))] p-3 pt-12">
          <p className="display text-sm leading-tight">{caption}</p>
          <span className="mt-1 block font-mono text-[0.56rem] uppercase tracking-[0.18em] text-muted opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
            {follow} &rarr;
          </span>
        </div>
      </div>
    </a>
  );
}

export function SocialFeed() {
  const { t, locale } = useI18n();

  return (
    <section className="relative border-t border-line py-24 md:py-32">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[clamp(2rem,7vw,4.5rem)] lowercase tracking-wordmark">
            {CLUB.handle}
          </h2>
          <a
            href={CLUB.instagram}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost inline-flex items-center gap-2 px-5 py-3 font-mono text-[0.74rem] uppercase tracking-[0.14em]"
          >
            {t("social.cta")} <span aria-hidden>&rarr;</span>
          </a>
        </Reveal>

        {/* Real widget mounts here (Behold / Elfsight). Fallback grid below. */}
        <Reveal className="mt-10 grid gap-3" delay={0.05}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {TILES.map((tile, i) => (
              <FeedTile
                key={i}
                tile={tile}
                caption={tile.caption[locale]}
                follow={t("social.cta")}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
