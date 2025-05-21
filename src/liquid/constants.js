export const paramsRE =
  /([\w-]+)\s*=\s*(?:("[^"\\]*(?:\\.[^"\\]*)*")|('[^'\\]*(?:\\.[^'\\]*)*')|([\w\.-]+))/g
export const keyParamsRE = /^([^\s]+)(.*)/
export const pagesApiLocationsRE = /^\/pages_api\/.+/
export const pagesApiLocationRE = /^\/pages_api\/.+\/locations(\/(?<id>\S+))?/
