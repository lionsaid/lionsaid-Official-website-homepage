const DEFAULT_BASE_URL =
  process.env.SYSTEM_API_BASE_URL ??
  process.env.NEXT_PUBLIC_SYSTEM_API_BASE_URL ??
  "http://127.0.0.1:8000";
const SYSTEM_API_PATH_PREFIX =
  process.env.SYSTEM_API_PATH_PREFIX ??
  process.env.NEXT_PUBLIC_SYSTEM_API_PATH_PREFIX ??
  "";

const ACCEPT_JSON_HEADER = { Accept: "application/json" };
const JSON_CONTENT_TYPE_HEADER = { "Content-Type": "application/json" };

const SYSTEM_API_DEBUG =
  process.env.SYSTEM_API_DEBUG === "1" || process.env.NEXT_PUBLIC_SYSTEM_API_DEBUG === "1";

type SearchParams = Record<string, string | number | boolean | undefined | null>;

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  searchParams?: SearchParams;
};

export type GrantedAuthority = {
  authority?: string;
};

export type SysUser = {
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  id?: string;
  username?: string;
  nickName?: string;
  email?: string;
  mobile?: string;
  avatar?: string;
  password?: string;
  enabled?: boolean;
  authorities?: GrantedAuthority[];
};

export type SysRole = {
  roleCode?: string;
  name?: string;
  description?: string;
  enabled?: boolean;
};

export type SysOrganization = {
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  id?: string;
  parentId?: string;
  name?: string;
  type?: string;
  ownerId?: string;
  ownerName?: string;
  contact?: string;
  description?: string;
  memberCount?: number;
  isDeleted?: boolean;
  isLocked?: boolean;
};

export type SysMenu = {
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  id?: string;
  name?: string;
  tag?: string;
  parentId?: string;
  route?: string;
  routeType?: string;
  description?: string;
  summary?: string;
  icon?: string;
  orderNum?: number;
  permission?: string;
  visible?: boolean;
  component?: string;
  isCache?: boolean;
  isFrame?: boolean;
  isLocked?: boolean;
  isDeleted?: boolean;
};

export type SysAuthorities = {
  createdBy?: string;
  createdDate?: string;
  lastModifiedBy?: string;
  lastModifiedDate?: string;
  id?: string;
  name?: string;
  groupId?: string;
  authorities?: string;
  method?: string;
  path?: string;
  description?: string;
  summary?: string;
  sort?: number;
  type?: string;
  isEnabled?: boolean;
  isSystem?: boolean;
  module?: string;
};
export type PermissionCode = {
  permissionCode?: string;
  name?: string;
  description?: string;
  endpointsCount?: number;
};

export type Permission = {
  permissionCode?: string;
  name?: string;
  method?: string;
  path?: string;
  system?: boolean;
  enabled?: boolean;
};

export type SecurityEvent = {
  id?: string;
  eventType?: string;
  severity?: string;
  userId?: string;
  sourceIp?: string;
  description?: string;
  createdTime?: string;
};

export async function listUsers(params: { page?: number; size?: number } = {}) {
  const { page = 0, size = 20 } = params;
  const data = await systemRequest<any>("/api/system/users", {
    searchParams: {
      page,
      size,
    },
  });
  return extractItems<SysUser>(data);
}

export async function createUser(payload: Partial<SysUser>) {
  return systemRequest("/api/system/users", {
    method: "POST",
    body: payload,
  });
}

export async function getUser(userId: string) {
  return systemRequest<SysUser>(`/api/system/users/${userId}`);
}

