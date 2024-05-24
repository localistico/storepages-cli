import { readFileSync } from 'node:fs'

const DEFAULT_ASSETS_BASE_URL = '/assets'
const DEFAULT_ASSETS_CONTENT_PATH = 'assets'

// Usage: {% asset_path path %}
export default {
  // eslint-disable-next-line no-unused-vars
  parse: function (tagToken, remainTokens) {
    this.str = tagToken.args // name
  },
  // eslint-disable-next-line no-unused-vars
  render: function (ctx, hash) {
    const assets_base_url =
      ctx.environments.assets_base_url || DEFAULT_ASSETS_BASE_URL
    const assets_path =
      ctx.environments.assets_content_path || DEFAULT_ASSETS_CONTENT_PATH
    const filepath = `${ctx.opts.root[0]}/${assets_path}/${this.str}`
    readFileSync(filepath)
    return `${assets_base_url}/${this.str}`
  },
}
