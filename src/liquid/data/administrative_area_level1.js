import BusinessDrop from '../drops/business.js'
import LocationDrop from '../drops/location.js'
import AreaDrop from '../drops/area.js'

export default function AdministrativeAreaLevel1() {
  const location = new LocationDrop()
  return {
    business: new BusinessDrop(),
    area: new AreaDrop({
      name: location.areas.administrative_area_level1,
      type: 'administrative_area_level1',
    }),
    locations: [location],
    areas: [
      new AreaDrop({
        name: location.areas.city,
        type: 'city',
      }),
      new AreaDrop({
        name: location.areas.administrative_area_level2,
        type: 'administrative_area_level2',
      }),
    ],
    parent_areas: [
      new AreaDrop({
        name: location.areas.country,
        type: 'country',
      }),
    ],
    sibling_areas: [],
  }
}
