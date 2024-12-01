import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/node'
import { defineConfig } from 'vite'
import nodeServerPlugin from './vite-plugin'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      resolve: {
        alias: {
          '@':'/src'
        }
      },
      plugins:[
        TanStackRouterVite()
      ],
      build: {
        minify:false,
        rollupOptions: {
          input: './src/client/main.tsx',
          output: {
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/[name]-[hash].js',
          },
          onwarn(warning, warn) {
            // Suppress "Module level directives cause errors when bundled" warnings
            if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
              return;
            }
            warn(warning);
          },
        }
      }
    }
  }
    return {
      ssr: {
        external: ['react', 'react-dom']
      },
      resolve: {
        alias: {
          '@':'/src'
        }
      },
      server: {
        port:3000
      },
      build: {
        minify:false
      },
      plugins: [
        TanStackRouterVite(),
        nodeServerPlugin(),
        devServer({
          adapter,
          entry: 'src/index.tsx'
        })
      ]
    }
})