import { create } from 'browser-sync'
import { templatesMiddleware, notFoundMiddleware } from './liquid/middleware.js'

export default function ({ themePath, dataPath }) {
  const bs = create()
  bs.init({
    watch: true,
    server: themePath,
    open: false,
    notify: false,
    ui: false,
    middleware: [templatesMiddleware(themePath, dataPath)],
    logPrefix: 'Store Pages',
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', notFoundMiddleware(themePath, dataPath))
      },
    },
  })
}
