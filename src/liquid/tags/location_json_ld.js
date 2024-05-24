// Usage: {% location_json_ld [location_id] %}
/**
 * {% location_json_ld location.id %}
 * {% location_json_ld location.id name='Example Name' type='ExampleType' description='my custom description' template_key='my-awesome-template' %}
 */
import { paramsRE, keyParamsRE } from '../constants.js'

export default {
  parse: function (tagToken, remainTokens) {
    this.params = {}
    let match = keyParamsRE.exec(tagToken.args)
    this.location_id = match[1]
    const additionalParams = match[2].trim()
    if (additionalParams) {
      let match
      // eslint-disable-next-line no-cond-assign
      while ((match = paramsRE.exec(additionalParams))) {
        let key = match[1]
        let value = match[3].replace(/^'/, '').replace(/'$/, '')
        this.params[key] = value
      }
    }
  },

  render: async function (ctx, hash) {
    return await this.liquid.parseAndRenderSync(
      `{
        "@context": "http://schema.org",
        "@id": "{% find_page_url ${
          this.params['template_key'] || 'store-page'
        } location.id %}",
        "@type": "${this.params['type'] || 'LocalBusiness'}",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "{{ location.street_address | escape | strip }}",
          "postalCode": "{{ location.postcode | escape | strip }}",
          "addressLocality": "{{ location.locality | escape | strip }}",
          "addressRegion": "{{ location.region | escape | strip }}",
          "addressCountry": "{{ location.country_code | escape | strip }}",
        },
        "identifier": "{{location.id}}",
        "name": "{{ ${
          this.params['name'] || 'location.name'
        } | escape | strip }}",
        "image": "{{ business.logo.original }}",
        "telephone": "{{ location.phone | escape | strip }}",
        "description": "{{ ${
          this.params['description']
            ? `"${this.params['description']}"`
            : 'location.summary'
        } | newline_to_br | strip_newlines | replace: '<br /><br />', ' ' | replace: '<br />', ' ' | strip_html | escape | strip }}",
        "url": "{% find_page_url ${
          this.params['template_key'] || 'store-page'
        } location.id %}",
        "openingHoursSpecification": [{"@type":"OpeningHoursSpecification","dayOfWeek":"Friday","opens":"09:00","closes":"21:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Monday","opens":"09:00","closes":"21:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"09:00","closes":"21:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Thursday","opens":"09:00","closes":"21:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Tuesday","opens":"09:00","closes":"21:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Wednesday","opens":"09:00","closes":"21:00"}],
        "sameAs": ["https://maps.apple.com/", "https://www.bing.com/maps", "https://maps.google.com", "https://facebook.com"],
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "{{location.lat}}",
          "longitude": "{{location.lng}}",
        },
      }`,
      ctx
    )
  },
}
