var test            = require('tap').test
var unroll          = require('unroll')
var url             = require('url')
var validateCertUri = require('../validate-cert-uri')


unroll.use(test)

unroll('verifier.validateCertUri should be #valid for #url',
  function(t, testArgs) {
    var cert_uri = url.parse(testArgs['url'])
    var result = validateCertUri(cert_uri)
    var valid = testArgs['valid']
    t.notEqual(valid, undefined)
    if (valid === true) {
      t.equal(result, true)
    } else {
      // I don't care too much about the error message, so do negated
      // comparison with 'true':
      t.notEqual(result, true)
    }
    t.end()
  },
  [
    ['valid', 'url'],
    [true, 'https://s3.amazonaws.com/echo.api/echo-api-cert.pem'],
    [true, 'HTTPS://s3.amazonaws.com/echo.api/echo-api-cert.pem'],
    [true, 'https://S3.AMAZONAWS.COM/echo.api/echo-api-cert.pem'],
    [true, 'https://s3.amazonaws.com:443/echo.api/echo-api-cert.pem'],
    [true, 'https://s3.amazonaws.com/echo.api/../echo.api/echo-api-cert.pem'],
    [false, 'http://s3.amazonaws.com/echo.api/echo-api-cert.pem'],  // (invalid protocol)
    [false, 'https://notamazon.com/echo.api/echo-api-cert.pem'],  // (invalid hostname)
    [false, 'https://s3.amazonaws.com/EcHo.aPi/echo-api-cert.pem'],  // (invalid path)
    [false, 'https://s3.amazonaws.com/invalid.path/echo-api-cert.pem'],  // (invalid path)
    [false, 'https://s3.amazonaws.com:563/echo.api/echo-api-cert.pem']  // (invalid port)
  ]
)
