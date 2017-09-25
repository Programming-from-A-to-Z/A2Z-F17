var fetchCert = require('../fetch-cert')
var nock      = require('nock')
var test      = require('tap').test
var url       = require('url')


var cert_url = url.parse('https://s3.amazonaws.com/echo.api/echo-api-cert.pem')

test('fetchCert should ignore response for error HTTP status', function (t) {
  var options = { url: cert_url }

  nock('https://s3.amazonaws.com').get(cert_url.path).reply(400, 'Bad Request')

  fetchCert(options, function (er, pem_cert) {
    t.notEqual(er, undefined)
    t.equal(pem_cert, undefined)
    t.end()
  })
})


test('fetchCert should call back with response body for OK HTTP status', function (t) {
  var options = { url: cert_url }

  nock('https://s3.amazonaws.com').get(cert_url.path).reply(200, 'mock pem data')

  fetchCert(options, function (er, pem_cert) {
    t.equal(er, undefined)
    t.equal(pem_cert, 'mock pem data')
    t.end()
  })
})


test('fetchCert should hit cache for subsequent certificate reqs', function (t) {
  var options = { url: cert_url, cache: { } }
  var pem_data = 'mock pem data'

  nock('https://s3.amazonaws.com').get(cert_url.path).reply(200, 'mock pem data')

  fetchCert(options, function (er, pem_cert, servedFromCache) {
    t.equal(er, undefined)
    t.equal(pem_cert, 'mock pem data')
    t.equal(servedFromCache, false)

    fetchCert(options, function (er, pem_cert, servedFromCache) {
      t.equal(pem_cert, 'mock pem data')
      t.equal(servedFromCache, true)
      t.end()
    })
  })
})
