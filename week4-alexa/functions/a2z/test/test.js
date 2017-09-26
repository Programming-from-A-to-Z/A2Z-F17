var express = require('express');
var request = require('supertest');
var chai = require('chai');
var expect = chai.expect;

describe('A2Z', function() {
  var server;

  beforeEach(function() {
    var app = express();
    var a2z = require('../a2z');
    a2z.express({
      expressApp: app,
      router: express.Router(),
      debug: true,
      checkCert: false
    });
    server = app.listen(3000);
  });

  afterEach(function() {
    server.close();
  });

  it('responds to invalid data', function() {
    return request(server)
      .post('/a2z')
      .send({})
      .expect(200).then(function(response) {
        return expect(response.body).to.eql({
          version: '1.0',
          response: {
            directives: [],
            shouldEndSession: true,
            outputSpeech: {
              type: 'SSML',
              ssml: '<speak>Error: not a valid request</speak>'
            }
          },
          sessionAttributes: {}
        });
      });
  });

  it('responds to a launch event', function() {
    return request(server)
      .post('/a2z')
      .send({
        request: {
          type: 'LaunchRequest',
        }
      })
      .expect(200).then(function(response) {
        var ssml = response.body.response.outputSpeech.ssml;
        return expect(ssml).to.eql('<speak>I am a counting skill.</speak>');
      });
  });

  it('responds to a repeat event', function() {
    return request(server)
      .post('/a2z')
      .send({
        request: {
          type: 'IntentRequest',
          intent: {
            name: 'CountIntent',
            slots: {
              VALUE: {
                name: "VALUE",
                value: "2"
              }
            }
          }
        }
      })
      .expect(200).then(function(response) {
        var ssml = response.body.response.outputSpeech.ssml;
        return expect(ssml).to.eql('<speak>Time to count.</speak>');
      });
  });
});
