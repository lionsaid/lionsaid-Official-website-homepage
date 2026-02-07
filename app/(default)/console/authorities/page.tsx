import PaginationLinks from "@/components/ui/pagination-links";
import ViewToggle from "@/components/ui/view-toggle";
import ConsolePage from "@/components/console/console-page";
import { listPermissions, type Permission } from "@/lib/system-api";
import { getI18n } from "@/lib/i18n/server";

type NormalizedPermission = {
  code: string;
  name: string;
  method: string;
  path: string;
  enabled: boolean;
  system: boolean;
};

function numberParam(value: string | string[] | undefined, fallback: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default async function AuthoritiesPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await getI18n();
  const isZh = locale === "zh";

  const params = (await searchParams) ?? {};
  const page = numberParam(params.page, 0);
  const size = numberParam(params.size, 20);
  const view = params.view === "cards" ? "cards" : "list";

  const remotePermissions = await listPermissions({ page, size });
  const permissions = normalizePermissions(remotePermissions);
  const hasNext = permissions.length === size;

  return (
    <ConsolePage
      breadcrumbs={[
        { label: isZh ? "控制台" : "Console", href: "/console" },
        { label: isZh ? "权限" : "Permissions" },
      ]}
      eyebrow={isZh ? "权限目录" : "Permissions"}
      title={isZh ? "API 权限目录" : "API permissions"}
      subtitle={
        isZh
          ? "查看当前系统中已登记的权限明细。"
          : "Browse permission details registered in the system."
      }
      actions={
        <>
          <PaginationLinks
            basePath="/console/authorities"
            page={page}
            size={size}
            hasNext={hasNext}
            query={{ view }}
            labels={{ prev: isZh ? "上一页" : "Previous", next: isZh ? "下一页" : "Next" }}
          />
          <ViewToggle
            basePath="/console/authorities"
            view={view}
            query={{ page, size }}
            labels={{ list: isZh ? "列表" : "List", cards: isZh ? "卡片" : "Cards" }}
          />
        </>
      }
    >
      <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow dark:border-white/10 dark:bg-white/5">
        {view === "cards" ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {permissions.map((permission) => (
              <div
                key={permission.code}
                className="rounded-[24px] border border-slate-200/70 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                      {permission.system ? (isZh ? "系统" : "System") : (isZh ? "业务" : "Custom")}
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                      {permission.name}
                    </p>
                    <p className="mt-2 font-mono text-xs text-slate-700 dark:text-slate-200">
                      {permission.method} {permission.path}
                    </p>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{permission.code}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      permission.enabled
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200"
                    }`}
                  >
                    {permission.enabled ? (isZh ? "启用" : "Enabled") : (isZh ? "禁用" : "Disabled")}
                  </span>
                </div>
              </div>
            ))}
            {!permissions.length && (
              <div className="rounded-[24px] border border-slate-200/70 bg-white/80 p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
                {isZh ? "暂无权限数据" : "No permissions found."}
              </div>
            )}
          </div>
        ) : (
          <div className="overflow-hidden rounded-[24px] border border-slate-200/70 dark:border-white/10">
            <table className="min-w-full divide-y divide-slate-200/70 text-sm dark:divide-white/5">
              <thead className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-white/5 dark:text-slate-300">
                <tr>
                  <th className="px-4 py-3">{isZh ? "名称" : "Name"}</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Path</th>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">{isZh ? "状态" : "Status"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white/90 dark:divide-white/5 dark:bg-white/5">
                {permissions.map((permission) => (
                  <tr key={permission.code}>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      {permission.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-200">
                      {permission.method}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-200">
                      {permission.path}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">
                      {permission.code}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          permission.enabled
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200"
                        }`}
                      >
                        {permission.enabled ? (isZh ? "启用" : "Enabled") : (isZh ? "禁用" : "Disabled")}
                      </span>
                    </td>
                  </tr>
                ))}
                {!permissions.length && (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                      {isZh ? "暂无权限数据" : "No permissions found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ConsolePage>
  );
}

function normalizePermissions(permissions?: Permission[] | null): NormalizedPermission[] {
  if (!permissions?.length) return [];
  return permissions.map((permission) => ({
    code: permission.permissionCode ?? "-",
    name: permission.name ?? permission.permissionCode ?? "Permission",
    method: permission.method ?? "-",
    path: permission.path ?? "-",
    enabled: permission.enabled ?? true,
    system: Boolean(permission.system),
  }));
}

