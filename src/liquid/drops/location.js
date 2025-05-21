import { Drop } from 'liquidjs'
import ImageDrop from './image.js'
import ProfileDrop from './profile.js'
import LinksDrop from './links.js'
import ReviewDrop from './review.js'
import CustomBlockDrop from './custom_block.js'

export default class LocationDrop extends Drop {
  constructor() {
    super()
    Object.assign(this, {
      id: 'e3252c9c-7609-4dbb-999e-195fbb20fa7f',
      lat: 40.4189589,
      lng: -3.7092702,
      open_status: 'open',
      timezone: 'Europe/Madrid',
      external_id: 'NIC_0001',
      name: 'Null Island Cafe',
      street_address: 'Calle de Campomanes, 6',
      locality: 'Madrid',
      region: 'Madrid',
      postcode: '28013',
      country_code: 'ES',
      phone: '+34965020305',
      national_phone_number: '965 02 03 05',
      international_phone_number: '+34 965 02 03 05',
      hours: {
        mon: [
          { to: '14:00', from: '10:00' },
          { to: '20:30', from: '17:30' },
        ],
        tue: [
          { to: '14:00', from: '10:00' },
          { to: '20:30', from: '17:30' },
        ],
        wed: [
          { to: '14:00', from: '10:00' },
          { to: '20:30', from: '17:30' },
        ],
        thu: [
          { to: '14:00', from: '10:00' },
          { to: '20:30', from: '17:30' },
        ],
        fri: [
          { to: '14:00', from: '10:00' },
          { to: '20:30', from: '17:30' },
        ],
        sat: [{ to: '14:00', from: '10:00' }],
      },
      special_hours: [],
      custom_attribute_sp_location_services_list:
        'parking,outdoor_seating,wifi',
      pages: [],
      areas: {
        city: 'Madrid',
        administrative_area_level2: 'Community of Madrid',
        administrative_area_level1: 'Community of Madrid',
        country: 'Spain',
      },
    })
  }
  localistico_tags() {
    return []
  }
  full_address() {
    return `${this.street_address}<br />\n${this.postcode} ${this.locality}<br />\n${this.region}`
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
  distance() {
    return 200
  }
  custom_attribute_menu() {
    return {}
  }
  liquidMethodMissing(key) {
    if (key.startsWith('custom_block_')) {
      return Array(2).fill(new CustomBlockDrop())
    }
    return key.toUpperCase()
  }
}
