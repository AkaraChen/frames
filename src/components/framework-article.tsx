"use client";

import { FRAMEWORKS } from "@/data/frameworks";
import { MODAL_META } from "@/data/modal-meta";
import { isFav, toggleFav } from "@/lib/favorites";
import { MODAL_SVGS } from "@/lib/modal-svgs";
import { getVisited, markVisited } from "@/lib/visited";
import { useEffect, useRef } from "react";

const LIST = FRAMEWORKS.map((f) => ({ slug: f.slug, name: f.n }));
const TOTAL = LIST.length;
const ANCHOR = 5;
const WSIZE = 15;

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function dotPositions(n: number) {
  const WIN_MIN = ANCHOR + 1;
  const WIN_MAX = TOTAL - ANCHOR;
  let wstart: number;
  let wend: number;
  if (n <= ANCHOR) {
    wstart = WIN_MIN;
    wend = WIN_MIN + WSIZE - 1;
  } else if (n > WIN_MAX) {
    wend = WIN_MAX;
    wstart = WIN_MAX - WSIZE + 1;
  } else {
    wstart = Math.max(WIN_MIN, n - Math.floor(WSIZE / 2));
    wend = Math.min(WIN_MAX, wstart + WSIZE - 1);
    if (wend - wstart < WSIZE - 1) wstart = Math.max(WIN_MIN, wend - WSIZE + 1);
  }
  const positions: Array<number | "ell"> = [];
  for (let i = 1; i <= ANCHOR; i++) positions.push(i);
  positions.push("ell");
  for (let i = wstart; i <= wend; i++) positions.push(i);
  positions.push("ell");
  for (let i = TOTAL - ANCHOR + 1; i <= TOTAL; i++) positions.push(i);
  return positions;
}

export function FrameworkArticle({
  slug,
  css,
  html,
}: {
  slug: string;
  css: string;
  html: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const svgEl = root.querySelector("#hero-svg");
    if (svgEl && MODAL_SVGS[slug]) svgEl.innerHTML = MODAL_SVGS[slug];

    const mi = root.querySelector(".meta-inline");
    if (mi && !mi.querySelector(".m-item")) {
      const m = (MODAL_META as Record<string, { by?: string; type?: string; fit?: string; year?: string }>)[slug];
      if (m) {
        const fields: [string, string | undefined][] = [
          ["提出者", m.by],
          ["类型", m.type],
          ["适合", m.fit],
          ["年份", m.year],
        ];
        mi.insertAdjacentHTML(
          "afterbegin",
          fields
            .filter((f) => f[1])
            .map(
              (f) =>
                `<div class="m-item"><span class="m-label">${f[0]}</span><span class="m-value">${f[1]}</span></div>`,
            )
            .join(""),
        );
      }
    }

    const nav = root.querySelector("nav");
    if (nav && !nav.querySelector(".nav-logo")) {
      const logo = document.createElement("span");
      logo.className = "nav-logo";
      logo.innerHTML = '<span class="domain-pmf">PMF</span>rame.works';
      const badge = nav.querySelector(".nav-badge");
      if (badge) {
        let ref: Element = badge;
        while (ref.parentNode && ref.parentNode !== nav) ref = ref.parentNode as Element;
        nav.insertBefore(logo, ref);
      } else {
        nav.appendChild(logo);
      }
    }

    const favBtn = root.querySelector("#nav-fav-btn") as HTMLButtonElement | null;
    const updateFavBtn = () => {
      if (!favBtn) return;
      const f = isFav(slug);
      favBtn.className = "nav-fav-btn" + (f ? " is-fav" : "");
      favBtn.textContent = f ? "★ 已收藏" : "☆ 收藏";
    };
    if (favBtn) {
      favBtn.onclick = () => {
        toggleFav(slug);
        updateFavBtn();
      };
      updateFavBtn();
    }

    const idx = LIST.findIndex((f) => f.slug === slug);
    if (idx === -1) return;
    const n = idx + 1;
    const visitedArr = markVisited(slug);
    const visitedSet = new Set(visitedArr.length ? visitedArr : getVisited());
    const positions = dotPositions(n);
    const dotsRow = root.querySelector(".fc-progress-row");
    if (dotsRow) {
      dotsRow.innerHTML = positions
        .map((pos) => {
          if (pos === "ell") return '<span class="fc-ell">···</span>';
          const fwSlug = LIST[pos - 1].slug;
          let cls = "fc-dot";
          if (pos === n) cls += " current";
          else if (visitedSet.has(fwSlug)) cls += " visited";
          return `<div class="${cls}"></div>`;
        })
        .join("");
    }
    const label = root.querySelector(".fc-progress-label");
    if (label) label.textContent = `${n} / ${TOTAL} 个框架`;
    const nextLink = root.querySelector(".fc-next-link") as HTMLAnchorElement | null;
    if (nextLink) {
      if (n < TOTAL) {
        const next = LIST[idx + 1];
        nextLink.href = `/framework-${next.slug}`;
        const title = nextLink.querySelector(".fc-nl-title");
        if (title) title.textContent = `${next.name} #${pad2(n + 1)}`;
      } else {
        nextLink.href = "/";
        const lab = nextLink.querySelector(".fc-nl-label");
        const title = nextLink.querySelector(".fc-nl-title");
        if (lab) lab.textContent = "返回框架列表";
        if (title) title.textContent = "全部 100 个框架";
      }
      nextLink.style.display = "";
    }
  }, [slug, html]);

  return (
    <div className="pmf-framework-root" ref={rootRef}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <style>{`
        .nav-logo{font-family:"JetBrains Mono",monospace;font-size:12px;color:var(--ink2,#4a4740);user-select:none;}
        .nav-logo .domain-pmf{color:#1a7a4a;font-weight:500;cursor:default;transition:all 0.4s ease;display:inline-block;}
        .nav-logo .domain-pmf:hover{
          background:linear-gradient(90deg,#1a7a4a,#2a9d5c,#f5a623,#e8734a,#d94f8c,#7b61ff,#1a7a4a);
          background-size:200% auto;
          -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;
          animation:pmf-logo-grad 2s linear infinite;
          transform:scale(1.08);letter-spacing:0.08em;
        }
        @keyframes pmf-logo-grad{0%{background-position:0% center}100%{background-position:200% center}}
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
