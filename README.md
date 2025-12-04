# payload-sidebar-plugin

A powerful, customizable navigation sidebar plugin for Payload CMS 3.x with sortable groups, pinning, custom links, and multi-color badges.

[![npm version](https://img.shields.io/npm/v/payload-sidebar-plugin.svg)](https://www.npmjs.com/package/payload-sidebar-plugin)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 📁 **Sortable Navigation Groups** - Define custom order for your nav groups
- 📌 **Pin Items** - Pin frequently used items to the top (persisted per-user)
- 🔗 **Custom Links & Groups** - Add your own navigation links and groups
- 🎨 **Custom Icons** - Use Lucide icons or your own components
- 🔔 **Multi-color Badges** - Show notification counts with different colors
- 🌐 **i18n Support** - Works with English, Vietnamese, and other languages
- ⚡ **Zero Config** - Works out of the box, just add to plugins

## 📋 Requirements

- Payload CMS 3.x
- Next.js 14+ or 15+
- React 18+ or 19+

## 📦 Installation

```bash
# npm
npm install payload-sidebar-plugin

# pnpm
pnpm add payload-sidebar-plugin

# yarn
yarn add payload-sidebar-plugin
```

## 🚀 Quick Start

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

---

## 📖 Table of Contents

- [Configuration Options](#-configuration-options)
- [Custom Links & Groups](#-custom-links--groups)
- [Group Ordering](#-group-ordering)
- [Pinning Items](#-pinning-items)
- [Adding Badges](#-adding-badges)
- [Styling](#-styling)
- [Real-World Examples](#-real-world-examples)
- [API Reference](#-api-reference)
- [Troubleshooting](#-troubleshooting)

---

## ⚙️ Configuration Options

```typescript
import { payloadSidebar } from 'payload-sidebar-plugin'
import { BarChart3, BookOpen, Github } from 'lucide-react'

payloadSidebar({
  // Sort order for navigation groups
  groupOrder: {
    Content: 1,
    Users: 2,
    Settings: 3,
  },

  // Custom navigation links
  customLinks: [
    {
      label: 'Analytics',
      href: '/admin/analytics',
      group: 'Tools',
      icon: BarChart3,
    },
    {
      label: 'Documentation',
      href: 'https://docs.example.com',
      group: 'Resources',
      external: true,
      icon: BookOpen,
    },
  ],

  // Custom navigation groups
  customGroups: [
    { label: 'Tools', order: 5 },
    { label: 'Resources', order: 99, defaultOpen: false },
  ],

  // Enable pin functionality (default: true)
  enablePinning: true,

  // Storage for pinned items
  pinnedStorage: 'preferences', // or 'localStorage'

  // CSS class prefix (default: 'nav')
  classPrefix: 'nav',

  // Custom CSS variables for badge colors
  cssVariables: {
    '--badge-red-bg': '#ef4444',
    '--badge-blue-bg': '#3b82f6',
  },
})
```

### Options Reference

| Option          | Type                              | Default         | Description                                                           |
| --------------- | --------------------------------- | --------------- | --------------------------------------------------------------------- |
| `groupOrder`    | `Record<string, number>`          | `{}`            | Priority map for sorting nav groups. Lower numbers appear first.      |
| `icons`         | `Record<string, string>`          | `{}`            | Custom icons for collections/globals by slug. Uses Lucide icon names. |
| `customLinks`   | `CustomLink[]`                    | `[]`            | Add custom navigation links to the sidebar.                           |
| `customGroups`  | `CustomGroup[]`                   | `[]`            | Define custom groups or configure existing ones.                      |
| `enablePinning` | `boolean`                         | `true`          | Enable/disable the pin items feature.                                 |
| `pinnedStorage` | `'preferences' \| 'localStorage'` | `'preferences'` | Where to store pinned items.                                          |
| `classPrefix`   | `string`                          | `'nav'`         | CSS class prefix for styling.                                         |
| `cssVariables`  | `Record<string, string>`          | `{}`            | Override default CSS variables.                                       |

---

## 🎨 Custom Icons

The plugin uses a curated set of ~100 commonly used [Lucide icons](https://lucide.dev/icons) for admin interfaces. You can customize icons for any collection, global, or custom link.

### Basic Usage

```typescript
payloadSidebar({
  // Icons for collections and globals (by slug)
  icons: {
    // Override default icons
    users: 'users-round',
    posts: 'file-pen',
    media: 'images',

    // Custom collections
    'my-collection': 'shield-check',
    products: 'shopping-cart',
    orders: 'package',
    videos: 'video',
  },
})
```

### How It Works

Icon names should be in **kebab-case** (lowercase with hyphens):

- ✅ `'shield-check'`
- ✅ `'file-text'`
- ✅ `'arrow-right-left'`
- ❌ `'ShieldCheck'` (PascalCase not supported)

### Available Icons

The plugin includes ~100 pre-defined icons organized by category:

<details>
<summary><strong>📄 Content & Files</strong></summary>

| Icon Name      | Description      |
| -------------- | ---------------- |
| `file`         | Generic file     |
| `file-text`    | Text document    |
| `file-pen`     | Editable file    |
| `files`        | Multiple files   |
| `folder`       | Folder           |
| `folder-tree`  | Folder hierarchy |
| `folder-open`  | Open folder      |
| `file-code`    | Code file        |
| `file-archive` | Archive/zip file |
| `book`         | Book             |
| `book-open`    | Open book        |
| `bookmark`     | Bookmark         |

</details>

<details>
<summary><strong>👥 Users & People</strong></summary>

| Icon Name     | Description    |
| ------------- | -------------- |
| `user`        | Single user    |
| `users`       | Multiple users |
| `users-round` | Round avatars  |
| `user-round`  | Round avatar   |
| `user-check`  | Verified user  |
| `user-plus`   | Add user       |
| `contact`     | Contact card   |

</details>

<details>
<summary><strong>🖼️ Media</strong></summary>

| Icon Name | Description |
| --------- | ----------- |
| `image`   | Image       |
| `images`  | Gallery     |
| `video`   | Video       |
| `music`   | Audio       |
| `camera`  | Camera      |

</details>

<details>
<summary><strong>📐 Layout & Navigation</strong></summary>

| Icon Name          | Description   |
| ------------------ | ------------- |
| `layout`           | Layout        |
| `layout-dashboard` | Dashboard     |
| `panel-top`        | Header panel  |
| `panel-bottom`     | Footer panel  |
| `panel-left`       | Left sidebar  |
| `panel-right`      | Right sidebar |
| `menu`             | Menu          |

</details>

<details>
<summary><strong>💬 Communication</strong></summary>

| Icon Name        | Description   |
| ---------------- | ------------- |
| `mail`           | Email         |
| `mail-check`     | Verified mail |
| `message-square` | Chat message  |
| `message-circle` | Comment       |
| `send`           | Send          |
| `inbox`          | Inbox         |

</details>

<details>
<summary><strong>🛒 E-commerce</strong></summary>

| Icon Name       | Description   |
| --------------- | ------------- |
| `shopping-bag`  | Shopping bag  |
| `shopping-cart` | Shopping cart |
| `credit-card`   | Credit card   |
| `dollar-sign`   | Currency      |
| `receipt`       | Receipt       |
| `package`       | Package       |

</details>

<details>
<summary><strong>⚙️ Settings & System</strong></summary>

| Icon Name      | Description     |
| -------------- | --------------- |
| `settings`     | Settings gear   |
| `cog`          | Cog             |
| `wrench`       | Wrench          |
| `shield`       | Shield          |
| `shield-check` | Verified shield |
| `lock`         | Lock            |
| `key`          | Key             |

</details>

<details>
<summary><strong>📊 Charts & Data</strong></summary>

| Icon Name     | Description       |
| ------------- | ----------------- |
| `bar-chart`   | Bar chart         |
| `bar-chart-2` | Bar chart alt     |
| `bar-chart-3` | Bar chart variant |
| `chart`       | Chart (alias)     |
| `line-chart`  | Line chart        |
| `pie-chart`   | Pie chart         |
| `activity`    | Activity graph    |

</details>

<details>
<summary><strong>🔧 Development</strong></summary>

| Icon Name   | Description   |
| ----------- | ------------- |
| `code`      | Code brackets |
| `file-code` | Code file     |
| `terminal`  | Terminal      |
| `database`  | Database      |
| `server`    | Server        |
| `cpu`       | CPU           |

</details>

<details>
<summary><strong>📋 Forms & Lists</strong></summary>

| Icon Name         | Description    |
| ----------------- | -------------- |
| `clipboard-list`  | Checklist      |
| `clipboard-check` | Completed list |
| `form-input`      | Form input     |
| `list-checks`     | Todo list      |

</details>

<details>
<summary><strong>🔍 Search & Filter</strong></summary>

| Icon Name            | Description |
| -------------------- | ----------- |
| `search`             | Search      |
| `filter`             | Filter      |
| `sliders-horizontal` | Sliders     |

</details>

<details>
<summary><strong>🏢 Organization</strong></summary>

| Icon Name    | Description |
| ------------ | ----------- |
| `building`   | Building    |
| `building-2` | Office      |
| `home`       | Home        |
| `map`        | Map         |
| `map-pin`    | Location    |
| `globe`      | Globe       |

</details>

<details>
<summary><strong>❤️ Social & Misc</strong></summary>

| Icon Name   | Description |
| ----------- | ----------- |
| `heart`     | Heart       |
| `star`      | Star        |
| `thumbs-up` | Like        |
| `share`     | Share       |
| `share-2`   | Share alt   |
| `tag`       | Tag         |
| `tags`      | Tags        |
| `hash`      | Hashtag     |
| `zap`       | Lightning   |
| `rocket`    | Rocket      |
| `palette`   | Palette     |
| `handshake` | Handshake   |
| `award`     | Award       |
| `crown`     | Crown       |
| `gift`      | Gift        |
| `sparkles`  | Sparkles    |
| `lightbulb` | Idea        |
| `github`    | GitHub      |

</details>

<details>
<summary><strong>➡️ Arrows & Actions</strong></summary>

| Icon Name         | Description   |
| ----------------- | ------------- |
| `arrow-left`      | Arrow left    |
| `arrow-right`     | Arrow right   |
| `arrow-up`        | Arrow up      |
| `arrow-down`      | Arrow down    |
| `corner-up-right` | Redirect      |
| `external-link`   | External link |
| `link`            | Link          |
| `plus`            | Add           |
| `minus`           | Remove        |
| `edit`            | Edit          |
| `trash`           | Delete        |
| `trash-2`         | Delete alt    |
| `save`            | Save          |
| `download`        | Download      |
| `upload`          | Upload        |
| `check`           | Checkmark     |
| `x`               | Close         |
| `alert-circle`    | Alert         |
| `info`            | Info          |
| `help-circle`     | Help          |

</details>

<details>
<summary><strong>📅 Calendar & Time</strong></summary>

| Icon Name  | Description |
| ---------- | ----------- |
| `calendar` | Calendar    |
| `clock`    | Clock       |
| `timer`    | Timer       |

</details>

### Default Icons

The plugin includes sensible defaults for common Payload collections:

| Slug               | Default Icon      |
| ------------------ | ----------------- |
| `pages`            | `file-text`       |
| `posts`            | `file-pen`        |
| `media`            | `image`           |
| `users`            | `users`           |
| `categories`       | `folder-tree`     |
| `settings`         | `settings`        |
| `comments`         | `message-circle`  |
| `forms`            | `clipboard-list`  |
| `form-submissions` | `inbox`           |
| `redirects`        | `corner-up-right` |
| `search`           | `search`          |

You can override any of these with the `icons` option.

### Using Icons in Custom Links

For custom links, use the `icon` property with any available icon name:

```typescript
payloadSidebar({
  customLinks: [
    {
      label: 'Analytics',
      href: '/admin/analytics',
      group: 'Tools',
      icon: 'bar-chart-3', // Use icon name string
    },
    {
      label: 'GitHub',
      href: 'https://github.com',
      group: 'Resources',
      icon: 'github',
      external: true,
    },
  ],
})
```

### Need More Icons?

If you need Lucide icons that aren't in the pre-defined ~100 icons, use `SidebarIconProvider` to register them:

#### Step 1: Create an Icon Provider

```tsx
// src/components/CustomIconProvider.tsx
'use client'

import React from 'react'
import { SidebarIconProvider } from 'payload-sidebar-plugin/components'

// Import any Lucide icons you need that aren't in the default set
import { Newspaper, Trophy, Gamepad2, Pizza, Plane, Tent, Bike, Cat, Dog } from 'lucide-react'

export function CustomIconProvider({ children }: { children: React.ReactNode }) {
  // Register custom icons with kebab-case keys
  const customIcons = {
    newspaper: Newspaper,
    trophy: Trophy,
    'gamepad-2': Gamepad2,
    pizza: Pizza,
    plane: Plane,
    tent: Tent,
    bike: Bike,
    cat: Cat,
    dog: Dog,
  }

  return <SidebarIconProvider icons={customIcons}>{children}</SidebarIconProvider>
}
```

#### Step 2: Register as Admin Provider

```typescript
// payload.config.ts
export default buildConfig({
  admin: {
    components: {
      providers: ['@/components/CustomIconProvider'],
    },
  },
})
```

#### Step 3: Use Custom Icons in Config

```typescript
payloadSidebar({
  icons: {
    // Now you can use your custom icons!
    'news-articles': 'newspaper',
    achievements: 'trophy',
    games: 'gamepad-2',
    restaurants: 'pizza',
    travel: 'plane',
  },
})
```

#### Step 4: Generate Import Map

```bash
npx payload generate:importmap
```

### Real-World Example: Full CRM with Custom Icons

Here's a complete example from a production CRM project:

```typescript
// src/plugins/index.ts
payloadSidebar({
  icons: {
    // === COLLECTIONS ===
    // Content
    users: 'users-round',
    posts: 'file-pen',
    pages: 'layout',
    media: 'image',
    files: 'files',
    categories: 'folder-tree',

    // Forms
    forms: 'clipboard-list',
    'form-submissions': 'inbox',

    // Comments & Chat
    comments: 'message-square',
    chats: 'message-circle',
    messages: 'send',

    // CRM Collections
    contacts: 'contact',
    'contact-fields': 'list-checks',
    'contact-notes': 'file-text',
    deals: 'handshake',
    leads: 'user-plus',
    activities: 'activity',
    tickets: 'clipboard-check',
    'customer-feedback': 'thumbs-up',
    'customer-interests': 'star',
    badges: 'award',

    // Knowledge Base
    'knowledge-base': 'book-open',

    // === GLOBALS ===
    header: 'panel-top',
    footer: 'panel-bottom',
    'company-info': 'building',
    'social-links': 'share-2',

    // Dashboards
    'crm-dashboard': 'layout-dashboard',
    'chat-dashboard': 'message-square',

    // Settings & Config
    'ai-config': 'sparkles',
    'analytics-settings': 'bar-chart-3',
    'theme-settings': 'palette',
  },
})
```

---

## 🔗 Custom Links & Groups

Add your own navigation links that aren't tied to Payload collections or globals. This is perfect for:

- Admin dashboards and custom views
- External documentation links
- Third-party integrations
- Quick access tools

### Basic Usage

```typescript
import { payloadSidebar } from 'payload-sidebar-plugin'
import { BarChart3, BookOpen, FileCode, Rocket, Github } from 'lucide-react'

payloadSidebar({
  customLinks: [
    // Internal admin views
    {
      label: 'System Monitor',
      href: '/admin/system-monitor',
      group: 'Tools',
      icon: BarChart3,
      order: 1,
    },
    {
      label: 'API Explorer',
      href: '/api',
      group: 'Tools',
      icon: FileCode,
      order: 2,
    },
    // External resources (opens in new tab)
    {
      label: 'Payload Docs',
      href: 'https://payloadcms.com/docs',
      group: 'Resources',
      icon: BookOpen,
      external: true,
    },
    {
      label: 'GitHub Repo',
      href: 'https://github.com/your-org/your-repo',
      group: 'Resources',
      icon: Github,
      external: true,
    },
  ],

  customGroups: [
    { label: 'Tools', order: 15 },
    { label: 'Resources', order: 99, defaultOpen: false },
  ],
})
```

### CustomLink Options

| Option     | Type                   | Default    | Description                                         |
| ---------- | ---------------------- | ---------- | --------------------------------------------------- |
| `label`    | `string`               | (required) | Display label for the link                          |
| `href`     | `string`               | (required) | URL path or full URL                                |
| `group`    | `string`               | `'Custom'` | Group to place this link in                         |
| `icon`     | `string \| LucideIcon` | `'link'`   | Icon key (from defaults) or Lucide icon component   |
| `external` | `boolean`              | auto       | Opens in new tab. Auto-detected for http/https URLs |
| `order`    | `number`               | `50`       | Position within the group (lower = higher)          |
| `pinnable` | `boolean`              | `true`     | Whether this link can be pinned                     |

### CustomGroup Options

| Option        | Type      | Default    | Description                                       |
| ------------- | --------- | ---------- | ------------------------------------------------- |
| `label`       | `string`  | (required) | Group label (used for display and identification) |
| `order`       | `number`  | `50`       | Sort order priority (lower = appears first)       |
| `defaultOpen` | `boolean` | `true`     | Whether group starts expanded                     |

### Available Default Icon Keys

```typescript
// Content
'pages', 'posts', 'media', 'files', 'categories'

// Users & Settings
'users', 'settings', 'dashboard'

// Tools
'terminal', 'api', 'file-code', 'chart'

// External
'link', 'external-link', 'globe', 'docs'

// General
'sparkles', 'zap', 'star', 'folder', 'help', 'info'
```

---

## 📁 Group Ordering

Control the order of navigation groups with support for i18n:

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

    // Custom groups
    Tools: 15,
    Resources: 99,

    // Unlisted groups default to priority 50
  },
})
```

---

## 📌 Pinning Items

Users can pin frequently used items to the top of the sidebar for quick access.

### Features

- Click the pin icon on any nav item to pin it
- Pinned items appear at the top in a "Pinned" section
- Unpin items by clicking the X button
- Works with collections, globals, and custom links

### Storage Options

**Server-side storage (recommended):**

```typescript
payloadSidebar({
  pinnedStorage: 'preferences', // Uses Payload's preference system
})
```

**Client-side storage:**

```typescript
payloadSidebar({
  pinnedStorage: 'localStorage', // Simpler, but doesn't sync across devices
})
```

### API Routes Setup (for server-side storage)

When using `pinnedStorage: 'preferences'`, you need to create these API routes:

**1. Create the pinned items route:**

```typescript
// src/app/api/nav/pinned/route.ts
import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export interface PinnedItem {
  slug: string
  type: 'collection' | 'global' | 'custom'
  order: number
}

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const headersList = await headers()
    const { user } = await payload.auth({ headers: headersList })

    if (!user) {
      return NextResponse.json({ pinnedItems: [] })
    }

    const prefs = await payload.find({
      collection: 'payload-preferences',
      where: {
        key: { equals: 'nav-pinned' },
        'user.value': { equals: user.id },
      },
      limit: 1,
      depth: 0,
    })

    const pinnedItems = (prefs.docs[0]?.value as { pinnedItems?: PinnedItem[] })?.pinnedItems || []
    return NextResponse.json({ pinnedItems })
  } catch (error) {
    console.error('Error fetching pinned items:', error)
    return NextResponse.json({ pinnedItems: [] })
  }
}
```

**2. Create the pin route:**

```typescript
// src/app/api/nav/pin/route.ts
import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import type { PinnedItem } from '../pinned/route'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const headersList = await headers()
    const { user } = await payload.auth({ headers: headersList })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug, type } = await request.json()

    const prefs = await payload.find({
      collection: 'payload-preferences',
      where: {
        key: { equals: 'nav-pinned' },
        'user.value': { equals: user.id },
      },
      limit: 1,
      depth: 0,
    })

    const existingItems: PinnedItem[] =
      (prefs.docs[0]?.value as { pinnedItems?: PinnedItem[] })?.pinnedItems || []

    if (existingItems.some(item => item.slug === slug && item.type === type)) {
      return NextResponse.json({ success: true, message: 'Already pinned' })
    }

    const newItems: PinnedItem[] = [...existingItems, { slug, type, order: existingItems.length }]
    const userCollection = (user as { collection?: string }).collection || 'users'

    await payload.db.upsert({
      collection: 'payload-preferences',
      data: {
        key: 'nav-pinned',
        user: { relationTo: userCollection, value: user.id },
        value: { pinnedItems: newItems },
      },
      where: {
        and: [
          { key: { equals: 'nav-pinned' } },
          { 'user.value': { equals: user.id } },
          { 'user.relationTo': { equals: userCollection } },
        ],
      },
    })

    return NextResponse.json({ success: true, pinnedItems: newItems })
  } catch (error) {
    console.error('Error pinning item:', error)
    return NextResponse.json({ error: 'Failed to pin' }, { status: 500 })
  }
}
```

**3. Create the unpin route:**

```typescript
// src/app/api/nav/unpin/route.ts
import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import type { PinnedItem } from '../pinned/route'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const headersList = await headers()
    const { user } = await payload.auth({ headers: headersList })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { slug, type } = await request.json()

    const prefs = await payload.find({
      collection: 'payload-preferences',
      where: {
        key: { equals: 'nav-pinned' },
        'user.value': { equals: user.id },
      },
      limit: 1,
      depth: 0,
    })

    if (!prefs.docs[0]) {
      return NextResponse.json({ success: true, message: 'No pinned items' })
    }

    const existingItems: PinnedItem[] =
      (prefs.docs[0]?.value as { pinnedItems?: PinnedItem[] })?.pinnedItems || []

    const newItems = existingItems
      .filter(item => !(item.slug === slug && item.type === type))
      .map((item, index) => ({ ...item, order: index }))

    const userCollection = (user as { collection?: string }).collection || 'users'

    await payload.db.upsert({
      collection: 'payload-preferences',
      data: {
        key: 'nav-pinned',
        user: { relationTo: userCollection, value: user.id },
        value: { pinnedItems: newItems },
      },
      where: {
        and: [
          { key: { equals: 'nav-pinned' } },
          { 'user.value': { equals: user.id } },
          { 'user.relationTo': { equals: userCollection } },
        ],
      },
    })

    return NextResponse.json({ success: true, pinnedItems: newItems })
  } catch (error) {
    console.error('Error unpinning item:', error)
    return NextResponse.json({ error: 'Failed to unpin' }, { status: 500 })
  }
}
```

**4. Create the reorder route:**

```typescript
// src/app/api/nav/reorder/route.ts
import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import type { PinnedItem } from '../pinned/route'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const headersList = await headers()
    const { user } = await payload.auth({ headers: headersList })

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { items } = await request.json()

    const reorderedItems = items.map((item: PinnedItem, index: number) => ({
      ...item,
      order: index,
    }))

    const userCollection = (user as { collection?: string }).collection || 'users'

    await payload.db.upsert({
      collection: 'payload-preferences',
      data: {
        key: 'nav-pinned',
        user: { relationTo: userCollection, value: user.id },
        value: { pinnedItems: reorderedItems },
      },
      where: {
        and: [
          { key: { equals: 'nav-pinned' } },
          { 'user.value': { equals: user.id } },
          { 'user.relationTo': { equals: userCollection } },
        ],
      },
    })

    return NextResponse.json({ success: true, pinnedItems: reorderedItems })
  } catch (error) {
    console.error('Error reordering items:', error)
    return NextResponse.json({ error: 'Failed to reorder' }, { status: 500 })
  }
}
```

---

## 🔔 Adding Badges

Display notification counts, statistics, or status indicators on navigation items.

### Step 1: Create a Badge Provider

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

### Step 2: Register as Admin Provider

```typescript
// payload.config.ts
export default buildConfig({
  admin: {
    components: {
      providers: ['@/components/NavBadgeProvider'],
    },
  },
})
```

### Step 3: Generate Import Map

```bash
npx payload generate:importmap
```

### Badge Colors

| Color    | Use Case                  | Example                      |
| -------- | ------------------------- | ---------------------------- |
| `red`    | Urgent, unread, errors    | Unread messages, failed jobs |
| `orange` | Warnings, needs attention | Pending comments             |
| `yellow` | Drafts, pending review    | Draft posts                  |
| `blue`   | Informational             | Total pages                  |
| `green`  | Success, published        | Published posts              |
| `gray`   | Archived, inactive        | Media count                  |

### Real-time Badges Example

```tsx
// src/components/NavBadgeProvider.tsx
'use client'

