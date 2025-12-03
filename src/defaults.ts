import {
  FileText,
  Image,
  FolderOpen,
  Users,
  Settings,
  MessageSquare,
  Tag,
  Award,
  LayoutTemplate,
  Palette,
  Menu,
  Bot,
  Database,
  BookOpen,
  Contact,
  StickyNote,
  Wrench,
  File,
  BarChart3,
  LayoutDashboard,
  FileDown,
  Building2,
  MessageCircle,
  ImagePlus,
  MousePointerClick,
  Newspaper,
  Search,
  ArrowRightLeft,
  Send,
  Target,
  Briefcase,
  Ticket,
  Activity,
  Heart,
  ThumbsUp,
  Link,
  ExternalLink,
  Globe,
  Sparkles,
  Zap,
  Star,
  Folder,
  FileCode,
  Terminal,
  HelpCircle,
  Info,
  BookMarked,
} from 'lucide-react'
import type { IconComponent } from './types'

// ============================================================================
// Default Group Order
// ============================================================================

/**
 * Default group ordering priority
 * Lower number = higher priority (appears first)
 */
export const DEFAULT_GROUP_ORDER: Record<string, number> = {
  // Vietnamese
  'Nội dung': 1,
  'Người dùng': 2,
  'Bố cục': 3,
  'Cài đặt': 4,
  'Chat & AI': 5,
  CRM: 6,
  'Giao diện': 7,
  'Công cụ': 8,
  'Nâng cao': 99, // Always last

  // English
  Content: 1,
  Users: 2,
  Layout: 3,
  Settings: 4,
  Appearance: 7,
  Tools: 8,
  Advanced: 99, // Always last

  // Default Payload groups
  collections: 1,
  globals: 2,
}

// ============================================================================
// Default Icons
// ============================================================================

/**
 * Default icon mapping for common collections and globals
 */
export const DEFAULT_ICONS: Record<string, IconComponent> = {
  // ===== DASHBOARD =====
  dashboard: LayoutDashboard,

  // ===== COLLECTIONS =====

  // Content
  pages: FileText,
  posts: Newspaper,
  media: Image,
  files: File,
  categories: FolderOpen,
  tags: Tag,
  badges: Award,

  // Users
  users: Users,

  // Chat & Messages
  chats: MessageSquare,
  messages: Send,
  'knowledge-base': BookOpen,

  // Comments
  comments: MessageCircle,

  // CRM
  contacts: Contact,
  'contact-fields': Database,
  'contact-notes': StickyNote,
  leads: Target,
  deals: Briefcase,
  tickets: Ticket,
  activities: Activity,
  'customer-feedback': ThumbsUp,
  'customer-interests': Heart,

  // ===== GLOBALS =====

  // Layout
  header: Menu,
  footer: LayoutTemplate,

  // Analytics & Dashboard
  'analytics-settings': BarChart3,
  'chat-dashboard': LayoutDashboard,
  'crm-dashboard': LayoutDashboard,
  'comments-dashboard': LayoutDashboard,

  // Settings
  settings: Settings,
  'chat-config': MessageSquare,
  'ai-config': Bot,
  'posts-page-settings': Newspaper,

  // Appearance
  'theme-settings': Palette,

  // Tools
  'wordpress-import': FileDown,
  'company-info': Building2,
  'image-optimizer': ImagePlus,
  'floating-action-button': MousePointerClick,

  // Search & Navigation
  search: Search,
  redirects: ArrowRightLeft,

  // Form
  'form-submissions': Database,

  // Advanced / Fallback
  advanced: Wrench,

  // ===== CUSTOM LINKS =====
  // Default icons for custom links
  link: Link,
  'external-link': ExternalLink,
  external: ExternalLink,
  globe: Globe,
  sparkles: Sparkles,
  zap: Zap,
  star: Star,
  folder: Folder,
  'file-code': FileCode,
  terminal: Terminal,
  help: HelpCircle,
  info: Info,
  docs: BookMarked,
  documentation: BookMarked,
  api: Terminal,
  custom: Sparkles,
}

// ============================================================================
// Badge Color CSS Variables
// ============================================================================

/**
 * Default CSS variables for badge colors
 */
export const DEFAULT_BADGE_COLORS: Record<string, string> = {
  '--badge-red-bg': 'var(--theme-error-500, #ef4444)',
  '--badge-red-text': '#ffffff',

  '--badge-yellow-bg': 'var(--theme-warning-500, #eab308)',
  '--badge-yellow-text': '#000000',

  '--badge-blue-bg': 'var(--theme-elevation-500, #3b82f6)',
  '--badge-blue-text': '#ffffff',

  '--badge-green-bg': 'var(--theme-success-500, #22c55e)',
  '--badge-green-text': '#ffffff',

  '--badge-orange-bg': '#f97316',
  '--badge-orange-text': '#ffffff',

  '--badge-gray-bg': 'var(--theme-elevation-300, #6b7280)',
  '--badge-gray-text': '#ffffff',
}
