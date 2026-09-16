import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "100 个产品设计框架 · PMFrame.works",
  description:
    "从用户洞察到系统思维，覆盖产品全链路的核心工具集。点击任意框架查看详细说明与使用步骤。",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
