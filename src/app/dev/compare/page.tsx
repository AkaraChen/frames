"use client";

import { SdToolPage } from "@/components/sd-tool-page";
import "@/styles/sd-article.css";
import { SD_CAT_COLORS } from "@/lib/sd-categories";
import { getAllFrameworks } from "@/sdframe/data/loader";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function ComparePage() {
  const all = useMemo(() => getAllFrameworks(), []);
  const [a, setA] = useState("domain-driven-design");
  const [b, setB] = useState("clean-architecture");
  const left = all.find((f) => f.slug === a);
  const right = all.find((f) => f.slug === b);

  return (
    <SdToolPage title="框架对比">
      <p className="sd-article-desc">选择两个框架，对照适用场景与复杂度。</p>
      <div className="sd-article-grid">
        {[a, b].map((val, i) => (
          <label key={i} className="sd-meta-card">
            <span className="m-label">{i === 0 ? "框架 A" : "框架 B"}</span>
            <select
              value={val}
              onChange={(e) => (i === 0 ? setA(e.target.value) : setB(e.target.value))}
              style={{
                width: "100%",
                marginTop: 8,
                padding: "8px 10px",
                border: "1px solid var(--border-dark)",
                borderRadius: 6,
                background: "var(--bg)",
                color: "var(--text)",
              }}
            >
              {all.map((f) => (
                <option key={f.slug} value={f.slug}>
                  {f.name_zh || f.name}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
      {left && right ? (
        <div className="sd-article-grid">
          {[left, right].map((fw) => (
            <div key={fw.slug} className="sd-meta-card">
              <span className="m-label">{SD_CAT_COLORS[fw.category].label}</span>
              <h2 style={{ fontFamily: "DM Serif Display, Noto Serif SC, serif", margin: "8px 0 12px" }}>
                <Link href={`/dev/frameworks/${fw.slug}`}>{fw.name_zh || fw.name}</Link>
              </h2>
              <p className="sd-article-desc" style={{ marginBottom: 12 }}>
                {fw.desc_zh || fw.desc}
              </p>
              <div className="m-value">复杂度：{fw.complexity}</div>
              <div className="m-value">抽象层级：{fw.abstraction_level}</div>
            </div>
          ))}
        </div>
      ) : null}
    </SdToolPage>
  );
}
