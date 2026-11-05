import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/lib/site";

export function CtaSection({
  title = "Let's Build What's Next.",
  description = "Have a technology challenge or an innovative idea? Let's explore what's possible together.",
  cta = "Start a Conversation",
  href = "/contact",
}: {
  title?: string;
  description?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="beam-border rounded-[2rem]">
            <div className="noise relative isolate overflow-hidden rounded-[2rem] border border-line bg-ink-900 px-6 py-20 text-center sm:px-12 sm:py-28">
              <div aria-hidden className="absolute inset-0 -z-10">
                <div className="absolute -left-1/4 top-0 h-[120%] w-[70%] animate-[aurora_14s_ease-in-out_infinite] rounded-full bg-electric/25 blur-[120px]" />
                <div className="absolute -right-1/4 bottom-0 h-[100%] w-[60%] animate-[aurora_18s_ease-in-out_infinite_reverse] rounded-full bg-iris/20 blur-[120px]" />
                <div className="absolute left-1/3 top-1/3 h-1/2 w-1/3 animate-[aurora_11s_ease-in-out_infinite] rounded-full bg-aqua/10 blur-[100px]" />
                <div className="bg-grid mask-radial absolute inset-0 opacity-60" />
              </div>
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-aqua">{site.location.display}</p>
              <h2 id="cta-title" className="mx-auto mt-6 max-w-4xl text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
                <span className="text-gradient">{title}</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">{description}</p>
              <div className="mt-10 flex justify-center">
                <ButtonLink href={href} size="lg" magnetic>
                  {cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
