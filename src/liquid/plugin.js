import asset_path from './tags/asset_path.js'
import snippet from './tags/snippet.js'
import asset_content from './tags/asset_content.js'
import page_url from './tags/page_url.js'
import find_page_url from './tags/find_page_url.js'
import location_json_ld from './tags/location_json_ld.js'
import content_for_head from './tags/content_for_head.js'

import group_by from './filters/group_by.js'
import distance_to_human from './filters/distance_to_human.js'
import parse_json from './filters/parse_json.js'
import parse_csv from './filters/parse_csv.js'
import t from './filters/t.js'

export function plugin() {
  // Tags
  this.registerTag('asset_path', asset_path)
  this.registerTag('snippet', snippet)
  this.registerTag('asset_content', asset_content)
  this.registerTag('page_url', page_url)
  this.registerTag('find_page_url', find_page_url)
  this.registerTag('location_json_ld', location_json_ld)
  this.registerTag('content_for_head', content_for_head)

  // Filters
  this.registerFilter('group_by', group_by)
  this.registerFilter('distance_to_human', distance_to_human)
  this.registerFilter('parse_json', parse_json)
  this.registerFilter('parse_csv', parse_csv)
  this.registerFilter('t', t)
}
