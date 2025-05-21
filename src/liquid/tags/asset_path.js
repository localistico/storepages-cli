const DEFAULT_ASSETS_BASE_URL = '/assets'

// Usage: {% asset_path path %}
export default {
  // eslint-disable-next-line no-unused-vars
  parse: function (tagToken, remainTokens) {
    this.str = tagToken.args // name
  },
  // eslint-disable-next-line no-unused-vars
  render: function (ctx, hash) {
    return `${DEFAULT_ASSETS_BASE_URL}/${this.str}`
  },
}
