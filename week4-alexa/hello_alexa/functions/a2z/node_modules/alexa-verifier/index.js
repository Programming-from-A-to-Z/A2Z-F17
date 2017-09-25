var crypto          = require('crypto')
var fetchCert       = require('./fetch-cert')
var request         = require('request')
var url             = require('url')
var validateCert    = require('./validate-cert')
var validateCertUri = require('./validate-cert-uri')
var validator       = require('validator')


// constants
var TIMESTAMP_TOLERANCE = 150
var SIGNATURE_FORMAT = 'base64'

function getCert(cert_url, callback) {
  var options = { url: url.parse(cert_url) }
  var result = validateCertUri(options.url)
  if (result !== true) {
    return process.nextTick(callback, result)
  }

  fetchCert(options, function(er, pem_cert) {
    if (er) {
      return callback(er)
    }

    er = validateCert(pem_cert)
    if (er) {
      return callback(er)
    }

    callback(er, pem_cert)
  })
}


// returns true if the signature for the request body is valid, false otherwise
function isValidSignature(pem_cert, signature, requestBody) {
  var verifier = crypto.createVerify('RSA-SHA1')
  verifier.update(requestBody, 'utf8')
  return verifier.verify(pem_cert, signature, SIGNATURE_FORMAT)
}


// determine if a timestamp is valid for a given request with a tolerance of
// TIMESTAMP_TOLERANCE seconds
// returns undefined if valid, or an error string otherwise
function validateTimestamp(requestBody) {
  var d, e, error, now, oldestTime, request_json
  try {
    request_json = JSON.parse(requestBody)
  } catch (error) {
    e = error
    return 'request body invalid json'
  }
  if (!(request_json.request && request_json.request.timestamp)) {
    return 'Timestamp field not present in request'
  }
  d = new Date(request_json.request.timestamp)
  now = new Date()
  oldestTime = now.getTime() - (TIMESTAMP_TOLERANCE * 1000)
  if (d.getTime() < oldestTime) {
    return 'Request is from more than ' + TIMESTAMP_TOLERANCE + ' seconds ago'
  }
}


// certificate validator express middleware for amazon echo
module.exports = function verifier(cert_url, signature, requestBody, callback) {
  var er

  if(!cert_url) {
    return process.nextTick(callback, 'missing certificate url')
  }

  if (!signature) {
    return process.nextTick(callback, 'missing signature')
  }
  if (!requestBody) {
    return process.nextTick(callback, 'missing request (certificate) body')
  }

  if (!validator.isBase64(signature)) {
    return process.nextTick(callback, 'invalid signature (not base64 encoded)')
  }
  er = validateTimestamp(requestBody)

  if (er) {
    return process.nextTick(callback, er)
  }

  getCert(cert_url, function(er, pem_cert) {
    if (er) {
      return callback(er)
    }
    if (!isValidSignature(pem_cert, signature, requestBody)) {
      return callback('invalid signature')
    }
    callback()
  })
}
