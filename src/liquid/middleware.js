import { join } from 'node:path'
import {
  getLiquidInstance,
  getThemeConfig,
  getTemplate,
  getDataContext,
  getApiLocations,
} from './helpers.js'
import { pagesApiLocationRE, pagesApiLocationsRE } from './constants.js'
import { getLocaleNativeName } from './locales.js'

/**
 * Templates Middleware
 * @param {string} themePath
 * @param {string} dataPath
 * @returns {Promise<Function>}
 */
export function templatesMiddleware(themePath, dataPath, tempPath) {
  const liquid = getLiquidInstance(themePath, tempPath)
  return async (req, res, next) => {
    try {
      const theme = getThemeConfig(themePath)
      const templates = [...theme.templates]
      const url = new URL(req.url, 'http://127.0.0.1') // Base url is only for parsing url

      const { published_locales } = theme

      let currentLocale = theme.default_locale
      let isDefaultLocale = true

      published_locales.forEach((locale) => {
        const localeUrlRegexp = new RegExp(`/(${locale}){1}(/|$)`, 'g')
        if (localeUrlRegexp.test(url.pathname)) {
          currentLocale = locale
          isDefaultLocale = false
        }
      })

      const urlPrefix = isDefaultLocale ? '' : `/${currentLocale}`

      // Index of templates (dev mode)
      if (
        (isDefaultLocale && url.pathname === '/') ||
        (!isDefaultLocale && url.pathname === `/${currentLocale}`)
      ) {
        res.end(
          await liquid.parseAndRender(
            getTemplate('index'),
            {
              templates,
            },
            {
              globals: {
                locale: currentLocale,
                published_locales,
                urlPrefix,
              },
            }
          )
        )
      }
      // Pages API Locations
      else if (url.pathname.match(pagesApiLocationsRE)) {
        const ctx = await getDataContext(dataPath, 'locator')
        const locations = getApiLocations(ctx.business, ctx.locations)
        const id = url.pathname.match(pagesApiLocationRE).groups.id
        if (id) {
          const location = locations.find((l) => l.id === id)
          if (location) {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(location))
          } else {
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Not found' }))
          }
        } else {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ locations }))
        }
      }
      // Theme templates
      else {
        const template = templates
          .filter((tpl) => {
            const templateUrl = `/${
              !isDefaultLocale ? `${currentLocale}/` : ''
            }${tpl.key}`
            return templateUrl === url.pathname
          })
          .shift()
        if (template) {
          const ctx = await getDataContext(dataPath, template.type)
          ctx.canonical_tag = `<link rel="canonical" href="/${template.key}" />`
          ctx.canonical_url = `/${template.key}`
          ctx.theme_variables = theme.variables || {}
          ctx.published_locales =
            theme.published_locales.map((l) => ({
              code: l,
              name: getLocaleNativeName(l) ?? `Locale ${l.toUpperCase()} name`,
              url: `/${l}/${template.key}`,
            })) || []
          ctx.locale = currentLocale
          ctx.query_params = Object.fromEntries(url.searchParams)

          const html = await liquid.renderFile(
            join('templates', template.template),
            ctx,
            {
              globals: {
                locale: currentLocale,
                published_locales,
                urlPrefix,
              },
            }
          )
          res.setHeader('Content-Type', template.content_type)
          res.end(html)
        } else {
          next()
        }
      }
    } catch (errorDescription) {
      res.statusCode = 500
      res.end(
        await liquid.parseAndRender(getTemplate('error'), {
          errorDescription,
        })
      )
    }
  }
}

/**
 * 404 Middleware
 * @param {string} themePath
 * @param {string} dataPath
 * @returns {Promise<Function>}
 */
export function notFoundMiddleware(themePath, dataPath, tempPath) {
  const liquid = getLiquidInstance(themePath, tempPath)
  return async (req, res) => {
    try {
      const ctx = await getDataContext(dataPath, 'locator')
      const html = await liquid.renderFile('404', ctx)
      res.setHeader('Content-Type', 'text/html')
      res.statusCode = 404
      res.end(html)
    } catch (errorDescription) {
      res.statusCode = 500
      res.end(
        await liquid.parseAndRender(getTemplate('error'), {
          errorDescription,
        })
      )
    }
  }
}
