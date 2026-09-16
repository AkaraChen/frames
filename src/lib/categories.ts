export type CategoryKey =
  | "discovery"
  | "define"
  | "ideation"
  | "validation"
  | "execution"
  | "growth"
  | "system";

export const CAT_ORDER: CategoryKey[] = [
  "discovery",
  "define",
  "ideation",
  "validation",
  "execution",
  "growth",
  "system",
];

export const CAT_COLORS: Record<
  CategoryKey,
  { bg: string; text: string; border: string; label: string }
> = {
  discovery: {
    bg: "#e8f5ee",
    text: "#1a5c38",
    border: "#b8dfc8",
    label: "用户洞察",
  },
  define: {
    bg: "#e8eef8",
    text: "#1a3a6b",
    border: "#b8cce8",
    label: "问题定义",
  },
  ideation: {
    bg: "#fdf3e3",
    text: "#7a4a0a",
    border: "#f0d4a0",
    label: "创意生成",
  },
  validation: {
    bg: "#fce8e8",
    text: "#7a1a1a",
    border: "#f0b8b8",
    label: "验证测试",
  },
  execution: {
    bg: "#ede8f8",
    text: "#3a1a6b",
    border: "#c8b8e8",
    label: "执行落地",
  },
  growth: {
    bg: "#e8f8e8",
    text: "#1a5a1a",
    border: "#b8dbb8",
    label: "增长策略",
  },
  system: {
    bg: "#f8e8f3",
    text: "#6b1a52",
    border: "#e8b8d8",
    label: "系统思维",
  },
};

export function padNum(n: number) {
  return String(n).padStart(2, "0");
}
