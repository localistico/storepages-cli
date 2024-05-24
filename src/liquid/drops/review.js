import { Drop } from 'liquidjs'

export default class ReviewDrop extends Drop {
  constructor(platform = 'google') {
    super()
    this.platform = platform
  }
  date() {
    const [fullDate] = new Date().toJSON().split('T')
    return `${fullDate} 14:58:06 UTC`
  }
  rating() {
    return 5
  }
  sentiment() {
    return 'good'
  }
  photos() {
    return []
  }
  liquidMethodMissing(key) {
    return key.toUpperCase()
  }
}
