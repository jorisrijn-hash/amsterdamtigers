export type Position = "Goalie" | "Defence" | "Forward";

export interface Player {
  name: string;
  photo: string;
  /** Optional: not verified from the asset filenames. Fill in when known. */
  number?: number;
  position?: Position;
}

/**
 * Roster built from the real portrait assets (public/media/players).
 * Jersey numbers and positions are intentionally omitted: they were not part of
 * the supplied files and are not invented here. Add `number` / `position` per
 * player and the cards will render them automatically.
 */
export const PLAYERS: Player[] = [
  { name: "Justin van Baarsen", photo: "/media/players/justin-van-baarsen.webp" },
  { name: "Boris", photo: "/media/players/boris.webp" },
  { name: "Nils Schramm", photo: "/media/players/nils-schramm.webp" },
  { name: "Mick Vastenhouw", photo: "/media/players/mick-vastenhouw.webp" },
  { name: "Billy Grapperhaus", photo: "/media/players/billy-grapperhaus.webp" },
  { name: "Donny Pohlman", photo: "/media/players/donny-pohlman.webp" },
  { name: "Calvin Pohlman", photo: "/media/players/calvin-pohlman.webp" },
  { name: "Balazs Hiezl", photo: "/media/players/balazs-hiezl.webp" },
  { name: "Berk Ates", photo: "/media/players/berk-ates.webp" },
  { name: "Cas Neuman", photo: "/media/players/cas-neuman.webp" },
  { name: "Finn Conghaile", photo: "/media/players/finn-conghaile.webp" },
  { name: "Giovanni Filippi", photo: "/media/players/giovanni-filippi.webp" },
  { name: "Jaimy Missler", photo: "/media/players/jaimy-missler.webp" },
  { name: "Jake White", photo: "/media/players/jake-white.webp" },
  { name: "Lance van Duin", photo: "/media/players/lance-van-duin.webp" },
  { name: "Malachy Conghaile", photo: "/media/players/malachy-conghaile.webp" },
  { name: "Nijs Hille", photo: "/media/players/nijs-hille.webp" },
  { name: "Ryan Kolgen", photo: "/media/players/ryan-kolgen.webp" },
  { name: "Sam Schickler", photo: "/media/players/sam-schickler.webp" },
  { name: "Samu Poutanen", photo: "/media/players/samu-poutanen.webp" },
  { name: "Simone Asinelli", photo: "/media/players/simone-asinelli.webp" },
  { name: "Stijn Knoop", photo: "/media/players/stijn-knoop.webp" },
  { name: "Thomas Woods", photo: "/media/players/thomas-woods.webp" },
  { name: "Witek Staniszkis", photo: "/media/players/witek-staniszkis.webp" },
];

/** Featured subset for the landing-page lineup. */
export const LINEUP = PLAYERS.slice(0, 8);
