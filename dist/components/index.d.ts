import React$1 from 'react';
import { LucideIcon, LucideProps } from 'lucide-react';

/**
 * Supported badge colors
 */
type BadgeColor = 'red' | 'yellow' | 'blue' | 'green' | 'orange' | 'gray';
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
 * Badge configuration with count and optional color
 */
interface BadgeConfig {
    count: number;
    color?: BadgeColor;
}
/**
 * Badge value - either a simple number (defaults to red) or full config
 */
type BadgeValue = number | BadgeConfig;
/**
 * Pinned navigation item
 */
interface PinnedItem {
    slug: string;
    type: 'collection' | 'global' | 'custom';
    order: number;
}
/**
 * Navigation entity (collection, global, or custom link)
 */
interface NavEntity {
    slug: string;
    type: 'collection' | 'global' | 'custom';
    label: string;
    /** Full href for custom links */
    href?: string;
    /** Whether link opens in new tab */
    external?: boolean;
    /** Icon name (Lucide kebab-case) */
    icon?: string;
    /** Whether this can be pinned */
    pinnable?: boolean;
    /** Order within group */
    order?: number;
}
/**
 * Badge context value - map of slug to badge value
 */
type BadgeContextValue = Record<string, BadgeValue>;
/**
 * Nav config context value passed to components
 */
interface NavConfigContextValue {
    /** Icon name mapping: slug -> lucide icon name (kebab-case) */
    icons: Record<string, string>;
    classPrefix: string;
    enablePinning: boolean;
    pinnedStorage: 'preferences' | 'localStorage';
    cssVariables: Record<string, string>;
    customLinks: CustomLink[];
    onPinChange?: (item: PinnedItem, action: 'pin' | 'unpin') => void;
}

interface NavGroupData$1 {
    label: string;
    entities: NavEntity[];
}
interface SerializableNavConfig {
    classPrefix: string;
    enablePinning: boolean;
    pinnedStorage: 'preferences' | 'localStorage';
    cssVariables: Record<string, string>;
    customLinks: CustomLink[];
    icons?: Record<string, string>;
}
interface NavClientWrapperProps {
    classPrefix?: string;
    groups: NavGroupData$1[];
    adminRoute: string;
    navPreferences: {
        groups?: Record<string, {
            open?: boolean;
        }>;
    } | null;
    navConfig: SerializableNavConfig;
    beforeNav?: React$1.ReactElement;
    beforeNavLinks?: React$1.ReactElement;
    afterNavLinks?: React$1.ReactElement;
    afterNav?: React$1.ReactElement;
    logoutComponent?: React$1.ReactElement;
}
/**
 * Client wrapper for Custom Nav - handles nav open/close state and context setup
 */
declare const CustomNavClient: React$1.FC<NavClientWrapperProps>;

interface NavGroupData {
    label: string;
    entities: NavEntity[];
}
interface NavContentProps {
    groups: NavGroupData[];
    adminRoute: string;
    navPreferences: {
        groups?: Record<string, {
            open?: boolean;
        }>;
    } | null;
}
declare const NavContent: React$1.FC<NavContentProps>;

interface NavLinkProps {
    href: string;
    id: string;
    slug?: string;
    type?: 'collection' | 'global' | 'custom';
    children: React$1.ReactNode;
    isPinned?: boolean;
    onTogglePin?: () => void;
    external?: boolean;
    customIcon?: string;
}
declare const NavLink: React$1.FC<NavLinkProps>;

interface PinnedNavItem extends PinnedItem {
    label: string;
    href: string;
    external?: boolean;
    icon?: string;
}
interface PinnedSectionProps {
    items: PinnedNavItem[];
    onUnpin: (slug: string, type: string) => void;
}
declare const PinnedSection: React$1.FC<PinnedSectionProps>;

type IconComponent = React$1.ComponentType<LucideProps>;
/**
 * Pre-defined icon map with common icons for admin interfaces.
 * Keys are kebab-case names, values are Lucide icon components.
 */
declare const DEFAULT_ICON_MAP: Record<string, IconComponent>;
interface DynamicIconProps extends LucideProps {
    name: string;
    /** Custom icon map to extend or override default icons */
    customIcons?: Record<string, IconComponent>;
    fallback?: React$1.ReactNode;
}
/**
 * DynamicIcon - Renders icons by name from a pre-defined icon map.
 *
 * Uses a curated set of ~100 commonly used icons for admin interfaces.
 * Supports custom icons via the `customIcons` prop or SidebarIconProvider context.
 *
 * @example
 * // Using default icons
 * <DynamicIcon name="file" size={18} />
 * <DynamicIcon name="users-round" className="icon" />
 *
 * // With custom icons via prop
 * <DynamicIcon
 *   name="my-icon"
 *   customIcons={{ 'my-icon': MyIconComponent }}
 * />
 *
 * // With custom icons via SidebarIconProvider (recommended)
 * // See SidebarIconProvider in NavContext.tsx
 */
declare const DynamicIcon: React$1.NamedExoticComponent<DynamicIconProps>;
type IconName = keyof typeof DEFAULT_ICON_MAP | string;

declare const NavConfigContext: React$1.Context<NavConfigContextValue | null>;
/**
 * Hook to access sidebar plugin configuration
 */
declare const useNavConfig: () => NavConfigContextValue;
/**
 * Provider for sidebar configuration
 */
declare const NavConfigProvider: React$1.FC<{
    children: React$1.ReactNode;
    config: NavConfigContextValue;
}>;
declare const CustomIconContext: React$1.Context<Record<string, IconComponent>>;
/**
 * Hook to access custom icons registered by the app
 */
declare const useCustomIcons: () => Record<string, IconComponent>;
/**
 * Provider for custom icons beyond the default ~100 icons.
 * Use this when you need Lucide icons that aren't in the pre-defined set.
 *
 * @example
 * ```tsx
 * import { Newspaper, Trophy, Gamepad2 } from 'lucide-react'
 * import { SidebarIconProvider } from 'payload-sidebar-plugin/components'
 *
 * function MyIconProvider({ children }) {
 *   const customIcons = {
 *     'newspaper': Newspaper,
 *     'trophy': Trophy,
 *     'gamepad-2': Gamepad2,
 *   }
 *   return (
 *     <SidebarIconProvider icons={customIcons}>
 *       {children}
 *     </SidebarIconProvider>
 *   )
 * }
 * ```
 */
declare const SidebarIconProvider: React$1.FC<{
    children: React$1.ReactNode;
    icons: Record<string, IconComponent>;
}>;
declare const BadgeContext: React$1.Context<BadgeContextValue>;
/**
 * Hook to access all badge values
 */
declare const useBadgeContext: () => BadgeContextValue;
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
declare const SidebarBadgeProvider: React$1.FC<{
    children: React$1.ReactNode;
    badges: BadgeContextValue;
}>;

export { BadgeContext, CustomIconContext, CustomNavClient, DEFAULT_ICON_MAP, DynamicIcon, type IconComponent, type IconName, NavConfigContext, NavConfigProvider, NavContent, NavLink, PinnedSection, SidebarBadgeProvider, SidebarIconProvider, useBadgeContext, useCustomIcons, useNavConfig };
