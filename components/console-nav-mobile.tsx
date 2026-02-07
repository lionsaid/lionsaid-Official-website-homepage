"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
};

export default function ConsoleNavMobile({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="-mx-1 flex gap-2 overflow-x-auto px-1">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/console" && pathname.startsWith(item.href));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold shadow-sm shadow-slate-900/5 transition ${
              active
                ? "border-transparent bg-gradient-to-r from-sky-500 to-indigo-500 text-white"
                : "border-slate-200/70 bg-white/80 text-slate-700 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

