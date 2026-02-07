import { ReactNode } from "react";

export default function HoverCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[28px] border border-black/10 bg-white/90 p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-black/50 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_60%)]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
