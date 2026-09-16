import { SdHomePage } from "@/components/sd-home-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "317 个软件设计框架 · SDFrame",
  description:
    "从设计思考到可观测性，覆盖工程全链路的软件设计框架。点击任意框架查看适用场景与实施步骤。",
};

export default function DevHomePage() {
  return <SdHomePage />;
}
