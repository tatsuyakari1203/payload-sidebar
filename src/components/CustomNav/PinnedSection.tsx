'use client'

import React from 'react'
import { Pin, X, File, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useNavConfig } from '../NavContext'
import { useBadge, getBadgeColorClass } from '../../hooks/useBadge'
import type { PinnedItem, IconComponent } from '../../types'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

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
}> = ({ item, onUnpin, classPrefix, }) => {
  const pathname = usePathname()
  const badge = useBadge(item.slug);


  const {customIcons, icons} = useNavConfig();

  // Check if external link
  const isExternalLink = item.external ||
    item.href.startsWith('http://') ||
    item.href.startsWith('https://') ||
    item.href.startsWith('//')

  // Never mark external links as active
  const isActive = !isExternalLink && (pathname === item.href || pathname.startsWith(`${item.href}/`))

  // Resolve icon
  //TODO: Extract icon resolution logic to a hook or utility function to avoid duplication with NavLink.tsx
  let Icon: IconComponent = File;
  /**
   * Controls if we are using a dynamic icon from lucide-react/dynamic
   */
  let isDynamicIcon:boolean | IconName = false;
  const customIcon = item.icon; // Get custom icon from pinned item to match NavLink logic
  const extractedSlug = item.slug; // Use item.slug directly for pinned items

  // First priority: check if this slug has a dynamic icon in customIcons
  if (customIcons && customIcons[extractedSlug]) {
    isDynamicIcon = customIcons[extractedSlug];
  }
  // If no dynamic icon found, use static icons
  else if (customIcon) {
    if (typeof customIcon === 'string') {
      Icon = icons[customIcon] || icons[extractedSlug] || File
    } else {
      // Custom React component. Doesn't work, because components are not serializable from server to client
      Icon = customIcon
    }
  } else {
    Icon = icons[extractedSlug] || File
  }

  const linkContent = (
    <>
       {isDynamicIcon ? (
        <DynamicIcon className={`${classPrefix}__link-icon`} size={18} name={isDynamicIcon} />
      ) : (
       <Icon className={`${classPrefix}__link-icon`} size={18} />
    )}
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
  const { classPrefix } = useNavConfig()

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
          />
        ))}
      </div>
    </div>
  )
}
