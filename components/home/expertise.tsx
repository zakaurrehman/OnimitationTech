import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { ServiceIcon, serviceTone } from "@/components/service-icon";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

export function Expertise() {
  return (
    <section aria-labelledby="expertise-title" className="relative py-20 sm:py-28">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 -z-10 mx-auto h-[28rem] max-w-5xl rounded-full bg-electric/10 blur-[120px]" />
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="02 — Our Expertise"
            title={<span id="expertise-title">Three disciplines. One integrated view of technology.</span>}
          />
          <p className="max-w-sm text-muted lg:pb-2">
            Strategy, connectivity, and intelligence — each practice is strong on its own and stronger together.
          </p>
        </div>

        <Stagger className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const tone = serviceTone[s.key];
            return (
              <StaggerItem key={s.key} className="beam-border beam-on-hover rounded-2xl">
                <SpotlightCard as="article" className="group flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        "relative grid h-14 w-14 place-items-center rounded-xl ring-1 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105",
                        tone.bg,
                        tone.ring,
                      )}
                    >
                      <span aria-hidden className="absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-70" style={{ background: tone.hex }} />
                      <ServiceIcon service={s.key} className={cn("relative h-6 w-6", tone.text)} strokeWidth={1.6} />
                    </div>
                    <span className="font-mono text-xs text-muted">{s.index}</span>
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold text-fg">{s.shortTitle}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{s.summary}</p>

                  <ul className="mt-7 space-y-3 border-t border-line pt-6">
                    {s.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 text-[0.95rem] text-fg/85">
                        <Check className={cn("mt-0.5 h-4 w-4 shrink-0", tone.text)} aria-hidden />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/services#${s.key}`}
                    className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-fg transition-colors after:absolute after:inset-0 after:content-[''] hover:text-aqua"
                  >
                    Explore {s.shortTitle}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
