'use client'

import { useLayoutEffect } from 'react'
// @ts-expect-error - css-text returns string
import styles from './styles.scss'

const STYLE_ID = 'payload-sidebar-plugin-styles'

/**
 * Injects plugin styles into the document head on client-side only
 * Uses useLayoutEffect to inject styles synchronously before browser paint
 * This prevents SSR errors and minimizes visual glitches
 */
export function StyleInjector() {
  // Use useLayoutEffect to inject styles synchronously before paint
  useLayoutEffect(() => {
    // Check if styles already injected
    if (document.getElementById(STYLE_ID)) {
      return
    }

    // Create and inject main style element
    const styleElement = document.createElement('style')
    styleElement.id = STYLE_ID
    styleElement.textContent = styles
    document.head.appendChild(styleElement)

    // Cleanup on unmount
    return () => {
      const el = document.getElementById(STYLE_ID)
      if (el) el.remove()
    }
  }, [])

  return null
}
