'use strict';

var expect = require('chai').expect;

var LambdaTester = require('lambda-tester');

var myLambda = require('../functions/report/controller');

describe('default-success downloadReport', function() {
  [
      "1806"
  ].forEach(function(validId) {

      it('successful invocation downloadReport : =' + validId,
          function() {
            var evnt = {
              authorisedOrganization : true,
              body: {
                'orgId': 1806,
                'criteria': [{
                'criteriaTypeId': 6,
                'value': 'Administration;IT'
                },{
                'criteriaTypeId': 10,
                'value': '100;982'
                }]
              }
            };
            return LambdaTester(myLambda.downloadReport)
                .event(evnt)
                .expectResult(function(result) {
                  expect(result.success).to.equals(true);
                  expect(result.csv).to.not.be.null;

                });
          }).timeout(50000);
  });

  [
      "1806"
  ].forEach(function(validId) {

      it('Unsuccessful invocation downloadReport : =' + validId,
          function() {
            var evnt = {
              authorisedOrganization : true,
              body: {
                'orgId': '1806',
                'criteria': null
              }
            };
            return LambdaTester(myLambda.downloadReport)
                .event(evnt)
                .expectError();
          }).timeout(50000);
  });
  [
      "1806"
  ].forEach(function(validId) {

      it('successful invocation getReportData : =' + validId,
          function() {
            var evnt = {
              authorisedOrganization : true,
              body: {
                'orgId': 1806,
                'criteria': [{
                'criteriaTypeId': 6,
                'value': 'Administration;IT'
                },{
                'criteriaTypeId': 10,
                'value': '100;982'
                }]
              }
            };
            return LambdaTester(myLambda.getReportData)
                .event(evnt)
                .expectResult(function(result) {
                  expect(result.success).to.equals(true);
                });
          }).timeout(50000);
  });
  [
      "1806"
  ].forEach(function(validId) {

      it('Unsuccessful invocation getReportData : =' + validId,
          function() {
            var evnt = {
              authorisedOrganization : true,
              body: {
                'orgId': 1806,
                'criteria': null
              }
            };
            return LambdaTester(myLambda.getReportData)
                .event(evnt)
                .expectError();
          }).timeout(50000);
  });
  [
      "1806"
  ].forEach(function(validId) {

      it('successful invocation getSearchReportReferences : =' + validId,
          function() {
            var evnt = {
              authorisedOrganization : true,
              body: {
                'orgId': 1806,
                'refId': 3,
                'criteria': [{
                'criteriaTypeId': 6,
                'value': 'Administration;IT'
                },{
                'criteriaTypeId': 10,
                'value': '100;982'
              }],
              sort:'org_id_fk',
              sortOrder:'ASC',
              limit: 100,
              offset: 8
              }
            };
            return LambdaTester(myLambda.getSearchReportReferences)
                .event(evnt)
                .expectResult(function(result) {
                  expect(result.success).to.equals(true);
                });
          }).timeout(50000);
  });
  [
      "1806"
  ].forEach(function(validId) {

      it('Unsuccessful invocation getSearchReportReferences : =' + validId,
          function() {
            var evnt = {
              authorisedOrganization : true,
              body: {
                'orgId': 1806,
                'refId': 3,
                'criteria': null
              }
            };
            return LambdaTester(myLambda.getSearchReportReferences)
                .event(evnt)
                .expectError();
          }).timeout(50000);
  });
});
