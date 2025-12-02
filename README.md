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

Badges show notification counts on nav items. Use the `SidebarBadgeProvider`:

```tsx
// src/providers/BadgeProvider.tsx
'use client'

import { SidebarBadgeProvider } from 'payload-sidebar-plugin/components'

export function BadgeProvider({ children }: { children: React.ReactNode }) {
  // Fetch your notification counts however you like
  const unreadMessages = 5
  const pendingReviews = 3

  return (
    <SidebarBadgeProvider
      badges={{
        messages: { count: unreadMessages, color: 'red' },
        reviews: { count: pendingReviews, color: 'yellow' },
        posts: { count: 12, color: 'blue' },
      }}
    >
      {children}
    </SidebarBadgeProvider>
  )
}
```

Wrap your admin layout with the provider:

```tsx
// src/app/(payload)/admin/layout.tsx
import { BadgeProvider } from '@/providers/BadgeProvider'

export default function AdminLayout({ children }) {
  return <BadgeProvider>{children}</BadgeProvider>
}
```

### Available Badge Colors

| Color    | CSS Variable           | Use Case                  |
| -------- | ---------------------- | ------------------------- |
| `red`    | `--badge-color-red`    | Urgent, unread, errors    |
| `yellow` | `--badge-color-yellow` | Warnings, drafts, pending |
| `blue`   | `--badge-color-blue`   | Info, notifications       |
| `green`  | `--badge-color-green`  | Success, approved         |
| `orange` | `--badge-color-orange` | In-progress               |
| `gray`   | `--badge-color-gray`   | Neutral, archived         |

### Custom Badge Colors

Override default colors via CSS variables:

```typescript
payloadSidebar({
  cssVariables: {
    '--badge-color-red': '#dc2626',
    '--badge-color-blue': '#2563eb',
    '--badge-color-green': '#16a34a',
    '--badge-color-yellow': '#ca8a04',
    '--badge-color-orange': '#ea580c',
    '--badge-color-gray': '#6b7280',
  },
})
```

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
```

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
