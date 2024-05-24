import { Drop } from 'liquidjs'
import ImageDrop from './image.js'
import ProfileDrop from './profile.js'
import LinksDrop from './links.js'
import ReviewDrop from './review.js'
import CustomBlockDrop from './custom_block.js'
import { getCountry } from '../timezones.js'

export default class LocationDrop extends Drop {
  constructor({ pages, custom_attributes, ...attrs }) {
    super()
    Object.assign(this, attrs, custom_attributes)
  }
  localistico_tags() {
    return []
  }
  full_address() {
    return `${this.street_address}<br />\n${this.postcode} ${this.locality}<br />\n${this.region}`
  }
  national_phone_number() {
    return this.phone
  }
  international_phone_number() {
    return this.phone
  }
  links() {
    return [
      new ProfileDrop('apple_maps'),
      new ProfileDrop('bing'),
      new ProfileDrop('facebook'),
      new ProfileDrop('google'),
    ]
  }
  images() {
    return [new ImageDrop('cover'), ...Array(5).fill(new ImageDrop())]
  }
  highlighted_reviews() {
    return Array(5).fill(new ReviewDrop())
  }
  additional_links() {
    return new LinksDrop()
  }
  areas() {
    return {
      city: this.locality,
      administrative_area_level2: this.region,
      administrative_area_level1: null,
      country: getCountry(this.timezone),
    }
  }
  distance() {
    return 200
  }
  custom_attribute_sp_location_services_list() {
    return 'parking,outdoor_seating,wifi'
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
