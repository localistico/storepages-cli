import BusinessDrop from '../drops/business.js'
import LocationDrop from '../drops/location.js'
import AreaDrop from '../drops/area.js'
import { getCountry } from '../timezones.js'

export default function ({ business, locations, areas }) {
  const administrativeAreas = areas.filter(
    (a) => a.type === 'administrative_area_level2'
  )
  const area =
    administrativeAreas[Math.floor(Math.random() * administrativeAreas.length)]
  const areaLocations = locations
    .filter((l) => l.region === area.name)
    .map((location) => new LocationDrop(location))
  const location = areaLocations[0]
  const country = getCountry(location.timezone)
  const cityLocations = locations
    .filter((l) => l.region === location.region)
    .map((l) => l.locality)
  return {
    business: new BusinessDrop(business),
    area: new AreaDrop(area),
    locations: areaLocations,
    areas: [...new Set(cityLocations)].map(
      (city) => new AreaDrop({ name: city, type: 'city' })
    ),
    parent_areas: [new AreaDrop({ name: country, type: 'country' })],
    sibling_areas: [],
  }
}
