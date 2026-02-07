"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function ConsoleScrollReset() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const el = document.getElementById("console-scroll");
    if (!el) return;
    el.scrollTo({ top: 0, left: 0 });
  }, [pathname, searchParams.toString()]);

  return null;
}
