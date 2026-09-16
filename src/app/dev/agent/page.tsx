import { SdToolPage } from "@/components/sd-tool-page";
import "@/styles/sd-article.css";

export default function AgentPage() {
  return (
    <SdToolPage title="Agent 入口">
      <p className="sd-article-desc">
        AI Agent 请先读技能协议，再用紧凑索引检索，最后只拉取少量详情。
      </p>
      <div className="sd-related">
        <a href="/skill/SKILL.md">/skill/SKILL.md</a>
        <a href="/api/frameworks.index.json">/api/frameworks.index.json</a>
        <a href="/llms.txt">/llms.txt</a>
        <a href="/openapi.json">/openapi.json</a>
      </div>
    </SdToolPage>
  );
}
