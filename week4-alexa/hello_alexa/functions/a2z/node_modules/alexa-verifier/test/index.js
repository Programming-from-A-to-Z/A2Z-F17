var test     = require('tap').test
var url      = require('url')
var verifier = require('../')
var sinon    = require('sinon')


test('handle missing cert_url parameter', function(t) {
  var body, now, signature
  signature = 'JbWZ4iO5ogpq1NhsOqyqq/QRrvc1/XyDwjcBO9wWSk//c11+gImmtWzMG9tDEW40t0Xwt1cnGU93DwUZQzMyzJ5CMi+09qVQUSIHiSmPekKaQRxS0Ibu7l7cXXuCcOBupbkheD/Dsd897Bm5SQwd1cFKRv+PJlpmGKimgh2QmbivogsEkFl8b9SW48kjKWazwj/XP2SrHY0bTvwMTVu7zvTcp0ZenEGlY2DNr5zSd1n6lmS6rgAt1IPwhBzqI0PVMngaM0DQhB0wUPj3QoIUh0IyMVAQzRFbQpS4UGrA4M9a5a+AGy0jCQKiRCI+Yi9iZYEVYvfafF/lyOUHHYcpOg=='
  now = new Date()
  body = {
    request: {
      timestamp: now.getTime()
    }
  }
  verifier(undefined, signature, JSON.stringify(body), function(er) {
    t.equal(er, 'missing certificate url')
    t.end()
  })
})


test('handle invalid cert_url parameter', function(t) {
  var body, now, signature
  signature = 'JbWZ4iO5ogpq1NhsOqyqq/QRrvc1/XyDwjcBO9wWSk//c11+gImmtWzMG9tDEW40t0Xwt1cnGU93DwUZQzMyzJ5CMi+09qVQUSIHiSmPekKaQRxS0Ibu7l7cXXuCcOBupbkheD/Dsd897Bm5SQwd1cFKRv+PJlpmGKimgh2QmbivogsEkFl8b9SW48kjKWazwj/XP2SrHY0bTvwMTVu7zvTcp0ZenEGlY2DNr5zSd1n6lmS6rgAt1IPwhBzqI0PVMngaM0DQhB0wUPj3QoIUh0IyMVAQzRFbQpS4UGrA4M9a5a+AGy0jCQKiRCI+Yi9iZYEVYvfafF/lyOUHHYcpOg=='
  now = new Date()
  body = {
    request: {
      timestamp: now.getTime()
    }
  }
  verifier('http://someinsecureurl', signature, JSON.stringify(body), function(er) {
    t.equal(er.indexOf('Certificate URI MUST be https'), 0)
    t.end()
  })
})


test('handle invalid body json', function(t) {
  var cert_url, signature
  cert_url = 'https://s3.amazonaws.com/echo.api/echo-api-cert.pem'
  signature = 'JbWZ4iO5ogpq1NhsOqyqq/QRrvc1/XyDwjcBO9wWSk//c11+gImmtWzMG9tDEW40t0Xwt1cnGU93DwUZQzMyzJ5CMi+09qVQUSIHiSmPekKaQRxS0Ibu7l7cXXuCcOBupbkheD/Dsd897Bm5SQwd1cFKRv+PJlpmGKimgh2QmbivogsEkFl8b9SW48kjKWazwj/XP2SrHY0bTvwMTVu7zvTcp0ZenEGlY2DNr5zSd1n6lmS6rgAt1IPwhBzqI0PVMngaM0DQhB0wUPj3QoIUh0IyMVAQzRFbQpS4UGrA4M9a5a+AGy0jCQKiRCI+Yi9iZYEVYvfafF/lyOUHHYcpOg=='
  verifier(cert_url, signature, '', function(er) {
    t.equal(er, 'missing request (certificate) body')
    t.end()
  })
})


