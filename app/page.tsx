import type { Metadata } from "next";
import { HomeHero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { Expertise } from "@/components/home/expertise";
import { Showcase } from "@/components/home/showcase";
import { Values } from "@/components/home/values";
import { Approach } from "@/components/home/approach";
import { CtaSection } from "@/components/cta-section";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Intro />
      <Expertise />
      <Showcase />
      <Values />
      <Approach />
      <CtaSection />
    </>
  );
}
