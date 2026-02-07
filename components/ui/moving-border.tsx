"use client";

import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  borderRadius?: string;
  onClick?: () => void;
};

export function Button({
  children,
  className = "",
  borderRadius = "1.75rem",
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5 ${className}`}
      style={{ borderRadius }}
    >
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] border border-black/10 dark:border-white/10" />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(0,0,0,0.03),rgba(0,0,0,0.12))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
      <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-60 mix-blend-overlay [background-image:radial-gradient(circle,rgba(0,0,0,0.08)_1px,transparent_1px)] [background-size:4px_4px] dark:opacity-40" />
      <span className="absolute inset-[1.5px] rounded-[inherit] bg-white/90 dark:bg-slate-900/90" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
