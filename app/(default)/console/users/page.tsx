import ActionModal from "@/components/ui/action-modal";
import PaginationLinks from "@/components/ui/pagination-links";
import ViewToggle from "@/components/ui/view-toggle";
import ConsolePage from "@/components/console/console-page";
import { createUser, deleteUser, listUsers, setUserEnabled, setUserRoles, updateUser, type SysUser } from "@/lib/system-api";
import { getI18n } from "@/lib/i18n/server";
import { revalidatePath } from "next/cache";

const FALLBACK_USERS: Array<NormalizedUser> = [
  { id: "lena@tenant-a.com", name: "Lena Wu", email: "lena@tenant-a.com", role: "Admin", enabled: true, canToggle: false },
  { id: "kai@tenant-a.com", name: "Kai Zhang", email: "kai@tenant-a.com", role: "Editor", enabled: true, canToggle: false },
  { id: "mina@tenant-b.com", name: "Mina Lee", email: "mina@tenant-b.com", role: "Viewer", enabled: false, canToggle: false },
];

type NormalizedUser = {
  id?: string;
  name: string;
  email: string;
  role: string;
  enabled: boolean;
  canToggle: boolean;
};

type FormState = { error?: string };

function numberParam(value: string | string[] | undefined, fallback: number) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default async function UsersPage({
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

  const remoteUsers = await listUsers({ page, size });
  const normalizedUsers = normalizeUsers(remoteUsers);
  const users = normalizedUsers.length ? normalizedUsers : FALLBACK_USERS;
  const hasNext = normalizedUsers.length === size;

  return (
    <ConsolePage
      breadcrumbs={[
        { label: isZh ? "控制台" : "Console", href: "/console" },
        { label: isZh ? "用户" : "Users" },
      ]}
      eyebrow={isZh ? "用户目录" : "Directory"}
      title={isZh ? "用户管理" : "User management"}
      subtitle={
        isZh
          ? "创建、更新、禁用并维护系统用户的生命周期。"
          : "Create, update, disable, and manage the lifecycle of system users."
      }
      actions={
        <>
          <PaginationLinks
            basePath="/console/users"
            page={page}
            size={size}
            hasNext={hasNext}
            query={{ view }}
            labels={{ prev: isZh ? "上一页" : "Previous", next: isZh ? "下一页" : "Next" }}
          />
          <ViewToggle
            basePath="/console/users"
            view={view}
            query={{ page, size }}
            labels={{ list: isZh ? "列表" : "List", cards: isZh ? "卡片" : "Cards" }}
          />
          <ActionModal
            title={isZh ? "新增用户" : "Add user"}
            openLabel={isZh ? "新增" : "Create"}
            submitLabel={isZh ? "创建用户" : "Create user"}
            action={createUserAction}
          >
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "姓名" : "Full name"}
              <input
                name="fullName"
                required
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder={isZh ? "请输入姓名" : "Enter name"}
                autoComplete="name"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              Email
              <input
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="user@tenant.com"
                autoComplete="email"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "临时密码" : "Temporary password"}
              <input
                name="password"
                type="password"
                required
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
              {isZh ? "角色" : "Role"}
              <select
                name="role"
                className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <option value="admin">{isZh ? "管理员" : "Admin"}</option>
                <option value="editor">{isZh ? "编辑员" : "Editor"}</option>
                <option value="viewer">{isZh ? "访客" : "Viewer"}</option>
              </select>
            </label>
          </ActionModal>
        </>
      }
    >

      <div className="space-y-4">
        {view === "cards" ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {users.map((user) => (
              <div
                key={user.email}
                className="rounded-[28px] border border-slate-200/70 bg-white/90 p-5 shadow dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                      {isZh ? translateRole(user.role) : user.role}
                    </p>
                    <p className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{user.name}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{user.email}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      user.enabled
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-200"
                    }`}
                  >
                    {isZh ? translateStatus(user.enabled) : user.enabled ? "Active" : "Suspended"}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-end gap-2">
                  {user.canToggle ? (
                    <>
                      <ActionModal
                        title={isZh ? "更新用户" : "Update user"}
                        openLabel={isZh ? "编辑" : "Edit"}
                        submitLabel={isZh ? "保存" : "Save"}
                        action={updateUserAction}
                        triggerClassName="rounded-full border border-slate-200/70 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                      >
                        <input type="hidden" name="userId" value={user.id} />
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                          {isZh ? "姓名" : "Full name"}
                          <input
                            name="fullName"
                            defaultValue={user.name}
                            className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                          />
                        </label>
                      </ActionModal>
                      <form action={toggleUserEnabledAction} className="inline-flex">
                        <input type="hidden" name="userId" value={user.id} />
                        <input type="hidden" name="targetEnabled" value={(!user.enabled).toString()} />
                        <button className="rounded-full border border-slate-200/70 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-slate-50 dark:border-white/10 dark:text-sky-300 dark:hover:bg-white/5">
                          {user.enabled ? (isZh ? "禁用" : "Disable") : (isZh ? "启用" : "Enable")}
                        </button>
                      </form>
                      <ActionModal
                        title={isZh ? "删除用户" : "Delete user"}
                        openLabel={isZh ? "删除" : "Delete"}
                        submitLabel={isZh ? "确认删除" : "Delete"}
                        action={deleteUserAction}
                        variant="danger"
                        triggerClassName="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
                      >
                        <input type="hidden" name="userId" value={user.id} />
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {isZh ? "此操作不可撤销。" : "This action cannot be undone."}
                        </p>
                      </ActionModal>
                    </>
                  ) : (
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      {isZh ? "等待同步" : "Pending sync"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-[28px] border border-slate-200/70 shadow dark:border-white/10">
            <table className="min-w-full divide-y divide-slate-200/80 dark:divide-white/5">
              <thead className="bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-white/5 dark:text-slate-300">
                <tr>
                  <th className="px-6 py-3">{isZh ? "姓名" : "Name"}</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">{isZh ? "角色" : "Role"}</th>
                  <th className="px-6 py-3">{isZh ? "状态" : "Status"}</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white/90 text-sm dark:divide-white/5 dark:bg-white/5">
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">{isZh ? translateRole(user.role) : user.role}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.enabled
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {isZh ? translateStatus(user.enabled) : user.enabled ? "Active" : "Suspended"}
                      </span>
                    </td>
                  <td className="px-6 py-4 text-right">
                    {user.canToggle ? (
                      <div className="inline-flex flex-wrap items-center justify-end gap-2">
                        <ActionModal
                          title={isZh ? "更新用户" : "Update user"}
                          openLabel={isZh ? "编辑" : "Edit"}
                          submitLabel={isZh ? "保存" : "Save"}
                          action={updateUserAction}
                          triggerClassName="rounded-full border border-slate-200/70 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
                        >
                          <input type="hidden" name="userId" value={user.id} />
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                            {isZh ? "姓名" : "Full name"}
                            <input
                              name="fullName"
                              defaultValue={user.name}
                              className="mt-1 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-2 text-sm text-slate-900 focus:border-sky-400 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
                            />
                          </label>
                        </ActionModal>
                        <form action={toggleUserEnabledAction} className="inline-flex">
                          <input type="hidden" name="userId" value={user.id} />
                          <input type="hidden" name="targetEnabled" value={(!user.enabled).toString()} />
                          <button className="rounded-full border border-slate-200/70 px-3 py-1.5 text-xs font-semibold text-sky-700 hover:bg-slate-50 dark:border-white/10 dark:text-sky-300 dark:hover:bg-white/5">
                            {user.enabled ? (isZh ? "禁用" : "Disable") : (isZh ? "启用" : "Enable")}
                          </button>
                        </form>
                        <ActionModal
                          title={isZh ? "删除用户" : "Delete user"}
                          openLabel={isZh ? "删除" : "Delete"}
                          submitLabel={isZh ? "确认删除" : "Delete"}
                          action={deleteUserAction}
                          variant="danger"
                          triggerClassName="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500/20"
                        >
                          <input type="hidden" name="userId" value={user.id} />
                          <p className="text-sm text-slate-600 dark:text-slate-300">
                            {isZh ? "此操作不可撤销。" : "This action cannot be undone."}
                          </p>
                        </ActionModal>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {isZh ? "等待同步" : "Pending sync"}
                      </span>
                    )}
                    </td>
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

async function createUserAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  "use server";
  const { locale } = await getI18n();
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "viewer");

  if (!fullName || !email || !password) {
    return { error: locale === "zh" ? "请填写必填信息。" : "Please fill in required fields." };
  }

  const created = await createUser({
    nickName: fullName,
    username: email,
    email,
    password,
    enabled: true,
  });
  const userId = (created as SysUser | null)?.id;
  if (userId && role) {
    await setUserRoles(userId, [role]);
  }

  revalidatePath("/console/users");
  return {};
}

async function toggleUserEnabledAction(formData: FormData) {
  "use server";
  const userId = formData.get("userId");
  const targetEnabled = formData.get("targetEnabled");
  if (!userId || targetEnabled == null) return;
  await setUserEnabled(String(userId), targetEnabled === "true");
  revalidatePath("/console/users");
}

async function updateUserAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  "use server";
  const { locale } = await getI18n();
  const userId = String(formData.get("userId") ?? "").trim();
  const fullName = String(formData.get("fullName") ?? "").trim();
  if (!userId) return {};
  if (!fullName) {
    return { error: locale === "zh" ? "姓名不能为空。" : "Name is required." };
  }
  await updateUser(userId, { nickName: fullName });
  revalidatePath("/console/users");
  return {};
}

async function deleteUserAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  "use server";
  const userId = String(formData.get("userId") ?? "").trim();
  if (!userId) return {};
  await deleteUser(userId);
  revalidatePath("/console/users");
  return {};
}

function normalizeUsers(users?: SysUser[] | null): NormalizedUser[] {
  if (!users?.length) return [];
  return users.map((user) => ({
    id: user.id ?? user.email ?? user.username,
    name: user.nickName ?? user.username ?? user.email ?? "Unknown",
    email: user.email ?? user.username ?? "",
    role: "Viewer",
    enabled: user.enabled ?? true,
    canToggle: Boolean(user.id),
  }));
}

function translateRole(role: string) {
  switch (role?.toLowerCase()) {
    case "admin":
      return "管理员";
    case "editor":
      return "编辑员";
    default:
      return "访客";
  }
}

function translateStatus(enabled: boolean) {
  return enabled ? "启用" : "已冻结";
}
