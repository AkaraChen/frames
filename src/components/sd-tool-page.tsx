import Link from "next/link";
import type { ReactNode } from "react";

export function SdToolPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="sd-article">
      <nav className="sd-article-nav">
        <Link className="map-link" href="/dev">
          ← 返回框架列表
        </Link>
        <span className="nav-title" style={{ fontFamily: "DM Serif Display, Noto Serif SC, serif" }}>
          {title}
        </span>
        <span className="footer-domain">
          <span className="domain-pmf">SDF</span>rame
        </span>
      </nav>
      <div className="sd-article-main">{children}</div>
    </div>
  );
}
