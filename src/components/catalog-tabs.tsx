"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DEV_LINKS = [
  { href: "/dev/map", label: "地图" },
  { href: "/dev/compare", label: "对比" },
  { href: "/dev/selector", label: "选择器" },
  { href: "/dev/paths", label: "路径" },
  { href: "/dev/insights", label: "洞察" },
  { href: "/dev/timeline", label: "时间线" },
  { href: "/dev/agent", label: "Agent" },
];

export function CatalogTabs() {
  const pathname = usePathname() || "/";
  const isDev = pathname === "/dev" || pathname.startsWith("/dev/");
  const isDevTool = DEV_LINKS.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

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
          className={`catalog-tab${isDev && !isDevTool ? " is-active" : ""}`}
          aria-current={pathname === "/dev" ? "page" : undefined}
        >
          开发框架
        </Link>
        {isDev ? (
          <div className="catalog-dev-nav" aria-label="开发框架导航">
            {DEV_LINKS.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`catalog-subtab${active ? " is-active" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="catalog-dev-nav">
            <Link href="/canvas" className={`catalog-subtab${pathname === "/canvas" ? " is-active" : ""}`}>
              框架地图
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
