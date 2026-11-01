import { defineConfig } from 'tsup'
import { sassPlugin } from 'esbuild-sass-plugin'

// Common external dependencies
const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'next',
  'next/navigation',
  'next/link',
  'payload',
  '@payloadcms/ui',
  '@payloadcms/ui/elements/RenderServerComponent',
  '@payloadcms/ui/shared',
  '@payloadcms/translations',
  'lucide-react',
  // Note: lucide-react/dynamicIconImports is intentionally NOT external
  // It needs to be bundled because many bundlers can't resolve subpath imports
  // without an "exports" field in lucide-react's package.json
]

export default defineConfig([
  // Client components entry - with 'use client' directive
  {
    entry: {
      'components/index': 'src/components/index.ts',
    },
    format: ['cjs','esm'],
    dts: { resolve: true },
    splitting: false,
    sourcemap: true,
    clean: true,
    banner: {
      js: '"use client";',
    },
    external,
    esbuildPlugins: [
      sassPlugin({
        type: 'css-text',
      }),
    ],
    esbuildOptions(options) {
      options.keepNames = true
    },
  },
  // Hooks entry - with 'use client' directive
  {
    entry: {
      'hooks/index': 'src/hooks/index.ts',
    },
    format: ['cjs','esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    banner: {
      js: '"use client";',
    },
    external,
    esbuildOptions(options) {
      options.keepNames = true
    },
  },
  // Server/RSC and Plugin entries - NO 'use client' directive
  // Mark client modules as external to prevent bundling them into RSC
  {
    entry: {
      'rsc/index': 'src/server/index.ts',
      'plugin/index': 'src/plugin/index.ts',
    },
    format: ['esm','cjs'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    external: [
      ...external,
      // Mark own client modules as external to prevent bundling them into RSC
      'payload-sidebar-plugin/components',
    ],
    esbuildPlugins: [
      sassPlugin({
        type: 'css-text',
      }),
    ],
    esbuildOptions(options) {
      options.keepNames = true
    },
  },
])
