'use client'

import { useNav } from '@payloadcms/ui'
import React from 'react'

import { StyleInjector } from './StyleInjector'
import { NavContent } from './NavContent'
import { NavConfigProvider } from '../NavContext'
import { DEFAULT_ICONS } from '../../defaults'
import type { NavEntity, NavConfigContextValue, CustomLink } from '../../types'

interface NavGroupData {
  label: string
  entities: NavEntity[]
}

interface SerializableNavConfig {
  classPrefix: string
  enablePinning: boolean
  pinnedStorage: 'preferences' | 'localStorage'
  cssVariables: Record<string, string>
  customLinks: CustomLink[]
  icons?: Record<string, string>
}

interface NavClientWrapperProps {
  classPrefix?: string
  groups: NavGroupData[]
  adminRoute: string
  navPreferences: { groups?: Record<string, { open?: boolean }> } | null
  navConfig: SerializableNavConfig
  beforeNav?: React.ReactElement
  beforeNavLinks?: React.ReactElement
  afterNavLinks?: React.ReactElement
  afterNav?: React.ReactElement
  logoutComponent?: React.ReactElement
}

/**
 * Client wrapper for Custom Nav - handles nav open/close state and context setup
 */
export const CustomNavClient: React.FC<NavClientWrapperProps> = (props) => {
  const {
    classPrefix = 'nav',
    groups,
    adminRoute,
    navPreferences,
    navConfig,
    beforeNav,
    beforeNavLinks,
    afterNavLinks,
    afterNav,
    logoutComponent,
  } = props

  const { hydrated, navOpen, navRef, shouldAnimate } = useNav()

  // Merge default icons with user-provided icons
  // User icons override defaults
  const mergedIcons: Record<string, string> = {
    ...DEFAULT_ICONS,
    ...(navConfig.icons || {}),
  }

  // Build full config
  const fullConfig: NavConfigContextValue = {
    icons: mergedIcons,
    classPrefix: navConfig.classPrefix,
    enablePinning: navConfig.enablePinning,
    pinnedStorage: navConfig.pinnedStorage,
    cssVariables: navConfig.cssVariables,
    customLinks: navConfig.customLinks,
  }

  return (
    <NavConfigProvider config={fullConfig}>
      <StyleInjector />
      <aside
        className={[
          classPrefix,
          navOpen && `${classPrefix}--nav-open`,
          shouldAnimate && `${classPrefix}--nav-animate`,
          hydrated && `${classPrefix}--nav-hydrated`,
        ]
          .filter(Boolean)
          .join(' ')}
        {...(!navOpen ? { inert: true } : {})}
      >
        <div className={`${classPrefix}__scroll`} ref={navRef as React.RefObject<HTMLDivElement>}>
          {beforeNav}
          <nav className={`${classPrefix}__wrap`}>
            {beforeNavLinks}

            {/* Navigation Content with Pinned Section */}
            <NavContent
              groups={groups}
              adminRoute={adminRoute}
              navPreferences={navPreferences}
            />

            {afterNavLinks}

            <div className={`${classPrefix}__controls`}>{logoutComponent}</div>
          </nav>
          {afterNav}
        </div>
      </aside>
    </NavConfigProvider>
  )
}
