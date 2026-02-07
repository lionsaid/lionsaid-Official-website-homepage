import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3"
      aria-label="Lionsaid · 狮语"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
        <path
          className="fill-blue-500"
          fillRule="evenodd"
          d="M17.052 0c6.914.513 12.434 6.033 12.947 12.947h-5.015a7.932 7.932 0 0 1-7.932-7.932V0Zm-2.105 22.985V28C8.033 27.487 2.513 21.967 2 15.053h5.015a7.932 7.932 0 0 1 7.932 7.932Z"
          clipRule="evenodd"
        />
        <path
          className="fill-blue-300"
          fillRule="evenodd"
          d="M2 12.947C2.513 6.033 8.033.513 14.947 0v5.015a7.932 7.932 0 0 1-7.932 7.932H2Zm22.984 2.106H30c-.514 6.914-6.034 12.434-12.948 12.947v-5.015a7.932 7.932 0 0 1 7.932-7.932Z"
          clipRule="evenodd"
        />
      </svg>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          狮语 · Lionsaid
        </p>
        <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          lionsaid.com
        </p>
      </div>
    </Link>
  );
}
