import BusinessDrop from '../drops/business.js'
import LocationDrop from '../drops/location.js'
import AreaDrop from '../drops/area.js'
import { getCountry } from '../timezones.js'

export default function ({ business, locations }) {
  const location = locations[Math.floor(Math.random() * locations.length)]
  const country = getCountry(location.timezone)
  return {
    business: new BusinessDrop(business),
    location: new LocationDrop(location),
    locations: locations.map((location) => new LocationDrop(location)),
    areas: [
      new AreaDrop({ name: country, type: 'country' }),
      new AreaDrop({
        name: location.region,
        type: 'administrative_area_level2',
      }),
      new AreaDrop({ name: location.locality, type: 'city' }),
    ],
  }
}
