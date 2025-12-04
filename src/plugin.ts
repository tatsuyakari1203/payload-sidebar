import type { Config } from 'payload'
import type { PayloadSidebarOptions } from './types'

// Global options storage for server component access
let globalPluginOptions: PayloadSidebarOptions = {}

/**
 * Get the current plugin options (for use in server components)
 */
export const getPluginOptions = (): PayloadSidebarOptions => globalPluginOptions

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
/**
 * @deprecated This file is not using anymore, actual plugin export in src/plugin/index.ts
 */
export const payloadSidebar = (options: PayloadSidebarOptions = {}) => {
  // Store options globally for server component access
  globalPluginOptions = options

  return (incomingConfig: Config): Config => {
    const config = { ...incomingConfig }

    // Ensure admin config exists
    config.admin = config.admin || {}
    config.admin.components = config.admin.components || {}

    // Set custom Nav component - use relative path from src/
    // Users need to create a re-export file at @/components/SidebarNav
    // that exports CustomNav from 'payload-sidebar-plugin/components'
    config.admin.components.Nav = '@/components/SidebarNav'

    return config
  }
}

export default payloadSidebar
