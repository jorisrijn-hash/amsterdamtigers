/**
 * Sponsors, grouped by tier.
 *
 * TODO(swap): move to CMS when the club wants to self-manage sponsors. Logos
 * live in /public/media/partners and are normalized to white.
 */

export type Tier = "Hoofdsponsor" | "Goud" | "Zilver" | "Partner";

export interface Sponsor {
  name: string;
  logo: string;
  url: string;
  tier: Tier;
}

export const SPONSORS: Sponsor[] = [
  { name: "Warrior", logo: "/media/partners/warrior.webp", url: "https://www.warrior.com/", tier: "Hoofdsponsor" },
  { name: "OSK Advocaten", logo: "/media/partners/osk-advocaten.webp", url: "#", tier: "Goud" },
  { name: "Topsport Amsterdam", logo: "/media/partners/topsport-amsterdam.webp", url: "https://www.topsportamsterdam.nl/", tier: "Goud" },
  { name: "Jaap Eden IJsbanen", logo: "/media/partners/jaap-eden.webp", url: "https://www.jaapeden.nl/", tier: "Zilver" },
];

export const TIER_ORDER: Tier[] = ["Hoofdsponsor", "Goud", "Zilver", "Partner"];

export function sponsorsByTier(): { tier: Tier; sponsors: Sponsor[] }[] {
  return TIER_ORDER.map((tier) => ({
    tier,
    sponsors: SPONSORS.filter((s) => s.tier === tier),
  })).filter((g) => g.sponsors.length > 0);
}

/** Value props for the "word partner" pitch. */
export const PARTNER_BENEFITS = [
  { title: "Zichtbaarheid", text: "Exposure op de boarding, in de hal en online bij elke thuiswedstrijd." },
  { title: "Bereik", text: "Een groeiende, betrokken achterban in de regio Amsterdam." },
  { title: "Netwerk", text: "Toegang tot businessevenementen en het partnernetwerk van de club." },
] as const;

export const PARTNER_CONTACT_EMAIL = "partners@amsterdamtigers.com";
