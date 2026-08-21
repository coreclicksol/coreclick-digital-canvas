import { Link } from "@tanstack/react-router";
import { useRef, type MouseEvent, type ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-medium tracking-tight transition-[transform,background-color,color,box-shadow] duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  solid: "bg-primary text-primary-foreground hover:glow-ring",
  outline:
    "border border-glass-border glass text-foreground hover:border-primary/60 hover:text-primary",
  ghost: "text-foreground hover:text-primary",
};

function useMagnet() {
  const ref = useRef<HTMLElement | null>(null);
  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    if ("disabled" in el && (el as HTMLButtonElement).disabled) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return { ref, onMove, onLeave };
}

export function MagneticLink({
  to,
  children,
  variant = "solid",
  className = "",
}: {
  to: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const { ref, onMove, onLeave } = useMagnet();
  return (
    <Link
      to={to}
      ref={ref as never}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

export function MagneticButton({
  children,
  variant = "solid",
  className = "",
  type = "button",
  disabled,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const { ref, onMove, onLeave } = useMagnet();
  return (
    <button
      type={type}
      disabled={disabled}
      ref={ref as never}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      className={`${base} ${variants[variant]} ${className} disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
}
