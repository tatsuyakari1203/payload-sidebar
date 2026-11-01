import { Config } from 'payload';
import { LucideIcon } from 'lucide-react';

/**
 * Custom navigation link configuration
 */
interface CustomLink {
    /**
     * Display label for the link
     */
    label: string;
    /**
     * URL path or full URL for the link
     * - Relative paths: '/admin/custom-view'
     * - Absolute paths: '/api/docs'
     * - External URLs: 'https://docs.example.com'
     */
    href: string;
    /**
     * Group label to place this link in
     * If group doesn't exist, it will be created
     * @default 'Custom'
     */
    group?: string;
    /**
     * Icon key (from defaults) or custom icon component
     * @default 'link'
     */
    icon?: string | LucideIcon | React.ComponentType<{
        size?: number;
        className?: string;
    }>;
    /**
     * Whether this is an external link (opens in new tab)
     * Auto-detected if href starts with http:// or https://
     * @default false
     */
    external?: boolean;
    /**
     * Position within the group
     * Lower number = higher position
     * @default 50
     */
    order?: number;
    /**
     * Whether this link can be pinned
     * @default true
     */
    pinnable?: boolean;
}
/**
 * Custom navigation group configuration
 */
interface CustomGroup {
    /**
     * Group label (used for display and as identifier)
     */
    label: string;
    /**
     * Alternative labels for i18n support
     * Links with these group labels will be merged into this group
     * @example { label: 'Resources', aliases: ['Tài nguyên', 'Ressources'] }
     */
    aliases?: string[];
    /**
     * Sort order priority (lower = appears first)
     * Overrides groupOrder setting for this group
     * @default 50
     */
    order?: number;
    /**
     * Whether group starts expanded
     * @default true
     */
    defaultOpen?: boolean;
}

/**
 * Serializable custom link (icon as string key)
 */
interface SerializableCustomLink {
    label: string;
    href: string;
    group?: string;
    icon?: string;
    external?: boolean;
    pinnable?: boolean;
    order?: number;
}
/**
 * Plugin options for Payload Sidebar
 */
interface PayloadSidebarPluginOptions {
    /**
     * Custom group order - map of group name to priority (lower = higher)
     */
    groupOrder?: Record<string, number>;
    /**
     * Custom icons for collections/globals by slug
     * Use Lucide icon names (kebab-case): 'shield-check', 'file-text', etc.
     * Full list: https://lucide.dev/icons
     *
     * @example
     * ```ts
     * icons: {
     *   users: 'users',
     *   posts: 'file-text',
     *   media: 'image',
     *   'my-collection': 'shield-check',
     * }
     * ```
     */
    icons?: Record<string, string>;
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
    customLinks?: CustomLink[];
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
    customGroups?: CustomGroup[];
    /**
     * Enable pinning functionality
     * @default true
     */
    enablePinning?: boolean;
    /**
     * Storage for pinned items: 'preferences' (server) or 'localStorage' (client)
     * @default 'preferences'
     */
    pinnedStorage?: 'preferences' | 'localStorage';
    /**
     * CSS class prefix
     * @default 'nav'
     */
    classPrefix?: string;
    /**
     * Custom CSS variables for badge colors
     */
    cssVariables?: Record<string, string>;
}
/**
 * Serializable version of plugin options (stored in config.custom)
 */
interface SerializablePluginOptions {
    groupOrder?: Record<string, number>;
    icons?: Record<string, string>;
    customLinks?: SerializableCustomLink[];
    customGroups?: CustomGroup[];
    enablePinning?: boolean;
    pinnedStorage?: 'preferences' | 'localStorage';
    classPrefix?: string;
    cssVariables?: Record<string, string>;
}
/**
 * Config key for storing plugin options
 */
declare const PLUGIN_OPTIONS_KEY = "payloadSidebarOptions";
/**
 * Get the current plugin options from Payload config
 */
declare const getPluginOptions: (config: Config) => SerializablePluginOptions;
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
declare const payloadSidebar: (options?: PayloadSidebarPluginOptions) => (incomingConfig: Config) => Config;

export { PLUGIN_OPTIONS_KEY, type PayloadSidebarPluginOptions, type SerializableCustomLink, type SerializablePluginOptions, payloadSidebar as default, getPluginOptions, payloadSidebar };
