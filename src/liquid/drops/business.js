import { Drop } from 'liquidjs'
import ImageDrop from './image.js'
import CustomBlockDrop from './custom_block.js'

export default class BusinessDrop extends Drop {
  constructor(attrs) {
    super()
    Object.assign(this, attrs)
  }
  logo() {
    return new ImageDrop('main')
  }
  custom_attribute_sp_business_services_list() {
    return 'parking:Parking,wifi:Wi-Fi,takeout:Takeout,delivery:Delivery'
  }
  pages() {
    return []
  }
  liquidMethodMissing(key) {
    if (key.startsWith('custom_block_')) {
      return Array(2).fill(new CustomBlockDrop())
    }
    return key.toUpperCase()
  }
}
