import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";

export function LegalPage({
  title,
  breadcrumb,
  updated,
  children,
}: {
  title: string;
  breadcrumb: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero compact breadcrumb={breadcrumb} eyebrow="Legal" title={<span className="text-gradient">{title}</span>} description={<p>Last updated: {updated}</p>} />
      <section className="pb-24 pt-14 sm:pb-32">
        <Container>
          <article className="prose-legal mx-auto max-w-3xl">{children}</article>
        </Container>
      </section>
    </>
  );
}
