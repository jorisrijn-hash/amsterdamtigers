/**
 * Match center data.
 *
 * TODO(swap): replace the arrays below with a real source (IJshockey Nederland
 * feed or a headless CMS). Keep the exported types and helpers stable so the UI
 * does not change. Fixtures use build-time-relative dates purely so the demo
 * always has a live countdown; real data will carry absolute dates.
 */

export type MatchStatus = "scheduled" | "final";

export interface Match {
  id: string;
  /** ISO 8601 datetime. */
  date: string;
  home: string;
  away: string;
  venue: string;
  competition: string;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
}

export interface StandingRow {
  rank: number;
  team: string;
  played: number;
  won: number;
  lost: number;
  points: number;
}

const CLUB = "Amsterdam Tigers";
const HOME = "Jaap Edenbaan, Amsterdam";
const COMP = "BeNe League";

const DAY = 86_400_000;
const iso = (offsetDays: number, hour = 20) => {
  const d = new Date(Date.now() + offsetDays * DAY);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

// Upcoming (relative dates so the countdown is always live in the demo).
export const FIXTURES: Match[] = [
  { id: "f1", date: iso(6), home: CLUB, away: "Tilburg Trappers", venue: HOME, competition: COMP, status: "scheduled" },
  { id: "f2", date: iso(13), home: "Nijmegen Devils", away: CLUB, venue: "Triavium, Nijmegen", competition: COMP, status: "scheduled" },
  { id: "f3", date: iso(20), home: CLUB, away: "Eindhoven Kemphanen", venue: HOME, competition: COMP, status: "scheduled" },
  { id: "f4", date: iso(27), home: "Geleen Smoke Eaters", away: CLUB, venue: "Glanerbrook, Geleen", competition: COMP, status: "scheduled" },
];

// Results (fixed past dates = season history placeholder).
export const RESULTS: Match[] = [
  { id: "r1", date: "2026-01-24T20:00:00.000Z", home: CLUB, away: "Utrecht Dragons", venue: HOME, competition: COMP, status: "final", homeScore: 5, awayScore: 2 },
  { id: "r2", date: "2026-01-17T19:30:00.000Z", home: "Heerenveen Flyers", away: CLUB, venue: "Thialf, Heerenveen", competition: COMP, status: "final", homeScore: 3, awayScore: 4 },
  { id: "r3", date: "2026-01-10T20:00:00.000Z", home: CLUB, away: "Tilburg Trappers", venue: HOME, competition: COMP, status: "final", homeScore: 2, awayScore: 3 },
  { id: "r4", date: "2026-01-03T20:00:00.000Z", home: CLUB, away: "Nijmegen Devils", venue: HOME, competition: COMP, status: "final", homeScore: 6, awayScore: 1 },
];

export const STANDINGS: StandingRow[] = [
  { rank: 1, team: "Tilburg Trappers", played: 18, won: 15, lost: 3, points: 45 },
  { rank: 2, team: "Amsterdam Tigers", played: 18, won: 12, lost: 6, points: 36 },
  { rank: 3, team: "Nijmegen Devils", played: 18, won: 11, lost: 7, points: 33 },
  { rank: 4, team: "Eindhoven Kemphanen", played: 18, won: 9, lost: 9, points: 27 },
  { rank: 5, team: "Geleen Smoke Eaters", played: 18, won: 7, lost: 11, points: 21 },
  { rank: 6, team: "Heerenveen Flyers", played: 18, won: 6, lost: 12, points: 18 },
  { rank: 7, team: "Utrecht Dragons", played: 18, won: 3, lost: 15, points: 9 },
];

/** Next scheduled match by date, or null if none upcoming. */
export function getNextMatch(now: number = Date.now()): Match | null {
  return (
    [...FIXTURES]
      .filter((m) => new Date(m.date).getTime() > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] ?? null
  );
}

export const isClub = (team: string) => team === CLUB;
