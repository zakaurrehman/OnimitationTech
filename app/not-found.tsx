import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ShaderBackground } from "@/components/visuals/shader-background";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="noise relative isolate flex min-h-[80svh] items-center overflow-hidden pb-20 pt-36">
      <ShaderBackground intensity={0.6} />
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 opacity-40" />
      <Container className="relative text-center">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-aqua">Error 404</p>
        <h1 className="mt-6 text-[clamp(3rem,10vw,8rem)] font-semibold leading-none tracking-[-0.05em]">
          <span className="text-gradient">Signal lost.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/" size="lg">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
