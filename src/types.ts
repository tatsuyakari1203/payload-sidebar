import type { LucideIcon } from 'lucide-react'

// ============================================================================
// Badge Types
// ============================================================================

/**
 * Supported badge colors
 */
export type BadgeColor = 'red' | 'yellow' | 'blue' | 'green' | 'orange' | 'gray'

// ============================================================================
// Custom Links & Groups Types
// ============================================================================

/**
 * Custom navigation link configuration
 */
export interface CustomLink {
  /**
   * Display label for the link
   */
  label: string

  /**
   * URL path or full URL for the link
   * - Relative paths: '/admin/custom-view'
   * - Absolute paths: '/api/docs'
   * - External URLs: 'https://docs.example.com'
   */
  href: string

  /**
   * Group label to place this link in
   * If group doesn't exist, it will be created
   * @default 'Custom'
   */
  group?: string

  /**
   * Icon key (from defaults) or custom icon component
   * @default 'link'
   */
  icon?: string | LucideIcon | React.ComponentType<{ size?: number; className?: string }>

  /**
   * Whether this is an external link (opens in new tab)
   * Auto-detected if href starts with http:// or https://
   * @default false
   */
  external?: boolean

  /**
   * Position within the group
   * Lower number = higher position
   * @default 50
   */
  order?: number

  /**
   * Whether this link can be pinned
   * @default true
   */
  pinnable?: boolean
}

/**
 * Custom navigation group configuration
 */
export interface CustomGroup {
  /**
   * Group label (used for display and as identifier)
   */
  label: string

  /**
   * Sort order priority (lower = appears first)
   * Overrides groupOrder setting for this group
   * @default 50
   */
  order?: number

  /**
   * Whether group starts expanded
   * @default true
   */
  defaultOpen?: boolean
}

/**
 * Badge configuration with count and optional color
 */
export interface BadgeConfig {
  count: number
  color?: BadgeColor // default: 'red'
}

/**
 * Badge value - either a simple number (defaults to red) or full config
 */
export type BadgeValue = number | BadgeConfig

/**
 * Resolved badge with required color
 */
export interface ResolvedBadge {
  count: number
  color: BadgeColor
}

// ============================================================================
// Pinned Item Types
// ============================================================================

/**
 * Pinned navigation item
 */
export interface PinnedItem {
  slug: string
  type: 'collection' | 'global' | 'custom'
  order: number
}

// ============================================================================
// Navigation Types
// ============================================================================

/**
 * Navigation entity (collection, global, or custom link)
 */
export interface NavEntity {
  slug: string
  type: 'collection' | 'global' | 'custom'
  label: string
  /** Full href for custom links */
  href?: string
  /** Whether link opens in new tab */
  external?: boolean
  /** Icon key or component */
  icon?: string | IconComponent
  /** Whether this can be pinned */
  pinnable?: boolean
  /** Order within group */
  order?: number
}

/**
 * Navigation group containing entities
 */
export interface NavGroup {
  label: string
  entities: NavEntity[]
}

// ============================================================================
// Plugin Options
// ============================================================================

/**
 * Icon component type - Lucide icon or custom component
 */
export type IconComponent = LucideIcon | React.ComponentType<{ size?: number; className?: string }>

/**
 * Main plugin configuration options
 */
export interface PayloadSidebarOptions {
  /**
   * Thứ tự sắp xếp groups
   * Key: label của group (hỗ trợ i18n)
   * Value: số thứ tự (nhỏ = ưu tiên cao)
   * @example { 'Content': 1, 'Users': 2, 'Settings': 3 }
   */
  groupOrder?: Record<string, number>

  /**
   * Custom icons cho collections/globals
   * Merge với default icons
   * @example { 'my-collection': MyIcon }
   */
  icons?: Record<string, IconComponent>

  /**
   * Custom navigation links
   * Add your own links to the sidebar
   * @example
   * ```ts
   * customLinks: [
   *   { label: 'Analytics', href: '/admin/analytics', group: 'Tools' },
   *   { label: 'Docs', href: 'https://docs.example.com', external: true },
   * ]
   * ```
   */
  customLinks?: CustomLink[]

  /**
   * Custom navigation groups
   * Define additional groups or configure existing ones
   * @example
   * ```ts
   * customGroups: [
   *   { label: 'Tools', order: 5 },
   *   { label: 'External', order: 99, defaultOpen: false },
   * ]
   * ```
   */
  customGroups?: CustomGroup[]

  /**
   * Bật/tắt tính năng pin items
   * @default true
   */
  enablePinning?: boolean

  /**
   * Cách lưu trữ pinned items
   * - 'preferences': Lưu trong Payload preferences (per-user, persist)
   * - 'localStorage': Lưu local (per-browser, không sync)
   * @default 'preferences'
   */
  pinnedStorage?: 'preferences' | 'localStorage'

  /**
   * Custom class prefix cho CSS
   * @default 'nav'
   */
  classPrefix?: string

  /**
   * Override CSS variables
   * @example { '--badge-red': '#ff0000' }
   */
  cssVariables?: Record<string, string>

  /**
   * Callback khi user pin/unpin item
   */
  onPinChange?: (item: PinnedItem, action: 'pin' | 'unpin') => void
}

/**
 * Resolved plugin options with all defaults applied
 */
export interface ResolvedPluginOptions {
  groupOrder: Record<string, number>
  icons: Record<string, IconComponent>
  customLinks: CustomLink[]
  customGroups: CustomGroup[]
  enablePinning: boolean
  pinnedStorage: 'preferences' | 'localStorage'
  classPrefix: string
  cssVariables: Record<string, string>
  onPinChange?: (item: PinnedItem, action: 'pin' | 'unpin') => void
}

// ============================================================================
// Context Types
// ============================================================================

/**
 * Badge context value - map of slug to badge value
 */
export type BadgeContextValue = Record<string, BadgeValue>

/**
 * Nav config context value passed to components
 */
export interface NavConfigContextValue {
  icons: Record<string, IconComponent>
  classPrefix: string
  enablePinning: boolean
  pinnedStorage: 'preferences' | 'localStorage'
  cssVariables: Record<string, string>
  customLinks: CustomLink[]
  onPinChange?: (item: PinnedItem, action: 'pin' | 'unpin') => void
}
