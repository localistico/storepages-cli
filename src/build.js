import { existsSync } from 'node:fs'
import { cpSync, rmSync } from 'node:fs'
import { basename } from 'node:path'
import { pathToFileURL } from 'url'
import { zip } from 'zip-a-folder'
import { build } from 'esbuild'
import { getThemeConfig, slugify } from './liquid/helpers.js'
import packageJson from "../package.json" with { type: "json" }

function getBanner(theme) {
  const name = theme.name
  const version = `${packageJson.name}#${packageJson.version}`
  const author = 'Localistico'
  const date = `Generated on ${new Date().toDateString()}`
  return `/**\n* Theme: ${name}\n* Version: ${version}\n* Author: ${author}\n* ${date}\n*/`
}

export async function getBuildConfig(command, themePath, sourcePath, tempPath, esbuildConfig) {
  const theme = getThemeConfig(themePath)
  const banner = getBanner(theme)
  const defaultConfig = {
    entryPoints: [
      `${sourcePath}/*.js`,
      `${sourcePath}/*.ts`,
      `${sourcePath}/*.jsx`,
      `${sourcePath}/*.tsx`,
    ],
    banner: {
      js: banner,
      css: banner,
    },
    bundle: true,
    sourcemap: 'inline',
    logLevel: 'silent',
    outdir: `${tempPath}/assets`,
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
  { themePath, sourcePath, tempPath, buildPath, esbuildConfig, minify },
  command
) {
  const theme = getThemeConfig(themePath)
  rmSync(buildPath, { force: true, recursive: true })
  const buildThemePath = `${buildPath}/${basename(themePath)}`
  cpSync(themePath, buildThemePath, { force: true, recursive: true })

  if (existsSync(sourcePath)) {
    const buildConfig = await getBuildConfig(
      command.name(),
      themePath,
      sourcePath,
      tempPath,
      esbuildConfig
    )
    await build(buildConfig)
    const assetsPath = `${buildThemePath}/assets`
    cpSync(buildConfig.outdir, assetsPath, { force: true, recursive: true })
  }

  if (minify) {
    const assetsPath = `${buildThemePath}/assets`
    const banner = getBanner(theme)
    await build({
      entryPoints: [`${assetsPath}/*.js`, `${assetsPath}/*.css`],
      outdir: assetsPath,
      allowOverwrite: true,
      minify: true,
      banner: {
        js: banner,
        css: banner,
      },
      logLevel: 'silent',
    })
  }
  const buildThemeZipPath = `${buildPath}/${slugify(theme.name)}–${basename(themePath)}.zip`
  await zip(buildThemePath, buildThemeZipPath)
}
