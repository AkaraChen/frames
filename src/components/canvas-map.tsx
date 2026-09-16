"use client";

import { CANVAS_POINTS } from "@/data/canvas-points";
import { CAT_COLORS, CAT_ORDER, type CategoryKey } from "@/lib/categories";
import { isFav } from "@/lib/favorites";
import Link from "next/link";
import { useEffect, useState } from "react";

type Point = (typeof CANVAS_POINTS)[number];

export function CanvasMap() {
  const [filter, setFilter] = useState<CategoryKey | null>(null);
  const [favs, setFavs] = useState<string[]>([]);
  const [tip, setTip] = useState<{
    fw: Point;
    x: number;
    y: number;
    visible: boolean;
  } | null>(null);

  useEffect(() => {
    setFavs(
      CANVAS_POINTS.map((p) => p.s).filter((s) => isFav(s)),
    );
  }, []);

  const visibleCount = filter
    ? CANVAS_POINTS.filter((p) => p.c === filter).length
    : CANVAS_POINTS.length;

  function positionTooltip(e: React.MouseEvent, fw: Point) {
    const el = document.getElementById("pmf-tooltip");
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
        <Link className="nav-back" href="/">
          ← 返回框架列表
        </Link>
        <span className="nav-title">框架地图</span>
        <span className="nav-logo">
          <span className="domain-pmf">PMF</span>rame.works
        </span>
      </nav>

      <div className="canvas-controls">
        {CAT_ORDER.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`legend-btn${
              filter === null ? "" : filter === cat ? " active" : " dimmed"
            }`}
            onClick={() => setFilter((cur) => (cur === cat ? null : cat))}
          >
            <span className="dot-icon" style={{ background: CAT_COLORS[cat].text }} />
            {CAT_COLORS[cat].label}
          </button>
        ))}
        <span className="controls-right">
          {filter === null
            ? `${CANVAS_POINTS.length} 个框架`
            : `${visibleCount} / ${CANVAS_POINTS.length} 个框架`}
        </span>
      </div>

      <div className="canvas-wrap">
        <div className="axis-y-top">↑ 高杠杆 High Leverage</div>
        <div className="axis-y-bottom">↓ 低杠杆 Low Leverage</div>
        <div className="axis-x">
          <span>← 早期 Early</span>
          <span>晚期 Late →</span>
        </div>
        <div className="canvas-area">
          <div className="quadrant-label q-tl">高杠杆 · 早期</div>
          <div className="quadrant-label q-tr">高杠杆 · 晚期</div>
          <div className="quadrant-label q-bl">低杠杆 · 早期</div>
          <div className="quadrant-label q-br">低杠杆 · 晚期</div>
          {CANVAS_POINTS.map((fw) => {
            const cat = fw.c as CategoryKey;
            const colors = CAT_COLORS[cat];
            const dimmed = filter !== null && fw.c !== filter;
            const starred = favs.includes(fw.s);
            return (
              <Link
                key={fw.s}
                href={`/framework-${fw.s}`}
                className={`fw-dot${starred ? " is-fav" : ""}${dimmed ? " cat-dimmed" : ""}`}
                style={{
                  left: `${fw.x}%`,
                  bottom: `${fw.y}%`,
                  background: colors.text,
                  borderColor: colors.text,
                  opacity: 0.65,
                }}
                onMouseEnter={(e) => positionTooltip(e, fw)}
                onMouseMove={(e) => positionTooltip(e, fw)}
                onMouseLeave={() => setTip((t) => (t ? { ...t, visible: false } : t))}
              >
                <span className="dot-label">{fw.n}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <div
        id="pmf-tooltip"
        className={`tooltip${tip?.visible ? " visible" : ""}`}
        style={{ left: tip?.x ?? 0, top: tip?.y ?? 0 }}
      >
        {tip ? (
          <>
            <div className="tooltip-name">{tip.fw.n}</div>
            <span
              className="tooltip-cat"
              style={{
                background: CAT_COLORS[tip.fw.c as CategoryKey].bg,
                color: CAT_COLORS[tip.fw.c as CategoryKey].text,
              }}
            >
              {CAT_COLORS[tip.fw.c as CategoryKey].label}
            </span>
            <div className="tooltip-desc">{tip.fw.d}</div>
            <div className="tooltip-fav">{favs.includes(tip.fw.s) ? "★ 已收藏" : ""}</div>
          </>
        ) : null}
      </div>
    </div>
  );
}
