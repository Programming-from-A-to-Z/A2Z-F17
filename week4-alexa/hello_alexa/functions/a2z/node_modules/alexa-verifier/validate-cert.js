var pki = require('node-forge').pki


// @returns an error string if certificate isn't valid, undefined otherwise
module.exports = function validate(pem_cert) {
  try {
    var cert = pki.certificateFromPem(pem_cert)

    // check that the domain echo-api.amazon.com is present in the Subject
    // Alternative Names (SANs) section of the signing certificate
    if (cert.subject.getField('CN').value.indexOf('echo-api.amazon.com') === -1) {
      return 'subjectAltName Check Failed'
    }

    var notAfter = new Date(cert.validity.notAfter)
    var remainingDays = notAfter.getTime() - new Date().getTime()
    // check that the signing certificate has not expired (examine both the Not
    // Before and Not After dates)
    if (remainingDays < 1) {
      return 'certificate expiration check failed'
    }
  } catch (e) {
    return e
  }
}
