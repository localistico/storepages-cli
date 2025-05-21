import { Drop } from 'liquidjs'
import ImageDrop from './image.js'
import CustomBlockDrop from './custom_block.js'

export default class BusinessDrop extends Drop {
  constructor() {
    super()
    Object.assign(this, {
      name: 'Null Island Cafe',
      exposed_custom_attributes_in_api: [
        'custom_attribute_sp_location_services_list',
      ],
    })
  }
  logo() {
    return new ImageDrop('main')
  }
  pages() {
    return []
  }
  custom_attribute_sp_business_services_list() {
    return 'parking:Parking,wifi:Wi-Fi,takeout:Takeout,delivery:Delivery'
  }
  liquidMethodMissing(key) {
    if (key.startsWith('custom_block_')) {
      return Array(2).fill(new CustomBlockDrop())
    }
    return key.toUpperCase()
  }
}
