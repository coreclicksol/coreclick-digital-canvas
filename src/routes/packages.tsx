import { createFileRoute, Link } from "@tanstack/react-router";
import { packages } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Packages — Website & Brand Packages | CoreClick" },
      {
        name: "description",
        content:
          "Three CoreClick packages: Launch, Elevate and Signature — from a single landing page to a complete premium digital experience.",
      },
      { property: "og:title", content: "CoreClick Packages" },
      {
        property: "og:description",
        content: "Launch, Elevate and Signature — website and brand packages built for growth.",
      },
    ],
  }),
  component: Packages,
});

function Packages() {
  return (
    <>
      <PageHeader
        eyebrow="Packages"
        title={
          <>
            Engagements built for <span className="italic text-primary">every stage.</span>
          </>
        }
        intro="Indicative starting points, not rigid boxes. Every package is shaped around your goals during a short discovery call."
      />

      <section className="shell grid items-start gap-6 pb-24 lg:grid-cols-3">
        {packages.map((pkg, i) => (
          <Reveal key={pkg.no} delay={i * 90}>
            <article
              data-cursor="hover"
              className={`group relative flex h-full flex-col rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 ${
                pkg.featured
                  ? "brand-gradient text-primary-foreground glow-ring lg:-mt-6 lg:pb-12"
                  : "glass hover:glow-ring"
              }`}
            >
              {pkg.badge ? (
                <span
                  className={`absolute right-6 top-6 rounded-full px-3 py-1 font-display text-[0.65rem] uppercase tracking-[0.2em] ${
                    pkg.featured
                      ? "bg-white/20 text-primary-foreground"
                      : "border border-glass-border text-muted-foreground"
                  }`}
                >
                  {pkg.badge}
                </span>
              ) : null}

              <span
                className={`font-display text-xs tracking-[0.25em] ${
                  pkg.featured ? "opacity-80" : "text-primary"
                }`}
              >
                {pkg.no}
              </span>
              <h2 className="mt-8 text-3xl font-bold">{pkg.name}</h2>
              <p
                className={`mt-3 text-sm ${
                  pkg.featured ? "opacity-85" : "text-muted-foreground"
                }`}
              >
                {pkg.forWho}
              </p>
              <p className="mt-7 font-display text-2xl font-semibold">{pkg.price}</p>

              <ul className="mt-8 flex-1 space-y-3">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className={pkg.featured ? "opacity-90" : "text-primary"}>—</span>
                    <span className={pkg.featured ? "opacity-95" : "text-muted-foreground"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className={`mt-10 inline-flex items-center justify-between gap-3 rounded-full px-6 py-3.5 font-display text-sm font-medium transition-all duration-300 ${
                  pkg.featured
                    ? "bg-background text-foreground hover:opacity-90"
                    : "bg-primary text-primary-foreground hover:glow-ring"
                }`}
              >
                {pkg.cta}
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="shell pb-28">
        <Reveal>
          <div className="glass flex flex-wrap items-center justify-between gap-6 rounded-[2rem] p-8 md:p-12">
            <div className="max-w-lg">
              <h2 className="text-2xl font-bold sm:text-3xl">Not sure which one fits?</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Tell us about the project and we&apos;ll recommend the smallest scope that gets you
                the result.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-display text-sm text-primary-foreground transition-all duration-300 hover:glow-ring"
            >
              Let&apos;s Discuss <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
