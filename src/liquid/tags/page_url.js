// Usage: {% page_url name [location] %}
export default {
  parse: function (tagToken, remainTokens) {
    this.name = tagToken.args.split(' ')[0] // name
    this.model = tagToken.args.split(' ')[1] // model
  },

  render: function (ctx, hash) {
    return `/${this.name}`
  },
}
