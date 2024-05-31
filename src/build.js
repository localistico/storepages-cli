import { existsSync } from 'node:fs'
import { cpSync, rmSync } from 'node:fs'
import { basename } from 'node:path'
import { zip } from 'zip-a-folder'
import { build } from 'esbuild'

export function getConfig(themePath, sourcePath, sourceMap = 'inline') {
  return {
    entryPoints: [
      `${sourcePath}/*.js`,
      `${sourcePath}/*.ts`,
      `${sourcePath}/*.jsx`,
      `${sourcePath}/*.tsx`,
    ],
    bundle: true,
    sourcemap: sourceMap,
    logLevel: 'silent',
    outdir: `${themePath}/assets`,
  }
}

export default async function ({ themePath, sourcePath, buildPath, minify }) {
  if (existsSync(sourcePath)) {
    const esbuildConfig = getConfig(themePath, sourcePath, false)
    await build(esbuildConfig)
  }
  rmSync(buildPath, { force: true, recursive: true })
  const buildThemePath = `${buildPath}/${basename(themePath)}`
  cpSync(themePath, buildThemePath, { force: true, recursive: true })
  if (minify) {
    const assetsPath = `${buildThemePath}/assets`
    await build({
      entryPoints: [`${assetsPath}/*.js`, `${assetsPath}/*.css`],
      outdir: assetsPath,
      allowOverwrite: true,
      minify: true,
      logLevel: 'silent',
    })
  }
  await zip(buildThemePath, `${buildThemePath}.zip`)
}
