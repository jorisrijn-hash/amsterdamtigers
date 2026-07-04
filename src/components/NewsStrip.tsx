import Link from "next/link";
import { Reveal } from "./Reveal";

const NEWS = [
  { date: "2026.03.28", title: "Technische staf Amsterdam Tigers compleet", tag: "Club" },
  { date: "2026.03.14", title: "Player announcement: Soro Sorokin tekent bij", tag: "Transfer" },
  { date: "2026.02.22", title: "Terugblik op een historisch seizoen", tag: "Wedstrijd" },
];

export function NewsStrip() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-[clamp(2rem,6vw,4rem)]">
            Nieuws<span className="text-red">.</span>
          </h2>
          <Link
            href="/nieuws"
            className="btn-ghost inline-flex items-center gap-2 px-5 py-3 font-mono text-[0.74rem] uppercase tracking-[0.14em]"
          >
            Alle updates <span aria-hidden>&rarr;</span>
          </Link>
        </Reveal>

        <ul className="mt-10 border-t border-line">
          {NEWS.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.04}>
              <Link
                href="/nieuws"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-6 md:gap-8 md:py-7"
              >
                <span className="font-mono text-[0.68rem] tracking-[0.14em] text-muted-2">
                  {item.date}
                </span>
                <span className="display text-lg leading-snug transition-colors duration-200 ease-out group-hover:text-red md:text-2xl">
                  {item.title}
                </span>
                <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted sm:inline">
                  {item.tag}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
