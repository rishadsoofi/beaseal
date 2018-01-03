'use strict';

var expect = require('chai').expect;

var LambdaTester = require('lambda-tester');

var myLambda = require('../functions/admin/controller');

describe('default-success', function() {
  [
      '1234'
  ].forEach(function(validOrgId) {

      it('successful getAllOrgData:',
          function() {
              var evnt = {
                 authorisedOrganization : true,
                'body': {

                }
              };
              return LambdaTester(myLambda.getAllOrgData)
                  .event(evnt)
                  .expectResult(function(result) {
                      //console.log(result);
                      expect(result.success).to.equal(true);
                      expect(result.data).to.not.be.null;

                  });
          }).timeout(10000);
  });

  [
      '1234'
  ].forEach(function(validOrgId) {

      it('successful getAllOrgData with values:',
          function() {
              var evnt = {
                authorisedOrganization : true,
                'body': {
                  'values': '1;2'
              }};
              return LambdaTester(myLambda.getAllOrgData)
                  .event(evnt)
                  .expectResult(function(result) {
                      //console.log(result);
                      expect(result.success).to.equal(true);
                      expect(result.data).to.not.be.null;

                  });
          }).timeout(10000);
  });
});
