'use client'

import React from 'react'
import { NavGroup } from '@payloadcms/ui'
import { formatAdminURL } from '@payloadcms/ui/shared'
import { NavLink } from './NavLink'
import { PinnedSection } from './PinnedSection'
import { usePinnedNav } from '../../hooks/usePinnedNav'
import { useNavConfig } from '../NavContext'
import type { NavEntity, NavGroup as NavGroupType } from '../../types'

interface NavGroupData {
  label: string
  entities: NavEntity[]
}

interface NavContentProps {
  groups: NavGroupData[]
  adminRoute: string
  navPreferences: { groups?: Record<string, { open?: boolean }> } | null
}

export const NavContent: React.FC<NavContentProps> = ({ groups, adminRoute, navPreferences }) => {
  const { pinnedItems, isPinned, togglePin, unpinItem, loading } = usePinnedNav()
  const { classPrefix, enablePinning } = useNavConfig()

  // Build pinned items with labels and hrefs
  const pinnedNavItems = React.useMemo(() => {
    return pinnedItems
      .map((item) => {
        // Find the entity in groups to get its label
        for (const group of groups) {
          const entity = group.entities.find((e) => e.slug === item.slug && e.type === item.type)
          if (entity) {
            // For custom links, use the stored href; for collections/globals, build the URL
            let href: string
            if (item.type === 'custom' && entity.href) {
              href = entity.href
            } else if (item.type === 'collection') {
              href = formatAdminURL({ adminRoute, path: `/collections/${item.slug}` })
            } else {
              href = formatAdminURL({ adminRoute, path: `/globals/${item.slug}` })
            }

            return {
              ...item,
              label: entity.label,
              href,
              external: entity.external,
              icon: entity.icon,
            }
          }
        }
        return null
      })
      .filter(Boolean) as Array<{
      slug: string
      type: 'collection' | 'global' | 'custom'
      order: number
      label: string
      href: string
      external?: boolean
      icon?: string | React.ComponentType<{ size?: number; className?: string }>
    }>
  }, [pinnedItems, groups, adminRoute])

  return (
    <>
      {/* Dashboard Link */}
      <NavLink href={formatAdminURL({ adminRoute, path: '' })} id="nav-dashboard" slug="dashboard">
        Dashboard
      </NavLink>

      {/* Pinned Section */}
      {enablePinning && !loading && pinnedNavItems.length > 0 && (
        <PinnedSection items={pinnedNavItems} onUnpin={unpinItem} />
      )}

      {/* Sorted Navigation Groups */}
      {groups.map(({ entities, label }, groupIndex) => (
        <NavGroup isOpen={navPreferences?.groups?.[label]?.open} key={groupIndex} label={label}>
          {entities.map((entity, entityIndex) => {
            const { slug, type, label: entityLabel, href: customHref, external, icon, pinnable } = entity

            // Build href based on type
            let href: string
            if (type === 'custom' && customHref) {
              href = customHref
            } else if (type === 'collection') {
              href = formatAdminURL({ adminRoute, path: `/collections/${slug}` })
            } else {
              href = formatAdminURL({ adminRoute, path: `/globals/${slug}` })
            }

            const id = type === 'collection'
              ? `nav-${slug}`
              : type === 'global'
                ? `nav-global-${slug}`
                : `nav-custom-${slug}`

            const pinned = isPinned(slug, type)
            const canPin = enablePinning && (pinnable !== false)

            return (
              <NavLink
                href={href}
                id={id}
                key={entityIndex}
                slug={slug}
                type={type}
                isPinned={pinned}
                onTogglePin={canPin ? () => togglePin(slug, type) : undefined}
                external={external}
                customIcon={icon}
              >
                <span className={`${classPrefix}__link-label`}>{entityLabel}</span>
              </NavLink>
            )
          })}
        </NavGroup>
      ))}
    </>
  )
}
