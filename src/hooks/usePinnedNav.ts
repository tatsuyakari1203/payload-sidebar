'use client'

import { useState, useEffect, useCallback } from 'react'
import { useNavConfig } from '../components/NavContext'
import type { PinnedItem } from '../types'

/**
 * Hook to manage pinned navigation items
 *
 * Supports two storage modes:
 * - 'preferences': Persists in Payload preferences (per-user, synced)
 * - 'localStorage': Persists in browser localStorage (per-browser)
 */
export function usePinnedNav() {
  const { pinnedStorage, onPinChange } = useNavConfig()
  const [pinnedItems, setPinnedItems] = useState<PinnedItem[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch pinned items based on storage mode
  const fetchPinnedItems = useCallback(async () => {
    try {
      if (pinnedStorage === 'localStorage') {
        const stored = localStorage.getItem('nav-pinned')
        setPinnedItems(stored ? JSON.parse(stored) : [])
      } else {
        // Fetch from API (Payload preferences)
        const res = await fetch('/api/nav/pinned')
        const data = await res.json()
        setPinnedItems(data.pinnedItems || [])
      }
    } catch (error) {
      console.error('Error fetching pinned items:', error)
      setPinnedItems([])
    } finally {
      setLoading(false)
    }
  }, [pinnedStorage])

  // Fetch on mount
  useEffect(() => {
    fetchPinnedItems()
  }, [fetchPinnedItems])

  // Save to storage
  const saveItems = useCallback(
    async (items: PinnedItem[]) => {
      if (pinnedStorage === 'localStorage') {
        localStorage.setItem('nav-pinned', JSON.stringify(items))
        return items
      } else {
        // This will be handled by individual API calls
        return items
      }
    },
    [pinnedStorage],
  )

  // Pin an item
  const pinItem = useCallback(
    async (slug: string, type: 'collection' | 'global' | 'custom') => {
      const newItem: PinnedItem = { slug, type, order: pinnedItems.length }

      // Optimistic update
      setPinnedItems((prev) => [...prev, newItem])

      try {
        if (pinnedStorage === 'localStorage') {
          await saveItems([...pinnedItems, newItem])
        } else {
          const res = await fetch('/api/nav/pin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, type }),
          })
          const data = await res.json()
          if (data.pinnedItems) {
            setPinnedItems(data.pinnedItems)
          }
        }

        onPinChange?.(newItem, 'pin')
      } catch (error) {
        console.error('Error pinning item:', error)
        await fetchPinnedItems() // Rollback
      }
    },
    [pinnedItems, pinnedStorage, saveItems, fetchPinnedItems, onPinChange],
  )

  // Unpin an item
  const unpinItem = useCallback(
    async (slug: string, type: string) => {
      const item = pinnedItems.find((i) => i.slug === slug && i.type === type)

      // Optimistic update
      setPinnedItems((prev) => prev.filter((i) => !(i.slug === slug && i.type === type)))

      try {
        if (pinnedStorage === 'localStorage') {
          const newItems = pinnedItems.filter((i) => !(i.slug === slug && i.type === type))
          await saveItems(newItems)
        } else {
          const res = await fetch('/api/nav/unpin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug, type }),
          })
          const data = await res.json()
          if (data.pinnedItems) {
            setPinnedItems(data.pinnedItems)
          }
        }

        if (item) {
          onPinChange?.(item, 'unpin')
        }
      } catch (error) {
        console.error('Error unpinning item:', error)
        await fetchPinnedItems() // Rollback
      }
    },
    [pinnedItems, pinnedStorage, saveItems, fetchPinnedItems, onPinChange],
  )

  // Reorder items
  const reorderItems = useCallback(
    async (items: PinnedItem[]) => {
      // Optimistic update
      setPinnedItems(items)

      try {
        if (pinnedStorage === 'localStorage') {
          await saveItems(items)
        } else {
          const res = await fetch('/api/nav/reorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items }),
          })
          const data = await res.json()
          if (data.pinnedItems) {
            setPinnedItems(data.pinnedItems)
          }
        }
      } catch (error) {
        console.error('Error reordering items:', error)
        await fetchPinnedItems() // Rollback
      }
    },
    [pinnedStorage, saveItems, fetchPinnedItems],
  )

  // Check if an item is pinned
  const isPinned = useCallback(
    (slug: string, type: string) => {
      return pinnedItems.some((item) => item.slug === slug && item.type === type)
    },
    [pinnedItems],
  )

  // Toggle pin state
  const togglePin = useCallback(
    async (slug: string, type: 'collection' | 'global' | 'custom') => {
      if (isPinned(slug, type)) {
        await unpinItem(slug, type)
      } else {
        await pinItem(slug, type)
      }
    },
    [isPinned, pinItem, unpinItem],
  )

  return {
    pinnedItems,
    loading,
    pinItem,
    unpinItem,
    reorderItems,
    isPinned,
    togglePin,
    refresh: fetchPinnedItems,
  }
}
