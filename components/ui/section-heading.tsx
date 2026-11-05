import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[0.72rem] font-medium uppercase tracking-[0.22em] text-aqua",
        className,
      )}
    >
      <span aria-hidden className="h-px w-6 bg-gradient-to-r from-transparent to-aqua" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Reveal>
          <Eyebrow className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <Tag className="mt-5 text-4xl font-semibold leading-[1.05] text-fg sm:text-5xl lg:text-[3.5rem]">
          {title}
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <div className="mt-6 text-lg leading-relaxed text-muted">{description}</div>
        </Reveal>
      )}
    </div>
  );
}
