import type { FRAMEWORKS } from "@/data/frameworks";
import type { CategoryKey } from "@/lib/categories";

export type Framework = (typeof FRAMEWORKS)[number] & { cat: CategoryKey };
