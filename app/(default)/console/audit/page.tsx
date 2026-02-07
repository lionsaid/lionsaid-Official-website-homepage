import { listSecurityEvents, type SecurityEvent } from "@/lib/system-api";
import { getI18n } from "@/lib/i18n/server";
import ConsolePage from "@/components/console/console-page";

const COPY = {
  en: {
    badge: "Security · Evidence",
    title: "Audit trail",
    description:
      "All sensitive operations are captured with actor, tenant, IP, and payload digests. The log stream is ready for SOC exports or compliance reviews.",
    filters: [
      { label: "Tenant", placeholder: "tenant-a" },
      { label: "Resource", placeholder: "/api/policies" },
      { label: "Date range", placeholder: "2025-03-01 → 2025-03-07" },
    ],
    severity: { label: "Severity", values: ["Info", "Warning", "Critical"] },
    logsTitle: "Recent events",
    download: "Download JSON",
    logs: [
      {
        time: "09:32",
        action: "Policy update",
        description: "Lena Wu granted editor role access to /api/pages/*",
        metadata: "tenant-a · 192.168.1.17",
      },
      {
        time: "08:58",
        action: "JWT issued",
        description: "Token refreshed for Kai Zhang (dom tenant-b)",
        metadata: "aud=console · 42m TTL",
      },
      {
        time: "08:10",
        action: "User disabled",
        description: "Studio Ops suspended account: mina@tenant-b.com",
        metadata: "Triggered by automation",
      },
      {
        time: "Yesterday",
        action: "Schema protection",
        description: "Security notified about schema change in workspace_finance",
        metadata: "Slack · SOC channel",
      },
    ],
    insights: [
      {
        title: "Audit rules",
        body: "Every privilege change, password reset, or policy mutation emits an immutable event with checksum.",
        bullets: ["BCrypt masked secrets", "Stored for 365 days"],
      },
      {
        title: "Compliance hooks",
        body: "Export JSON or syslog feeds to your SIEM. Multi-instance clusters share the same evidence store.",
        bullets: ["SOC2-ready", "Supports hot failover"],
      },
      {
        title: "Risk prevention",
        body: "Notifications route to security chat for schema edits, suspicious IPs, or failed Casbin checks.",
        bullets: ["Least privilege defaults", "Casbin denial alerts"],
      },
    ],
  },
  zh: {
    badge: "安全 · 留痕",
    title: "审计日志",
    description:
      "所有敏感操作都会记录操作者、租户、IP 与摘要，可直接用于安全合规或对接 SOC。",
    filters: [
      { label: "租户", placeholder: "tenant-a" },
      { label: "资源", placeholder: "/api/policies" },
      { label: "时间范围", placeholder: "2025-03-01 → 2025-03-07" },
    ],
    severity: { label: "级别", values: ["信息", "提醒", "关键"] },
    logsTitle: "最新事件",
    download: "导出 JSON",
    logs: [
      {
        time: "09:32",
        action: "策略更新",
        description: "Lena Wu 为 editor 角色开放 /api/pages/*",
        metadata: "tenant-a · 192.168.1.17",
      },
      {
        time: "08:58",
        action: "JWT 签发",
        description: "Kai Zhang 刷新 token（dom tenant-b）",
        metadata: "aud=console · 42 分钟有效",
      },
      {
        time: "08:10",
        action: "用户冻结",
        description: "Studio Ops 暂停账号：mina@tenant-b.com",
        metadata: "由自动化触发",
      },
      {
        time: "昨日",
        action: "Schema 保护",
        description: "安全团队收到 workspace_finance Schema 变更告警",
        metadata: "Slack · SOC channel",
      },
    ],
    insights: [
      {
        title: "审计规则",
        body: "权限变更、密码重置、策略 CRUD 都会生成含校验码的不可变事件。",
        bullets: ["BCrypt 隐藏敏感字段", "保留 365 天"],
      },
      {
        title: "合规对接",
        body: "可导出 JSON / syslog 到 SIEM，集群实例共享同一证据库。",
        bullets: ["支持 SOC2", "热备切换"],
      },
      {
        title: "风险防护",
        body: "Schema 更新、异常 IP、Casbin 拒绝都会推送到安全通知。",
        bullets: ["默认最小权限", "Casbin 拒绝提醒"],
      },
    ],
  },
};

type Locale = keyof typeof COPY;

export default async function AuditPage() {
  const { locale } = await getI18n();
  const copy = COPY[locale as Locale];
  const remoteEvents = await listSecurityEvents();
  const normalizedEvents = normalizeEvents(remoteEvents, locale);
  const logs = normalizedEvents;

  return (
    <ConsolePage
      breadcrumbs={[
        { label: locale === "zh" ? "控制台" : "Console", href: "/console" },
        { label: locale === "zh" ? "审计" : "Audit" },
      ]}
      eyebrow={copy.badge}
      title={copy.title}
      subtitle={copy.description}
    >
      <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow dark:border-white/10 dark:bg-white/5">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {copy.logsTitle}
        </h2>
        {!logs.length ? (
          <p className="mt-4 rounded-[24px] border border-slate-200/70 bg-white/80 p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
            {locale === "zh" ? "暂无审计事件。" : "No audit events yet."}
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {logs.map((log) => (
              <article
                key={`${log.time}-${log.action}`}
                className="rounded-[24px] border border-slate-200/70 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
                  <span>{log.time}</span>
                  <span>{log.action}</span>
                </div>
                <p className="mt-3 text-sm font-medium text-slate-900 dark:text-white">
                  {log.description}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{log.metadata}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </ConsolePage>
  );
}

type NormalizedEvent = {
  time: string;
  action: string;
  description: string;
  metadata: string;
};

function normalizeEvents(events?: SecurityEvent[] | null, locale?: string): NormalizedEvent[] {
  if (!events?.length) return [];
  return events.map((event) => ({
    time: formatEventTime(event.createdTime, locale),
    action: event.eventType ?? "Security event",
    description:
      event.description ??
      `${event.userId ?? "Unknown user"} ${locale === "zh" ? "触发事件" : "triggered an event"}`,
    metadata: [event.userId, event.sourceIp, event.severity].filter(Boolean).join(" · "),
  }));
}

function formatEventTime(timestamp?: string, locale?: string) {
  if (!timestamp) return locale === "zh" ? "刚刚" : "Just now";
  try {
    return new Intl.DateTimeFormat(locale ?? "en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(timestamp));
  } catch {
    return timestamp;
  }
}
