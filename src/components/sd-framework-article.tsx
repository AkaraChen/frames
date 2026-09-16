"use client";

import { SD_CAT_COLORS, padNum } from "@/lib/sd-categories";
import { getSdFavs, toggleSdFav } from "@/lib/sd-favorites";
import { getAllFrameworks } from "@/sdframe/data/loader";
import type { Framework } from "@/sdframe/types";
import Link from "next/link";
import { useEffect, useState } from "react";

function asList(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string");
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}

export function SdFrameworkArticle({ fw }: { fw: Framework }) {
  const [favs, setFavs] = useState<string[]>([]);
  const all = getAllFrameworks();
  const idx = all.findIndex((x) => x.slug === fw.slug);
  const cat = SD_CAT_COLORS[fw.category];
  const related = (fw.related || [])
    .map((slug) => all.find((x) => x.slug === slug))
    .filter(Boolean) as Framework[];

  useEffect(() => {
    setFavs(getSdFavs());
  }, []);

  return (
    <article className="sd-article">
      <nav className="sd-article-nav">
        <Link className="nav-back map-link" href="/dev">
          ← 返回框架列表
        </Link>
        <button
          className={`modal-fav-pill${favs.includes(fw.slug) ? " is-fav" : ""}`}
          style={{ position: "static" }}
          type="button"
          onClick={() => {
            toggleSdFav(fw.slug);
            setFavs(getSdFavs());
          }}
        >
          {favs.includes(fw.slug) ? "★ 已收藏" : "☆ 收藏"}
        </button>
      </nav>
      <div className="sd-article-main">
        <div className="sd-article-kicker" style={{ color: cat.text }}>
          # {padNum(idx + 1)} · {cat.label}
        </div>
        <h1 className="sd-article-title">{fw.name_zh || fw.name}</h1>
        <p className="sd-article-en">{fw.name}</p>
        <p className="sd-article-desc">{fw.desc_zh || fw.desc}</p>

        <div className="sd-article-grid">
          <div className="sd-meta-card">
            <span className="m-label">提出者</span>
            <span className="m-value">{fw.origin_author || "—"}</span>
          </div>
          <div className="sd-meta-card">
            <span className="m-label">复杂度</span>
            <span className="m-value">{fw.complexity}</span>
          </div>
          <div className="sd-meta-card">
            <span className="m-label">抽象层级</span>
            <span className="m-value">{fw.abstraction_level}</span>
          </div>
          <div className="sd-meta-card">
            <span className="m-label">成熟度</span>
            <span className="m-value">{fw.maturity_ring}</span>
          </div>
        </div>

        {asList(fw.steps_zh).length || asList(fw.steps).length ? (
          <section className="sd-article-block">
            <h2>实施步骤</h2>
            <ol>
              {(asList(fw.steps_zh).length ? asList(fw.steps_zh) : asList(fw.steps)).map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>
        ) : null}

        {asList(fw.when_to_use_zh).length || asList(fw.when_to_use).length ? (
          <section className="sd-article-block">
            <h2>何时使用</h2>
            <ul>
              {(asList(fw.when_to_use_zh).length
                ? asList(fw.when_to_use_zh)
                : asList(fw.when_to_use)
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {asList(fw.when_not_to_use_zh).length || asList(fw.when_not_to_use).length ? (
          <section className="sd-article-block">
            <h2>何时不用</h2>
            <ul>
              {(asList(fw.when_not_to_use_zh).length
                ? asList(fw.when_not_to_use_zh)
                : asList(fw.when_not_to_use)
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="sd-article-block">
            <h2>相关框架</h2>
            <div className="sd-related">
              {related.map((item) => (
                <Link key={item.slug} href={`/dev/frameworks/${item.slug}`}>
                  {item.name_zh || item.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
