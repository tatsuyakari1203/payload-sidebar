import type { EntityToGroup, NavGroupType } from '@payloadcms/ui/shared'
import type { PayloadRequest, ServerProps } from 'payload'

import { Logout } from '@payloadcms/ui'
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'
import { EntityType, groupNavItems } from '@payloadcms/ui/shared'
import { getTranslation } from '@payloadcms/translations'
import React from 'react'

// Import client component using package path to ensure proper bundling
// This path will be resolved by the consuming bundler (Next.js)
import { CustomNavClient } from 'payload-sidebar-plugin/components'
import { sortGroups } from '../../utils/sortGroups'
import { DEFAULT_GROUP_ORDER, DEFAULT_BADGE_COLORS } from '../../defaults'
import { getPluginOptions } from '../../plugin/index'
import type { NavEntity, NavGroup, CustomLink, CustomGroup } from '../../types'

export type CustomNavProps = {
  req?: PayloadRequest
} & ServerProps

async function getNavPrefs(
  req?: PayloadRequest,
): Promise<{ groups?: Record<string, { open?: boolean }> } | null> {
  if (!req?.user) return null

  try {
    const preferences = await req.payload.find({
      collection: 'payload-preferences',
      where: {
        key: { equals: 'nav' },
        'user.relationTo': { equals: 'users' },
        'user.value': { equals: req.user.id },
      },
      limit: 1,
      depth: 0,
    })

    return (preferences.docs[0]?.value as { groups?: Record<string, { open?: boolean }> }) || null
  } catch {
    return null
  }
}

/**
 * Convert CustomLink to NavEntity
 */
function customLinkToNavEntity(link: CustomLink): NavEntity {
  // Generate a unique slug for custom links
  const slug = `custom-${link.label.toLowerCase().replace(/\s+/g, '-')}`

  // Auto-detect external links
  const isExternal = link.external ?? (
    link.href.startsWith('http://') ||
    link.href.startsWith('https://') ||
    link.href.startsWith('//')
  )

  return {
    slug,
    type: 'custom',
    label: link.label,
    href: link.href,
    external: isExternal,
    icon: link.icon,
    pinnable: link.pinnable ?? true,
    order: link.order ?? 50,
  }
}

/**
 * Merge custom links into navigation groups
 */
function mergeCustomLinks(
  groups: NavGroup[],
  customLinks: CustomLink[] = [],
  customGroups: CustomGroup[] = [],
): NavGroup[] {
  if (!customLinks.length && !customGroups.length) {
    return groups
  }

  // Create a mutable copy of groups
  const mergedGroups = groups.map(g => ({
    ...g,
    entities: [...g.entities],
  }))

  // Track existing group labels
  const groupMap = new Map<string, NavGroup>()
  mergedGroups.forEach(g => groupMap.set(g.label, g))

  // Create custom groups first (if they don't exist)
  for (const customGroup of customGroups) {
    if (!groupMap.has(customGroup.label)) {
      const newGroup: NavGroup = {
        label: customGroup.label,
        entities: [],
      }
      mergedGroups.push(newGroup)
      groupMap.set(customGroup.label, newGroup)
    }
  }

  // Add custom links to their respective groups
  for (const link of customLinks) {
    const groupLabel = link.group ?? 'Custom'
    const navEntity = customLinkToNavEntity(link)

    let targetGroup = groupMap.get(groupLabel)

    // Create group if it doesn't exist
    if (!targetGroup) {
      targetGroup = {
        label: groupLabel,
        entities: [],
      }
      mergedGroups.push(targetGroup)
      groupMap.set(groupLabel, targetGroup)
    }

    targetGroup.entities.push(navEntity)
  }

  // Sort entities within each group by order
  for (const group of mergedGroups) {
    group.entities.sort((a, b) => {
      const orderA = a.order ?? 50
      const orderB = b.order ?? 50
      return orderA - orderB
    })
  }

  return mergedGroups
}

/**
 * Build group order including custom groups
 */
