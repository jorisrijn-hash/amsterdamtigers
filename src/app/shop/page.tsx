import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Reveal } from "@/components/Reveal";
import { Crest } from "@/components/Crest";
import { PRODUCTS, formatEuro, productHref, type Product } from "@/lib/shop";

export const metadata: Metadata = {
  title: "Shop",
  description: "Officiele Amsterdam Tigers merchandise: shirts, hoodies en fanartikelen.",
  alternates: { canonical: "/shop" },
};

function ProductCard({ product }: { product: Product }) {
  const href = productHref(product);
  return (
    <Reveal className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#1a1d22_0%,#0e1013_70%)]">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <Crest className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]" />
        )}
        {product.badge && (
          <span className="absolute left-3 top-3 bg-red px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-[color:var(--red-ink)]">
            {product.badge}
          </span>
        )}
        {product.soldOut && (
          <span className="absolute inset-0 grid place-items-center bg-[color-mix(in_oklch,var(--ink)_65%,transparent)] font-mono text-[0.7rem] uppercase tracking-[0.18em] text-paper">
            Uitverkocht
          </span>
        )}
      </div>

      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <p className="display text-base leading-tight">{product.name}</p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted-2">
            {product.category}
          </p>
        </div>
        <span className="font-mono text-sm text-paper">{formatEuro(product.priceCents)}</span>
      </div>

      <div className="mt-3">
        {product.soldOut ? (
          <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted-2">
            Niet beschikbaar
          </span>
        ) : href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            data-cursor
            className="btn-ghost inline-flex px-4 py-2 font-mono text-[0.64rem] uppercase tracking-[0.14em]"
          >
            In winkel
          </a>
        ) : (
          <span className="font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted-2">
            Binnenkort
          </span>
        )}
      </div>
    </Reveal>
  );
}

export default function ShopPage() {
  return (
    <PageShell
      label="Officiele merchandise"
      title="Shop"
      intro="Draag de kleuren van de club. Shirts, hoodies en fanartikelen; nieuwe drops door het seizoen heen."
    >
      <div className="shell mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-20 md:grid-cols-3 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <p className="shell mt-10 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-2">
        Placeholder-catalogus - koppel de echte webshop via NEXT_PUBLIC_SHOP_URL of een CMS.
      </p>
    </PageShell>
  );
}
