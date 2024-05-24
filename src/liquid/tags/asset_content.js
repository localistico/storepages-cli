import { readFileSync } from 'node:fs'
import { extname } from 'node:path'

const DEFAULT_ASSETS_CONTENT_PATH = 'assets'
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
    const assets_content_path =
      ctx.environments.assets_content_path || DEFAULT_ASSETS_CONTENT_PATH
    const filepath = `${ctx.opts.root[0]}/${assets_content_path}/${this.str}`
    if (ALLOWED_FILE_EXT.includes(ext)) {
      return readFileSync(filepath)
    } else {
      throw Error(`File extension "${ext}" not allowed for asset_content`)
    }
  },
}
