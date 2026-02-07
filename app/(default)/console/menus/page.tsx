import ActionModal from "@/components/ui/action-modal";
import PaginationLinks from "@/components/ui/pagination-links";
import ViewToggle from "@/components/ui/view-toggle";
import ConsolePage from "@/components/console/console-page";
import { createMenu, deleteMenu, listMenus, updateMenu, type SysMenu } from "@/lib/system-api";
import { getI18n } from "@/lib/i18n/server";
import { revalidatePath } from "next/cache";

type NormalizedMenu = {
  id?: string;
  name: string;
  route?: string;
  permission?: string;
  visible?: boolean;
  order?: number;
};

type FormState = { error?: string };

function numberParam(value: string | string[] | undefined, fallback: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default async function MenusPage({
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

  const remoteMenus = await listMenus({ page, size });
  const menus = normalizeMenus(remoteMenus);
  const hasNext = menus.length === size;

  return (
    <ConsolePage
      breadcrumbs={[
        { label: isZh ? "控制台" : "Console", href: "/console" },
        { label: isZh ? "菜单" : "Menus" },
      ]}
      eyebrow={isZh ? "导航" : "Navigation"}
      title={isZh ? "菜单管理" : "Menus"}
      subtitle={isZh ? "维护控制台与客户端使用的菜单配置。" : "Maintain menus used by console and clients."}
      meta={isZh ? `${menus.length} 个菜单` : `${menus.length} menus`}
      actions={
        <>
          <PaginationLinks
            basePath="/console/menus"
            page={page}
            size={size}
            hasNext={hasNext}
            query={{ view }}
            labels={{ prev: isZh ? "上一页" : "Previous", next: isZh ? "下一页" : "Next" }}
          />
          <ViewToggle
            basePath="/console/menus"
            view={view}
            query={{ page, size }}
            labels={{ list: isZh ? "列表" : "List", cards: isZh ? "卡片" : "Cards" }}
          />
          <ActionModal
            title={isZh ? "新建菜单" : "Create menu"}
            openLabel={isZh ? "新增" : "Create"}
            submitLabel={isZh ? "创建菜单" : "Create"}
            action={createMenuAction}
          >
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "名称" : "Name"}
              <input
                name="name"
                required
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder={isZh ? "例如：用户管理" : "e.g. Users"}
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "路由（可选）" : "Route (optional)"}
              <input
                name="route"
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="/console/users"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "权限标识（可选）" : "Permission (optional)"}
              <input
                name="permission"
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="system:users:read"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "排序（可选）" : "Order (optional)"}
              <input
                name="orderNum"
                type="number"
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="10"
              />
            </label>
          </ActionModal>
        </>
      }
    >

      {view === "cards" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {menus.map((menu) => (
            <div
              key={menu.id ?? menu.name}
              className="rounded-[28px] border border-slate-200/70 bg-white/90 p-5 shadow dark:border-white/10 dark:bg-white/5"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                {menu.permission ?? (isZh ? "未设置权限" : "No permission")}
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{menu.name}</p>
              <p className="mt-2 font-mono text-xs text-slate-700 dark:text-slate-200">{menu.route ?? "-"}</p>
              {menu.id && (
                <div className="mt-4 flex flex-wrap justify-end gap-2">
                  <ActionModal
                    title={isZh ? "更新菜单" : "Update menu"}
                    openLabel={isZh ? "编辑" : "Edit"}
                    submitLabel={isZh ? "保存" : "Save"}
                    action={updateMenuAction}
                    triggerClassName="rounded-full border border-slate-200/70 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                  >
                    <input type="hidden" name="menuId" value={menu.id} />
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                      {isZh ? "名称" : "Name"}
                      <input
                        name="name"
                        defaultValue={menu.name}
                        className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                    </label>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                      {isZh ? "路由" : "Route"}
                      <input
                        name="route"
                        defaultValue={menu.route ?? ""}
                        className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 font-mono text-xs text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                    </label>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                      {isZh ? "权限标识" : "Permission"}
                      <input
                        name="permission"
                        defaultValue={menu.permission ?? ""}
                        className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 font-mono text-xs text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                    </label>
                  </ActionModal>
                  <ActionModal
                    title={isZh ? "删除菜单" : "Delete menu"}
                    openLabel={isZh ? "删除" : "Delete"}
                    submitLabel={isZh ? "确认删除" : "Delete"}
                    action={deleteMenuAction}
                    variant="danger"
                    triggerClassName="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
                  >
                    <input type="hidden" name="menuId" value={menu.id} />
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
                <th className="px-4 py-3">{isZh ? "路由" : "Route"}</th>
                <th className="px-4 py-3">{isZh ? "权限标识" : "Permission"}</th>
                <th className="px-4 py-3">{isZh ? "排序" : "Order"}</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white/90 dark:divide-white/5 dark:bg-white/5">
              {menus.map((menu) => (
                <tr key={menu.id ?? menu.name}>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                    {menu.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-200">
                    {menu.route ?? "-"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-200">
                    {menu.permission ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {menu.order ?? "-"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {menu.id ? (
                      <div className="inline-flex gap-2">
                        <ActionModal
                          title={isZh ? "更新菜单" : "Update menu"}
                          openLabel={isZh ? "编辑" : "Edit"}
                          submitLabel={isZh ? "保存" : "Save"}
                          action={updateMenuAction}
                          triggerClassName="rounded-full border border-slate-200/70 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                        >
                          <input type="hidden" name="menuId" value={menu.id} />
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                            {isZh ? "名称" : "Name"}
                            <input
                              name="name"
                              defaultValue={menu.name}
                              className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                          </label>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                            {isZh ? "路由" : "Route"}
                            <input
                              name="route"
                              defaultValue={menu.route ?? ""}
                              className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 font-mono text-xs text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                          </label>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                            {isZh ? "权限标识" : "Permission"}
                            <input
                              name="permission"
                              defaultValue={menu.permission ?? ""}
                              className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 font-mono text-xs text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                          </label>
                        </ActionModal>
                        <ActionModal
                          title={isZh ? "删除菜单" : "Delete menu"}
                          openLabel={isZh ? "删除" : "Delete"}
                          submitLabel={isZh ? "确认删除" : "Delete"}
                          action={deleteMenuAction}
                          variant="danger"
                          triggerClassName="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
                        >
                          <input type="hidden" name="menuId" value={menu.id} />
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {isZh ? "此操作不可撤销。" : "This action cannot be undone."}
                          </p>
                        </ActionModal>
                      </div>
                    ) : null}
                  </td>
                </tr>
              ))}
              {!menus.length && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                    {isZh ? "暂无菜单数据" : "No menus found."}
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

async function createMenuAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  "use server";
  const { locale } = await getI18n();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: locale === "zh" ? "请输入名称。" : "Name is required." };
  const route = String(formData.get("route") ?? "").trim();
  const permission = String(formData.get("permission") ?? "").trim();
  const orderNumRaw = String(formData.get("orderNum") ?? "").trim();
  const orderNum = orderNumRaw ? Number(orderNumRaw) : undefined;

  await createMenu({
    name,
    route: route || undefined,
    permission: permission || undefined,
    orderNum: Number.isFinite(orderNum as number) ? orderNum : undefined,
    visible: true,
  });

  revalidatePath("/console/menus");
  return {};
}

async function updateMenuAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  "use server";
  const menuId = String(formData.get("menuId") ?? "").trim();
  if (!menuId) return {};
  const name = String(formData.get("name") ?? "").trim();
  const route = String(formData.get("route") ?? "").trim();
  const permission = String(formData.get("permission") ?? "").trim();
  await updateMenu(menuId, { name: name || undefined, route: route || undefined, permission: permission || undefined });
  revalidatePath("/console/menus");
  return {};
}

async function deleteMenuAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  "use server";
  const menuId = String(formData.get("menuId") ?? "").trim();
  if (!menuId) return {};
  await deleteMenu(menuId);
  revalidatePath("/console/menus");
  return {};
}

function normalizeMenus(menus?: SysMenu[] | null): NormalizedMenu[] {
  if (!menus?.length) return [];
  return menus.map((menu) => ({
    id: menu.id,
    name: menu.name ?? "Menu",
    route: menu.route ?? undefined,
    permission: menu.permission ?? undefined,
    visible: menu.visible ?? true,
    order: menu.orderNum ?? undefined,
  }));
}
