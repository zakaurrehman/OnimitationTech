import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ShaderBackground } from "@/components/visuals/shader-background";
import { cn } from "@/lib/utils";

/** Hero used by inner pages: shader backdrop, breadcrumb, editorial headline, optional visual. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
  visual,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  breadcrumb: string;
  visual?: React.ReactNode;
  children?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={cn("noise relative isolate overflow-hidden", compact ? "pb-16 pt-36 sm:pt-44" : "pb-20 pt-36 sm:pb-28 sm:pt-44")}>
      <ShaderBackground intensity={0.75} />
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 opacity-40" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />

      <Container className={cn("relative grid items-center gap-12", visual && "lg:grid-cols-12")}>
        <div className={visual ? "lg:col-span-7" : "max-w-4xl"}>
          <nav aria-label="Breadcrumb" className="fade-up" style={{ "--d": 100 } as React.CSSProperties}>
            <ol className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-fg">
                  Home
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li aria-current="page" className="text-aqua">
                {breadcrumb}
              </li>
            </ol>
          </nav>
          <p className="fade-up mt-8 font-mono text-[0.72rem] uppercase tracking-[0.22em] text-muted" style={{ "--d": 180 } as React.CSSProperties}>
            {eyebrow}
          </p>
          <h1
            className="fade-up mt-4 text-[clamp(2.5rem,6.2vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
            style={{ "--d": 260 } as React.CSSProperties}
          >
            {title}
          </h1>
          {description && (
            <div className="fade-up mt-7 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl" style={{ "--d": 380 } as React.CSSProperties}>
              {description}
            </div>
          )}
          {children && (
            <div className="fade-up mt-10" style={{ "--d": 480 } as React.CSSProperties}>
              {children}
            </div>
          )}
        </div>
        {visual && (
          <div className="fade-up lg:col-span-5" style={{ "--d": 420 } as React.CSSProperties}>
            {visual}
          </div>
        )}
      </Container>
    </section>
  );
}
