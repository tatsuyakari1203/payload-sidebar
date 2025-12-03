'use client'

import React from 'react'
import { Pin, X, File, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useNavConfig } from '../NavContext'
import { useBadge, getBadgeColorClass } from '../../hooks/useBadge'
import type { PinnedItem, IconComponent } from '../../types'

interface PinnedNavItem extends PinnedItem {
  label: string
  href: string
  external?: boolean
  icon?: string | IconComponent
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
  icons: Record<string, IconComponent>
}> = ({ item, onUnpin, classPrefix, icons }) => {
  const pathname = usePathname()
  const badge = useBadge(item.slug)

  // Check if external link
  const isExternalLink = item.external ||
    item.href.startsWith('http://') ||
    item.href.startsWith('https://') ||
    item.href.startsWith('//')

  // Never mark external links as active
  const isActive = !isExternalLink && (pathname === item.href || pathname.startsWith(`${item.href}/`))

  // Resolve icon
  let Icon: IconComponent = File
  if (item.icon) {
    if (typeof item.icon === 'string') {
      Icon = icons[item.icon] || icons[item.slug] || File
    } else {
      Icon = item.icon
    }
  } else {
    Icon = icons[item.slug] || File
  }

  const linkContent = (
    <>
      <Icon className={`${classPrefix}__link-icon`} size={18} />
      <span className={`${classPrefix}__link-label`}>{item.label}</span>
      {isExternalLink && (
        <ExternalLink className={`${classPrefix}__link-external-icon`} size={12} />
      )}
      {badge && (
        <span
          className={`${classPrefix}__link-badge ${getBadgeColorClass(badge.color, classPrefix)}`}
        >
          {badge.count > 99 ? '99+' : badge.count}
        </span>
      )}
    </>
  )

  return (
    <div className={`${classPrefix}__pinned-item`}>
      {isExternalLink ? (
        <a
          href={item.href}
          className={`${classPrefix}__link ${classPrefix}__link--external`}
          id={`nav-pinned-${item.slug}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkContent}
        </a>
      ) : (
        <Link
          href={item.href}
          className={`${classPrefix}__link${isActive ? ` ${classPrefix}__link--active` : ''}`}
          id={`nav-pinned-${item.slug}`}
        >
          {linkContent}
        </Link>
      )}
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
        {items.map((item) => (
          <PinnedItemLink
            key={`${item.type}-${item.slug}`}
            item={item}
            onUnpin={onUnpin}
            classPrefix={classPrefix}
            icons={icons}
          />
        ))}
      </div>
    </div>
  )
}
