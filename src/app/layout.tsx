import { CatalogTabs } from "@/components/catalog-tabs";
import type { Metadata } from "next";
import "./globals.css";
import "@/styles/fonts-main.css";
import "@/styles/home.css";
import "@/styles/catalog-tabs.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CatalogTabs />
        {children}
      </body>
    </html>
  );
}
