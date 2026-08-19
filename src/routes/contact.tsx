import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { images, socials } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact CoreClick — Let's Build Something Great" },
      {
        name: "description",
        content:
          "Have a project, idea or business that needs a stronger digital presence? Send CoreClick an inquiry and we'll reply within one working day.",
      },
      { property: "og:title", content: "Contact CoreClick" },
      {
        property: "og:description",
        content: "Start a project with CoreClick — design, branding and development.",
      },
    ],
  }),
  component: Contact,
});

const field =
  "w-full rounded-2xl border border-glass-border bg-transparent px-4 py-3.5 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary";

function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build <span className="italic text-primary">something great.</span>
          </>
        }
        intro="Have a project, idea or business that needs a stronger digital presence? Let's talk."
      />

      <section className="shell grid gap-10 pb-28 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <form onSubmit={onSubmit} className="glass rounded-[2rem] p-7 md:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="eyebrow">Name</span>
                <input required name="name" placeholder="Your name" className={`mt-2 ${field}`} />
              </label>
              <label className="block">
                <span className="eyebrow">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className={`mt-2 ${field}`}
                />
              </label>
              <label className="block">
                <span className="eyebrow">Company</span>
                <input name="company" placeholder="Company name" className={`mt-2 ${field}`} />
              </label>
              <label className="block">
                <span className="eyebrow">Service</span>
                <select name="service" className={`mt-2 ${field}`} defaultValue="Web Design">
                  {["Web Design", "UI/UX", "Branding", "Web Development", "Graphic Design"].map(
                    (s) => (
                      <option key={s}>{s}</option>
                    ),
                  )}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow">Budget</span>
                <select name="budget" className={`mt-2 ${field}`} defaultValue="$1k – $3k">
                  {["Under $1k", "$1k – $3k", "$3k – $6k", "$6k – $12k", "$12k+"].map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="eyebrow">Message</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="Tell us about the project…"
                  className={`mt-2 ${field} resize-none`}
                />
              </label>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton type="submit">
                Send Inquiry <span aria-hidden>→</span>
              </MagneticButton>
              {sent ? (
                <p className="text-sm text-primary" role="status">
                  Thanks — your inquiry is noted. We&apos;ll be in touch shortly.
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={90}>
            <img
              src={images.g4}
              alt="Abstract orange gradient artwork"
              loading="lazy"
              className="h-52 w-full rounded-[2rem] border border-glass-border object-cover md:h-64"
            />
          </Reveal>
          <Reveal delay={140}>
            <div className="glass rounded-[2rem] p-8">
              <p className="eyebrow">Direct</p>
              <a
                href="mailto:hello@coreclick.studio"
                className="mt-3 block font-display text-lg transition-colors hover:text-primary"
              >
                hello@coreclick.studio
              </a>
              <a
                href="https://wa.me/10000000000"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 block font-display text-lg transition-colors hover:text-primary"
              >
                WhatsApp — +1 000 000 0000
              </a>
              <div className="mt-7 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-glass-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="rounded-[2rem] border border-glass-border p-8">
              <p className="eyebrow">Response time</p>
              <p className="mt-3 text-sm text-muted-foreground">
                We reply to every serious inquiry within one working day, usually with two or three
                questions before a call.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