test('handle missing timestamp field', function(t) {
  var cert_url, signature
  cert_url = 'https://s3.amazonaws.com/echo.api/echo-api-cert.pem'
  signature = 'JbWZ4iO5ogpq1NhsOqyqq/QRrvc1/XyDwjcBO9wWSk//c11+gImmtWzMG9tDEW40t0Xwt1cnGU93DwUZQzMyzJ5CMi+09qVQUSIHiSmPekKaQRxS0Ibu7l7cXXuCcOBupbkheD/Dsd897Bm5SQwd1cFKRv+PJlpmGKimgh2QmbivogsEkFl8b9SW48kjKWazwj/XP2SrHY0bTvwMTVu7zvTcp0ZenEGlY2DNr5zSd1n6lmS6rgAt1IPwhBzqI0PVMngaM0DQhB0wUPj3QoIUh0IyMVAQzRFbQpS4UGrA4M9a5a+AGy0jCQKiRCI+Yi9iZYEVYvfafF/lyOUHHYcpOg=='
  verifier(cert_url, signature, '{}', function(er) {
    t.equal(er, 'Timestamp field not present in request')
    t.end()
  })
})


test('handle outdated timestamp field', function(t) {
  var body, cert_url, now, signature
  cert_url = 'https://s3.amazonaws.com/echo.api/echo-api-cert.pem'
  signature = 'JbWZ4iO5ogpq1NhsOqyqq/QRrvc1/XyDwjcBO9wWSk//c11+gImmtWzMG9tDEW40t0Xwt1cnGU93DwUZQzMyzJ5CMi+09qVQUSIHiSmPekKaQRxS0Ibu7l7cXXuCcOBupbkheD/Dsd897Bm5SQwd1cFKRv+PJlpmGKimgh2QmbivogsEkFl8b9SW48kjKWazwj/XP2SrHY0bTvwMTVu7zvTcp0ZenEGlY2DNr5zSd1n6lmS6rgAt1IPwhBzqI0PVMngaM0DQhB0wUPj3QoIUh0IyMVAQzRFbQpS4UGrA4M9a5a+AGy0jCQKiRCI+Yi9iZYEVYvfafF/lyOUHHYcpOg=='
  now = new Date()
  body = {
    request: {
      timestamp: now.getTime() - 200000
    }
  }
  verifier(cert_url, signature, JSON.stringify(body), function(er) {
    t.equal(er, 'Request is from more than 150 seconds ago')
    t.end()
  })
})


test('handle missing signature parameter', function(t) {
  var body, cert_url, now
  cert_url = 'https://s3.amazonaws.com/echo.api/echo-api-cert.pem'
  now = new Date()
  body = {
    request: {
      timestamp: now.getTime()
    }
  }
  verifier(cert_url, undefined, JSON.stringify(body), function(er) {
    t.equal(er, 'missing signature')
    t.end()
  })
})


test('handle invalid signature parameter', function(t) {
  var body, cert_url, now
  cert_url = 'https://s3.amazonaws.com/echo.api/echo-api-cert.pem'
  now = new Date()
  body = {
    request: {
      timestamp: now.getTime()
    }
  }
  verifier(cert_url, '....$#%@$se', JSON.stringify(body), function(er) {
    t.equal(er, 'invalid signature (not base64 encoded)')
    t.end()
  })
})

test('handle invalid base64-encoded signature parameter', function(t) {
  var body, cert_url, now
  cert_url = 'https://s3.amazonaws.com/echo.api/echo-api-cert-4.pem' // latest valid cert
  now = new Date()
  body = {
    request: {
      timestamp: now.getTime()
    }
  }
  verifier(cert_url, 'aGVsbG8NCg==', JSON.stringify(body), function(er) {
    t.equal(er, 'invalid signature')
    t.end()
  })
})

