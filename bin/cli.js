#!/usr/bin/env node

import { Command } from 'commander'
import dev from '../src/dev.js'
import build from '../src/build.js'

process.removeAllListeners('warning')

const program = new Command()

program
  .command('dev')
  .description('Preview a Store Page Theme.')
  .option('--theme-path <path>', 'The path to your theme directory.', './theme')
  .option('--source-path <path>', 'The path to your source directory.', './src')
  .option(
    '--temp-path <path>',
    'The path to build your source directory.',
    './.temp'
  )
  .option('--data-path <path>', 'The path to your data directory.', './data')
  .option(
    '--esbuild-config <filepath>',
    'The esbuild config file.',
    './esbuild.config.js'
  )
  .action(dev)

program
  .command('build')
  .description('Build a Store Page Theme.')
  .option('--theme-path <path>', 'The path to your theme directory.', './theme')
  .option('--source-path <path>', 'The path to your source directory.', './src')
  .option(
    '--temp-path <path>',
    'The path to build your source directory.',
    './.temp'
  )
  .option('--build-path <path>', 'The path to build your theme.', './dist')
  .option(
    '--esbuild-config <config>',
    'The esbuild config file.',
    './esbuild.config.js'
  )
  .option('--no-minify', 'Avoid JS & CSS assets minification')
  .action(build)

program.parseAsync(process.argv)
