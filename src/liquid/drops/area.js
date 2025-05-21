import { Drop } from 'liquidjs'
import { slugify } from '../helpers.js'

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
