import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "317 个软件设计框架 · SDFrame",
  description:
    "面向工程师、架构师与 AI Agent 的软件设计框架参考：317 个框架、13 个分类，含双语说明、筛选、对比与关系地图。",
};

export default function DevLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;700&family=Noto+Serif+SC:wght@400;700&family=Noto+Sans+SC:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
