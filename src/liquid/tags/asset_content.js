import { readFileSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'

const ALLOWED_FILE_EXT = ['.css', '.js', '.svg']

// Usage: {% asset_content name %}
export default {
  // eslint-disable-next-line no-unused-vars
  parse: function (tagToken, remainTokens) {
    this.str = tagToken.args // name
  },
  // eslint-disable-next-line no-unused-vars
  render: async function (ctx, hash) {
    const ext = extname(this.str)
    if (ALLOWED_FILE_EXT.includes(ext)) {
      const assetName = this.str
      const assetsPath = ctx.opts.globals.assetsPath
      const findPath = assetsPath.find((path) =>
        existsSync(join(path, assetName))
      )
      return readFileSync(join(findPath, assetName))
    } else {
      throw Error(`File extension "${ext}" not allowed for asset_content`)
    }
  },
}
