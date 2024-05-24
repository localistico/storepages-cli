import BusinessDrop from '../drops/business.js'
import LocationDrop from '../drops/location.js'
import AreaDrop from '../drops/area.js'
import { getCountry } from '../timezones.js'

export default function ({ business, locations, areas }) {
  const countries = areas.filter((a) => a.type === 'country')
  const country = countries[Math.floor(Math.random() * countries.length)]
  const countryLocations = locations.filter(
    (l) => getCountry(l.timezone) === country.name
  )
  return {
    business: new BusinessDrop(business),
    area: new AreaDrop(country),
    locations: countryLocations.map((location) => new LocationDrop(location)),
    areas: [],
    parent_areas: [],
    sibling_areas: countries.map((a) => new AreaDrop(a)),
  }
}
