import type { Config } from 'payload'
import type { CustomLink, CustomGroup, IconComponent } from '../types'

/**
 * Plugin options for Payload Sidebar
 */
export interface PayloadSidebarPluginOptions {
  /**
   * Custom group order - map of group name to priority (lower = higher)
   */
  groupOrder?: Record<string, number>
  /**
   * Custom icons for collections/globals
   */
  icons?: Record<string, IconComponent>

  /**
   * Custom navigation links
   * Add your own links to the sidebar navigation
   * @example
   * ```ts
   * customLinks: [
   *   { label: 'Analytics', href: '/admin/analytics', group: 'Tools', icon: 'chart' },
   *   { label: 'API Docs', href: 'https://api.example.com/docs', external: true },
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
   * Enable pinning functionality
   * @default true
   */
  enablePinning?: boolean
  /**
   * Storage for pinned items: 'preferences' (server) or 'localStorage' (client)
   * @default 'preferences'
   */
  pinnedStorage?: 'preferences' | 'localStorage'
  /**
   * CSS class prefix
   * @default 'nav'
   */
  classPrefix?: string
  /**
   * Custom CSS variables for badge colors
   */
  cssVariables?: Record<string, string>
}

// Global options storage for server component access
let globalPluginOptions: PayloadSidebarPluginOptions = {}

/**
 * Get the current plugin options (for use in server components)
 */
export const getPluginOptions = (): PayloadSidebarPluginOptions => globalPluginOptions

/**
 * Payload Sidebar Plugin
 *
 * A customizable navigation sidebar for Payload CMS 3.x with:
 * - Sortable navigation groups
 * - Custom icons for collections/globals
 * - Pin items to top
 * - Multi-color badge support
 *
 * @example
 * ```ts
 * import { payloadSidebar } from 'payload-sidebar-plugin'
 *
 * export default buildConfig({
 *   plugins: [
 *     payloadSidebar({
 *       groupOrder: {
 *         'Content': 1,
 *         'Users': 2,
 *         'Settings': 3,
 *       },
 *       enablePinning: true,
 *     }),
 *   ],
 * })
 * ```
 */
export const payloadSidebar = (options: PayloadSidebarPluginOptions = {}) => {
  // Store options globally for server component access
  globalPluginOptions = options

  return (incomingConfig: Config): Config => {
    const config = { ...incomingConfig }

    // Ensure admin config exists
    config.admin = config.admin || {}
    config.admin.components = config.admin.components || {}

    // Set custom Nav component using the bundled RSC export
    // This follows Payload's pattern: 'package/rsc#ExportName'
    config.admin.components.Nav = 'payload-sidebar-plugin/rsc#CustomNav'

    return config
  }
}

export default payloadSidebar
