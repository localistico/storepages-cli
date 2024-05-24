import { resolve, join, dirname } from 'node:path'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'url'
import { Liquid } from 'liquidjs'
import { plugin } from './plugin.js'
import { getCountry } from './timezones.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
/**
 * Returns a instance of liquid engine for the themepath
 * @param {string} themePath
 */
export function getLiquidInstance(themePath) {
  // Init the liquid engine
  const liquid = new Liquid({
    root: themePath,
    extname: '.liquid',
  })
  // Add store pages tags and filters
  liquid.plugin(plugin)
  return liquid
}

/**
 * Returns template content from the templates folder
 * @param {string} templateName
 */
export function getTemplate(templateName) {
  const templatePath = resolve(
    __dirname,
    `../liquid/templates/${templateName}.liquid`
  )
  return readFileSync(templatePath, 'utf-8')
}

/**
 * Returns the theme.json config file from theme folder
 * @param {string} themePath
 */
export function getThemeConfig(themePath) {
  const themeConfigFilepath = join(themePath, 'theme.json')
  return JSON.parse(readFileSync(themeConfigFilepath, 'utf-8'))
}

/**
 * Returns JSON from data file
 * @param {string} dataPath
 */
export function getData(dataPath) {
  const dataFilePath = join(dataPath, 'pages_api_locations.json')
  if (existsSync(dataFilePath)) {
    const { locations } = getParsedJsonFromFile(dataFilePath)
    // Get Areas
    const groupByCountry = groupBy(locations, (l) => getCountry(l.timezone))
    const groupByAdministrativeAreaLevel2 = groupBy(locations, (l) => l.region)
    const groupByCity = groupBy(locations, (l) => l.locality)
    const countryAreas = Object.keys(groupByCountry).map((key) => {
      return { name: key, type: 'country' }
    })
    const administrativeAreaLevel2Areas = Object.keys(
      groupByAdministrativeAreaLevel2
    ).map((key) => {
      return { name: key, type: 'administrative_area_level2' }
    })
    const cityAreas = Object.keys(groupByCity).map((key) => {
      return { name: key, type: 'city' }
    })
    // Get Business
    const business = {
      exposed_custom_attributes_in_api: Object.keys(
        locations[0].custom_attributes
      ),
    }
    // Return data
    return {
      business,
      locations,
      areas: [...countryAreas, ...administrativeAreaLevel2Areas, ...cityAreas],
    }
  } else {
    const fallbackDataPath = join(resolve(__dirname, '../data'), 'data.json')
    return getParsedJsonFromFile(fallbackDataPath)
  }
}

/**
 * Returns grouped locations
 * @param {string} items
 * @param {string} callbackFn
 */
function groupBy(items, callbackFn) {
  return items.reduce((group, item) => {
    const key = callbackFn(item)
    if (key) {
      group[key] = group[key] ?? []
      group[key].push(item)
    }
    return group
  }, {})
}

/**
 * Returns JSON from data file
 * @param {string} dataPath
 * @param {string} dataType
 */
export async function getDataContext(dataPath, dataType, locations = []) {
  const dataFilePath = join(dataPath, `${dataType}.json`)
  if (existsSync(dataFilePath)) {
    const context = readFileSync(dataFilePath)
    return JSON.parse(context, 'utf-8')
  }
  const fallbackDataPath = join(resolve(__dirname, `./data`), `${dataType}.js`)
  const module = await import(fallbackDataPath)
  return module.default(locations)
}

/**
 * Returns JSON from data file
 * @param {string} dataFilepath
 */
export function getParsedJsonFromFile(dataFilepath) {
  return JSON.parse(readFileSync(dataFilepath), 'utf-8')
}

/**
 * Returns SVG base64 image data
 * @param {string} width
 * @param {string} height
 */
export function getSVGImage(width, height) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <rect width="${width}" height="${height}" fill="#CCCCCC"></rect>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="${
      width * 0.04
    }px" fill="#333333">${width}x${height}</text>
  </svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/**
 * Returns a flatten version of the object tree
 * @param {object} target Object
 * @returns
 */
export function flatten(target) {
  const output = {}

  function step(object, prev) {
    Object.keys(object).forEach(function (key) {
      const value = object[key]
      const isarray = Array.isArray(value)
      const type = Object.prototype.toString.call(value)
      const isobject = type === '[object Object]' || type === '[object Array]'

      const newKey = prev ? prev + '.' + key : key

      if (!isarray && isobject && Object.keys(value).length) {
        return step(value, newKey)
      }

      output[newKey] = value
    })
  }

  step(target)

  return output
}
