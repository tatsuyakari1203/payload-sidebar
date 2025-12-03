// This is the main entry point - for plugin configuration only
// For React components, import from 'payload-sidebar-plugin/components'
// For hooks, import from 'payload-sidebar-plugin/hooks'

// Plugin
export { payloadSidebar, payloadSidebar as default, getPluginOptions } from './plugin/index'
export type { PayloadSidebarPluginOptions } from './plugin/index'

// Types (no React dependencies)
export type {
  PayloadSidebarOptions,
  BadgeColor,
  BadgeConfig,
  BadgeValue,
  ResolvedBadge,
  PinnedItem,
  NavEntity,
  NavGroup,
  IconComponent,
  NavConfigContextValue,
  BadgeContextValue,
  CustomLink,
  CustomGroup,
} from './types'

// Defaults (no React dependencies)
export { DEFAULT_GROUP_ORDER, DEFAULT_ICONS, DEFAULT_BADGE_COLORS } from './defaults'

// Utils (no React dependencies)
export { sortGroups } from './utils/sortGroups'
