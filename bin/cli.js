#!/usr/bin/env node

import { Command } from 'commander'
import dev from '../src/dev.js'
import build from '../src/build.js'
import data from '../src/data.js'

process.removeAllListeners('warning')

const program = new Command()

program
  .command('dev')
  .description('Preview a Store Page Theme.')
  .option('--theme-path <path>', 'The path to your theme directory.', './theme')
  .option('--source-path <path>', 'The path to your source directory.', './src')
  .option('--data-path <path>', 'The path to your data directory.', './data')
  .action(dev)

program
  .command('build')
  .description('Build a Store Page Theme.')
  .option('--theme-path <path>', 'The path to your theme directory.', './theme')
  .option('--source-path <path>', 'The path to your source directory.', './src')
  .option('--build-path <path>', 'The path to build your theme.', './dist')
  .option('--no-minify', 'Avoid JS & CSS assets minification')
  .action(build)

program
  .command('data')
  .description('Download Store Page information from pages_api/locations.')
  .requiredOption('--host <domain>', 'The domain of your Store Pages.')
  .option('--data-path <path>', 'The path to your data directory.', './data')
  .action(data)

program.parseAsync(process.argv)
