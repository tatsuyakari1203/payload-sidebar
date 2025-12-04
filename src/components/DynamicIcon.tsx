'use client'

import React, { memo } from 'react'
import type { LucideProps } from 'lucide-react'
import {
  // Common content icons
  File,
  FileText,
  FilePen,
  Files,
  Folder,
  FolderTree,
  FolderOpen,
  // User & people
  User,
  Users,
  UsersRound,
  UserRound,
  UserCheck,
  UserPlus,
  Contact,
  // Media
  Image,
  Images,
  Video,
  Music,
  Camera,
  // Navigation & layout
  Layout,
  LayoutDashboard,
  PanelTop,
  PanelBottom,
  PanelLeft,
  PanelRight,
  Menu,
  // Communication
  Mail,
  MailCheck,
  MessageSquare,
  MessageCircle,
  Send,
  Inbox,
  // E-commerce
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Receipt,
  Package,
  // Settings & system
  Settings,
  Cog,
  Wrench,
  Shield,
  ShieldCheck,
  Lock,
  Key,
  // Actions
  Plus,
  Minus,
  Edit,
  Trash,
  Trash2,
  Save,
  Download,
  Upload,
  // Arrows & navigation
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  CornerUpRight,
  ExternalLink,
  Link,
  // Status & info
  Check,
  X,
  AlertCircle,
  Info,
  HelpCircle,
  // Charts & data
  BarChart,
  BarChart2,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  // Calendar & time
  Calendar,
  Clock,
  Timer,
  // Organization
  Building,
  Building2,
  Home,
  Map,
  MapPin,
  Globe,
  // Social
  Heart,
  Star,
  ThumbsUp,
  Share,
  Share2,
  // Development
  Code,
  FileCode,
  Terminal,
  Database,
  Server,
  Cpu,
  // Forms
  ClipboardList,
  ClipboardCheck,
  FormInput,
  ListChecks,
  // Search
  Search,
  Filter,
  SlidersHorizontal,
  // Documents
  Book,
  BookOpen,
  Bookmark,
  FileArchive,
  // Misc
  Tag,
  Tags,
  Hash,
  Zap,
  Rocket,
  Palette,
  Handshake,
  Award,
  Crown,
  Gift,
  Sparkles,
  Lightbulb,
  Github,
  // Default
  Circle,
} from 'lucide-react'

// Icon component type
export type IconComponent = React.ComponentType<LucideProps>

/**
 * Pre-defined icon map with common icons for admin interfaces.
 * Keys are kebab-case names, values are Lucide icon components.
 */
export const DEFAULT_ICON_MAP: Record<string, IconComponent> = {
  // Content
  'file': File,
  'file-text': FileText,
  'file-pen': FilePen,
  'files': Files,
  'folder': Folder,
  'folder-tree': FolderTree,
  'folder-open': FolderOpen,
  // Users
  'user': User,
  'users': Users,
  'users-round': UsersRound,
  'user-round': UserRound,
  'user-check': UserCheck,
  'user-plus': UserPlus,
  'contact': Contact,
  // Media
  'image': Image,
  'images': Images,
  'video': Video,
  'music': Music,
  'camera': Camera,
  // Layout
  'layout': Layout,
  'layout-dashboard': LayoutDashboard,
  'panel-top': PanelTop,
  'panel-bottom': PanelBottom,
  'panel-left': PanelLeft,
  'panel-right': PanelRight,
  'menu': Menu,
  // Communication
  'mail': Mail,
  'mail-check': MailCheck,
  'message-square': MessageSquare,
  'message-circle': MessageCircle,
  'send': Send,
  'inbox': Inbox,
  // E-commerce
  'shopping-bag': ShoppingBag,
  'shopping-cart': ShoppingCart,
  'credit-card': CreditCard,
  'dollar-sign': DollarSign,
  'receipt': Receipt,
  'package': Package,
  // Settings
  'settings': Settings,
  'cog': Cog,
  'wrench': Wrench,
  'shield': Shield,
  'shield-check': ShieldCheck,
  'lock': Lock,
  'key': Key,
  // Actions
  'plus': Plus,
  'minus': Minus,
  'edit': Edit,
  'trash': Trash,
  'trash-2': Trash2,
  'save': Save,
  'download': Download,
  'upload': Upload,
  // Arrows
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'corner-up-right': CornerUpRight,
  'external-link': ExternalLink,
  'link': Link,
  // Status
  'check': Check,
  'x': X,
  'alert-circle': AlertCircle,
  'info': Info,
  'help-circle': HelpCircle,
  // Charts
  'bar-chart': BarChart,
  'bar-chart-2': BarChart2,
  'bar-chart-3': BarChart3,
  'chart': BarChart3, // alias
  'line-chart': LineChart,
  'pie-chart': PieChart,
  'activity': Activity,
  // Calendar
  'calendar': Calendar,
  'clock': Clock,
  'timer': Timer,
  // Organization
  'building': Building,
  'building-2': Building2,
  'home': Home,
  'map': Map,
  'map-pin': MapPin,
  'globe': Globe,
  // Social
  'heart': Heart,
  'star': Star,
  'thumbs-up': ThumbsUp,
  'share': Share,
  'share-2': Share2,
  // Development
  'code': Code,
  'file-code': FileCode,
  'terminal': Terminal,
  'database': Database,
  'server': Server,
  'cpu': Cpu,
  // Forms
  'clipboard-list': ClipboardList,
  'clipboard-check': ClipboardCheck,
  'form-input': FormInput,
  'list-checks': ListChecks,
  // Search
  'search': Search,
  'filter': Filter,
  'sliders-horizontal': SlidersHorizontal,
  // Documents
  'book': Book,
  'book-open': BookOpen,
  'bookmark': Bookmark,
  'file-archive': FileArchive,
  // Misc
  'tag': Tag,
  'tags': Tags,
  'hash': Hash,
  'zap': Zap,
  'rocket': Rocket,
  'palette': Palette,
  'handshake': Handshake,
  'award': Award,
  'crown': Crown,
  'gift': Gift,
  'sparkles': Sparkles,
  'lightbulb': Lightbulb,
  'github': Github,
  // Default
  'circle': Circle,
}

interface DynamicIconProps extends LucideProps {
  name: string
  /** Custom icon map to extend or override default icons */
  customIcons?: Record<string, IconComponent>
  fallback?: React.ReactNode
}

/**
 * Fallback icon when icon not found
 */
const FallbackIcon: React.FC<LucideProps> = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
  </svg>
)

/**
 * DynamicIcon - Renders icons by name from a pre-defined icon map.
 * 
 * Uses a curated set of ~100 commonly used icons for admin interfaces.
 * Supports custom icons via the `customIcons` prop or context.
 * 
 * @example
 * // Using default icons
 * <DynamicIcon name="file" size={18} />
 * <DynamicIcon name="users-round" className="icon" />
 * 
 * // With custom icons
 * <DynamicIcon 
 *   name="my-icon" 
 *   customIcons={{ 'my-icon': MyIconComponent }} 
 * />
 */
export const DynamicIcon = memo<DynamicIconProps>(function DynamicIcon({
  name,
  customIcons,
  fallback,
  ...props
}) {
  // Look up icon: custom icons first, then default map
  const IconComponent = customIcons?.[name] || DEFAULT_ICON_MAP[name]

  if (!IconComponent) {
    if (fallback) {
      return <>{fallback}</>
    }
    return <FallbackIcon {...props} />
  }

  return <IconComponent {...props} />
})

export type IconName = keyof typeof DEFAULT_ICON_MAP | string
