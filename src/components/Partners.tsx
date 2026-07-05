"use client";

import { useReducedMotion } from "framer-motion";

const PARTNERS = [
  { src: "/media/partners/warrior.webp", alt: "Warrior" },
  { src: "/media/partners/osk-advocaten.webp", alt: "OSK Advocaten" },
  { src: "/media/partners/topsport-amsterdam.webp", alt: "Topsport Amsterdam" },
  { src: "/media/partners/jaap-eden.webp", alt: "Jaap Eden IJsbanen" },
];

// Repeat so one group comfortably exceeds the widest viewport; two identical
// groups translate by exactly -100% for a seamless, gap-free loop.
const GROUP = Array.from({ length: 4 }).flatMap(() => PARTNERS);

function Logo({
  item,
  decorative = false,
}: {
  item: { src: string; alt: string };
  decorative?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={decorative ? "" : item.alt}
      aria-hidden={decorative}
      className="h-8 w-auto max-w-[9rem] shrink-0 object-contain opacity-60 transition-opacity duration-200 ease-out hover:opacity-100 md:h-10"
      draggable={false}
    />
  );
}

export function Partners() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section
        className="relative overflow-hidden border-y border-line py-10"
        aria-label="Partners"
      >
        <ul className="shell flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {PARTNERS.map((p, i) => (
            <li key={i}>
              <Logo item={p} />
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden border-y border-line py-10"
      aria-label="Partners"
    >
      <div className="mq flex w-max">
        <ul className="mq-group flex shrink-0 items-center">
          {GROUP.map((p, i) => (
            <li key={`a-${i}`} className="px-8 md:px-10">
              <Logo item={p} />
            </li>
          ))}
        </ul>
        <ul className="mq-group flex shrink-0 items-center" aria-hidden>
          {GROUP.map((p, i) => (
            <li key={`b-${i}`} className="px-8 md:px-10">
              <Logo item={p} decorative />
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .mq-group { animation: mq-scroll 45s linear infinite; will-change: transform; }
        @keyframes mq-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
}
