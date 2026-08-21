import { Link } from "@tanstack/react-router";
import { nav, socials } from "@/lib/site-data";
import { Wordmark } from "@/components/Navbar";

export function Footer() {
  return (
    <footer className="border-t border-glass-border">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div className="max-w-sm">
          <Wordmark className="text-2xl" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Digital experiences crafted with purpose. Design, branding and development for brands
            that want to be taken seriously.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow">Navigation</p>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow">Elsewhere</p>
          <ul className="mt-5 space-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="mailto:coreclicksol@gmail.com"
            className="mt-6 inline-block font-display text-sm text-foreground underline-offset-4 hover:underline"
          >
            coreclicksol@gmail.com
          </a>
        </div>
      </div>
      <div className="shell flex flex-col gap-2 border-t border-glass-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 CoreClick. All rights reserved.</p>
        <p>Web Design • UI/UX • Branding • Development</p>
      </div>
    </footer>
  );
}
