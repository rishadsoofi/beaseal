'use strict';

var expect = require('chai').expect;

var LambdaTester = require('lambda-tester');

var myLambda = require('../functions/applies/controller');

describe('default-success', function() {
  [
      "1962"
  ].forEach(function(validId) {

      it('successful invocation triggerRule : =' + validId,
          function() {
            var evnt = { Records: [ {
              s3: {
                bucket: {
                  name: "appliesfromdmp-localsudhir"
                },
                object: {
                  "sequencer": "0A1B2C3D4E5F678901",
                  key: "robosource_20161112_063432.gz"
                }
              }
            }]
            };
            return LambdaTester(myLambda.loadAppliesData)
                .event(evnt)
                .expectResult();
          }).timeout(50000);
  });

});