test('handle valid signature', function(t) {
  var ts = '2017-02-10T07:27:59Z';
  var now = new Date(ts);
  var clock = sinon.useFakeTimers(now.getTime());
  var cert_url = 'https://s3.amazonaws.com/echo.api/echo-api-cert-4.pem' // latest valid cert
  var signature = 'Qc8OuaGEHWeL/39XTEDYFbOCufYWpwi45rqmM2R4WaSEYcSXq+hUko/88wv48+6SPUiEddWSEEINJFAFV5auYZsnBzqCK+SO8mGNOGHmLYpcFuSEHI3eA3nDIEARrXTivqqbH/LCPJHc0tqNYr3yPZRIR2mYFndJOxgDNSOooZX+tp2GafHHsjjShCjmePaLxJiGG1DmrL6fyOJoLrzc0olUxLmnJviS6Q5wBir899TMEZ/zX+aiBTt/khVvwIh+hI/PZsRq/pQw4WAvQz1bcnGNamvMA/TKSJtR0elJP+TgCqbVoYisDgQXkhi8/wonkLhs68pN+TurbR7GyC1vxw==';
  var body = {
    "version": "1.0",
    "session": {
      "new": true,
      "sessionId": "SessionId.7745e45d-3042-45eb-8e86-cab2cf285daf",
      "application": {
        "applicationId": "amzn1.ask.skill.75c997b8-610f-4eb4-bf2e-95810e15fba2"
      },
      "attributes": {},
      "user": {
        "userId": "amzn1.ask.account.AF6Z7574YHBQCNNTJK45QROUSCUJEHIYAHZRP35FVU673VDGDKV4PH2M52PX4XWGCSYDM66B6SKEEFJN6RYWN7EME3FKASDIG7DPNGFFFNTN4ZT6B64IIZKSNTXQXEMVBXMA7J3FN3ERT2A4EDYFUYMGM4NSQU4RTAQOZWDD2J7JH6P2ROP2A6QEGLNLZDXNZU2DL7BKGCVLMNA"
      }
    },
    "request": {
      "type": "IntentRequest",
      "requestId": "EdwRequestId.fa7428b7-75d0-44c8-aebb-4c222ed48ebe",
      "timestamp": ts,
      "locale": "en-US",
      "intent": {
        "name": "HelloWorld"
      },
      "inDialog": false
    }
  };
  verifier(cert_url, signature, JSON.stringify(body), function(er) {
    t.equal(er, undefined);
    clock.restore();
    t.end()
  });
})
test('handle valid signature with double byte utf8 encodings', function(t) {
  var ts = '2017-04-05T12:02:36Z';
  var now = new Date(ts);
  var clock = sinon.useFakeTimers(now.getTime());
  var cert_url = 'https://s3.amazonaws.com/echo.api/echo-api-cert-4.pem' // latest valid cert
  var signature = 'WLShxe8KMwHUt8hVD5+iE4tDO+J8Li21yocDWnq8LVRpE2PMMWCxjQzOCzyoFm4i/yW07UKtKQxcnzB44ZEdP6e6HelwBwEdP4lb8jQcc5knk8SuUth4N7cu6Em8FPOdOJdd9idHbO/p8BTb14wgua5n+1SDKHm+wPikOVsfCMYsXcwRWx5FsgP1wVPrDsCHN/ISiCXz+UuMnd6H0uRNdLZ/x/ikPkknh+P1kuFa2a2LN4r57IwBDAxkdf9MzXEexSOO0nWLnyJY2VAFB+O7JKE39CwMJ1+YDOwTTTLjilkCnSlfnr6DP4HPGHnYhh2HQZle8UBrSDm4ntflErpISQ==';
  var body = {
   "version":"1.0",
   "session":{
      "new":true,
      "sessionId":"SessionId.07e59233-1f59-43f9-bfc1-ac3ae3b843c6",
      "application":{
         "applicationId":"amzn1.ask.skill.5535124f-0d41-472a-be31-589b1d3d04bf"
      },
      "attributes":{

      },
      "user":{
         "userId":"amzn1.ask.account.AGDZF2M6WHR5KHCXH5ODUYS6VUFUKNI2TABAZSUABKCMIEILVW5ZVME7OI2IOPPV4V7DAYVHMU2CMABL4HTCF7R33N2D6OH7QBEVTSGJUCYZPFX4EQO56TRHEHYUME3BSSDETEJUFFGB4JZBB6OCNQ2A7EKQHW6JQL5YK2HMIDH4ADCCQRJ24SFWBMENZUDPXWN2UNLP42EA4FQ"
      }
   },
   "request":{
      "type":"IntentRequest",
      "requestId":"EdwRequestId.5581fcba-e41a-4059-a9d7-eb7b46f2a543",
      "timestamp":"2017-04-05T12:02:36Z",
      "locale":"en-US",
      "intent":{
         "name":"Ask_term_info",
         "slots":{
            "termslot":{
               "name":"termslot",
               "value":"Pokémon"
            }
         }
      }
   }
};
  verifier(cert_url, signature, JSON.stringify(body), function(er) {
    t.equal(er, undefined);
    clock.restore();
    t.end()
  });
})
