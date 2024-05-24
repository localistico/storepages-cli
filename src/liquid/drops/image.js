import { Drop } from 'liquidjs'
import { getSVGImage } from '../helpers.js'

export default class ImageDrop extends Drop {
  constructor(role = 'other') {
    super()
    this.role = role
  }
  thumb() {
    return getSVGImage(100, 100)
  }
  small() {
    return getSVGImage(512, 512)
  }
  square() {
    return getSVGImage(500, 500)
  }
  landscape() {
    return getSVGImage(1600, 500)
  }
  original() {
    return getSVGImage(1600, 1200)
  }
  liquidMethodMissing(key) {
    return key.toUpperCase()
  }
}
