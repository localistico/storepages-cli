export const paramsRE =
  /([\w-]+)\s*=\s*(?:("[^"\\]*(?:\\.[^"\\]*)*")|('[^'\\]*(?:\\.[^'\\]*)*')|([\w\.-]+))/g
export const keyParamsRE = /^([^\s]+)(.*)/
export const pagesApiLocationsRE = /\/pages_api\/(.+)\/locations$/
export const pagesApiLocationRE = /\/pages_api\/(.+)\/locations\/(\S)+/
