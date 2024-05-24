import { Drop } from 'liquidjs'

export default class LinksDrop extends Drop {
  liquidMethodMissing(key) {
    return `https://${key.toUpperCase()}.com`
  }
}
