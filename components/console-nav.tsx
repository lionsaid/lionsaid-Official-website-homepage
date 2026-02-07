"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
  helper?: string;
};

export default function ConsoleNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/console" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`group relative rounded-2xl px-4 py-3 transition ${
              active
                ? "bg-slate-900/[0.04] text-slate-900 dark:bg-white/10 dark:text-white"
                : "text-slate-600 hover:bg-slate-900/[0.03] hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
            }`}
          >
            <span
              className={`absolute left-2 top-1/2 h-5 -translate-y-1/2 rounded-full transition ${
                active ? "w-1 bg-gradient-to-b from-sky-500 to-indigo-500" : "w-0 bg-transparent"
              }`}
            />
            <p className="text-sm font-semibold tracking-tight">{item.label}</p>
            {item.helper && (
              <p className="text-xs text-slate-500 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300">
                {item.helper}
              </p>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
