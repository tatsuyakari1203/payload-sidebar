import type { Config } from 'payload'
import type { CustomLink, CustomGroup, IconComponentSerializable } from '../types'

/**
 * Serializable custom link (icon as string key)
 */
export interface SerializableCustomLink {
  label: string
  href: string
  group?: string
  icon?: string // Icon key instead of component
  external?: boolean
  pinnable?: boolean
  order?: number
}

/**
 * Plugin options for Payload Sidebar
 */
export interface PayloadSidebarPluginOptions {
  /**
   * Custom group order - map of group name to priority (lower = higher)
   */
  groupOrder?: Record<string, number>
  /**
   * Custom icons for collections/globals, using lucide-react/dynamic icon names.
   */
  icons?: Record<string, IconComponentSerializable>

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

/**
 * Serializable version of plugin options (stored in config.custom)
 */
export interface SerializablePluginOptions {
  groupOrder?: Record<string, number>
  customLinks?: SerializableCustomLink[]
  customGroups?: CustomGroup[]
  enablePinning?: boolean
  pinnedStorage?: 'preferences' | 'localStorage'
  classPrefix?: string
  cssVariables?: Record<string, string>
  icons?: Record<string, IconComponentSerializable>
}

/**
 * Config key for storing plugin options
 */
export const PLUGIN_OPTIONS_KEY = 'payloadSidebarOptions'

/**
 * Get the current plugin options from Payload config
 */
export const getPluginOptions = (config: Config): SerializablePluginOptions => {
  return (config.custom?.[PLUGIN_OPTIONS_KEY] as SerializablePluginOptions) || {}
}

/**
 * Serialize CustomLink to SerializableCustomLink
 * Converts icon components to string keys
 */
function serializeCustomLink(link: CustomLink): SerializableCustomLink {
  let iconKey: string | undefined

  if (link.icon) {
    // If icon is a component, try to get its displayName or name
    if (typeof link.icon === 'function') {
      iconKey = (link.icon as { displayName?: string }).displayName || link.icon.name || 'custom'
    } else {
      iconKey = String(link.icon)
    }
  }

  return {
    label: link.label,
    href: link.href,
    group: link.group,
    icon: iconKey,
    external: link.external,
    pinnable: link.pinnable,
    order: link.order,
  }
}

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
  return (incomingConfig: Config): Config => {
    const config = { ...incomingConfig }

    // Ensure admin config exists
    config.admin = config.admin || {}
    config.admin.components = config.admin.components || {}

    // Set custom Nav component using the bundled RSC export
    config.admin.components.Nav = 'payload-sidebar-plugin/rsc#CustomNav'

    // Serialize options and store in config.custom
    // This allows RSC to access options via payload.config
    const serializableOptions: SerializablePluginOptions = {
      groupOrder: options.groupOrder,
      customLinks: options.customLinks?.map(serializeCustomLink),
      customGroups: options.customGroups,
      enablePinning: options.enablePinning,
      pinnedStorage: options.pinnedStorage,
      classPrefix: options.classPrefix,
      cssVariables: options.cssVariables,
      //Icons are serializable now, using Dynamic icons from lucide
      icons: options.icons,
    }

    config.custom = config.custom || {}
    config.custom[PLUGIN_OPTIONS_KEY] = serializableOptions

    return config
  }
}

export default payloadSidebar
