const PARTNERS = [
  { src: "/media/partners/warrior.webp", alt: "Warrior" },
  { src: "/media/partners/osk-advocaten.webp", alt: "OSK Advocaten" },
  { src: "/media/partners/topsport-amsterdam.webp", alt: "Topsport Amsterdam" },
  { src: "/media/partners/jaap-eden.webp", alt: "Jaap Eden IJsbanen" },
];

export function Partners() {
  // duplicated once for a seamless loop
  const items = [...PARTNERS, ...PARTNERS];
  return (
    <section
      className="relative overflow-hidden border-y border-line py-10"
      aria-label="Partners"
    >
      <div className="marquee flex w-max items-center gap-20 whitespace-nowrap px-10">
        {items.map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={p.src}
            alt={i < PARTNERS.length ? p.alt : ""}
            aria-hidden={i >= PARTNERS.length}
            className="h-8 w-auto max-w-[10rem] object-contain opacity-60 transition-opacity duration-200 ease-out hover:opacity-100 md:h-10"
            draggable={false}
          />
        ))}
      </div>

      <style>{`
        .marquee { animation: marquee 34s linear infinite; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) { .marquee { animation: none; } }
      `}</style>
    </section>
  );
}