import React from 'react'
import { SidebarBadgeProvider } from 'payload-sidebar-plugin/components'
import { useNotifications } from '@/providers/NotificationProvider'

export function NavBadgeProvider({ children }: { children: React.ReactNode }) {
  const { unreadChats, unreadComments } = useNotifications()

  const badges: Record<
    string,
    { count: number; color: 'red' | 'yellow' | 'blue' | 'green' | 'orange' | 'gray' }
  > = {}

  // Only show badges when there are unread items
  if (unreadChats > 0) {
    badges['chat-dashboard'] = { count: unreadChats, color: 'red' }
  }
  if (unreadComments > 0) {
    badges['comments-dashboard'] = { count: unreadComments, color: 'orange' }
  }

  return <SidebarBadgeProvider badges={badges}>{children}</SidebarBadgeProvider>
}
```

---

## 🎨 Styling

The plugin uses BEM-style CSS classes with a configurable prefix (default: `nav`).

### CSS Classes Reference

```css
/* Main container */
.nav {
}
.nav--nav-open {
}
.nav__scroll {
}
.nav__wrap {
}

/* Pinned section */
.nav__pinned-section {
}
.nav__pinned-header {
}
.nav__pinned-items {
}
.nav__pinned-item {
}

/* Links */
.nav__link {
}
.nav__link--active {
}
.nav__link--external {
}
.nav__link-icon {
}
.nav__link-label {
}
.nav__link-badge {
}
.nav__link-external-icon {
}

