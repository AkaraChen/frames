const KEY = "pmf_visited";

export function getVisited(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function markVisited(slug: string) {
  const arr = getVisited();
  if (!arr.includes(slug)) arr.push(slug);
  try {
    localStorage.setItem(KEY, JSON.stringify(arr));
  } catch {
    /* ignore */
  }
  return arr;
}
