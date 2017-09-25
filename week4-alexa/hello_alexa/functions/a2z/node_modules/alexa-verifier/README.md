# alexa-verifier

[![Build Status](https://travis-ci.org/mreinstein/alexa-verifier.svg?branch=master)](https://travis-ci.org/mreinstein/alexa-verifier)

Verify HTTP requests sent to an Alexa skill are sent from Amazon.

This module is framework-agnostic.

If you're using expressjs, you should check out [alexa-verifier-middleware](https://github.com/alexa-js/alexa-verifier-middleware) which is a lot easier to integrate.



### motivation
Part of the certication process for alexa skills hosted on a generic web service (i.e., not AWS Lambda) is that your skill must validate requests are actually coming from Amazon. This is enforced by checking:

* the timestamp of the request
* the validity of the certificate
* the signature of the the request signed with the aforementioned certificate

This module provides a function to handle this validation.


### usage

```javascript
const verifier = require('alexa-verifier')


verifier(cert_url, signature, requestRawBody, callback)
```

* `cert_url`  full url of the certificate to verify (from HTTP request header named `signaturecertchainurl`)
* `signature` signature of the request (from HTTP request header named `signature`)
* `requestRawBody`  full body string from POST request
* `callback`  completion function. has 1 argument which indicates error. falsey when verification passes
