# payload-sidebar-plugin

A customizable navigation sidebar plugin for Payload CMS 3.x with sortable groups, pinning, custom icons, and multi-color badges.

[![npm version](https://img.shields.io/npm/v/payload-sidebar-plugin.svg)](https://www.npmjs.com/package/payload-sidebar-plugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 📁 **Sortable Navigation Groups** - Define custom order for your nav groups
- 📌 **Pin Items** - Pin frequently used items to the top (persisted per-user)
- 🎨 **Custom Icons** - Use Lucide icons or your own components
- 🔔 **Multi-color Badges** - Show notification counts with different colors
- 🌐 **i18n Support** - Works with English, Vietnamese, and other languages
- ⚡ **Zero Config** - Works out of the box, just add to plugins

## Requirements

- Payload CMS 3.x
- Next.js 14+ or 15+
- React 18+ or 19+

## Installation

```bash
# npm
npm install payload-sidebar-plugin

# pnpm
pnpm add payload-sidebar-plugin

# yarn
yarn add payload-sidebar-plugin
```

## Quick Start

Add the plugin to your `payload.config.ts`:

```typescript
import { buildConfig } from 'payload'
import { payloadSidebar } from 'payload-sidebar-plugin'

export default buildConfig({
  plugins: [
    payloadSidebar(), // Zero config - works out of the box!
  ],
  // ... rest of config
})
```

That's it! The plugin will automatically replace the default navigation with the enhanced sidebar.

## Configuration Options

```typescript
import { payloadSidebar } from 'payload-sidebar-plugin'

payloadSidebar({
  // Sort order for navigation groups (lower number = higher priority)
  groupOrder: {
    Content: 1,
    Users: 2,
    Settings: 3,
  },

  // Enable pin functionality (default: true)
  enablePinning: true,

  // Storage for pinned items: 'preferences' (server) or 'localStorage' (client)
  pinnedStorage: 'preferences',

  // CSS class prefix (default: 'nav')
  classPrefix: 'nav',

  // Custom CSS variables for badge colors
  cssVariables: {
    '--badge-color-red': '#ef4444',
    '--badge-color-blue': '#3b82f6',
  },
})
```

### Options Reference

| Option          | Type                              | Default         | Description                                                             |
| --------------- | --------------------------------- | --------------- | ----------------------------------------------------------------------- |
| `groupOrder`    | `Record<string, number>`          | `{}`            | Priority map for sorting nav groups. Lower numbers appear first.        |
| `enablePinning` | `boolean`                         | `true`          | Enable/disable the pin items feature.                                   |
| `pinnedStorage` | `'preferences' \| 'localStorage'` | `'preferences'` | Where to store pinned items. `preferences` persists on server per-user. |
| `classPrefix`   | `string`                          | `'nav'`         | CSS class prefix for styling.                                           |
| `cssVariables`  | `Record<string, string>`          | `{}`            | Override default CSS variables.                                         |

## Group Ordering

Control the order of navigation groups:

```typescript
payloadSidebar({
  groupOrder: {
    // English labels
    Content: 1,
    Media: 2,
    Users: 3,
    Settings: 10,

    // Vietnamese labels (for i18n)
    'Nội dung': 1,
    'Phương tiện': 2,
    'Người dùng': 3,
    'Cài đặt': 10,

    // Unlisted groups default to priority 50
  },
})
```

Groups are sorted by their priority number. Groups not listed in `groupOrder` default to priority 50.

## Pinning Items

When `enablePinning` is true (default), users can:

- Click the pin icon on any nav item to pin it
- Pinned items appear at the top in a "Pinned" section
- Drag to reorder pinned items
- Unpin items by clicking the X button

### Storage Options

**Server-side (recommended for multi-device users):**

```typescript
payloadSidebar({
  pinnedStorage: 'preferences', // Uses Payload's preference system
})
```

**Client-side (simpler, single device):**

```typescript
payloadSidebar({
  pinnedStorage: 'localStorage',
})
```

### API Routes for Server-side Storage

When using `pinnedStorage: 'preferences'`, the plugin expects these API routes:

```
GET  /api/nav/pinned   - Get user's pinned items
POST /api/nav/pin      - Pin an item
POST /api/nav/unpin    - Unpin an item
POST /api/nav/reorder  - Reorder pinned items
```

Example implementation:

```typescript
// src/app/api/nav/pinned/route.ts
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()

  const { user } = await payload.auth({ headers: headersList })
  if (!user) {
    return Response.json({ pinnedItems: [] })
  }

  const prefs = await payload.find({
    collection: 'payload-preferences',
    where: {
      key: { equals: 'nav-pinned' },
      'user.value': { equals: user.id },
    },
    limit: 1,
  })

  const pinnedItems = (prefs.docs[0]?.value as { items?: string[] })?.items || []
  return Response.json({ pinnedItems })
}
```

```typescript
// src/app/api/nav/pin/route.ts
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()

  const { user } = await payload.auth({ headers: headersList })
  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { slug } = await request.json()

  // Get current pinned items
  const prefs = await payload.find({
    collection: 'payload-preferences',
    where: {
      key: { equals: 'nav-pinned' },
      'user.value': { equals: user.id },
    },
    limit: 1,
  })

  const currentItems = (prefs.docs[0]?.value as { items?: string[] })?.items || []

  if (!currentItems.includes(slug)) {
    const newItems = [...currentItems, slug]

    if (prefs.docs[0]) {
      await payload.update({
        collection: 'payload-preferences',
        id: prefs.docs[0].id,
        data: { value: { items: newItems } },
      })
    } else {
      await payload.create({
        collection: 'payload-preferences',
        data: {
          key: 'nav-pinned',
          user: { relationTo: 'users', value: user.id },
          value: { items: newItems },
        },
      })
    }
  }

  return Response.json({ success: true })
}
```

## Adding Badges

Badges display notification counts, statistics, or status indicators on navigation items. They support multiple colors and are fully customizable.

### Basic Setup

1. **Create a Badge Provider** that wraps your admin panel:

```tsx
// src/components/NavBadgeProvider.tsx
'use client'

import React from 'react'
import { SidebarBadgeProvider } from 'payload-sidebar-plugin/components'

export function NavBadgeProvider({ children }: { children: React.ReactNode }) {
  const badges = {
    // Key must match collection/global slug exactly
    posts: { count: 5, color: 'blue' as const },
    comments: { count: 12, color: 'red' as const },
  }

  return <SidebarBadgeProvider badges={badges}>{children}</SidebarBadgeProvider>
}
```

2. **Register the provider** in your Payload config:

```typescript
// payload.config.ts
export default buildConfig({
  admin: {
    components: {
      providers: ['@/components/NavBadgeProvider'],
    },
  },
  // ...
})
```

3. **Generate import map**:

```bash
npx payload generate:importmap
```

---

### Use Cases

#### 1. Unread Notifications (Real-time)

Show unread chat messages or comments with Pusher/WebSocket:

```tsx
'use client'

import React, { useEffect, useState } from 'react'
import { SidebarBadgeProvider } from 'payload-sidebar-plugin/components'
import Pusher from 'pusher-js'

export function NavBadgeProvider({ children }: { children: React.ReactNode }) {
  const [unreadChats, setUnreadChats] = useState(0)
  const [unreadComments, setUnreadComments] = useState(0)

  useEffect(() => {
    // Connect to Pusher for real-time updates
    const pusher = new Pusher('your-key', { cluster: 'mt1' })
    const channel = pusher.subscribe('admin-notifications')

    channel.bind('new-chat', () => setUnreadChats(prev => prev + 1))
    channel.bind('new-comment', () => setUnreadComments(prev => prev + 1))

    return () => pusher.disconnect()
  }, [])

  const badges = {
    'chat-dashboard': unreadChats > 0 ? { count: unreadChats, color: 'red' as const } : undefined,
    'comments-dashboard':
      unreadComments > 0 ? { count: unreadComments, color: 'orange' as const } : undefined,
  }

  // Filter out undefined values
  const filteredBadges = Object.fromEntries(
    Object.entries(badges).filter(([, v]) => v !== undefined)
  ) as Record<string, { count: number; color: 'red' | 'orange' }>

  return <SidebarBadgeProvider badges={filteredBadges}>{children}</SidebarBadgeProvider>
}
```

#### 2. Collection Document Counts

Display total documents in each collection:

```tsx
'use client'

import React, { useEffect, useState } from 'react'
import { SidebarBadgeProvider } from 'payload-sidebar-plugin/components'

export function NavBadgeProvider({ children }: { children: React.ReactNode }) {
  const [counts, setCounts] = useState({
    posts: 0,
    pages: 0,
    media: 0,
    users: 0,
  })

  useEffect(() => {
    const fetchCounts = async () => {
      const [posts, pages, media, users] = await Promise.all([
        fetch('/api/posts?limit=0').then(r => r.json()),
        fetch('/api/pages?limit=0').then(r => r.json()),
        fetch('/api/media?limit=0').then(r => r.json()),
        fetch('/api/users?limit=0').then(r => r.json()),
      ])

      setCounts({
        posts: posts.totalDocs || 0,
        pages: pages.totalDocs || 0,
        media: media.totalDocs || 0,
        users: users.totalDocs || 0,
      })
    }

    fetchCounts()
    // Refresh every 30 seconds
    const interval = setInterval(fetchCounts, 30000)
    return () => clearInterval(interval)
  }, [])

  const badges = {
    posts: counts.posts > 0 ? { count: counts.posts, color: 'green' as const } : undefined,
    pages: counts.pages > 0 ? { count: counts.pages, color: 'blue' as const } : undefined,
    media: counts.media > 0 ? { count: counts.media, color: 'gray' as const } : undefined,
    users: counts.users > 0 ? { count: counts.users, color: 'blue' as const } : undefined,
  }

  const filteredBadges = Object.fromEntries(
    Object.entries(badges).filter(([, v]) => v !== undefined)
  ) as Record<string, { count: number; color: 'green' | 'blue' | 'gray' }>

  return <SidebarBadgeProvider badges={filteredBadges}>{children}</SidebarBadgeProvider>
}
```

#### 3. Pending Review / Draft Status

Highlight items needing attention:

```tsx
'use client'

import React, { useEffect, useState } from 'react'
import { SidebarBadgeProvider } from 'payload-sidebar-plugin/components'

export function NavBadgeProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState({
    drafts: 0,
    pendingComments: 0,
    pendingOrders: 0,
  })

  useEffect(() => {
    const fetchPending = async () => {
      const [drafts, comments, orders] = await Promise.all([
        fetch('/api/posts?where[_status][equals]=draft&limit=0').then(r => r.json()),
        fetch('/api/comments?where[status][equals]=pending&limit=0').then(r => r.json()),
        fetch('/api/orders?where[status][equals]=pending&limit=0').then(r => r.json()),
      ])

      setPending({
        drafts: drafts.totalDocs || 0,
        pendingComments: comments.totalDocs || 0,
        pendingOrders: orders.totalDocs || 0,
      })
    }

    fetchPending()
    const interval = setInterval(fetchPending, 60000) // Refresh every minute
    return () => clearInterval(interval)
  }, [])

  const badges = {
    posts: pending.drafts > 0 ? { count: pending.drafts, color: 'yellow' as const } : undefined,
    comments:
      pending.pendingComments > 0
        ? { count: pending.pendingComments, color: 'orange' as const }
        : undefined,
    orders:
      pending.pendingOrders > 0
        ? { count: pending.pendingOrders, color: 'red' as const }
        : undefined,
  }

  const filteredBadges = Object.fromEntries(
    Object.entries(badges).filter(([, v]) => v !== undefined)
  ) as Record<string, { count: number; color: 'yellow' | 'orange' | 'red' }>

  return <SidebarBadgeProvider badges={filteredBadges}>{children}</SidebarBadgeProvider>
}
```

#### 4. Combined: Notifications + Counts

Full example combining multiple data sources:

```tsx
'use client'

import React, { useEffect, useState } from 'react'
import { SidebarBadgeProvider } from 'payload-sidebar-plugin/components'
import { useNotifications } from '@/providers/NotificationProvider' // Your notification hook

type BadgeColor = 'red' | 'yellow' | 'blue' | 'green' | 'orange' | 'gray'

interface BadgeConfig {
  count: number
  color: BadgeColor
}

export function NavBadgeProvider({ children }: { children: React.ReactNode }) {
  // Real-time notifications from your provider
  const { unreadChats, unreadComments } = useNotifications()

  // Static counts
  const [counts, setCounts] = useState({
    posts: 0,
    pages: 0,
    media: 0,
    drafts: 0,
  })

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [posts, pages, media, drafts] = await Promise.all([
          fetch('/api/posts?limit=0').then(r => r.json()),
          fetch('/api/pages?limit=0').then(r => r.json()),
          fetch('/api/media?limit=0').then(r => r.json()),
          fetch('/api/posts?where[_status][equals]=draft&limit=0').then(r => r.json()),
        ])

        setCounts({
          posts: posts.totalDocs || 0,
          pages: pages.totalDocs || 0,
          media: media.totalDocs || 0,
          drafts: drafts.totalDocs || 0,
        })
      } catch (error) {
        console.error('Failed to fetch badge counts:', error)
      }
    }

    fetchCounts()
    const interval = setInterval(fetchCounts, 30000)
    return () => clearInterval(interval)
  }, [])

  // Build badges object
  const badges: Record<string, BadgeConfig | undefined> = {
    // Urgent notifications (red/orange)
    'chat-dashboard': unreadChats > 0 ? { count: unreadChats, color: 'red' } : undefined,
    'comments-dashboard':
      unreadComments > 0 ? { count: unreadComments, color: 'orange' } : undefined,

    // Pending items (yellow)
    drafts: counts.drafts > 0 ? { count: counts.drafts, color: 'yellow' } : undefined,

    // Informational counts (blue/green/gray)
    posts: counts.posts > 0 ? { count: counts.posts, color: 'green' } : undefined,
    pages: counts.pages > 0 ? { count: counts.pages, color: 'blue' } : undefined,
    media: counts.media > 0 ? { count: counts.media, color: 'gray' } : undefined,
  }

  // Remove undefined entries
  const filteredBadges = Object.fromEntries(
    Object.entries(badges).filter(([, v]) => v !== undefined)
  ) as Record<string, BadgeConfig>

  return <SidebarBadgeProvider badges={filteredBadges}>{children}</SidebarBadgeProvider>
}
```

---

### Badge API Reference

#### SidebarBadgeProvider Props

```typescript
interface SidebarBadgeProviderProps {
  children: React.ReactNode
  badges: Record<string, BadgeConfig>
}

interface BadgeConfig {
  count: number // Number to display (0 = hidden)
  color: 'red' | 'yellow' | 'blue' | 'green' | 'orange' | 'gray'
}
```

#### useBadge Hook

Get badge for a specific slug in your custom components:

```tsx
import { useBadge } from 'payload-sidebar-plugin/hooks'

function MyComponent() {
  const badge = useBadge('posts') // Returns { count: 5, color: 'blue' } or null

  if (badge) {
    return <span className={`badge badge--${badge.color}`}>{badge.count}</span>
  }
  return null
}
```

---

### Available Badge Colors

| Color    | Use Case                         | Example                       |
| -------- | -------------------------------- | ----------------------------- |
| `red`    | Urgent, unread, errors           | Unread messages, failed jobs  |
| `orange` | Warnings, needs attention        | Pending comments, expiring    |
| `yellow` | Drafts, pending review           | Draft posts, awaiting publish |
| `blue`   | Informational, neutral counts    | Total pages, active users     |
| `green`  | Success, published, approved     | Published posts, completed    |
| `gray`   | Archived, inactive, low priority | Media count, old items        |

---

### Customizing Badge Colors

Override default colors via plugin options:

```typescript
payloadSidebar({
  cssVariables: {
    // Background colors
    '--badge-red-bg': '#fef2f2',
    '--badge-red-text': '#dc2626',
    '--badge-yellow-bg': '#fefce8',
    '--badge-yellow-text': '#ca8a04',
    '--badge-blue-bg': '#eff6ff',
    '--badge-blue-text': '#2563eb',
    '--badge-green-bg': '#f0fdf4',
    '--badge-green-text': '#16a34a',
    '--badge-orange-bg': '#fff7ed',
    '--badge-orange-text': '#ea580c',
    '--badge-gray-bg': '#f9fafb',
    '--badge-gray-text': '#6b7280',
  },
})
```

Or via CSS:

```css
/* In your admin.css or global styles */
:root {
  --badge-red-bg: #fee2e2;
  --badge-red-text: #b91c1c;
  /* ... other colors */
}
```

````

## Styling

The plugin uses BEM-style CSS classes with a configurable prefix (default: `nav`).

### Main Classes

```css
.nav {
  /* Main sidebar container */
}
.nav--nav-open {
  /* When sidebar is open */
}
.nav--nav-animate {
  /* During animations */
}
.nav__scroll {
  /* Scrollable area */
}
.nav__wrap {
  /* Content wrapper */
}
.nav__controls {
  /* Bottom controls (logout, etc) */
}
````

### Pinned Section

```css
.nav-pinned {
  /* Pinned items section */
}
.nav-pinned__header {
  /* "Pinned" heading */
}
.nav-pinned__list {
  /* List of pinned items */
}
.nav-pinned__item {
  /* Individual pinned item */
}
.nav-pinned__unpin {
  /* Unpin button */
}
```

### Navigation Groups

```css
.nav-group {
  /* Navigation group container */
}
.nav-group__label {
  /* Group label */
}
.nav-group__list {
  /* List of nav items */
}
```

### Navigation Links

```css
.nav-link {
  /* Individual nav link */
}
.nav-link--active {
  /* Currently active page */
}
.nav-link__icon {
  /* Icon container */
}
.nav-link__label {
  /* Text label */
}
.nav-link__badge {
  /* Badge container */
}
.nav-link__pin {
  /* Pin button */
}
```

### Custom Styling Example

```css
/* Make pinned section stand out */
.nav-pinned {
  background: var(--theme-elevation-50);
  border-radius: 8px;
  margin: 8px;
  padding: 8px;
}

/* Custom active state */
.nav-link--active {
  background: var(--theme-elevation-100);
  border-left: 3px solid var(--theme-success-500);
}

/* Larger badges */
.nav-link__badge {
  min-width: 24px;
  height: 24px;
  font-size: 12px;
}
```

## Exports

The plugin provides multiple entry points:

```typescript
// Main plugin
import { payloadSidebar } from 'payload-sidebar-plugin'

// Client components (with 'use client')
import {
  SidebarBadgeProvider,
  CustomNavClient,
  NavContent,
  NavLink,
  PinnedSection,
} from 'payload-sidebar-plugin/components'

// Hooks (with 'use client')
import { useBadge, usePinnedNav } from 'payload-sidebar-plugin/hooks'

// Server components (RSC)
import { CustomNav } from 'payload-sidebar-plugin/rsc'
```

## TypeScript

The plugin is fully typed. Import types as needed:

```typescript
import type {
  PayloadSidebarPluginOptions,
  NavEntity,
  PinnedItem,
  BadgeConfig,
} from 'payload-sidebar-plugin'
```

## Troubleshooting

### Plugin not showing custom Nav

Make sure to regenerate the import map after adding the plugin:

```bash
npx payload generate:importmap
```

### Badges not appearing

1. Ensure you've wrapped your admin layout with `SidebarBadgeProvider`
2. Check that badge keys match your collection/global slugs
3. Verify the count is greater than 0

### Pinned items not persisting

If using `pinnedStorage: 'preferences'`:

1. Verify API routes are correctly implemented
2. Check user is authenticated
3. Ensure `payload-preferences` collection exists

If using `pinnedStorage: 'localStorage'`:

1. Check browser supports localStorage
2. Verify no privacy extensions blocking storage

### Style conflicts

If styles conflict with your theme:

1. Use a custom `classPrefix` to namespace classes
2. Override specific CSS variables in your admin CSS

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Watch mode
pnpm dev

# Type check
pnpm typecheck
```

## License

MIT © [Kari](https://github.com/tatsuyakari1203)

## Changelog

### 1.1.4

- Fixed badge blur/fuzzy rendering with crisp CSS properties
- Removed pulse animation that caused visual artifacts
- Added GPU acceleration for sharp text rendering

### 1.1.3

- Fixed React Hooks order error in PinnedSection
- Extracted PinnedItemLink component for proper hook usage

### 1.1.2

- Fixed SSR "document is not defined" error
- Added StyleInjector component with useEffect for client-side style injection

### 1.1.1

- Fixed SCSS styles not loading (changed to style injection)

### 1.1.0

- Refactored for proper server/client component bundling
- Split RSC and client components into separate entry points
- Plugin auto-sets Nav component path (no wrapper file needed)
- No more need for `transpilePackages` in consuming projects
- Comprehensive documentation with examples

### 1.0.0

- Initial release
- Sortable navigation groups
- Pinnable items with preferences/localStorage storage
- Multi-color badge support
- Full TypeScript support
- Compatible with Payload CMS 3.x, Next.js 14/15, React 18/19
