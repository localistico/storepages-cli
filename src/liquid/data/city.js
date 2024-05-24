import BusinessDrop from '../drops/business.js'
import LocationDrop from '../drops/location.js'
import AreaDrop from '../drops/area.js'
import { getCountry } from '../timezones.js'

export default function ({ business, locations, areas }) {
  const cities = areas.filter((a) => a.type === 'city')
  const city = cities[Math.floor(Math.random() * cities.length)]
  const cityLocations = locations.filter((l) => l.locality === city.name)
  const location = cityLocations[0]
  const country = getCountry(location.timezone)
  const siblingLocations = locations
    .filter((l) => l.region === location.region)
    .map((l) => l.locality)
  return {
    business: new BusinessDrop(business),
    area: new AreaDrop(city),
    locations: cityLocations.map((location) => new LocationDrop(location)),
    areas: [],
    parent_areas: [
      new AreaDrop({ name: country, type: 'country' }),
      new AreaDrop({
        name: location.region,
        type: 'administrative_area_level2',
      }),
    ],
    sibling_areas: [...new Set(siblingLocations)].map(
      (city) => new AreaDrop({ name: city, type: 'city' })
    ),
  }
}
