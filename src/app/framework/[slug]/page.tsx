import { FrameworkArticle } from "@/components/framework-article";
import { SLUGS } from "@/data/slugs";
import "@/styles/fonts-framework.css";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const raw = await readFile(
      path.join(process.cwd(), "src/content/frameworks", `${slug}.json`),
      "utf8",
    );
    const data = JSON.parse(raw) as { title: string };
    return { title: data.title };
  } catch {
    return { title: "PMFrame.works" };
  }
}

export default async function FrameworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!(SLUGS as readonly string[]).includes(slug)) notFound();
  const raw = await readFile(
    path.join(process.cwd(), "src/content/frameworks", `${slug}.json`),
    "utf8",
  );
  const data = JSON.parse(raw) as { slug: string; css: string; html: string };
  return <FrameworkArticle slug={data.slug} css={data.css} html={data.html} />;
}
