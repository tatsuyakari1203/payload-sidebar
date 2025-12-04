'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
import { Pin, Check, File, ExternalLink, LucideIcon } from 'lucide-react'
import { useNavConfig } from '../NavContext'
import { useBadge, getBadgeColorClass } from '../../hooks/useBadge'
import type { IconComponent } from '../../types'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

interface NavLinkProps {
  href: string
  id: string
  slug?: string
  type?: 'collection' | 'global' | 'custom'
  children: React.ReactNode
  isPinned?: boolean
  onTogglePin?: () => void
  external?: boolean
  customIcon?: string | IconComponent
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  id,
  slug,
  type: _type,
  children,
  isPinned = false,
  onTogglePin,
  external = false,
  customIcon,
}) => {
  const pathname = usePathname()
  const { icons, classPrefix, enablePinning, customIcons } = useNavConfig()
  const badge = useBadge(slug || '')

  // Check if current path matches or starts with this link's href
  // For external links, never mark as active
  const isActive = !external && (pathname === href || pathname.startsWith(`${href}/`))

  // Get icon: custom icon > icon from config > default File icon
  const extractedSlug = slug || id.replace('nav-global-', '').replace('nav-custom-', '').replace('nav-', '')

  let Icon: IconComponent = File;
  /**
   * Controls if we are using a dynamic icon from lucide-react/dynamic
   */
  let isDynamicIcon:boolean | IconName = false;

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

  // For external links, show external indicator
  const isExternalLink = external || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')

  const linkContent = (
    <>
     {isDynamicIcon ? (
        <DynamicIcon className={`${classPrefix}__link-icon`} size={18} name={isDynamicIcon} />
      ) : (
       <Icon className={`${classPrefix}__link-icon`} size={18} />
    )}
      {children}
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
    <div className={`${classPrefix}__link-wrapper`}>
      {isExternalLink ? (
        <a
          className={`${classPrefix}__link ${classPrefix}__link--external`}
          href={href}
          id={id}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkContent}
        </a>
      ) : (
        <Link
          className={`${classPrefix}__link${isActive ? ` ${classPrefix}__link--active` : ''}`}
          href={href}
          id={id}
          aria-current={isActive ? 'page' : undefined}
        >
          {linkContent}
        </Link>
      )}
      {enablePinning && onTogglePin && (
        <button
          className={`${classPrefix}__pin-btn${isPinned ? ` ${classPrefix}__pin-btn--pinned` : ''}`}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            onTogglePin()
          }}
          title={isPinned ? 'Pinned' : 'Pin to top'}
          type="button"
        >
          {isPinned ? <Check size={14} /> : <Pin size={14} />}
        </button>
      )}
    </div>
  )
}
