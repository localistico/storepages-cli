import { create } from 'browser-sync'
import { templatesMiddleware, notFoundMiddleware } from './liquid/middleware.js'

export default async function ({ buildPath, dataPath, port }) {
  const bs = create()
  bs.init({
    watch: false,
    server: buildPath,
    open: false,
    notify: false,
    ui: false,
    port: parseInt(port, 10),
    middleware: [templatesMiddleware(buildPath, dataPath)],
    logPrefix: 'Store Pages',
    callbacks: {
      ready(err, bs) {
        bs.addMiddleware('*', notFoundMiddleware(buildPath, dataPath))
      },
    },
  })
}
