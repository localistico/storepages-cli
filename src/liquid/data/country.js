import BusinessDrop from '../drops/business.js'
import LocationDrop from '../drops/location.js'
import AreaDrop from '../drops/area.js'

export default function Country() {
  const location = new LocationDrop()
  return {
    business: new BusinessDrop(),
    area: new AreaDrop({ name: location.areas.country, type: 'country' }),
    locations: [location],
    areas: [],
    parent_areas: [],
    sibling_areas: [],
  }
}
