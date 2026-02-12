import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
  // Library mode for npm package build
  if (command === 'build' && mode === 'lib') {
    return {
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.jsx'),
          name: 'BigCalendar',
          formats: ['es', 'cjs'],
          fileName: (format) => `big-calendar.${format === 'es' ? 'mjs' : 'cjs'}`,
        },
        rollupOptions: {
          external: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            '@radix-ui/react-accordion',
            '@radix-ui/react-avatar',
            '@radix-ui/react-dialog',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tooltip',
            'class-variance-authority',
            'clsx',
            'date-fns',
            'lucide-react',
            'react-aria-components',
            'react-day-picker',
            'react-dnd',
            'react-dnd-html5-backend',
            'react-hook-form',
            'tailwind-merge',
            'tailwindcss-animate',
            'zod',
            '@hookform/resolvers',
          ],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'style.css') return 'style.css'
              return assetInfo.name
            },
          },
        },
        cssCodeSplit: false,
        sourcemap: true,
        emptyOutDir: true,
      },
    }
  }

  // Development mode
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3030,
      open: true,
    },
  }
})
