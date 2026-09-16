"use client";

import { GHOST_SVGS } from "@/data/ghost-svgs";
import { QUOTES } from "@/data/quotes";
import { Input } from "@/components/ui/input";
import { SD_CAT_COLORS, SD_CAT_ORDER, padNum, type SdCategoryKey } from "@/lib/sd-categories";
import { getSdFavs, toggleSdFav } from "@/lib/sd-favorites";
import { getAllFrameworks } from "@/sdframe/data/loader";
import type { Framework } from "@/sdframe/types";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const FW = getAllFrameworks();

function cardDesc(desc: string) {
  return desc.length > 60 ? `${desc.substring(0, 60)}…` : desc;
}

function ghostFor(f: Framework) {
  const key = f.viz_type as keyof typeof GHOST_SVGS;
  return GHOST_SVGS[key] || GHOST_SVGS.flow;
}

function Card({
  f,
  idx,
  onOpen,
  onToggleFav,
  starred,
}: {
  f: Framework;
  idx: number;
  onOpen: (idx: number) => void;
  onToggleFav: (slug: string, ev: React.MouseEvent) => void;
  starred: boolean;
}) {
  const c = SD_CAT_COLORS[f.category];
  return (
    <div className="card" onClick={() => onOpen(idx)}>
      <div className="card-ghost" dangerouslySetInnerHTML={{ __html: ghostFor(f) }} />
      <button
        className={`fav-star${starred ? " is-fav" : ""}`}
        onClick={(ev) => onToggleFav(f.slug, ev)}
        title={starred ? "取消收藏" : "收藏"}
        type="button"
      >
        {starred ? "★" : "☆"}
      </button>
      <div className="card-num"># {padNum(idx + 1)}</div>
      <div className="card-header">
        <div className="card-name">{f.name_zh || f.name}</div>
        <span className="card-tag" style={{ background: c.bg, color: c.text }}>
          {c.label}
        </span>
      </div>
      <div className="card-desc">{cardDesc(f.desc_zh || f.desc)}</div>
    </div>
  );
}

