import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site-data";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-xl font-bold tracking-tight ${className}`}>
      Core<span className="text-primary">Click</span>
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <nav
          className={`shell flex items-center gap-4 rounded-full px-4 py-3 transition-all duration-500 md:px-6 ${
            scrolled ? "glass glow-ring" : "glass shadow-none"
          }`}
          style={{ maxWidth: "76rem" }}
        >
          <Link to="/" className="mr-auto flex min-w-0 items-center gap-2" data-cursor="hover">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full brand-gradient text-xs font-bold text-primary-foreground">
              C
            </span>
            <Wordmark className="truncate" />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="relative rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
                >
                  {item.label}
                  <span className="pointer-events-none absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 [a[data-status=active]_&]:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <Link
            to="/contact"
            data-cursor="hover"
            className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-display text-sm font-medium text-primary-foreground transition-all duration-300 hover:glow-ring sm:inline-flex"
          >
            Let&apos;s Talk <span aria-hidden>→</span>
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-glass-border lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-foreground transition-all duration-300 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 glass transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <div
          className={`relative flex h-full flex-col justify-center gap-2 px-8 transition-all duration-500 ${
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {nav.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              style={{ transitionDelay: `${i * 40}ms` }}
              className="border-b border-glass-border py-4 font-display text-3xl font-semibold tracking-tight transition-colors data-[status=active]:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-display text-base font-medium text-primary-foreground"
          >
            Let&apos;s Talk <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
