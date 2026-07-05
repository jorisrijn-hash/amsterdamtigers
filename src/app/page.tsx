import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { NewsStrip } from "@/components/NewsStrip";
import { Partners } from "@/components/Partners";
import { TeamLineup } from "@/components/TeamLineup";
import { SocialFeed } from "@/components/SocialFeed";
import { Newsletter } from "@/components/Newsletter";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <NewsStrip />
      <TeamLineup />
      <Partners />
      <SocialFeed />
      <Newsletter />
    </>
  );
}
