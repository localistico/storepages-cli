import { existsSync } from 'node:fs'
import { create } from 'browser-sync'
import { templatesMiddleware, notFoundMiddleware } from './liquid/middleware.js'
import { context } from 'esbuild'
import { getConfig } from './build.js'

export default async function (
  { themePath, sourcePath, dataPath, esbuildConfig },
  command
) {
  const bs = create()
  if (existsSync(sourcePath)) {
    const buildConfig = await getConfig(
      command.name(),
      themePath,
      sourcePath,
      esbuildConfig
    )
    const ctx = await context(buildConfig)
    await ctx.rebuild()
    bs.watch(
      `${sourcePath}/**/*.{js,ts,jsx,tsx}`,
      { ignoreInitial: true },
      async function () {
        await ctx.rebuild()
      }
    )
  }
  bs.init({
    watch: true,
    server: themePath,
    open: false,
    notify: false,
    ui: false,
    middleware: [templatesMiddleware(themePath, dataPath)],
    logPrefix: 'Store Pages',
    callbacks: {
      ready(err, bs) {
        bs.addMiddleware('*', notFoundMiddleware(themePath, dataPath))
      },
    },
  })
}
