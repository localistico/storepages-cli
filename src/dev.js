import { existsSync } from 'node:fs'
import { create } from 'browser-sync'
import { templatesMiddleware, notFoundMiddleware } from './liquid/middleware.js'
import { context } from 'esbuild'
import { getBuildConfig } from './build.js'
import { fetchRemoteSnippets } from './liquid/helpers.js'

export default async function (
  { themePath, sourcePath, dataPath, tempPath, esbuildConfig, port },
  command
) {
  await fetchRemoteSnippets(themePath)
  const bs = create()
  if (existsSync(sourcePath)) {
    const buildConfig = await getBuildConfig(
      command.name(),
      themePath,
      sourcePath,
      tempPath,
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
    serveStatic: [tempPath],
    open: false,
    notify: false,
    ui: false,
    port: parseInt(port, 10),
    middleware: [templatesMiddleware(themePath, dataPath, tempPath)],
    logPrefix: 'Store Pages',
    callbacks: {
      ready(err, bs) {
        bs.addMiddleware('*', notFoundMiddleware(themePath, dataPath, tempPath))
      },
    },
  })
}
