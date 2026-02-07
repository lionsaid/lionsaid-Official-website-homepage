"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
};

export default function Spotlight({ className = "" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--spot-x", `${x}%`);
      el.style.setProperty("--spot-y", `${y}%`);
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 [--spot-x:50%] [--spot-y:40%] ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(800px_circle_at_var(--spot-x)_var(--spot-y),rgba(16,185,129,0.18),transparent_60%)] dark:bg-[radial-gradient(800px_circle_at_var(--spot-x)_var(--spot-y),rgba(59,130,246,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(500px_circle_at_70%_20%,rgba(0,0,0,0.08),transparent_60%)] dark:bg-[radial-gradient(500px_circle_at_70%_20%,rgba(255,255,255,0.06),transparent_60%)]" />
    </div>
  );
}
