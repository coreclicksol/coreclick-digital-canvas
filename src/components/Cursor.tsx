import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let rx = 0;
    let ry = 0;
    let tx = 0;
    let ty = 0;
    let frame = 0;

    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest?.(
        "a, button, [data-cursor='hover'], input, textarea, select",
      );
      ring.current?.setAttribute("data-active", interactive ? "true" : "false");
    };

    const loop = () => {
      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", move, { passive: true });
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={ring}
        data-active="false"
        className="absolute -ml-5 -mt-5 h-10 w-10 rounded-full border border-primary/50 transition-[width,height,margin,background-color] duration-300 data-[active=true]:-ml-8 data-[active=true]:-mt-8 data-[active=true]:h-16 data-[active=true]:w-16 data-[active=true]:bg-primary/10"
      />
      <div ref={dot} className="absolute -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-primary" />
    </div>
  );
}
