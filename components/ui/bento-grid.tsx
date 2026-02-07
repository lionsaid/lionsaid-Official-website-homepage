import { ReactNode } from "react";

export function BentoGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`grid gap-6 lg:grid-cols-3 ${className}`}>{children}</div>;
}

export function BentoCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-[28px] border border-black/10 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-black/50 ${className}`}>
      {children}
    </div>
  );
}