/* Pin button */
.nav__pin-btn {
}
.nav__pin-btn--pinned {
}
.nav__unpin-btn {
}
```

### Custom Styling Example

```css
/* Make pinned section stand out */
.nav__pinned-section {
  background: var(--theme-elevation-50);
  border-radius: 8px;
  margin: 8px;
  padding: 8px;
}

/* Custom active state */
.nav__link--active {
  background: var(--theme-elevation-100);
  border-left: 3px solid var(--theme-success-500);
}

/* Style external link icon */
.nav__link-external-icon {
  opacity: 0.5;
  margin-left: auto;
}
```

---

## 🌍 Real-World Examples

### Example 1: Full-Featured CMS Setup

```typescript
// src/plugins/index.ts
import { payloadSidebar } from 'payload-sidebar-plugin'
import { BarChart3, BookOpen, Github, FileCode, Rocket } from 'lucide-react'

export const plugins = [
  // ... other plugins
  payloadSidebar({
    groupOrder: {
      // Vietnamese
      'Nội dung': 1,
      'Người dùng': 2,
      CRM: 3,
      'Cấu hình': 10,
      // English
      Content: 1,
      Users: 2,
      Settings: 10,
      // Custom
      'Công cụ': 15,
      'Tài nguyên': 99,
    },

    customLinks: [
      // Internal tools
      {
        label: 'System Monitor',
        href: '/admin/system-monitor',
        group: 'Công cụ',
        icon: BarChart3,
        order: 1,
      },
      {
        label: 'API Explorer',
        href: '/api',
        group: 'Công cụ',
        icon: FileCode,
        order: 2,
      },
      // External resources
      {
        label: 'Payload Docs',
        href: 'https://payloadcms.com/docs',
        group: 'Tài nguyên',
        icon: BookOpen,
        external: true,
      },
      {
        label: 'GitHub Repo',
        href: 'https://github.com/your-org/your-repo',
        group: 'Tài nguyên',
        icon: Github,
        external: true,
      },
      {
        label: 'Deploy Status',
        href: 'https://vercel.com/dashboard',
        group: 'Tài nguyên',
        icon: Rocket,
        external: true,
      },
    ],

    customGroups: [
      { label: 'Công cụ', order: 15 },
      { label: 'Tools', order: 15 },
      { label: 'Tài nguyên', order: 99, defaultOpen: false },
      { label: 'Resources', order: 99, defaultOpen: false },
    ],

    enablePinning: true,
    pinnedStorage: 'preferences',
  }),
]
```

### Example 2: E-commerce Admin

```typescript
payloadSidebar({
  groupOrder: {
    Products: 1,
    Orders: 2,
    Customers: 3,
    Analytics: 4,
    Settings: 99,
  },

  customLinks: [
    {
      label: 'Sales Dashboard',
      href: '/admin/sales-dashboard',
      group: 'Analytics',
      icon: 'chart',
    },
    {
      label: 'Inventory',
      href: '/admin/inventory',
      group: 'Products',
      order: 0, // Appears first in Products group
    },
    {
      label: 'Stripe Dashboard',
      href: 'https://dashboard.stripe.com',
      group: 'External',
      external: true,
    },
    {
      label: 'Shipping Portal',
      href: 'https://shippo.com/dashboard',
      group: 'External',
      external: true,
    },
  ],

  customGroups: [
    { label: 'Analytics', order: 4 },
    { label: 'External', order: 100, defaultOpen: false },
  ],
})
```

### Example 3: Multi-tenant SaaS

```typescript
payloadSidebar({
  groupOrder: {
    Tenants: 1,
    Users: 2,
    Billing: 3,
    System: 99,
  },

  customLinks: [
    {
      label: 'Tenant Overview',
      href: '/admin/tenants/overview',
      group: 'Tenants',
      order: 0,
    },
    {
      label: 'Usage Metrics',
      href: '/admin/metrics',
      group: 'System',
    },
    {
      label: 'Billing Portal',
      href: 'https://billing.stripe.com',
      group: 'Billing',
      external: true,
    },
  ],
})
```

---

## 📚 API Reference

### Exports

```typescript
// Main plugin
import { payloadSidebar } from 'payload-sidebar-plugin'

