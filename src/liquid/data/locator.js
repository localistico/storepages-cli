import BusinessDrop from '../drops/business.js'
import LocationDrop from '../drops/location.js'
import AreaDrop from '../drops/area.js'

export default function Locator() {
  const location = new LocationDrop()
  const areas = Object.entries(location.areas).map(
    ([type, name]) => new AreaDrop({ name, type })
  )
  return {
    business: new BusinessDrop(),
    locations: [location],
    areas,
  }
}
