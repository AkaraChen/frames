import { SdToolPage } from "@/components/sd-tool-page";
import "@/styles/sd-article.css";
import { getAllFrameworks } from "@/sdframe/data/loader";
import Link from "next/link";

export default function TimelinePage() {
  const all = getAllFrameworks()
    .filter((f) => f.timeline?.[0]?.[0])
    .sort((a, b) => String(a.timeline[0][0]).localeCompare(String(b.timeline[0][0])));

  return (
    <SdToolPage title="时间线">
      {all.slice(0, 80).map((fw) => (
        <div key={fw.slug} className="sd-meta-card" style={{ marginBottom: 12 }}>
          <span className="m-label">{fw.timeline[0][0]}</span>
          <Link href={`/dev/frameworks/${fw.slug}`} className="m-value">
            {fw.name_zh || fw.name}
          </Link>
        </div>
      ))}
    </SdToolPage>
  );
}
