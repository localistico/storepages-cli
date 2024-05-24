import { Drop } from 'liquidjs'

export default class ProfileDrop extends Drop {
  constructor(platform = 'store_pages') {
    super()
    this.platform = platform
  }
  owned() {
    return true
  }
  rating() {
    return 4.7
  }
  max_rating() {
    return 5
  }
  total_reviews() {
    return 6389
  }
  liquidMethodMissing(key) {
    return key.toUpperCase()
  }
}
