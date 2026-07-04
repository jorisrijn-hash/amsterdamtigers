import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { NewsStrip } from "@/components/NewsStrip";
import { Partners } from "@/components/Partners";
import { TeamLineup } from "@/components/TeamLineup";
import { SocialFeed } from "@/components/SocialFeed";

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
    </>
  );
}
