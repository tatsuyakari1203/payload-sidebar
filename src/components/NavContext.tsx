'use client'

import React, { createContext, useContext } from 'react'
import type { NavConfigContextValue, BadgeContextValue } from '../types'
import { DEFAULT_ICONS, DEFAULT_BADGE_COLORS } from '../defaults'

// ============================================================================
// Nav Config Context - for plugin configuration
// ============================================================================

const NavConfigContext = createContext<NavConfigContextValue | null>(null)

/**
 * Hook to access sidebar plugin configuration
 */
export const useNavConfig = (): NavConfigContextValue => {
  const ctx = useContext(NavConfigContext)
  if (!ctx) {
    // Return defaults if no provider (for backwards compatibility)
    return {
      icons: DEFAULT_ICONS,
      classPrefix: 'nav',
      enablePinning: true,
      pinnedStorage: 'preferences',
      cssVariables: DEFAULT_BADGE_COLORS,
      customLinks: [],
    }
  }
  return ctx
}

/**
 * Provider for sidebar configuration
 */
export const NavConfigProvider: React.FC<{
  children: React.ReactNode
  config: NavConfigContextValue
}> = ({ children, config }) => {
  return <NavConfigContext.Provider value={config}>{children}</NavConfigContext.Provider>
}

// ============================================================================
// Badge Context - for dynamic badge values
// ============================================================================

const BadgeContext = createContext<BadgeContextValue>({})

/**
 * Hook to access all badge values
 */
export const useBadgeContext = (): BadgeContextValue => {
  return useContext(BadgeContext)
}

/**
 * Provider for dynamic badge values
 * This should be used by the app to inject notification counts, etc.
 *
 * @example
 * ```tsx
 * function MyBadgeProvider({ children }) {
 *   const { unreadChats } = useNotifications()
 *   return (
 *     <SidebarBadgeProvider badges={{ 'chat-dashboard': { count: unreadChats, color: 'red' } }}>
 *       {children}
 *     </SidebarBadgeProvider>
 *   )
 * }
 * ```
 */
export const SidebarBadgeProvider: React.FC<{
  children: React.ReactNode
  badges: BadgeContextValue
}> = ({ children, badges }) => {
  return <BadgeContext.Provider value={badges}>{children}</BadgeContext.Provider>
}

// Export context for advanced use cases
export { BadgeContext, NavConfigContext }
