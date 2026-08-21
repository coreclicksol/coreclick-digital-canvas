import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { galleryItems } from "@/lib/site-data";
import { Reveal } from "@/components/Reveal";
import { PageHeader } from "@/components/PageHeader";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — CoreClick Creative Work" },
      {
        name: "description",
        content:
          "A creative playground of CoreClick work: website UI, branding, typography, graphics and design experiments.",
      },
      { property: "og:title", content: "CoreClick Gallery" },
      {
        property: "og:description",
        content: "Website UI, brand identity, typography and design experiments by CoreClick.",
      },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const openIndex = active === null ? -1 : galleryItems.findIndex((i) => i.id === active);
  const current = openIndex >= 0 ? galleryItems[openIndex] : null;

  useEffect(() => {
    if (!current) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive(galleryItems[(openIndex + 1) % galleryItems.length]!.id);
      if (e.key === "ArrowLeft")
        setActive(galleryItems[(openIndex - 1 + galleryItems.length) % galleryItems.length]!.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, openIndex]);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={
          <>
            A creative <span className="italic text-primary">playground.</span>
          </>
        }
        intro="Interfaces, identities, posters and experiments — pieces of the work that never fit neatly into a case study."
      />

      <div className="shell pb-24">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {galleryItems.map((item, i) => (
            <Reveal key={item.id} delay={(i % 6) * 60}>
              <button
                type="button"
                onClick={() => setActive(item.id)}
                data-cursor="hover"
                className="group relative block w-full overflow-hidden rounded-3xl border border-glass-border text-left"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="glass block rounded-2xl px-4 py-3">
                    <span className="eyebrow">{item.cat}</span>
                    <span className="mt-1 block font-display text-sm font-medium">
                      {item.title}
                    </span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-[120] grid place-items-center bg-black/80 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-4xl animate-[scale-in_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.image}
              alt={current.title}
              className="max-h-[75vh] w-full rounded-3xl object-contain"
            />
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="eyebrow">{current.cat}</p>
                <p className="mt-1 font-display text-lg text-white">{current.title}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() =>
                    setActive(
                      galleryItems[(openIndex - 1 + galleryItems.length) % galleryItems.length]!.id,
                    )
                  }
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() =>
                    setActive(galleryItems[(openIndex + 1) % galleryItems.length]!.id)
                  }
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
                >
                  →
                </button>
                <button
                  type="button"
                  aria-label="Close"
                  onClick={() => setActive(null)}
                  className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
