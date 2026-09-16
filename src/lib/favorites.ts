const KEY = "pmf_favorites";

export function getFavs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function isFav(slug: string) {
  return getFavs().includes(slug);
}

export function toggleFav(slug: string) {
  const favs = getFavs();
  const idx = favs.indexOf(slug);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push(slug);
  localStorage.setItem(KEY, JSON.stringify(favs));
  return favs.includes(slug);
}
