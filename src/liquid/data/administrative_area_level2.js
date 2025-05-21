import BusinessDrop from '../drops/business.js'
import LocationDrop from '../drops/location.js'
import AreaDrop from '../drops/area.js'

export default function AdministrativeAreaLevel2() {
  const location = new LocationDrop()
  return {
    business: new BusinessDrop(),
    area: new AreaDrop({
      name: location.areas.administrative_area_level2,
      type: 'administrative_area_level2',
    }),
    locations: [location],
    areas: [
      new AreaDrop({
        name: location.areas.city,
        type: 'city',
      }),
    ],
    parent_areas: [
      new AreaDrop({
        name: location.areas.country,
        type: 'country',
      }),
      new AreaDrop({
        name: location.areas.administrative_area_level1,
        type: 'administrative_area_level1',
      }),
    ],
    sibling_areas: [],
  }
}
