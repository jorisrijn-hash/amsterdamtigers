export const CLUB = {
  name: "Amsterdam Tigers",
  short: "Tigers",
  handle: "@amsterdamtigers",
  instagram: "https://www.instagram.com/amsterdamtigers/",
  domain: "amsterdamtigers.com",
  tagline: "IJshockey uit de hoofdstad",
  sport: "Ice hockey",
  venue: "Jaap Edenbaan",
  city: "Amsterdam",
  country: "NL",
} as const;

/**
 * Absolute base URL for metadata, canonicals, sitemap and structured data.
 * Priority: explicit override -> Vercel production domain -> localhost (dev).
 * Set NEXT_PUBLIC_SITE_URL once a custom domain is live.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

/** Nav order mirrors the live site, split around the centered crest. */
export const NAV_LEFT = [
  { label: "Nieuws", href: "/nieuws", tKey: "nav.news" },
  { label: "Team", href: "/team", tKey: "nav.team" },
  { label: "Wedstrijden", href: "/wedstrijden", tKey: "nav.matches" },
  { label: "Regels", href: "/regels", tKey: "nav.rules" },
] as const;

export const NAV_RIGHT = [
  { label: "History", href: "/history", tKey: "nav.history" },
  { label: "Shop", href: "/shop", tKey: "nav.shop" },
  { label: "Partner", href: "/partner", tKey: "nav.partner" },
  { label: "Contact", href: "/contact", tKey: "nav.contact" },
] as const;

export const NAV_ALL = [...NAV_LEFT, ...NAV_RIGHT];

/** Season status shown in the bottom status bar. */
export const NEXT_GAME = {
  status: "Helaas is het seizoen afgelopen",
  opponent: null as string | null,
  datetime: null as string | null,
  ticketsHref: "/wedstrijden",
} as const;
