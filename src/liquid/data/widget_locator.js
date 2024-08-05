import BusinessDrop from '../drops/business.js'
import LocationDrop from '../drops/location.js'
import AreaDrop from '../drops/area.js'

export default function ({ business, locations, areas }) {
  return {
    business: new BusinessDrop(business),
    locations: locations.map((location) => new LocationDrop(location)),
    areas: areas.map((area) => new AreaDrop(area)),
  }
}