function buildGroupOrder(
  defaultOrder: Record<string, number>,
  pluginOrder: Record<string, number> = {},
  customGroups: CustomGroup[] = [],
): Record<string, number> {
  const order = { ...defaultOrder, ...pluginOrder }

  // Apply custom group orders
  for (const group of customGroups) {
    if (group.order !== undefined) {
      order[group.label] = group.order
    }
  }

  return order
}

export async function CustomNav(props: CustomNavProps): Promise<React.ReactElement | null> {
  const {
    documentSubViewType,
    i18n,
    locale,
    params,
    payload,
    permissions,
    req,
    searchParams,
    user,
    viewType,
    visibleEntities,
  } = props

  // Get plugin options from global storage
  const pluginOptions = getPluginOptions()

  if (!payload?.config) {
    return null
  }

  // Merge plugin options with defaults
  const groupOrder = buildGroupOrder(
    DEFAULT_GROUP_ORDER,
    pluginOptions.groupOrder,
    pluginOptions.customGroups
  )
  const classPrefix = pluginOptions.classPrefix ?? 'nav'
  const enablePinning = pluginOptions.enablePinning ?? true
  const pinnedStorage = pluginOptions.pinnedStorage ?? 'preferences'
  const cssVariables = { ...DEFAULT_BADGE_COLORS, ...pluginOptions.cssVariables }
  const customLinks = pluginOptions.customLinks ?? []
  const customGroups = pluginOptions.customGroups ?? []

  const {
    admin: {
      components: { afterNavLinks, beforeNavLinks, logout },
    },
    routes: { admin: adminRoute },
    collections,
    globals,
  } = payload.config

  // Group nav items
  const groups = groupNavItems(
    [
      ...collections
        .filter(({ slug }) => visibleEntities?.collections?.includes(slug))
        .map(
          (collection) =>
            ({
              type: EntityType.collection,
              entity: collection,
            }) satisfies EntityToGroup,
        ),
      ...globals
        .filter(({ slug }) => visibleEntities?.globals?.includes(slug))
        .map(
          (global) =>
            ({
              type: EntityType.global,
              entity: global,
            }) satisfies EntityToGroup,
        ),
    ],
    permissions!,
    i18n,
  )

  // Convert to serializable format
  const payloadGroups: NavGroup[] = groups.map((g) => ({
    label: g.label,
    entities: g.entities.map((e) => ({
      slug: e.slug,
      type: e.type === EntityType.collection ? ('collection' as const) : ('global' as const),
      label: typeof e.label === 'string' ? e.label : getTranslation(e.label, i18n),
    })),
  }))

  // Merge custom links into groups
  const mergedGroups = mergeCustomLinks(payloadGroups, customLinks, customGroups)

  // Sort groups according to our priority
  const sortedGroups = sortGroups(mergedGroups, groupOrder)

  const navPreferences = await getNavPrefs(req)

  // Serializable config for client components (no functions, no React components)
  const navConfig = {
    classPrefix,
    enablePinning,
    pinnedStorage,
    cssVariables,
    customLinks,
  }

  const LogoutComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: logout?.Button,
    Fallback: Logout,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  })

  const BeforeNavLinksComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: beforeNavLinks,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  })

  const AfterNavLinksComponent = RenderServerComponent({
    clientProps: {
      documentSubViewType,
      viewType,
    },
    Component: afterNavLinks,
    importMap: payload.importMap,
    serverProps: {
      i18n,
      locale,
      params,
      payload,
      permissions,
      searchParams,
      user,
    },
  })

  return (
    <CustomNavClient
      classPrefix={classPrefix}
      groups={sortedGroups}
      adminRoute={adminRoute}
      navPreferences={navPreferences}
      navConfig={navConfig}
      beforeNavLinks={BeforeNavLinksComponent as React.ReactElement}
      afterNavLinks={AfterNavLinksComponent as React.ReactElement}
      logoutComponent={LogoutComponent as React.ReactElement}
    />
  )
}

export default CustomNav
