import { categories } from "@/sdframe/data/categories";
import type { CategoryKey } from "@/sdframe/types";

export type SdCategoryKey = CategoryKey;

export const SD_CAT_ORDER = categories.map((c) => c.key);

export const SD_CAT_COLORS = Object.fromEntries(
  categories.map((c) => [
    c.key,
    {
      bg: c.colorBg,
      text: c.colorText,
      border: c.colorBg,
      label: c.name_zh,
      name: c.name,
      description: c.description_zh,
    },
  ]),
) as Record<
  SdCategoryKey,
  { bg: string; text: string; border: string; label: string; name: string; description: string }
>;

export function padNum(n: number) {
  return String(n).padStart(3, "0");
}