export function SdHomePage({ initialCategory }: { initialCategory?: SdCategoryKey }) {
  const [active, setActive] = useState<SdCategoryKey | "all">(initialCategory ?? "all");
  const [searchQ, setSearchQ] = useState("");
  const [favs, setFavs] = useState<string[]>([]);
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [hintShown, setHintShown] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [quote] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [isMac, setIsMac] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const touch = useRef({ x: 0, y: 0, tracking: false });

  useEffect(() => {
    setFavs(getSdFavs());
    setIsMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent));
  }, []);

  const refreshFavs = () => setFavs(getSdFavs());

  const onToggleFav = (slug: string, ev: React.MouseEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    toggleSdFav(slug);
    refreshFavs();
  };

  const filtered = useMemo(() => {
    const q = searchQ.toLowerCase();
    return FW.filter((f) => {
      const catOk = active === "all" || f.category === active;
      const textOk =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.name_zh.includes(q) ||
        f.desc.toLowerCase().includes(q) ||
        f.desc_zh.includes(q);
      return catOk && textOk;
    });
  }, [active, searchQ]);

  const showFavSection = favs.length > 0 && active === "all" && !searchQ.trim();

  const showModal = useCallback(
    (idx: number) => {
      setModalIdx(idx);
      if (!hintShown) {
        setHintShown(true);
        setShowHint(false);
        requestAnimationFrame(() => setShowHint(true));
        setTimeout(() => setShowHint(false), 2500);
      }
    },
    [hintShown],
  );

  const closeModal = useCallback(() => setModalIdx(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (modalIdx !== null && e.key === "ArrowLeft" && modalIdx > 0) {
        e.preventDefault();
        showModal(modalIdx - 1);
      }
      if (modalIdx !== null && e.key === "ArrowRight" && modalIdx < FW.length - 1) {
        e.preventDefault();
        showModal(modalIdx + 1);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        closeModal();
        searchRef.current?.focus();
        searchRef.current?.select();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeModal, modalIdx, showModal]);

  const q = QUOTES[quote];
  const f = modalIdx !== null ? FW[modalIdx] : null;
  const c = f ? SD_CAT_COLORS[f.category] : null;

  return (
    <div className="pmf-home">
      <header>
        <div className="header-left">
          <div className="site-domain">
            <span className="domain-pmf">SDF</span>rame
          </div>
          <h1>
            317 个
            <br />
            <em>软件设计框架</em>
          </h1>
          <p className="header-desc">
            从设计思考到可观测性，覆盖工程全链路的软件设计框架。点击任意框架查看适用场景与实施步骤。
          </p>
        </div>
        <div className="header-quote">
          <div className="quote-en">
            <div className="quote-text">&quot;{q.en}&quot;</div>
            <div className="quote-attr">
              — {q.by} · {q.title}
            </div>
          </div>
          <div className="quote-cn">
            <div className="quote-text">&quot;{q.cn}&quot;</div>
            <div className="quote-attr">
              — {q.by} · {q.title}
            </div>
          </div>
        </div>
      </header>

      <div className="controls">
        <div className="filters">
          <button
            className={`filter-btn${active === "all" ? " active" : ""}`}
            type="button"
            onClick={() => setActive("all")}
          >
            全部 ({FW.length})
          </button>
          {SD_CAT_ORDER.map((key) => {
            const cat = SD_CAT_COLORS[key];
            const count = FW.filter((x) => x.category === key).length;
            return (
              <button
                key={key}
                className={`filter-btn${active === key ? " active" : ""}`}
                type="button"
                onClick={() => setActive(key)}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
        <div className="controls-right">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <Input
              ref={searchRef}
              type="text"
              id="search"
              className="h-[33px] rounded-[6px] border-[var(--border-dark)] bg-[var(--bg)] px-3.5 pl-9 text-[13px] text-[var(--text)] shadow-none focus-visible:border-[var(--text)] focus-visible:ring-0"
              placeholder={isMac ? "搜索… ⌘K" : "搜索… Ctrl+K"}
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
            />
          </div>
          <Link className="map-link" href="/dev/map" title="框架地图">
            框架地图
          </Link>
        </div>
      </div>

      <div className="fav-section" style={{ display: showFavSection ? undefined : "none" }}>
        <div className="fav-header">
          <span className="fav-header-icon">★</span>
          <span className="fav-header-title">我的常用</span>
          <span className="fav-header-line" />
          <span className="fav-header-count">{favs.length} 个</span>
        </div>
        <div className="fav-grid">
          {favs.map((slug) => {
            const idx = FW.findIndex((x) => x.slug === slug);
            if (idx < 0) return null;
            return (
              <Card
                key={`fav-${slug}`}
                f={FW[idx]}
                idx={idx}
                onOpen={showModal}
                onToggleFav={onToggleFav}
                starred
              />
            );
          })}
        </div>
      </div>

      <div className="grid-wrap">
        <div className="grid">
          {filtered.length === 0 ? (
            <div className="empty">没有找到匹配的框架，试试其他关键词</div>
          ) : (
            filtered.map((item) => {
              const idx = FW.indexOf(item);
              return (
                <Card
                  key={item.slug}
                  f={item}
                  idx={idx}
                  onOpen={showModal}
                  onToggleFav={onToggleFav}
                  starred={favs.includes(item.slug)}
                />
              );
            })
          )}
        </div>
      </div>

      <div
        className={`overlay${modalIdx !== null ? " open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
        onTouchStart={(e) => {
          if (modalIdx === null) return;
          touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, tracking: true };
        }}
        onTouchEnd={(e) => {
          if (!touch.current.tracking || modalIdx === null) return;
          touch.current.tracking = false;
          const dx = e.changedTouches[0].clientX - touch.current.x;
          const dy = e.changedTouches[0].clientY - touch.current.y;
          if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx)) return;
          if (dx > 0 && modalIdx > 0) showModal(modalIdx - 1);
          if (dx < 0 && modalIdx < FW.length - 1) showModal(modalIdx + 1);
        }}
      >
        <button
          className="modal-nav modal-nav-prev"
          style={{ visibility: modalIdx !== null && modalIdx > 0 ? "visible" : "hidden" }}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (modalIdx !== null && modalIdx > 0) showModal(modalIdx - 1);
          }}
        >
          ‹
        </button>
        <div className="modal">
          {f && c && (
            <>
              <button className="modal-close" type="button" onClick={closeModal}>
                ×
              </button>
              <div className="modal-hero" style={{ background: c.bg }}>
                <div className="modal-cat-pill" style={{ color: c.text }}>
                  # {padNum((modalIdx ?? 0) + 1)} · {c.label}
                </div>
                <button
                  className={`modal-fav-pill${favs.includes(f.slug) ? " is-fav" : ""}`}
                  type="button"
                  onClick={(e) => onToggleFav(f.slug, e)}
                >
                  {favs.includes(f.slug) ? "★ 已收藏" : "☆ 收藏"}
                </button>
                <div
                  className="modal-hero-svg"
                  style={{ color: c.text }}
                  dangerouslySetInnerHTML={{ __html: ghostFor(f) }}
                />
              </div>
              <div className="modal-split">
                <div className="modal-content">
                  <div className="modal-title">{f.name_zh || f.name}</div>
                  <p className="modal-desc">{f.desc_zh || f.desc}</p>
                  <Link className="modal-cta" href={`/dev/frameworks/${f.slug}`}>
                    深入了解 →
                  </Link>
                </div>
                <div className="modal-meta">
                  <div className="m-item">
                    <span className="m-label">英文名</span>
                    <span className="m-value">{f.name}</span>
                  </div>
                  {f.origin_author ? (
                    <div className="m-item">
                      <span className="m-label">提出者</span>
                      <span className="m-value">{f.origin_author}</span>
                    </div>
                  ) : null}
                  <div className="m-item">
                    <span className="m-label">复杂度</span>
                    <span className="m-value">{f.complexity}</span>
                  </div>
                  <div className="m-item">
                    <span className="m-label">抽象层级</span>
                    <span className="m-value">{f.abstraction_level}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <button
          className="modal-nav modal-nav-next"
          style={{
            visibility: modalIdx !== null && modalIdx < FW.length - 1 ? "visible" : "hidden",
          }}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (modalIdx !== null && modalIdx < FW.length - 1) showModal(modalIdx + 1);
          }}
        >
          ›
        </button>
        <div className={`modal-nav-hint${showHint ? " show" : ""}`}>← → 切换框架</div>
      </div>

      <footer>
        <span className="footer-domain">
          <span className="domain-pmf footer-pmf">SDF</span>rame
        </span>
        <span className="footer-note" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/dev/map">地图</Link>
          <Link href="/dev/compare">对比</Link>
          <Link href="/dev/selector">选择器</Link>
          <Link href="/dev/paths">路径</Link>
          <Link href="/dev/insights">洞察</Link>
          <Link href="/dev/timeline">时间线</Link>
          <Link href="/dev/agent">Agent</Link>
        </span>
      </footer>
    </div>
  );
}
