import ActionModal from "@/components/ui/action-modal";
import PaginationLinks from "@/components/ui/pagination-links";
import ViewToggle from "@/components/ui/view-toggle";
import ConsolePage from "@/components/console/console-page";
import { createRole, deleteRole, listRoles, updateRole, type SysRole } from "@/lib/system-api";
import { getI18n } from "@/lib/i18n/server";
import { revalidatePath } from "next/cache";

type NormalizedRole = {
  code?: string;
  name: string;
  description: string;
  members: number;
  updated: string;
};

const FALLBACK_ROLES: NormalizedRole[] = [
  {
    code: "admin",
    name: "Admin",
    description: "Full access to tenant resources, policies, and audit logs.",
    members: 4,
    updated: "2h ago",
  },
  {
    code: "editor",
    name: "Editor",
    description: "Can create and update content, but cannot change policies.",
    members: 9,
    updated: "Today",
  },
  {
    code: "viewer",
    name: "Viewer",
    description: "Read-only access to dashboards and analytics.",
    members: 22,
    updated: "Yesterday",
  },
];

type FormState = { error?: string };

function numberParam(value: string | string[] | undefined, fallback: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default async function RolesPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await getI18n();
  const isZh = locale === "zh";
  const params = (await searchParams) ?? {};
  const page = numberParam(params.page, 0);
  const size = numberParam(params.size, 18);
  const view = params.view === "list" ? "list" : "cards";

  const remoteRoles = await listRoles({ page, size });
  const normalizedRoles = normalizeRoles(remoteRoles, locale);
  const roles = normalizedRoles.length ? normalizedRoles : FALLBACK_ROLES;
  const hasNext = normalizedRoles.length === size;

  return (
    <ConsolePage
      breadcrumbs={[
        { label: isZh ? "控制台" : "Console", href: "/console" },
        { label: isZh ? "角色" : "Roles" },
      ]}
      eyebrow="RBAC"
      title={isZh ? "角色管理" : "Roles"}
      subtitle={isZh ? "创建、分配并维护系统角色。" : "Create, assign, and maintain system roles."}
      meta={isZh ? `${roles.length} 个角色` : `${roles.length} roles`}
      actions={
        <>
          <PaginationLinks
            basePath="/console/roles"
            page={page}
            size={size}
            hasNext={hasNext}
            query={{ view }}
            labels={{ prev: isZh ? "上一页" : "Previous", next: isZh ? "下一页" : "Next" }}
          />
          <ViewToggle
            basePath="/console/roles"
            view={view}
            query={{ page, size }}
            labels={{ list: isZh ? "列表" : "List", cards: isZh ? "卡片" : "Cards" }}
          />
          <ActionModal
            title={isZh ? "新建角色" : "Create role"}
            openLabel={isZh ? "新增" : "Create"}
            submitLabel={isZh ? "创建角色" : "Create role"}
            action={createRoleAction}
          >
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "角色名称" : "Role name"}
              <input
                name="roleName"
                required
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder={isZh ? "例如：运营审核员" : "e.g. Operations reviewer"}
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "描述（可选）" : "Description (optional)"}
              <textarea
                name="description"
                rows={3}
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder={isZh ? "简要说明角色职责。" : "Describe the responsibilities."}
              />
            </label>
          </ActionModal>
        </>
      }
    >

      {view === "list" ? (
        <div className="overflow-hidden rounded-[28px] border border-slate-200/70 shadow dark:border-white/10">
          <table className="min-w-full divide-y divide-slate-200/80 dark:divide-white/5">
            <thead className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-white/5 dark:text-slate-300">
              <tr>
                <th className="px-6 py-3">{isZh ? "名称" : "Name"}</th>
                <th className="px-6 py-3">{isZh ? "描述" : "Description"}</th>
                <th className="px-6 py-3">{isZh ? "成员" : "Members"}</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white/90 text-sm dark:divide-white/5 dark:bg-white/5">
              {roles.map((role) => (
                <tr key={role.code ?? role.name}>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    {isZh ? translateRole(role.name) : role.name}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    {isZh ? translateDescription(role.name, role.description) : role.description}
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{role.members}</td>
                  <td className="px-6 py-4 text-right">
                    {role.code && (
                      <div className="inline-flex gap-2">
                        <ActionModal
                          title={isZh ? "更新角色" : "Update role"}
                          openLabel={isZh ? "编辑" : "Edit"}
                          submitLabel={isZh ? "保存" : "Save"}
                          action={updateRoleAction}
                          triggerClassName="rounded-full border border-slate-200/70 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                        >
                          <input type="hidden" name="roleCode" value={role.code} />
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                            {isZh ? "描述" : "Description"}
                            <textarea
                              name="description"
                              rows={3}
                              defaultValue={role.description}
                              className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                          </label>
                        </ActionModal>
                        <ActionModal
                          title={isZh ? "删除角色" : "Delete role"}
                          openLabel={isZh ? "删除" : "Delete"}
                          submitLabel={isZh ? "确认删除" : "Delete"}
                          action={deleteRoleAction}
                          variant="danger"
                          triggerClassName="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
                        >
                          <input type="hidden" name="roleCode" value={role.code} />
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {isZh ? "此操作不可撤销。" : "This action cannot be undone."}
                          </p>
                        </ActionModal>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {roles.map((role) => {
            const canManage = Boolean(role.code);
            return (
              <div
                key={role.code ?? role.name}
                className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                      {role.updated}
                    </p>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                      {isZh ? translateRole(role.name) : role.name}
                    </h2>
                  </div>
                  <span className="rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-white/10 dark:text-white">
                    {role.members} {isZh ? "人" : "members"}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                  {isZh ? translateDescription(role.name, role.description) : role.description}
                </p>
                {canManage && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <ActionModal
                      title={isZh ? "更新角色" : "Update role"}
                      openLabel={isZh ? "编辑" : "Edit"}
                      submitLabel={isZh ? "保存" : "Save"}
                      action={updateRoleAction}
                      triggerClassName="rounded-full border border-slate-200/70 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                    >
                      <input type="hidden" name="roleCode" value={role.code} />
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                        {isZh ? "描述" : "Description"}
                        <textarea
                          name="description"
                          rows={3}
                          defaultValue={role.description}
                          className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                        />
                      </label>
                    </ActionModal>
                    <ActionModal
                      title={isZh ? "删除角色" : "Delete role"}
                      openLabel={isZh ? "删除" : "Delete"}
                      submitLabel={isZh ? "确认删除" : "Delete"}
                      action={deleteRoleAction}
                      variant="danger"
                      triggerClassName="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
                    >
                      <input type="hidden" name="roleCode" value={role.code} />
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        {isZh ? "此操作不可撤销。" : "This action cannot be undone."}
                      </p>
                    </ActionModal>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </ConsolePage>
  );
}

async function createRoleAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  "use server";
  const { locale } = await getI18n();
  const name = String(formData.get("roleName") ?? "").trim();
  if (!name) return { error: locale === "zh" ? "请输入角色名称。" : "Role name is required." };
  const description = String(formData.get("description") ?? "").trim();

  await createRole({
    name,
    description: description || undefined,
    roleCode: name.toLowerCase().replace(/\\s+/g, "-"),
    enabled: true,
  });

  revalidatePath("/console/roles");
  return {};
}

async function updateRoleAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  "use server";
  const roleCode = String(formData.get("roleCode") ?? "").trim();
  if (!roleCode) return {};
  const description = String(formData.get("description") ?? "").trim();
  await updateRole(roleCode, { description: description || undefined });
  revalidatePath("/console/roles");
  return {};
}

async function deleteRoleAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  "use server";
  const roleCode = String(formData.get("roleCode") ?? "").trim();
  if (!roleCode) return {};
  await deleteRole(roleCode);
  revalidatePath("/console/roles");
  return {};
}

function normalizeRoles(roles?: SysRole[] | null, locale?: string): NormalizedRole[] {
  if (!roles?.length) return [];
  return roles.map((role) => ({
    code: role.roleCode,
    name: role.name ?? role.roleCode ?? "Role",
    description: role.description ?? "",
    members: 0,
    updated: locale === "zh" ? "刚刚" : "Recently",
  }));
}

function formatUpdated(date?: string, locale?: string) {
  if (!date) return locale === "zh" ? "刚刚" : "Recently";
  try {
    return new Intl.DateTimeFormat(locale ?? "en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(date));
  } catch {
    return date;
  }
}

function translateRole(role: string) {
  switch (role?.toLowerCase()) {
    case "admin":
      return "管理员";
    case "editor":
      return "编辑员";
    default:
      return role || "访客";
  }
}

function translateDescription(role: string, fallback: string) {
  if (role?.toLowerCase() === "admin") return "可访问租户的所有资源、策略与审计日志。";
  if (role?.toLowerCase() === "editor") return "可创建/更新业务内容，但不能修改策略。";
  if (role?.toLowerCase() === "viewer") return "只读访问仪表盘与分析数据。";
  return fallback || "该角色将按 Casbin 配置动态授予权限。";
}
