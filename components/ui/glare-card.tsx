"use client";

import { useRef } from "react";

export default function GlareCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty("--glare-x", `${x}px`);
    el.style.setProperty("--glare-y", `${y}px`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--glare-x", "50%");
    el.style.setProperty("--glare-y", "50%");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/5 ${className}`}
      style={{
        // default glare center
        // @ts-expect-error CSS custom properties
        "--glare-x": "50%",
        "--glare-y": "50%",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.55), rgba(255,255,255,0.15) 40%, rgba(255,255,255,0) 70%)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.12),transparent_60%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
}