export async function updateUser(userId: string, payload: Partial<SysUser>) {
  return systemRequest(`/api/system/users/${userId}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteUser(userId: string) {
  return systemRequest(`/api/system/users/${userId}`, {
    method: "DELETE",
  });
}

export async function setUserEnabled(userId: string, enabled: boolean) {
  return systemRequest(`/api/system/users/${userId}/enabled`, {
    method: "PUT",
    searchParams: { enabled },
  });
}

export async function listRoles(params: { page?: number; size?: number; search?: string } = {}) {
  const { page = 0, size = 20 } = params;
  const data = await systemRequest<any>("/api/system/roles", {
    searchParams: {
      page,
      size,
    },
  });
  return extractItems<SysRole>(data);
}

export async function getRolePermissions(roleCode: string) {
  return systemRequest<string[]>(`/api/system/roles/${roleCode}/permissions`);
}

export async function setRolePermissions(roleCode: string, permissions: string[]) {
  return systemRequest(`/api/system/roles/${roleCode}/permissions`, {
    method: "PUT",
    body: { permissions },
  });
}

export async function getUserRoles(userId: string) {
  return systemRequest<string[]>(`/api/system/users/${userId}/roles`);
}

export async function setUserRoles(userId: string, roles: string[]) {
  return systemRequest(`/api/system/users/${userId}/roles`, {
    method: "PUT",
    body: { roles },
  });
}

export async function createRole(payload: Partial<SysRole>) {
  return systemRequest("/api/system/roles", {
    method: "POST",
    body: payload,
  });
}

export async function getRole(roleCode: string) {
  return systemRequest<SysRole>(`/api/system/roles/${roleCode}`);
}

export async function updateRole(roleCode: string, payload: Partial<SysRole>) {
  return systemRequest(`/api/system/roles/${roleCode}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteRole(roleCode: string) {
  return systemRequest(`/api/system/roles/${roleCode}`, {
    method: "DELETE",
  });
}

export type RoleBinding = {
  roleId?: string;
  targetId?: string;
  targetType?: string;
  createdDate?: string;
};

export async function listRoleBindings(params: {
  roleId: string;
  page?: number;
  size?: number;
  roleDto?: Record<string, string | number | boolean | undefined | null>;
}) {
  const { roleId, page = 0, size = 20, roleDto } = params;
  const data = await systemRequest<any>(`/api/system/roles/${roleId}/bindings`, {
    searchParams: {
      ...toPrefixedParams("roleDto", roleDto),
      ...toPrefixedParams("pageable", { page, size }),
      page,
      size,
    },
  });
  return extractItems<RoleBinding>(data);
}

export async function bindRoleToTarget(roleId: string, targetId: string) {
  return systemRequest(`/api/system/roles/${roleId}/bindings`, {
    method: "POST",
    searchParams: { targetId },
  });
}

export async function unbindRoleFromTarget(roleId: string, targetId: string) {
  return systemRequest(`/api/system/roles/${roleId}/bindings`, {
    method: "DELETE",
    searchParams: { targetId },
  });
}

export async function queryRoleBindings(payload: Record<string, any>) {
  const data = await systemRequest<any>("/api/system/roles/bindings/query", {
    method: "POST",
    body: payload,
  });
  return extractItems<RoleBinding>(data);
}

export async function listPermissions(params: { page?: number; size?: number; search?: string; type?: string } = {}) {
  const { page = 0, size = 20, search = "", type } = params;
  const data = await systemRequest<any>("/api/system/permissions", {
    searchParams: {
      page,
      size,
      search,
      type,
    },
  });
  return extractItems<Permission>(data);
}

export async function listPermissionCodes(params: { page?: number; size?: number; search?: string } = {}) {
  const { page = 0, size = 20, search = "" } = params;
  const data = await systemRequest<any>("/api/system/permission-codes", {
    searchParams: {
      page,
      size,
      search,
    },
  });
  return extractItems<PermissionCode>(data);
}

export async function listSecurityEvents(params: { page?: number; size?: number } = {}) {
  const { page = 0, size = 20 } = params;
  const data = await systemRequest<any>("/api/system/security-events", {
    searchParams: {
      page,
      size,
    },
  });
  return extractItems<SecurityEvent>(data);
}

export async function securityEventStats(days: number = 7) {
  return systemRequest<any>("/api/system/security-events/stats", {
    searchParams: { days },
  });
}

export async function securityEventTopFailedIps(days: number = 7) {
  return systemRequest<any>("/api/system/security-events/top-failed-ips", {
    searchParams: { days },
  });
}

export async function securityEventCheckIp(ip: string) {
  return systemRequest<any>("/api/system/security-events/check-ip", {
    searchParams: { ip },
  });
}

export async function sendSecurityAlert(payload: Record<string, any> = {}) {
  return systemRequest("/api/system/security-events/alerts", {
    method: "POST",
    searchParams: {
      subject: payload.subject,
      content: payload.content,
    },
  });
}

export async function getSystemLog(id: string) {
  return systemRequest<any>(`/api/system/logs/${id}`);
}

export async function listMenus(params: { page?: number; size?: number; search?: string } = {}) {
  const { page = 0, size = 20, search = "" } = params;
  const data = await systemRequest<any>("/api/system/menus", {
    searchParams: {
      page,
      size,
      search,
    },
  });
  return extractItems<SysMenu>(data);
}

export async function createMenu(payload: Partial<SysMenu>) {
  return systemRequest("/api/system/menus", {
    method: "POST",
    body: payload,
  });
}

export async function getMenu(menuId: string) {
  return systemRequest<SysMenu>(`/api/system/menus/${menuId}`);
}

export async function updateMenu(menuId: string, payload: Partial<SysMenu>) {
  return systemRequest(`/api/system/menus/${menuId}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteMenu(menuId: string) {
  return systemRequest(`/api/system/menus/${menuId}`, {
    method: "DELETE",
  });
}

export async function listMenuBindings(params: {
  menuId: string;
  page?: number;
  size?: number;
  menuDto?: Record<string, string | number | boolean | undefined | null>;
}) {
  const { menuId, page = 0, size = 20, menuDto } = params;
  const data = await systemRequest<any>(`/api/system/menus/${menuId}/bindings`, {
    searchParams: {
      ...(menuDto ?? {}),
      page,
      size,
    },
  });
  return extractItems<any>(data);
}

export async function bindMenuToTarget(menuId: string, targetId: string) {
  return systemRequest(`/api/system/menus/${menuId}/bindings`, {
    method: "POST",
    searchParams: { targetId },
  });
}

export async function deleteMenuBinding(bindingId: string) {
  return systemRequest(`/api/system/menus/bindings/${bindingId}`, {
    method: "DELETE",
  });
}

export async function listOrganizations(params: { page?: number; size?: number; search?: string } = {}) {
  const { page = 0, size = 20, search = "" } = params;
  const data = await systemRequest<any>("/api/system/organizations", {
    searchParams: {
      page,
      size,
      search,
    },
  });
  return extractItems<SysOrganization>(data);
}

export async function createOrganization(payload: Partial<SysOrganization>) {
  return systemRequest("/api/system/organizations", {
    method: "POST",
    body: payload,
  });
}

export async function getOrganization(id: string) {
  return systemRequest<SysOrganization>(`/api/system/organizations/${id}`);
}

export async function updateOrganization(id: string, payload: Partial<SysOrganization>) {
  return systemRequest(`/api/system/organizations/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteOrganization(id: string) {
  return systemRequest(`/api/system/organizations/${id}`, {
    method: "DELETE",
  });
}

export async function listOrganizationBindings(params: {
  organizationId: string;
  type: string;
  search?: string;
  page?: number;
  size?: number;
}) {
  const { organizationId, type, search, page = 0, size = 20 } = params;
  const data = await systemRequest<any>(`/api/system/organizations/${organizationId}/bindings`, {
    searchParams: {
      type,
      search,
      page,
      size,
    },
  });
  return extractItems<any>(data);
}

export async function bindOrganizationToTarget(organizationId: string, targetIds: string[]) {
  return systemRequest(`/api/system/organizations/${organizationId}/bindings`, {
    method: "POST",
    body: targetIds,
  });
}

export async function deleteOrganizationBinding(bindingIds: string[]) {
  return systemRequest("/api/system/organizations/bindings", {
    method: "DELETE",
    body: bindingIds,
  });
}


export async function getMyMenu() {
  return systemRequest<any>("/api/me/menu");
}

export async function getMySettings() {
  return systemRequest<any>("/api/me/settings");
}

export async function updateMySettings(patch: Record<string, any>) {
  return systemRequest<any>("/api/me/settings", {
    method: "PUT",
    body: patch,
  });
}

export async function updateMyProfile(payload: Record<string, any>) {
  return systemRequest<any>("/api/me/profile", {
    method: "PUT",
    body: payload,
  });
}

export async function updateMyPassword(payload: { oldPassword?: string; newPassword?: string }) {
  return systemRequest<any>("/api/me/password", {
    method: "PUT",
    body: payload,
  });
}

export async function addMyDevice(payload: Record<string, any>) {
  return systemRequest<any>("/api/me/devices", {
    method: "POST",
    body: payload,
  });
}

export async function deleteMyAccount() {
  return systemRequest("/api/me", { method: "DELETE" });
}

export type QuestionAttempt = {
  id?: string;
  difficulty?: string;
  discipline?: string;
  score?: number;
  createdDate?: string;
};

export async function listMyQuestionAttempts(params: {
  dto?: Record<string, string | number | boolean | undefined | null>;
  page?: number;
  size?: number;
} = {}) {
  const { dto, page = 0, size = 20 } = params;
  const data = await systemRequest<any>("/api/me/question-attempts", {
    searchParams: {
      ...toPrefixedParams("dto", dto),
      ...toPrefixedParams("pageable", { page, size }),
      page,
      size,
    },
  });
  return extractItems<QuestionAttempt>(data);
}

export async function createMyQuestionAttempt(payload: Record<string, any>) {
  return systemRequest("/api/me/question-attempts", {
    method: "POST",
    body: payload,
  });
}

export async function getMyQuestionAttempt(id: string) {
  return systemRequest<QuestionAttempt>(`/api/me/question-attempts/${id}`);
}

export async function deleteMyQuestionAttempt(id: string) {
  return systemRequest(`/api/me/question-attempts/${id}`, { method: "DELETE" });
}

export async function getPublicDictionaries() {
  return systemRequest<any>("/api/public/dictionaries", { auth: false });
}

export async function uploadPublicFile(params: { file: Blob; filename?: string; name?: string }) {
  const body = new FormData();
  body.set("file", params.file, params.filename ?? "upload");
  return systemRequest<any>("/api/public/files", {
    method: "POST",
    body,
    auth: false,
    searchParams: { name: params.name },
  });
}

async function systemRequest<T>(path: string, options: RequestOptions = {}): Promise<T | null> {
  try {
    const url = resolveSystemUrl(path);
    appendSearchParams(url, options.searchParams);

    const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
    const headers: Record<string, string> = {
      ...ACCEPT_JSON_HEADER,
      ...(isFormData ? {} : JSON_CONTENT_TYPE_HEADER),
      ...options.headers,
    };
    const init: RequestInit = {
      method: options.method ?? "GET",
      headers,
      cache: "no-store",
    };

    if (options.body !== undefined) {
      if (isFormData) {
        init.body = options.body as FormData;
      } else {
        init.body = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
      }
    }

    if (SYSTEM_API_DEBUG) {
      console.log("[systemRequest]", {
        method: init.method,
        url: url.toString(),
        auth: false,
      });
    }

    const response = await fetch(url, init);
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        if (SYSTEM_API_DEBUG) {
          console.warn("[systemRequest]", { url: url.toString(), status: response.status });
        }
        return null;
      }
      throw new Error(`System API error: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return null;
    }

    const json = await response.json();
    return unwrapResponse<T>(json);
  } catch (error) {
    console.error("[systemRequest]", error);
    return null;
  }
}

function resolveSystemUrl(path: string) {
  if (/^https?:\/\//i.test(path)) return new URL(path);
  return new URL(applyGatewayPrefix(path), DEFAULT_BASE_URL);
}

function applyGatewayPrefix(path: string) {
  if (!SYSTEM_API_PATH_PREFIX) return path;
  if (!path.startsWith("/")) return path;

  const normalizedPrefix = SYSTEM_API_PATH_PREFIX.startsWith("/")
    ? SYSTEM_API_PATH_PREFIX
    : `/${SYSTEM_API_PATH_PREFIX}`;

  if (normalizedPrefix === "/" || normalizedPrefix === "") return path;
  if (path === normalizedPrefix || path.startsWith(`${normalizedPrefix}/`)) return path;
  return `${normalizedPrefix}${path}`;
}

function appendSearchParams(url: URL, params?: SearchParams) {
  if (!params) return;
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    url.searchParams.set(key, String(value));
  });
}

function unwrapResponse<T>(payload: any): T {
  if (payload == null) return payload as T;
  if (typeof payload === "object") {
    if (payload.content !== undefined && payload.content !== null) {
      return unwrapResponse<T>(payload.content);
    }
    if (payload.data !== undefined && payload.data !== null) {
      return unwrapResponse<T>(payload.data);
    }
    if (payload.content !== undefined) return unwrapResponse<T>(payload.content);
    if (payload.data !== undefined) return unwrapResponse<T>(payload.data);
  }
  return payload as T;
}

function extractItems<T>(data: any): T[] {
  if (!data) return [];
  if (Array.isArray(data)) return data as T[];
  if (Array.isArray(data.items)) return data.items as T[];
  if (Array.isArray(data.records)) return data.records as T[];
  if (Array.isArray(data.content)) return data.content as T[];
  if (Array.isArray(data.list)) return data.list as T[];
  return [];
}

function toPrefixedParams(prefix: string, payload?: SearchParams) {
  if (!payload) return {};
  const entries = Object.entries(payload)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(([key, value]) => [`${prefix}.${key}`, value] as const);
  return Object.fromEntries(entries) as SearchParams;
}
