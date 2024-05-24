import { cpSync, rmSync } from 'node:fs'
import { basename } from 'node:path'
import { zip } from 'zip-a-folder'
import { build } from 'esbuild'

export default async function ({ themePath, buildPath, minify }) {
  rmSync(buildPath, { force: true, recursive: true })
  const buildThemePath = `${buildPath}/${basename(themePath)}`
  cpSync(themePath, buildThemePath, { force: true, recursive: true })
  if (minify) {
    const assetsPath = `${buildThemePath}/assets`
    await build({
      entryPoints: [`${assetsPath}/**/*.js`, `${assetsPath}/**/*.css`],
      outdir: assetsPath,
      allowOverwrite: true,
      minify: true,
    })
  }
  await zip(buildThemePath, `${buildThemePath}.zip`)
}
