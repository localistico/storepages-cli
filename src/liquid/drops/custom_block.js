import { Drop } from 'liquidjs'
import { getSVGImage } from '../helpers.js'

export default class CustomBlockDrop extends Drop {
  image() {
    return getSVGImage(544, 280)
  }
  liquidMethodMissing(key) {
    return key.toUpperCase()
  }
}
