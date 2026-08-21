import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { images, projects, services } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import { MagneticLink } from "@/components/MagneticButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CoreClick — We Build Digital Experiences That Get Noticed" },
      {
        name: "description",
        content:
          "CoreClick combines thoughtful design and powerful development to create digital experiences that help businesses stand out, connect and grow.",
      },
      { property: "og:title", content: "CoreClick — Digital Design & Development Studio" },
      {
        property: "og:description",
        content: "Web design, UI/UX, branding and development for brands that want to be noticed.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <CtaBand />
    </>
  );
}

function Hero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setOffset({ x, y });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden pb-16 pt-32 md:pb-28 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[32rem] w-[32rem] rounded-full bg-primary/20 blur-[120px]"
        style={{ transform: `translate3d(${offset.x * 20}px, ${offset.y * 20}px, 0)` }}
      />
      <div className="shell grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <p className="eyebrow">Digital agency — est. 2021</p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-6 text-[2.6rem] font-bold leading-[0.92] text-balance-tight sm:text-6xl lg:text-7xl">
              We build digital experiences that{" "}
              <span className="italic text-primary">get noticed.</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              CoreClick combines thoughtful design and powerful development to create digital
              experiences that help businesses stand out, connect and grow.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-10 flex flex-wrap gap-3">
              <MagneticLink to="/gallery">
                Explore Our Work <span aria-hidden>→</span>
              </MagneticLink>
              <MagneticLink to="/contact" variant="outline">
                Let&apos;s Talk <span aria-hidden>→</span>
              </MagneticLink>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-glass-border pt-8">
              {[
                ["40+", "Projects shipped"],
                ["Global", "Internationally served"],
                ["5", "Core disciplines"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl font-bold">{n}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative">
          <div
            className="relative overflow-hidden rounded-[2rem] border border-glass-border"
            style={{
              transform: `perspective(1200px) rotateY(${offset.x * -3}deg) rotateX(${offset.y * 3}deg)`,
              transition: "transform 0.4s ease-out",
            }}
          >
            <img
              src={images.hero}
              alt="Hand interacting with a floating glass interface panel"
              width={1200}
              height={1408}
              className="h-[26rem] w-full object-cover md:h-[38rem]"
            />
            <div className="absolute inset-x-4 bottom-4 glass rounded-2xl px-5 py-4">
              <p className="eyebrow">Currently</p>
              <p className="mt-1 font-display text-sm">
                Designing digital identities for brands internationally.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="max-w-xl text-3xl font-bold leading-tight sm:text-5xl">
              What we do, done properly.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Link
              to="/packages"
              className="font-display text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              View packages →
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <article
                data-cursor="hover"
                className="group glass h-full rounded-3xl p-7 transition-all duration-500 hover:-translate-y-2 hover:glow-ring"
              >
                <div className="flex items-start justify-between">
                  <span className="font-display text-xs tracking-[0.2em] text-primary">
                    {s.tag}
                  </span>
                  <span className="translate-x-2 text-lg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    →
                  </span>
                </div>
                <h3 className="mt-10 text-xl font-semibold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </article>
            </Reveal>
          ))}
          <Reveal delay={350}>
            <Link
              to="/contact"
              className="flex h-full min-h-44 flex-col justify-between rounded-3xl brand-gradient p-7 text-primary-foreground transition-transform duration-500 hover:-translate-y-2"
            >
              <span className="font-display text-xs tracking-[0.2em] opacity-80">06</span>
              <span className="text-xl font-semibold">
                Something else in mind? <br /> Let&apos;s talk →
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="section border-t border-glass-border">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">Featured projects</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight sm:text-5xl">
            Selected work from the studio.
          </h2>
        </Reveal>

        <div className="mt-14 space-y-6">
          {projects.map((p, i) => (
            <Reveal key={p.no} delay={i * 60}>
              <article
                data-cursor="hover"
                className="group grid items-center gap-6 overflow-hidden rounded-[2rem] glass p-4 transition-all duration-500 hover:glow-ring md:grid-cols-[1fr_1fr] md:p-6"
              >
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src={p.image}
                    alt={`${p.title} — ${p.category}`}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-56 w-full object-cover transition-transform duration-[900ms] group-hover:scale-105 md:h-80"
                  />
                </div>
                <div className="px-2 pb-4 md:px-6">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm text-primary">{p.no}</span>
                    <span className="eyebrow">{p.category}</span>
                  </div>
                  <h3 className="mt-4 text-2xl font-bold sm:text-4xl">{p.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {p.desc}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-glass-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/gallery"
                    className="mt-7 inline-flex items-center gap-2 font-display text-sm transition-colors hover:text-primary"
                  >
                    View Project{" "}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="section border-t border-glass-border">
      <div className="shell text-center">
        <Reveal>
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.05] text-balance-tight sm:text-6xl">
            Ready to build something worth clicking?
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <MagneticLink to="/contact">
              Start a project <span aria-hidden>→</span>
            </MagneticLink>
            <MagneticLink to="/packages" variant="outline">
              See packages <span aria-hidden>→</span>
            </MagneticLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
