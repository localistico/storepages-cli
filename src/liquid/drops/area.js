import { Drop } from 'liquidjs'

function slugify(title, { separator = '-' } = {}) {
  let slug = title.normalize()
  slug = slug.replace(/[^A-Za-z0-9\s]/g, '').trim()
  slug = slug.replace(/\s+/g, separator)
  slug = slug.toLowerCase()
  return slug
}

export default class AreaDrop extends Drop {
  constructor(attrs) {
    super()
    const name = attrs.name ?? attrs.type
    this.display_name = name
    this.slug = slugify(name)
    Object.assign(this, attrs)
  }
  pages() {
    return []
  }
  liquidMethodMissing(key) {
    return key.toUpperCase()
  }
}
