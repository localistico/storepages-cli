import { mkdirSync, existsSync, writeFileSync } from 'node:fs'

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

export default async function ({ dataPath, host }) {
  if (!existsSync(dataPath)) {
    mkdirSync(dataPath)
  }
  const response = await fetch(`https://${host}/pages_api/v1/locations`)
  const data = await response.json()
  writeFileSync(
    `${dataPath}/pages_api_locations.json`,
    JSON.stringify(data),
    'utf8'
  )
}
