/**
 * Webshop catalogue (placeholder).
 *
 * TODO(swap): replace PRODUCTS with a real source (CMS or the club's store API)
 * and set NEXT_PUBLIC_SHOP_URL to the external checkout base. Product images are
 * not supplied yet, so cards fall back to a branded crest placeholder when
 * `image` is undefined.
 */

export interface Product {
  id: string;
  name: string;
  /** Price in euro cents to avoid float rounding. */
  priceCents: number;
  category: "Kleding" | "Fanartikelen" | "Tickets";
  image?: string;
  /** Deep link to the external store item; falls back to NEXT_PUBLIC_SHOP_URL. */
  href?: string;
  badge?: string;
  soldOut?: boolean;
}

export const SHOP_URL = process.env.NEXT_PUBLIC_SHOP_URL ?? "";

export const PRODUCTS: Product[] = [
  { id: "jersey-home", name: "Thuisshirt 25/26", priceCents: 8995, category: "Kleding", badge: "Nieuw" },
  { id: "jersey-away", name: "Uitshirt 25/26", priceCents: 8995, category: "Kleding" },
  { id: "hoodie", name: "Tigers Hoodie", priceCents: 5495, category: "Kleding" },
  { id: "beanie", name: "Muts met crest", priceCents: 1995, category: "Kleding" },
  { id: "scarf", name: "Sjaal (rood/wit)", priceCents: 2495, category: "Fanartikelen", badge: "Bestseller" },
  { id: "puck", name: "Wedstrijdpuck", priceCents: 999, category: "Fanartikelen" },
  { id: "bottle", name: "Bidon 750ml", priceCents: 1495, category: "Fanartikelen" },
  { id: "socks", name: "Wedstrijdsokken", priceCents: 1795, category: "Kleding", soldOut: true },
];

export const CATEGORIES = ["Kleding", "Fanartikelen", "Tickets"] as const;

export function formatEuro(cents: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
}

export function productHref(p: Product): string | null {
  if (p.href) return p.href;
  if (SHOP_URL) return `${SHOP_URL.replace(/\/$/, "")}/${p.id}`;
  return null;
}
