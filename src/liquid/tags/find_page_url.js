// Usage: {% find_page_url template_name model %}
export default {
  parse: function (tagToken, remainTokens) {
    this.name = tagToken.args.split(' ')[0] // template_name
    this.model = tagToken.args.split(' ')[1] // model
  },
  render: function (ctx, hash) {
    //const entity = ctx.get([this.model])
    const urlPrefix = ctx.globals.urlPrefix || ''
    return `${urlPrefix}/${this.name}`
  },
}
