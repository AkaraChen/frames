import { useState, useCallback, useEffect } from 'react'

const STORAGE_KEY = 'fw-favorites'

function loadFavorites(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    setFavorites(loadFavorites())
  }, [])

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites(prev => {
      const next = prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
