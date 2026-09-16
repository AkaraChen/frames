import { SdToolPage } from "@/components/sd-tool-page";
import "@/styles/sd-article.css";
import { getFrameworkBySlug } from "@/sdframe/data/loader";
import learningPathsData from "../../../../data/learning-paths.json";
import Link from "next/link";

type Path = {
  id: string;
  name: string;
  name_zh: string;
  desc: string;
  desc_zh: string;
  frameworks: string[];
};

export default function PathsPage() {
  const paths = learningPathsData as Path[];
  return (
    <SdToolPage title="学习路径">
      {paths.map((path) => (
        <section key={path.id} className="sd-article-block">
          <h2>{path.name_zh || path.name}</h2>
          <p className="sd-article-desc">{path.desc_zh || path.desc}</p>
          <div className="sd-related">
            {path.frameworks.map((slug) => {
              const fw = getFrameworkBySlug(slug);
              return (
                <Link key={slug} href={`/dev/frameworks/${slug}`}>
                  {fw?.name_zh || fw?.name || slug}
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </SdToolPage>
  );
}
