'use client'

import { useNav } from '@payloadcms/ui'
import React from 'react'

import { StyleInjector } from './StyleInjector'
import { NavContent } from './NavContent'
import { NavConfigProvider } from '../NavContext'
import { DEFAULT_ICONS } from '../../defaults'
import type { NavEntity, NavConfigContextValue } from '../../types'

interface NavGroupData {
  label: string
  entities: NavEntity[]
}

interface SerializableNavConfig {
  classPrefix: string
  enablePinning: boolean
  pinnedStorage: 'preferences' | 'localStorage'
  cssVariables: Record<string, string>
}

interface NavClientWrapperProps {
  classPrefix?: string
  groups: NavGroupData[]
  adminRoute: string
  navPreferences: { groups?: Record<string, { open?: boolean }> } | null
  navConfig: SerializableNavConfig
  beforeNavLinks?: React.ReactElement
  afterNavLinks?: React.ReactElement
  logoutComponent?: React.ReactElement
}

/**
 * Client wrapper for Custom Nav - handles nav open/close state and context setup
 */
export const NavClientWrapper: React.FC<NavClientWrapperProps> = (props) => {
  const {
    classPrefix = 'nav',
    groups,
    adminRoute,
    navPreferences,
    navConfig,
    beforeNavLinks,
    afterNavLinks,
    logoutComponent,
  } = props

  const { hydrated, navOpen, navRef, shouldAnimate } = useNav()

  // Build full config with icons (which can't be serialized from server)
  const fullConfig: NavConfigContextValue = {
    icons: DEFAULT_ICONS,
    classPrefix: navConfig.classPrefix,
    enablePinning: navConfig.enablePinning,
    pinnedStorage: navConfig.pinnedStorage,
    cssVariables: navConfig.cssVariables,
    cu
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
        </div>
      </aside>
    </NavConfigProvider>
  )
}
