"use client";

import { track } from "@/lib/analytics";
import type { Sponsor } from "@/lib/partners";

/** Sponsor logo link that records an outbound click (sponsor ROI reporting). */
export function SponsorLink({ sponsor }: { sponsor: Sponsor }) {
  const external = sponsor.url && sponsor.url !== "#";
  const content = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sponsor.logo}
      alt={sponsor.name}
      className="h-12 w-auto max-w-[12rem] object-contain opacity-70 transition-opacity duration-200 ease-out group-hover:opacity-100 md:h-14"
      draggable={false}
    />
  );

  if (!external) {
    return <div className="group grid place-items-center">{content}</div>;
  }

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      data-cursor
      onClick={() => track("sponsor_click", { sponsor: sponsor.name, tier: sponsor.tier })}
      className="group grid place-items-center"
      aria-label={`${sponsor.name} (opent in nieuw tabblad)`}
    >
      {content}
    </a>
  );
}
