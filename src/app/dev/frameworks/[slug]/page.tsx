import { SdFrameworkArticle } from "@/components/sd-framework-article";
import "@/styles/sd-article.css";
import { getAllFrameworks, getFrameworkFull } from "@/sdframe/data/loader";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return getAllFrameworks().map((fw) => ({ slug: fw.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fw = await getFrameworkFull(slug);
  if (!fw) return { title: "SDFrame" };
  return { title: `${fw.name_zh || fw.name} · SDFrame` };
}

export default async function SdFrameworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fw = await getFrameworkFull(slug);
  if (!fw) notFound();
  return <SdFrameworkArticle fw={fw} />;
}
