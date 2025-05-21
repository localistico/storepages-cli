import BusinessDrop from '../drops/business.js'
import LocationDrop from '../drops/location.js'
import AreaDrop from '../drops/area.js'

export default function City() {
  const location = new LocationDrop()
  return {
    business: new BusinessDrop(),
    area: new AreaDrop({ name: location.areas.city, type: 'city' }),
    locations: [location],
    areas: [],
    parent_areas: [
      new AreaDrop({
        name: location.areas.country,
        type: 'country',
      }),
      new AreaDrop({
        name: location.areas.administrative_area_level1,
        type: 'administrative_area_level1',
      }),
      new AreaDrop({
        name: location.areas.administrative_area_level2,
        type: 'administrative_area_level2',
      }),
    ],
    sibling_areas: [],
  }
}
