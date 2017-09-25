var request = require('request')


// default in-memory cache for downloaded certificates
var globalCache = {}

module.exports = function fetchCert(options, callback) {
  var url = options.url
  var cache = options.cache || globalCache
  var cachedResponse = cache[url.href]
  var servedFromCache = false
  if (cachedResponse) {
    servedFromCache = true
    process.nextTick(callback, undefined, cachedResponse, servedFromCache)
    return
  }

  request.get(url.href, function(er, response, body) {
    var statusCode
    if (response && 200 === response.statusCode) {
      cache[url.href] = body
      callback(undefined, body, servedFromCache)
    } else {
      statusCode = response ? response.statusCode : 0
      callback('Failed to download certificate at: ' + url.href + '. Response code: ' + statusCode + ', error: ' + er)
    }
  })
}
