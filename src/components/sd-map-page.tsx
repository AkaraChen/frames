"use client";

import { SD_CAT_COLORS, SD_CAT_ORDER, type SdCategoryKey } from "@/lib/sd-categories";
import { getAllFrameworks } from "@/sdframe/data/loader";
import type { Framework } from "@/sdframe/types";
import Link from "next/link";
import { useMemo, useState } from "react";

const X: Record<string, number> = {
  beginner: 18,
  intermediate: 50,
  advanced: 82,
};

const Y: Record<string, number> = {
  code: 18,
  component: 40,
  system: 62,
  organization: 84,
};

function jitter(seed: string, spread: number) {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) % 1000;
  return ((h % 100) / 100 - 0.5) * spread;
}

export function SdMapPage() {
  const [filter, setFilter] = useState<SdCategoryKey | null>(null);
  const [tip, setTip] = useState<{ fw: Framework; x: number; y: number; visible: boolean } | null>(
    null,
  );
  const all = useMemo(() => getAllFrameworks(), []);

  function positionTooltip(e: React.MouseEvent, fw: Framework) {
    const el = document.getElementById("sdf-tooltip");
    const tw = el?.offsetWidth ?? 280;
    const th = el?.offsetHeight ?? 120;
    let tx = e.clientX + 16;
    let ty = e.clientY - 10;
    if (tx + tw > window.innerWidth - 16) tx = e.clientX - tw - 16;
    if (ty + th > window.innerHeight - 16) ty = window.innerHeight - th - 16;
    if (ty < 8) ty = 8;
    setTip({ fw, x: tx, y: ty, visible: true });
  }

  return (
    <div className="pmf-canvas-root">
      <nav>
        <Link className="nav-back" href="/dev">
          ← 返回框架列表
        </Link>
        <span className="nav-title">框架地图</span>
        <span className="nav-logo">
          <span className="domain-pmf">SDF</span>rame
        </span>
      </nav>

      <div className="canvas-controls">
        {SD_CAT_ORDER.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`legend-btn${filter === null ? "" : filter === cat ? " active" : " dimmed"}`}
            onClick={() => setFilter((cur) => (cur === cat ? null : cat))}
          >
            <span className="dot-icon" style={{ background: SD_CAT_COLORS[cat].text }} />
            {SD_CAT_COLORS[cat].label}
          </button>
        ))}
        <span className="controls-right">
          {filter === null
            ? `${all.length} 个框架`
            : `${all.filter((f) => f.category === filter).length} / ${all.length} 个框架`}
        </span>
      </div>

      <div className="canvas-wrap">
        <div className="axis-y-top">↑ 组织 / 系统</div>
        <div className="axis-y-bottom">↓ 代码 / 组件</div>
        <div className="axis-x">
          <span>← 入门</span>
          <span>进阶 →</span>
        </div>
        <div className="canvas-area">
          {all.map((fw) => {
            const colors = SD_CAT_COLORS[fw.category];
            const dimmed = filter !== null && fw.category !== filter;
            const left = Math.min(94, Math.max(4, (X[fw.complexity] ?? 50) + jitter(fw.slug, 12)));
            const bottom = Math.min(
              92,
              Math.max(6, (Y[fw.abstraction_level] ?? 50) + jitter(`${fw.slug}y`, 12)),
            );
            return (
              <Link
                key={fw.slug}
                href={`/dev/frameworks/${fw.slug}`}
                className={`fw-dot${dimmed ? " cat-dimmed" : ""}`}
                style={{
                  left: `${left}%`,
                  bottom: `${bottom}%`,
                  background: colors.text,
                  borderColor: colors.text,
                  opacity: 0.65,
                }}
                onMouseEnter={(e) => positionTooltip(e, fw)}
                onMouseMove={(e) => positionTooltip(e, fw)}
                onMouseLeave={() => setTip((t) => (t ? { ...t, visible: false } : t))}
              >
                <span className="dot-label">{fw.name_zh || fw.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div
        id="sdf-tooltip"
        className={`tooltip${tip?.visible ? " visible" : ""}`}
        style={{ left: tip?.x ?? 0, top: tip?.y ?? 0 }}
      >
        {tip ? (
          <>
            <div className="tooltip-name">{tip.fw.name_zh || tip.fw.name}</div>
            <span
              className="tooltip-cat"
              style={{
                background: SD_CAT_COLORS[tip.fw.category].bg,
                color: SD_CAT_COLORS[tip.fw.category].text,
              }}
            >
              {SD_CAT_COLORS[tip.fw.category].label}
            </span>
            <div className="tooltip-desc">{(tip.fw.desc_zh || tip.fw.desc).slice(0, 90)}</div>
          </>
        ) : null}
      </div>
    </div>
  );
}
