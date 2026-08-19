import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <header className="shell pb-8 pt-36 md:pb-14 md:pt-48">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[0.95] text-balance-tight sm:text-6xl md:text-7xl">
          {title}
        </h1>
      </Reveal>
      {intro ? (
        <Reveal delay={160}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {intro}
          </p>
        </Reveal>
      ) : null}
      {children}
    </header>
  );
}
