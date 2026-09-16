"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function SdShadowRoot({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shadow, setShadow] = useState<ShadowRoot | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });

    const seen = new Set<string>();
    const addClone = (node: Element) => {
      const key =
        node instanceof HTMLLinkElement
          ? node.href
          : `${node.tagName}:${node.textContent?.slice(0, 80) ?? ""}`;
      if (seen.has(key)) return;
      seen.add(key);
      root.appendChild(node.cloneNode(true));
    };

    document.querySelectorAll('style, link[rel="stylesheet"]').forEach(addClone);

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches('style, link[rel="stylesheet"]')) addClone(node);
        });
      }
    });
    observer.observe(document.head, { childList: true, subtree: true });

    setShadow(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="sd-shadow-host" style={{ display: "block", minHeight: "calc(100vh - 48px)" }}>
      {shadow ? createPortal(children, shadow) : null}
    </div>
  );
}
