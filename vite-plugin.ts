import { builtinModules } from 'node:module'
import type { Plugin, UserConfig } from 'vite'

export const nodeServerPlugin = (): Plugin => {
  const virtualEntryId = 'virtual:node-server-entry-module'
  const resolvedVirtualEntryId = `\0${virtualEntryId}`

  return {
    name: '@hono/vite-node-server',
    resolveId(id) {
      if (id === virtualEntryId) {
        return resolvedVirtualEntryId
      }
    },
    async load(id) {
      if (id === resolvedVirtualEntryId) {
        return `import { Hono } from 'hono'
        import { serveStatic } from './src/util/serveStatic'
        import { serve } from '@hono/node-server'
        
        const worker = new Hono()
        worker.use('/static/*',   serveStatic({root: './'}))
        
        const modules = import.meta.glob(['/src/index.tsx'], { import: 'default', eager: true })
        for (const [, app] of Object.entries(modules)) {
          if (app) {
            worker.route('/', app)
            worker.notFound(app.notFoundHandler)
          }
        }
        
        serve({ ...worker, port: 3000 }, info => {
          console.log('Listening on http://localhost:'+info.port)
        })`
      }
    },
    config: async (): Promise<UserConfig> => {
      return {
        ssr: {
          external: [],
          noExternal: true,
        },
        build: {
          outDir: './dist',
          emptyOutDir: false,
          minify: true,
          ssr: true,
          rollupOptions: {
            external: [...builtinModules, /^node:/],
            input: virtualEntryId,
            output: {
              entryFileNames: 'server.mjs',
            },
          },
        },
      }
    },
  }
}

export default nodeServerPlugin