// Client components
import {
  SidebarBadgeProvider,
  CustomNavClient,
  NavContent,
  NavLink,
  PinnedSection,
} from 'payload-sidebar-plugin/components'

// Hooks
import { useBadge, usePinnedNav } from 'payload-sidebar-plugin/hooks'

// Server components (RSC)
import { CustomNav } from 'payload-sidebar-plugin/rsc'
```

### Types

```typescript
import type {
  PayloadSidebarPluginOptions,
  CustomLink,
  CustomGroup,
  NavEntity,
  PinnedItem,
  BadgeConfig,
  BadgeColor,
} from 'payload-sidebar-plugin'
```

### useBadge Hook

```tsx
import { useBadge } from 'payload-sidebar-plugin/hooks'

function MyComponent() {
  const badge = useBadge('posts')
  // Returns { count: 5, color: 'blue' } or null

  if (badge) {
    return <span className={`badge--${badge.color}`}>{badge.count}</span>
  }
  return null
}
```

### usePinnedNav Hook

```tsx
import { usePinnedNav } from 'payload-sidebar-plugin/hooks'

function MyComponent() {
  const {
    pinnedItems, // Array of pinned items
    loading, // Loading state
    isPinned, // Check if item is pinned
    pinItem, // Pin an item
    unpinItem, // Unpin an item
    togglePin, // Toggle pin state
    refresh, // Refresh pinned items
  } = usePinnedNav()
}
```

---

## ❓ Troubleshooting

### Plugin not showing custom navigation

1. Regenerate the import map:
   ```bash
   npx payload generate:importmap
   ```
2. Clear Next.js cache:
   ```bash
   rm -rf .next && pnpm dev
   ```

### Custom links not appearing

1. Check that `customLinks` array is properly formatted
2. Verify `group` property matches a group in `customGroups` or existing Payload groups
3. Check browser console for errors

### Badges not appearing

1. Ensure `SidebarBadgeProvider` is registered in `admin.components.providers`
2. Check that badge keys match collection/global slugs exactly
3. Verify count is greater than 0

### Pinned items not persisting

For `pinnedStorage: 'preferences'`:

1. Verify all 4 API routes are created (`/api/nav/pinned`, `/api/nav/pin`, `/api/nav/unpin`, `/api/nav/reorder`)
2. Check user is authenticated
3. Check browser console for API errors

For `pinnedStorage: 'localStorage'`:

1. Check browser supports localStorage
2. Verify no privacy extensions blocking storage

### Style conflicts

1. Use a custom `classPrefix` to namespace classes
2. Override specific CSS variables
3. Use browser DevTools to inspect conflicting styles

---

## 🛠️ Development

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

---

## 📄 License

MIT © [Kari](https://github.com/tatsuyakari1203)

---

## 📝 Changelog

### 1.3.4

- ✨ **NEW: `SidebarIconProvider`** - Register custom Lucide icons beyond the default ~100
- 📦 Export `DynamicIcon`, `DEFAULT_ICON_MAP` for advanced use cases
- 📝 Added comprehensive documentation with real-world CRM example

### 1.3.3

- ✨ Added `icons` option - customize icons for any collection/global
- 🎯 Pre-defined set of ~100 commonly used Lucide icons for admin interfaces
- 📦 Optimized bundle size - only includes necessary icons
- 🔧 Icons are kebab-case strings for easy configuration
- 📝 Added comprehensive Custom Icons documentation with all available icons

### 1.2.x

- ✨ Added `customLinks` option for custom navigation links
- ✨ Added `customGroups` option for custom groups
- ✨ Support for external links with auto-detection
- ✨ Custom links are pinnable
- 🐛 Fixed options not being passed to RSC components
- 📝 Comprehensive documentation with real-world examples

### 1.1.x

- Fixed badge rendering issues
- Fixed React Hooks order errors
- Fixed SSR compatibility
- Improved style injection

### 1.0.0

- Initial release
- Sortable navigation groups
- Pinnable items
- Multi-color badge support
- Full TypeScript support
