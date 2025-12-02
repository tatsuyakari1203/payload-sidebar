'use client'

import React from 'react'
import { Pin, X, File } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useNavConfig } from '../NavContext'
import { useBadge, getBadgeColorClass } from '../../hooks/useBadge'
import type { PinnedItem, IconComponent } from '../../types'

interface PinnedNavItem extends PinnedItem {
  label: string
  href: string
}

interface PinnedSectionProps {
  items: PinnedNavItem[]
  onUnpin: (slug: string, type: string) => void
}

/**
 * Individual pinned item component - allows using hooks properly
 */
const PinnedItemLink: React.FC<{
  item: PinnedNavItem
  onUnpin: (slug: string, type: string) => void
  classPrefix: string
  Icon: IconComponent
}> = ({ item, onUnpin, classPrefix, Icon }) => {
  const pathname = usePathname()
  const badge = useBadge(item.slug)
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

  return (
    <div className={`${classPrefix}__pinned-item`}>
      <Link
        href={item.href}
        className={`${classPrefix}__link${isActive ? ` ${classPrefix}__link--active` : ''}`}
        id={`nav-pinned-${item.slug}`}
      >
        <Icon className={`${classPrefix}__link-icon`} size={18} />
        <span className={`${classPrefix}__link-label`}>{item.label}</span>
        {badge && (
          <span
            className={`${classPrefix}__link-badge ${getBadgeColorClass(badge.color, classPrefix)}`}
          >
            {badge.count > 99 ? '99+' : badge.count}
          </span>
        )}
      </Link>
      <button
        className={`${classPrefix}__unpin-btn`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          onUnpin(item.slug, item.type)
        }}
        title="Unpin"
        type="button"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export const PinnedSection: React.FC<PinnedSectionProps> = ({ items, onUnpin }) => {
  const { icons, classPrefix } = useNavConfig()

  if (items.length === 0) return null

  return (
    <div className={`${classPrefix}__pinned-section`}>
      <div className={`${classPrefix}__pinned-header`}>
        <Pin size={12} />
        <span>Pinned</span>
      </div>
      <div className={`${classPrefix}__pinned-items`}>
        {items.map((item) => {
          const Icon = icons[item.slug] || File
          return (
            <PinnedItemLink
              key={`${item.type}-${item.slug}`}
              item={item}
              onUnpin={onUnpin}
              classPrefix={classPrefix}
              Icon={Icon}
            />
          )
        })}
      </div>
    </div>
  )
}
