import { useEffect, useState } from "react";
import logo from "@/assets/logo-square.jpg.asset.json";

export function Loader() {
  const [phase, setPhase] = useState<"in" | "out" | "done">("in");

  useEffect(() => {
    if (sessionStorage.getItem("cc-loaded")) {
      setPhase("done");
      return;
    }
    const t1 = setTimeout(() => setPhase("out"), 1250);
    const t2 = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("cc-loaded", "1");
    }, 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] grid place-items-center bg-background transition-opacity duration-600 ${
        phase === "out" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="animate-[scale-in_0.9s_cubic-bezier(0.16,1,0.3,1)] rounded-3xl bg-white p-4 shadow-[var(--shadow-soft)]">
          <img src={logo.url} alt="" width={112} height={112} className="h-28 w-28 object-contain" />
        </div>
        <div className="h-px w-40 overflow-hidden bg-border">
          <div className="h-full w-full origin-left animate-[slide-in-right_1.3s_cubic-bezier(0.16,1,0.3,1)] bg-primary" />
        </div>
        <p className="eyebrow">CoreClick</p>
      </div>
    </div>
  );
}
