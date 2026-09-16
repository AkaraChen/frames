import { SdToolPage } from "@/components/sd-tool-page";
import "@/styles/sd-article.css";
import { SD_CAT_COLORS, SD_CAT_ORDER } from "@/lib/sd-categories";
import { getAllFrameworks } from "@/sdframe/data/loader";
import Link from "next/link";

export default function InsightsPage() {
  const all = getAllFrameworks();
  return (
    <SdToolPage title="分类洞察">
      <p className="sd-article-desc">317 个框架按 13 个工程分类分布如下。</p>
      <div className="sd-article-grid">
        {SD_CAT_ORDER.map((key) => {
          const count = all.filter((f) => f.category === key).length;
          return (
            <Link key={key} href={`/dev/category/${key}`} className="sd-meta-card">
              <span className="m-label">{SD_CAT_COLORS[key].name}</span>
              <span className="m-value">
                {SD_CAT_COLORS[key].label} · {count} 个
              </span>
            </Link>
          );
        })}
      </div>
    </SdToolPage>
  );
}
