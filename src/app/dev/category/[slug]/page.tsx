import { SdHomePage } from "@/components/sd-home-page";
import { SD_CAT_ORDER, type SdCategoryKey } from "@/lib/sd-categories";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return SD_CAT_ORDER.map((slug) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SD_CAT_ORDER.includes(slug as SdCategoryKey)) notFound();
  return <SdHomePage initialCategory={slug as SdCategoryKey} />;
}
