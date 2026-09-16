"use client";

import { SdToolPage } from "@/components/sd-tool-page";
import "@/styles/sd-article.css";
import { SD_CAT_COLORS, SD_CAT_ORDER } from "@/lib/sd-categories";
import { getAllFrameworks } from "@/sdframe/data/loader";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function SelectorPage() {
  const [cat, setCat] = useState<string>("all");
  const [complexity, setComplexity] = useState<string>("all");
  const all = useMemo(() => getAllFrameworks(), []);
  const matches = all.filter((f) => {
    const catOk = cat === "all" || f.category === cat;
    const cxOk = complexity === "all" || f.complexity === complexity;
    return catOk && cxOk;
  });

  return (
    <SdToolPage title="框架选择器">
      <p className="sd-article-desc">先选分类和复杂度，再从结果里点进详情。</p>
      <div className="filters" style={{ marginBottom: 24 }}>
        <button className={`filter-btn${cat === "all" ? " active" : ""}`} type="button" onClick={() => setCat("all")}>
          全部分类
        </button>
        {SD_CAT_ORDER.map((key) => (
          <button
            key={key}
            className={`filter-btn${cat === key ? " active" : ""}`}
            type="button"
            onClick={() => setCat(key)}
          >
            {SD_CAT_COLORS[key].label}
          </button>
        ))}
      </div>
      <div className="filters" style={{ marginBottom: 32 }}>
        {["all", "beginner", "intermediate", "advanced"].map((key) => (
          <button
            key={key}
            className={`filter-btn${complexity === key ? " active" : ""}`}
            type="button"
            onClick={() => setComplexity(key)}
          >
            {key === "all" ? "全部复杂度" : key}
          </button>
        ))}
      </div>
      <p className="count-label" style={{ marginBottom: 16 }}>
        {matches.length} 个候选
      </p>
      <div className="sd-related">
        {matches.slice(0, 40).map((fw) => (
          <Link key={fw.slug} href={`/dev/frameworks/${fw.slug}`}>
            {fw.name_zh || fw.name}
          </Link>
        ))}
      </div>
    </SdToolPage>
  );
}
