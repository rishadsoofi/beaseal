'use strict';

var expect = require('chai').expect;

var LambdaTester = require('lambda-tester');

var myLambda = require('../functions/post/controller');

describe('default-success', function() {
  [
      "1962"
  ].forEach(function(validId) {

      it('successful invocation triggerRule : =' + validId,
          function() {
            var evnt = {
            };
            return LambdaTester(myLambda.triggerPostForAllOrg)
                .event(evnt)
                .expectResult(function(result) {
                  expect(result.success).to.equals(true);

                });
          }).timeout(50000);
  });

});
