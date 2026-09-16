import { SdMapPage } from "@/components/sd-map-page";
import "@/styles/canvas.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "框架地图 · SDFrame",
};

export default function Page() {
  return <SdMapPage />;
}
