import PaginationLinks from "@/components/ui/pagination-links";
import ViewToggle from "@/components/ui/view-toggle";
import ConsolePage from "@/components/console/console-page";
import { listPermissionCodes, type PermissionCode } from "@/lib/system-api";
import { getI18n } from "@/lib/i18n/server";

const COPY = {
  en: {
    badge: "RBAC",
    title: "Permission codes",
    description: "Browse aggregated permission codes derived from API endpoints.",
    empty: "No permission codes found.",
    headers: ["Code", "Name", "Description", "Endpoints"],
  },
  zh: {
    badge: "RBAC",
    title: "权限码",
    description: "查看由 API 端点聚合生成的权限码列表。",
    empty: "暂无权限码数据。",
    headers: ["权限码", "名称", "描述", "端点数"],
  },
} as const;

type Locale = keyof typeof COPY;

type NormalizedPermissionCode = {
  code: string;
  name: string;
  description: string;
  endpoints: number;
};

function numberParam(value: string | string[] | undefined, fallback: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default async function PoliciesPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await getI18n();
  const copy = COPY[locale as Locale];
  const isZh = locale === "zh";
  const params = (await searchParams) ?? {};
  const page = numberParam(params.page, 0);
  const size = numberParam(params.size, 20);
  const view = params.view === "cards" ? "cards" : "list";

  const remoteCodes = await listPermissionCodes({ page, size });
  const codes = normalizePermissionCodes(remoteCodes);
  const hasNext = codes.length === size;

  return (
    <ConsolePage
      breadcrumbs={[
        { label: isZh ? "控制台" : "Console", href: "/console" },
        { label: isZh ? "权限码" : "Permission codes" },
      ]}
      eyebrow={copy.badge}
      title={copy.title}
      subtitle={copy.description}
      actions={
        <>
          <PaginationLinks
            basePath="/console/policies"
            page={page}
            size={size}
            hasNext={hasNext}
            query={{ view }}
            labels={{ prev: isZh ? "上一页" : "Previous", next: isZh ? "下一页" : "Next" }}
          />
          <ViewToggle
            basePath="/console/policies"
            view={view}
            query={{ page, size }}
            labels={{ list: isZh ? "列表" : "List", cards: isZh ? "卡片" : "Cards" }}
          />
        </>
      }
    >
      <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow dark:border-white/10 dark:bg-white/5">
        {!codes.length ? (
          <div className="rounded-[24px] border border-slate-200/70 bg-white/80 p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            {copy.empty}
          </div>
        ) : view === "cards" ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {codes.map((row) => (
              <div
                key={row.code}
                className="rounded-[24px] border border-slate-200/70 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                      {row.endpoints} {isZh ? "端点" : "endpoints"}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                      {row.code}
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      {row.name || "-"}
                    </p>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      {row.description || "-"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-[24px] border border-slate-200/70 dark:border-white/10">
            <table className="min-w-full divide-y divide-slate-200/70 text-sm dark:divide-white/5">
              <thead className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-white/5 dark:text-slate-300">
                <tr>
                  {copy.headers.map((header) => (
                    <th key={header} className="px-4 py-3">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white/90 dark:divide-white/5 dark:bg-white/5">
                {codes.map((row) => (
                  <tr key={row.code}>
                    <td className="px-4 py-3 font-mono text-xs text-slate-900 dark:text-white">
                      {row.code}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{row.name || "-"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.description || "-"}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{row.endpoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ConsolePage>
  );
}

function normalizePermissionCodes(rows?: PermissionCode[] | null): NormalizedPermissionCode[] {
  if (!rows?.length) return [];
  return rows.map((row) => ({
    code: row.permissionCode ?? "-",
    name: row.name ?? "",
    description: row.description ?? "",
    endpoints: row.endpointsCount ?? 0,
  }));
}
