"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function CatalogTabs() {
  const pathname = usePathname() || "/";
  const isDev = pathname === "/dev" || pathname.startsWith("/dev/");

  return (
    <nav className="catalog-tabs" aria-label="框架目录">
      <div className="catalog-tabs-inner">
        <Link
          href="/"
          className={`catalog-tab${isDev ? "" : " is-active"}`}
          aria-current={isDev ? undefined : "page"}
        >
          产品框架
        </Link>
        <Link
          href="/dev"
          className={`catalog-tab${isDev ? " is-active" : ""}`}
          aria-current={isDev ? "page" : undefined}
        >
          开发框架
        </Link>
      </div>
    </nav>
  );
}
