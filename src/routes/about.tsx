import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { MagneticLink } from "@/components/MagneticButton";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CoreClick — Design × Development Studio" },
      {
        name: "description",
        content:
          "CoreClick is a digital agency combining creative design and modern web development to help businesses build a stronger digital presence.",
      },
      { property: "og:title", content: "About CoreClick" },
      {
        property: "og:description",
        content: "Who we are, how we think, and how design and development meet at CoreClick.",
      },
    ],
  }),
  component: About,
});

const values = [
  { t: "Clarity first", d: "We remove noise until only the message remains." },
  { t: "Craft obsessed", d: "Spacing, type and motion are decisions, never accidents." },
  { t: "Business minded", d: "Beautiful work should also perform commercially." },
  { t: "Partnership", d: "We work with clients, not simply for them." },
];

function About() {
  return (
    <>
      <PageHeader
        eyebrow="About the studio"
        title={
          <>
            Design and engineering, <span className="italic text-primary">under one roof.</span>
          </>
        }
        intro="CoreClick is a digital agency combining creative design and modern web development to help businesses build a stronger digital presence."
      />

      <section className="shell grid gap-10 pb-6 lg:grid-cols-2">
        <Reveal>
          <img
            src={images.about}
            alt="Design studio desk with wireframes and sketches"
            loading="lazy"
            width={1200}
            height={900}
            className="h-72 w-full rounded-[2rem] border border-glass-border object-cover md:h-[30rem]"
          />
        </Reveal>
        <div className="flex flex-col justify-center gap-8">
          <Reveal delay={80}>
            <div>
              <p className="eyebrow">Who we are</p>
              <p className="mt-4 text-lg leading-relaxed">
                We are a small, senior team of designers and developers working with founders,
                studios and established businesses across the world. Every project runs through
                strategy, design and build without hand-offs that dilute the idea.
              </p>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="glass rounded-3xl p-7">
              <p className="eyebrow">Mission</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                To give ambitious businesses a digital presence that matches the quality of what
                they actually do.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="glass rounded-3xl p-7">
              <p className="eyebrow">Vision</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A web where craft is the standard rather than the exception — fast, accessible and
                genuinely beautiful.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="glass overflow-hidden rounded-[2.5rem] p-10 text-center md:p-20">
              <p className="eyebrow">Our approach</p>
              <h2 className="mt-6 font-display text-4xl font-bold leading-none sm:text-7xl">
                Design <span className="text-primary">×</span> Development
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Design decides what an experience should feel like. Development decides whether it
                actually does. We treat them as one discipline — which is why our work looks like
                the concept and performs like a product.
              </p>
              <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
                {[
                  ["01 — Discover", "Positioning, audience, goals and content structure."],
                  ["02 — Design", "Art direction, UI systems, prototypes and motion."],
                  ["03 — Deliver", "Development, testing, launch and ongoing support."],
                ].map(([t, d]) => (
                  <div key={t} className="rounded-2xl border border-glass-border p-6">
                    <p className="font-display text-sm text-primary">{t}</p>
                    <p className="mt-3 text-sm text-muted-foreground">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="shell pb-24">
        <Reveal>
          <p className="eyebrow">Values</p>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 70}>
              <div className="h-full rounded-3xl border border-glass-border p-7 transition-transform duration-500 hover:-translate-y-1.5">
                <h3 className="text-lg font-semibold">{v.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-14">
            <MagneticLink to="/contact">
              Work with us <span aria-hidden>→</span>
            </MagneticLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
