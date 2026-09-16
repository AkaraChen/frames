import { CanvasMap } from "@/components/canvas-map";
import "@/styles/canvas.css";
import "@/styles/fonts-main.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "框架地图 · PMFrame.works",
};

export default function CanvasPage() {
  return <CanvasMap />;
}
