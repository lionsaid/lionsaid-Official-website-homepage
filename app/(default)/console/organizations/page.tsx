import ActionModal from "@/components/ui/action-modal";
import PaginationLinks from "@/components/ui/pagination-links";
import ViewToggle from "@/components/ui/view-toggle";
import ConsolePage from "@/components/console/console-page";
import { createOrganization, deleteOrganization, listOrganizations, updateOrganization, type SysOrganization } from "@/lib/system-api";
import { getI18n } from "@/lib/i18n/server";
import { revalidatePath } from "next/cache";

type NormalizedOrg = {
  id?: string;
  name: string;
  type?: string;
  ownerId?: string;
  members?: number;
};

type FormState = { error?: string };

function numberParam(value: string | string[] | undefined, fallback: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default async function OrganizationsPage({
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

  const remoteOrgs = await listOrganizations({ page, size });
  const orgs = normalizeOrganizations(remoteOrgs);
  const hasNext = orgs.length === size;

  return (
    <ConsolePage
      breadcrumbs={[
        { label: isZh ? "控制台" : "Console", href: "/console" },
        { label: isZh ? "组织" : "Organizations" },
      ]}
      eyebrow={isZh ? "组织结构" : "Organizations"}
      title={isZh ? "组织管理" : "Organizations"}
      subtitle={
        isZh
          ? "创建、更新并维护组织结构与绑定关系。"
          : "Create, update, and maintain organization structure and bindings."
      }
      actions={
        <>
          <PaginationLinks
            basePath="/console/organizations"
            page={page}
            size={size}
            hasNext={hasNext}
            query={{ view }}
            labels={{ prev: isZh ? "上一页" : "Previous", next: isZh ? "下一页" : "Next" }}
          />
          <ViewToggle
            basePath="/console/organizations"
            view={view}
            query={{ page, size }}
            labels={{ list: isZh ? "列表" : "List", cards: isZh ? "卡片" : "Cards" }}
          />
          <ActionModal
            title={isZh ? "新建组织" : "Create organization"}
            openLabel={isZh ? "新增" : "Create"}
            submitLabel={isZh ? "创建组织" : "Create"}
            action={createOrganizationAction}
          >
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "名称" : "Name"}
              <input
                name="name"
                required
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder={isZh ? "例如：研发中心" : "e.g. Engineering"}
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "类型" : "Type"}
              <input
                name="type"
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder={isZh ? "department / team" : "department / team"}
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "OwnerId（租户）" : "OwnerId (tenant)"}
              <input
                name="ownerId"
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="tenant-a"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "描述（可选）" : "Description (optional)"}
              <textarea
                name="description"
                rows={3}
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </label>
          </ActionModal>
        </>
      }
    >
      {view === "cards" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {orgs.map((org) => (
            <div
              key={org.id ?? org.name}
              className="rounded-[28px] border border-slate-200/70 bg-white/90 p-5 shadow dark:border-white/10 dark:bg-white/5"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                {org.type ?? (isZh ? "未设置类型" : "No type")}
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{org.name}</p>
              <p className="mt-2 font-mono text-xs text-slate-700 dark:text-slate-200">{org.ownerId ?? "-"}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {(org.members ?? 0).toString()} {isZh ? "人" : "members"}
              </p>
              {org.id && (
                <div className="mt-4 flex flex-wrap justify-end gap-2">
                  <ActionModal
                    title={isZh ? "更新组织" : "Update organization"}
                    openLabel={isZh ? "编辑" : "Edit"}
                    submitLabel={isZh ? "保存" : "Save"}
                    action={updateOrganizationAction}
                    triggerClassName="rounded-full border border-slate-200/70 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                  >
                    <input type="hidden" name="orgId" value={org.id} />
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                      {isZh ? "名称" : "Name"}
                      <input
                        name="name"
                        defaultValue={org.name}
                        className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                    </label>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                      {isZh ? "类型" : "Type"}
                      <input
                        name="type"
                        defaultValue={org.type ?? ""}
                        className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                    </label>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                      {isZh ? "OwnerId" : "OwnerId"}
                      <input
                        name="ownerId"
                        defaultValue={org.ownerId ?? ""}
                        className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 font-mono text-xs text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                    </label>
                  </ActionModal>
                  <ActionModal
                    title={isZh ? "删除组织" : "Delete organization"}
                    openLabel={isZh ? "删除" : "Delete"}
                    submitLabel={isZh ? "确认删除" : "Delete"}
                    action={deleteOrganizationAction}
                    variant="danger"
                    triggerClassName="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
                  >
                    <input type="hidden" name="orgId" value={org.id} />
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {isZh ? "此操作不可撤销。" : "This action cannot be undone."}
                    </p>
                  </ActionModal>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden rounded-[28px] border border-slate-200/70 shadow dark:border-white/10">
          <table className="min-w-full divide-y divide-slate-200/70 text-sm dark:divide-white/5">
            <thead className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-white/5 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3">{isZh ? "名称" : "Name"}</th>
                <th className="px-4 py-3">{isZh ? "类型" : "Type"}</th>
                <th className="px-4 py-3">{isZh ? "租户/Owner" : "Owner"}</th>
                <th className="px-4 py-3">{isZh ? "成员" : "Members"}</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white/90 dark:divide-white/5 dark:bg-white/5">
              {orgs.map((org) => (
                <tr key={org.id ?? org.name}>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{org.name}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{org.type ?? "-"}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-200">
                    {org.ownerId ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{org.members ?? 0}</td>
                  <td className="px-4 py-3 text-right">
                    {org.id ? (
                      <div className="inline-flex gap-2">
                        <ActionModal
                          title={isZh ? "更新组织" : "Update organization"}
                          openLabel={isZh ? "编辑" : "Edit"}
                          submitLabel={isZh ? "保存" : "Save"}
                          action={updateOrganizationAction}
                          triggerClassName="rounded-full border border-slate-200/70 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                        >
                          <input type="hidden" name="orgId" value={org.id} />
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                            {isZh ? "名称" : "Name"}
                            <input
                              name="name"
                              defaultValue={org.name}
                              className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                          </label>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                            {isZh ? "类型" : "Type"}
                            <input
                              name="type"
                              defaultValue={org.type ?? ""}
                              className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                          </label>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                            {isZh ? "OwnerId" : "OwnerId"}
                            <input
                              name="ownerId"
                              defaultValue={org.ownerId ?? ""}
                              className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 font-mono text-xs text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                          </label>
                        </ActionModal>
                        <ActionModal
                          title={isZh ? "删除组织" : "Delete organization"}
                          openLabel={isZh ? "删除" : "Delete"}
                          submitLabel={isZh ? "确认删除" : "Delete"}
                          action={deleteOrganizationAction}
                          variant="danger"
                          triggerClassName="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
                        >
                          <input type="hidden" name="orgId" value={org.id} />
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {isZh ? "此操作不可撤销。" : "This action cannot be undone."}
                          </p>
                        </ActionModal>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
              {!orgs.length && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                    {isZh ? "暂无组织数据" : "No organizations found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

    </ConsolePage>
  );
}

async function createOrganizationAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  "use server";
  const { locale } = await getI18n();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: locale === "zh" ? "请输入名称。" : "Name is required." };
  const type = String(formData.get("type") ?? "").trim();
  const ownerId = String(formData.get("ownerId") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  await createOrganization({
    name,
    type: type || undefined,
    ownerId: ownerId || undefined,
    ownerName: ownerId || undefined,
    description: description || undefined,
    isLocked: false,
    isDeleted: false,
  });

  revalidatePath("/console/organizations");
  return {};
}

async function updateOrganizationAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  "use server";
  const orgId = String(formData.get("orgId") ?? "").trim();
  if (!orgId) return {};
  const name = String(formData.get("name") ?? "").trim();
  const type = String(formData.get("type") ?? "").trim();
  const ownerId = String(formData.get("ownerId") ?? "").trim();
  await updateOrganization(orgId, { name: name || undefined, type: type || undefined, ownerId: ownerId || undefined, ownerName: ownerId || undefined });
  revalidatePath("/console/organizations");
  return {};
}

async function deleteOrganizationAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  "use server";
  const orgId = String(formData.get("orgId") ?? "").trim();
  if (!orgId) return {};
  await deleteOrganization(orgId);
  revalidatePath("/console/organizations");
  return {};
}

function normalizeOrganizations(orgs?: SysOrganization[] | null): NormalizedOrg[] {
  if (!orgs?.length) return [];
  return orgs.map((org) => ({
    id: org.id,
    name: org.name ?? "Organization",
    type: org.type ?? undefined,
    ownerId: org.ownerId ?? undefined,
    members: org.memberCount ?? 0,
  }));
}
