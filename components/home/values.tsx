import { BrainCircuit, Cpu, Handshake, Sparkles, Telescope } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Sparkles,
    title: "Innovation First",
    body: "We approach every engagement looking for better ways forward — not simply the familiar ones.",
    span: "md:col-span-3",
    accent: "text-aqua",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent Solutions",
    body: "Solutions shaped around data, context, and the outcomes that matter most to your organisation.",
    span: "md:col-span-3",
    accent: "text-iris",
  },
  {
    icon: Cpu,
    title: "Technology Excellence",
    body: "Rigour in how we assess, architect, and advise — sound engineering principles at every layer.",
    span: "md:col-span-2",
    accent: "text-electric",
  },
  {
    icon: Telescope,
    title: "Future-Focused Thinking",
    body: "Recommendations made with tomorrow’s requirements in view, not only today’s.",
    span: "md:col-span-2",
    accent: "text-aqua",
  },
  {
    icon: Handshake,
    title: "Professional Collaboration",
    body: "Clear communication and transparent, collaborative working relationships.",
    span: "md:col-span-2",
    accent: "text-iris",
  },
];

export function Values() {
  return (
    <section aria-labelledby="values-title" className="relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="04 — Why Onimitation Tech"
          title={<span id="values-title">Principles that shape how we work.</span>}
          description="Five commitments guide every conversation, recommendation, and engagement."
        />

        <Stagger className="mt-16 grid gap-5 md:grid-cols-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            const large = i < 2;
            return (
              <StaggerItem key={v.title} className={v.span}>
                <SpotlightCard as="article" className={cn("group h-full overflow-hidden p-7 sm:p-8", large && "md:min-h-[17rem]")}>
                  <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <Icon
                        className={cn("h-7 w-7 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110", v.accent)}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                      <span className="font-mono text-xs text-muted">0{i + 1}</span>
                    </div>
                    <h3 className={cn("mt-auto pt-10 font-semibold text-fg", large ? "text-3xl" : "text-xl")}>{v.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{v.body}</p>
                  </div>
                  {large && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full border border-line opacity-60 transition-transform duration-700 group-hover:scale-110"
                    >
                      <div className="absolute inset-6 rounded-full border border-line" />
                      <div className="absolute inset-12 rounded-full border border-dashed border-line-strong" />
                    </div>
                  )}
                </SpotlightCard>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
