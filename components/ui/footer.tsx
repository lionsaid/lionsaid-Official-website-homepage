import Link from "next/link";
import { getI18n } from "@/lib/i18n/server";

export default async function Footer({ border = false }: { border?: boolean }) {
  const { locale } = await getI18n();
  const isZh = locale === "zh";

  return (
    <footer className="bg-white dark:bg-black">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 ${
            border ? "border-t border-black/10 dark:border-white/10" : ""
          }`}
        >
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black dark:text-white">
              Lionsaid 狮语
            </p>
            <p className="text-sm text-black/60 dark:text-white/60">
              {isZh ? "数字工匠的展示橱窗" : "A showcase for digital craftsmen."}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/60 dark:text-white/60">
              Products
            </p>
            <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
              <li>
                <Link className="transition hover:text-black dark:hover:text-white" href="/products/moji">
                  {isZh ? "墨迹" : "Moji"}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-black dark:hover:text-white" href="/products/zhiliao">
                  {isZh ? "知了卡片" : "Zhiliao Cards"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/60 dark:text-white/60">
              Company
            </p>
            <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
              <li>
                <Link className="transition hover:text-black dark:hover:text-white" href="/about">
                  {isZh ? "关于我们" : "About"}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-black dark:hover:text-white" href="/news">
                  {isZh ? "新闻" : "News"}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-black dark:hover:text-white" href="/contact">
                  {isZh ? "联系" : "Contact"}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-black dark:hover:text-white" href="/careers">
                  {isZh ? "加入我们" : "Careers"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-black/60 dark:text-white/60">
              Legal & Social
            </p>
            <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
              <li>
                <Link className="transition hover:text-black dark:hover:text-white" href="/privacy">
                  {isZh ? "隐私政策" : "Privacy"}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-black dark:hover:text-white" href="/terms">
                  {isZh ? "用户协议" : "Terms"}
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-black dark:hover:text-white" href="https://github.com">
                  GitHub
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-black dark:hover:text-white" href="https://x.com">
                  Twitter / X
                </Link>
              </li>
            </ul>
            <div className="mt-4 rounded-2xl border border-black/10 bg-white/80 p-4 text-xs text-black/60 dark:border-white/10 dark:bg-white/5 dark:text-white/60">
              {isZh ? "微信公众号" : "WeChat"}
              <div className="mt-3 flex h-20 w-20 items-center justify-center rounded-xl border border-dashed border-black/20 text-[10px] dark:border-white/20">
                QR
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
