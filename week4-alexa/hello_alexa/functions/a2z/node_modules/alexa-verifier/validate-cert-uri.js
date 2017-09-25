// constants
var VALID_CERT_HOSTNAME   = 's3.amazonaws.com'
var VALID_CERT_PATH_START = '/echo.api/'
var VALID_CERT_PORT       = '443'

// parse a certificate and check it's contents for validity
module.exports = function validateCertUri(cert_uri) {
  if (cert_uri.protocol !== 'https:') {
    return 'Certificate URI MUST be https: ' + cert_uri
  }
  if (cert_uri.port && (cert_uri.port !== VALID_CERT_PORT)) {
    return 'Certificate URI port MUST be ' + VALID_CERT_PORT + ', was: ' + cert_uri.port
  }
  if (cert_uri.hostname !== VALID_CERT_HOSTNAME) {
    return 'Certificate URI hostname must be ' + VALID_CERT_HOSTNAME + ': ' + cert_uri.hostname
  }
  if (cert_uri.path.indexOf(VALID_CERT_PATH_START) !== 0) {
    return 'Certificate URI path must start with ' + VALID_CERT_PATH_START + ': ' + cert_uri
  }
  return true
}
