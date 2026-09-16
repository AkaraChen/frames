const KEY = "sdf_favorites";

export function getSdFavs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleSdFav(slug: string) {
  const favs = getSdFavs();
  const idx = favs.indexOf(slug);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push(slug);
  localStorage.setItem(KEY, JSON.stringify(favs));
  return favs.includes(slug);
}
