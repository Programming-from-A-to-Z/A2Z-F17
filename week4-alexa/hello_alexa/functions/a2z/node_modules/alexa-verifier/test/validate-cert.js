var pki          = require('node-forge').pki
var request      = require('request')
var test         = require('tap').test
var url          = require('url')
var validateCert = require('../validate-cert')


var oldCertUrl = 'https://s3.amazonaws.com/echo.api/echo-api-cert.pem'

var latestCertUrl = 'https://s3.amazonaws.com/echo.api/echo-api-cert-4.pem'

function getEchoCert(certUrl, callback) {
  request(certUrl, function(err, res, body) {
    callback(err, body)
  })
}

function createInvalidCert() {
  var keys = pki.rsa.generateKeyPair(512)
  var cert = pki.createCertificate()
  cert.publicKey = keys.publicKey
  // alternatively set public key from a csr
  //cert.publicKey = csr.publicKey
  cert.serialNumber = '01'
  cert.validity.notBefore = new Date()
  cert.validity.notAfter = new Date()
  cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1)
  var attrs = [{
    name: 'commonName',
    value: 'example.org'
  }, {
    name: 'countryName',
    value: 'US'
  }, {
    shortName: 'ST',
    value: 'Virginia'
  }, {
    name: 'localityName',
    value: 'Blacksburg'
  }, {
    name: 'organizationName',
    value: 'Test'
  }, {
    shortName: 'OU',
    value: 'Test'
  }]
  cert.setSubject(attrs)
  // alternatively set subject from a csr
  //cert.setSubject(csr.subject.attributes)
  cert.setIssuer(attrs)
  cert.setExtensions([{
    name: 'basicConstraints',
    cA: true
  }, {
    name: 'keyUsage',
    keyCertSign: true,
    digitalSignature: true,
    nonRepudiation: true,
    keyEncipherment: true,
    dataEncipherment: true
  }, {
    name: 'extKeyUsage',
    serverAuth: true,
    clientAuth: true,
    codeSigning: true,
    emailProtection: true,
    timeStamping: true
  }, {
    name: 'nsCertType',
    client: true,
    server: true,
    email: true,
    objsign: true,
    sslCA: true,
    emailCA: true,
    objCA: true
  }, {
    name: 'subjectAltName',
    altNames: [{
      type: 6, // URI
      value: 'http://example.org/webid#me'
    }, {
      type: 7, // IP
      ip: '127.0.0.1'
    }]
  }, {
    name: 'subjectKeyIdentifier'
  }])

  // self-sign certificate
  cert.sign(keys.privateKey)

  var pem = pki.certificateToPem(cert)
  return pem
}

test('fails on invalid pem cert parameter', function(t) {
  var er = validateCert(undefined)
  t.assert(er !== undefined, 'Error should have been thrown')
  t.end()
})

test('fails on non amazon subject common name', function(t) {
  var pem = createInvalidCert()

  var er = validateCert(pem)
  t.assert(er === 'subjectAltName Check Failed', 'Certificate must be from amazon')
  t.end()
})

test('fails on expired certificate', function(t) {
  getEchoCert(oldCertUrl, function(err, pem) {
    var er = validateCert(pem)
    t.assert(er === 'certificate expiration check failed', 'Certificate is expired')
    t.end()
  })
})

test('approves valid certifcate', function(t) {
  getEchoCert(latestCertUrl, function(err, pem) {
    var er = validateCert(pem)
    t.assert(!er, 'Certificate should be valid')
    t.end()
  })
})
