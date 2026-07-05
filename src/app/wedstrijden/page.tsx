import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Countdown } from "@/components/Countdown";
import {
  FIXTURES,
  RESULTS,
  STANDINGS,
  getNextMatch,
  isClub,
  type Match,
} from "@/lib/matches";

export const metadata: Metadata = {
  title: "Wedstrijden",
  description: "Speelschema, uitslagen en stand van de Amsterdam Tigers.",
  alternates: { canonical: "/wedstrijden" },
};

const TICKETS_URL = process.env.NEXT_PUBLIC_TICKETS_URL ?? "#";

const fmtLong = (iso: string) =>
  new Intl.DateTimeFormat("nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

function Teams({ m }: { m: Match }) {
  return (
    <span className="display text-base md:text-lg">
      <span className={isClub(m.home) ? "text-paper" : "text-muted"}>{m.home}</span>
      <span className="mx-2 text-muted-2">vs</span>
      <span className={isClub(m.away) ? "text-paper" : "text-muted"}>{m.away}</span>
    </span>
  );
}

function MatchRow({ m }: { m: Match }) {
  const win =
    m.status === "final" &&
    m.homeScore != null &&
    m.awayScore != null &&
    ((isClub(m.home) && m.homeScore > m.awayScore) ||
      (isClub(m.away) && m.awayScore > m.homeScore));

  return (
    <div className="grid grid-cols-1 gap-2 border-b border-line py-5 sm:grid-cols-[9rem_1fr_auto] sm:items-center sm:gap-6">
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-2">
        {fmtLong(m.date)}
      </span>
      <Teams m={m} />
      <span className="font-mono text-sm">
        {m.status === "final" ? (
          <span className={win ? "text-red" : "text-muted"}>
            {m.homeScore} - {m.awayScore}
          </span>
        ) : (
          <span className="text-muted-2">{m.venue}</span>
        )}
      </span>
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="shell mt-16">
      <Reveal>
        <h2 className="display mb-4 text-2xl md:text-3xl">{title}</h2>
      </Reveal>
      <div>{children}</div>
    </div>
  );
}

export default function WedstrijdenPage() {
  const next = getNextMatch();

  return (
    <PageShell
      label="Speelschema & tickets"
      title="Wedstrijden"
      intro="Thuis op de Jaap Edenbaan. Het volledige programma, de uitslagen en de stand."
    >
      {next && (
        <div className="shell mt-14">
          <Reveal className="border border-line p-6 md:p-10">
            <span className="label">Volgende wedstrijd</span>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
              <div>
                <Teams m={next} />
                <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                  {fmtLong(next.date)} - {next.venue}
                </p>
              </div>
              <Link href={TICKETS_URL} className="btn">
                Tickets
              </Link>
            </div>
            <div className="mt-8">
              <Countdown to={next.date} />
            </div>
          </Reveal>
        </div>
      )}

      <Block title="Programma">
        {FIXTURES.map((m) => (
          <MatchRow key={m.id} m={m} />
        ))}
      </Block>

      <Block title="Uitslagen">
        {RESULTS.map((m) => (
          <MatchRow key={m.id} m={m} />
        ))}
      </Block>

      <Block title="Stand">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-line font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-2">
                <th className="py-3 pr-4 font-normal">#</th>
                <th className="py-3 pr-4 font-normal">Team</th>
                <th className="py-3 pr-4 text-right font-normal">G</th>
                <th className="py-3 pr-4 text-right font-normal">W</th>
                <th className="py-3 pr-4 text-right font-normal">V</th>
                <th className="py-3 text-right font-normal">Ptn</th>
              </tr>
            </thead>
            <tbody>
              {STANDINGS.map((row) => {
                const me = isClub(row.team);
                return (
                  <tr
                    key={row.rank}
                    className={`border-b border-line text-sm ${me ? "text-paper" : "text-muted"}`}
                  >
                    <td className="py-3 pr-4 font-mono text-muted-2">{row.rank}</td>
                    <td className="py-3 pr-4">
                      <span className={me ? "display" : ""}>{row.team}</span>
                      {me && (
                        <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-red align-middle" aria-hidden />
                      )}
                    </td>
                    <td className="py-3 pr-4 text-right font-mono">{row.played}</td>
                    <td className="py-3 pr-4 text-right font-mono">{row.won}</td>
                    <td className="py-3 pr-4 text-right font-mono">{row.lost}</td>
                    <td className="py-3 text-right font-mono text-paper">{row.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-2">
          Placeholder-data - koppel het echte competitieschema via CMS of feed.
        </p>
      </Block>
    </PageShell>
  );
}
