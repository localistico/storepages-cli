import { existsSync } from 'node:fs'
import { cpSync, rmSync } from 'node:fs'
import { basename } from 'node:path'
import { pathToFileURL } from 'url'
import { zip } from 'zip-a-folder'
import { build } from 'esbuild'

export async function getConfig(command, themePath, sourcePath, esbuildConfig) {
  const defaultConfig = {
    entryPoints: [
      `${sourcePath}/*.js`,
      `${sourcePath}/*.ts`,
      `${sourcePath}/*.jsx`,
      `${sourcePath}/*.tsx`,
    ],
    bundle: true,
    sourcemap: 'inline',
    logLevel: 'silent',
    outdir: `${themePath}/assets`,
  }
  if (existsSync(esbuildConfig)) {
    const { default: config } = await import(pathToFileURL(esbuildConfig))
    const customConfig =
      typeof config === 'function'
        ? await config(command, defaultConfig)
        : config

    return {
      ...defaultConfig,
      ...customConfig,
    }
  }
  return defaultConfig
}

export default async function (
  { themePath, sourcePath, buildPath, esbuildConfig, minify },
  command
) {
  if (existsSync(sourcePath)) {
    const buildConfig = await getConfig(
      command.name(),
      themePath,
      sourcePath,
      esbuildConfig
    )
    await build(buildConfig)
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
