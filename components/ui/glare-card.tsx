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
    const px = x / rect.width;
    const py = y / rect.height;

    const rotateX = (0.5 - py) * 8;
    const rotateY = (px - 0.5) * 10;

    el.style.setProperty("--glare-x", `${x}px`);
    el.style.setProperty("--glare-y", `${y}px`);
    el.style.setProperty("--tilt-x", `${rotateX}deg`);
    el.style.setProperty("--tilt-y", `${rotateY}deg`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--glare-x", "50%");
    el.style.setProperty("--glare-y", "50%");
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`group relative overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-sm transition-transform duration-300 ease-out will-change-transform dark:border-white/10 dark:bg-white/5 ${className}`}
      style={{
        // @ts-expect-error CSS custom properties
        "--glare-x": "50%",
        "--glare-y": "50%",
        "--tilt-x": "0deg",
        "--tilt-y": "0deg",
        transform: "perspective(900px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y))",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(220px circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.65), rgba(255,255,255,0.2) 40%, rgba(255,255,255,0) 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:opacity-0 dark:group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--glare-x) var(--glare-y), rgba(255,255,255,0.9), rgba(255,255,255,0.25) 35%, rgba(255,255,255,0) 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--glare-x) var(--glare-y), rgba(59,130,246,0.25), rgba(16,185,129,0.2) 45%, rgba(255,255,255,0) 75%)",
          mixBlendMode: "screen",
        }}
      />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_40%,rgba(255,255,255,0.2))] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.22),rgba(255,255,255,0)_45%,rgba(255,255,255,0.35))]" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.18),transparent_60%)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_60%)]" />
      </div>
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
}
