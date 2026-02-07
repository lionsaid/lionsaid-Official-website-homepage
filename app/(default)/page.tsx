import type { Metadata } from "next";
import HomeShowcase from "@/components/home-showcase";
import { getI18n } from "@/lib/i18n/server";

export const metadata: Metadata = {
  title: "Moji & Zhiliao · 数字工匠的展示橱窗",
  description: "记录与内化的闭环体验：用墨迹记录，用知了卡片内化。技术与设计共同驱动的产品矩阵。",
};

export default async function Home() {
  const { t } = await getI18n();
  return <HomeShowcase copy={t.home} />;
}
