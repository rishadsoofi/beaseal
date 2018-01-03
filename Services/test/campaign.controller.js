'use strict';

var expect = require('chai').expect;

var LambdaTester = require('lambda-tester');

var myLambda = require('../functions/campaign/controller');

var async = require('async');



//var assert = require('chai').assert; // node.js core module
describe('Campaign CRUD', function() {
    var campaignId;
    async.auto({
        insert: function(callback) {
            [
                '1234'
            ].forEach(function(validOrgId) {

                it('successful create: OrgId-' + validOrgId,
                    function() {
                        var evt = {
                            authorisedOrganization : true,
                            body: {
                                'orgId': validOrgId,
                                'campaignName': 'Business Development',
                                'campaignDesc': 'Business Development Jobs',
                                'UserId': 'User',
                                'importance': 4,
                                'criteria': [{
                                    'criteriaTypeId': 1,
                                    'value': 'NY,Albany;CA,Sanfrancisco'
                                }, {
                                    'criteriaTypeId': 2,
                                    'value': 'marketing'
                                }, {
                                    'criteriaTypeId': 3,
                                    'value': 'AME'
                                }]
                            }
                        };
                        return LambdaTester(myLambda.create)
                            .event(evt)
                            .expectResult(function(result) {
                                campaignId = result.campaignId;
                                expect(result.success).to.equal(true);
                                expect(result.campaignId).to.not.be.null;

                            });
                    }).timeout(10000);
            });

            [
                '1234'
            ].forEach(function(validOrgId) {

                it('Unsuccessful create: Missing OrgId',
                    function() {
                        var evt = {
                            authorisedOrganization : true,
                            body: {
                                'campaignName': 'Business Development',
                                'campaignDesc': 'Business Development Jobs',
                                'UserId': 'User',
                                'importance': 4,
                                'criteria': [{
                                    'criteriaTypeId': 1,
                                    'value': 'NY,Albany;CA,Sanfrancisco'
                                }, {
                                    'criteriaTypeId': 2,
                                    'value': 'marketing'
                                }, {
                                    'criteriaTypeId': 3,
                                    'value': 'AME'
                                }]
                            }
                        };
                        return LambdaTester(myLambda.create)
                            .event(evt)
                            .expectError();
                    }).timeout(10000);
            });
            [
                '1234'
            ].forEach(function(validOrgId) {
                it('Unsuccessful create: Missing Criteria',
                    function() {
                        var evt = {
                            authorisedOrganization : true,
                            body: {
                                'orgId': validOrgId,
                                'campaignName': 'Business Development',
                                'campaignDesc': 'Business Development Jobs',
                                'UserId': 'User',
                                'importance': 4,
                                'criteria': [{
                                    'criteriaTypeId': 1,
                                    'value': 'NY,Albany;CA,Sanfrancisco'
                                }]
                            }
                        };
                        return LambdaTester(myLambda.create)
                            .event(evt)
                            .expectResult(function(result) {
                                expect(result.success).to.equal(false);
                            });
                    }).timeout(10000);
            });
            callback(null, campaignId);
        },
        update: ['insert', function(result, callback) {
            [
                "1234"
            ].forEach(function(validOrgId) {
                console.log(JSON.stringify(result));
                it('successful update: =' + validOrgId,
                    function() {
                        var evt = {
                            authorisedOrganization : true,
                            body: {
                                'orgId': validOrgId,
                                'campaignId': campaignId,
                                'campaignName': 'Business Development Update',
                                'campaignDesc': 'Business Development Jobs Update',
                                'UserId': 'User Update',
                                'importance': 4,
                                'criteria': [{
                                    'criteriaTypeId': 1,
                                    'value': 'NY,Albany;CA,Sanfrancisco Update'
                                }, {
                                    'criteriaTypeId': 2,
                                    'value': 'marketing Update'
                                }, {
                                    'criteriaTypeId': 3,
                                    'value': 'AME Update'
                                }]
                            }
                        };
                        return LambdaTester(myLambda.update)
                            .event(evt)
                            .expectResult(function(result) {
                                console.log("update result:" + result);
                                expect(result.success).to.equal(true);

                            });
                    }).timeout(10000);
            });

            [
                "1234"
            ].forEach(function(validId) {
                it('Unsuccessful update: =' + validId,
                    function() {
                        var evt = {
                            authorisedOrganization : true,
                            body: {
                                'campaignName': 'Business Development Update',
                                'campaignDesc': 'Business Development Jobs Update',
                                'UserId': 'User Update',
                                'importance': 4,
                                'criteria': [{
                                    'criteriaTypeId': 1,
                                    'value': 'NY,Albany;CA,Sanfrancisco Update'
                                }, {
                                    'criteriaTypeId': 2,
                                    'value': 'marketing Update'
                                }, {
                                    'criteriaTypeId': 3,
                                    'value': 'AME Update'
                                }]
                            }
                        };
                        return LambdaTester(myLambda.update)
                            .event(evt)
                            .expectError();
                    }).timeout(10000);
            });
            [
                "1234"
            ].forEach(function(validOrgId) {
                it('Unsuccessful update - Missing CampaignId: =' + validOrgId,
                    function() {
                        var evt = {
                            authorisedOrganization : true,
                            body: {
                              'orgId': validOrgId,
                              'campaignName': 'Business Development Update',
                              'campaignDesc': 'Business Development Jobs Update',
                              'UserId': 'User Update',
                              'importance': 4,
                              'criteria': [{
                                  'criteriaTypeId': 1,
                                  'value': 'NY,Albany;CA,Sanfrancisco Update'
                              }, {
                                  'criteriaTypeId': 2,
                                  'value': 'marketing Update'
                              }, {
                                  'criteriaTypeId': 3,
                                  'value': 'AME Update'
                              }]
                            }
                        };
                        return LambdaTester(myLambda.update)
                            .event(evt)
                            .expectError();
                    }).timeout(10000);
            });
            [
                "1234"
            ].forEach(function(validOrgId) {
                it('Unsuccessful update - No CampaignId Found: =' + validOrgId,
                    function() {
                        var evt = {
                            authorisedOrganization : true,
                            body: {
                              'orgId': validOrgId,
                              'campaignId' : 123,
                              'campaignName': 'Business Development Update',
                              'campaignDesc': 'Business Development Jobs Update',
                              'UserId': 'User Update',
                              'importance': 4,
                              'criteria': [{
                                  'criteriaTypeId': 1,
                                  'value': 'NY,Albany;CA,Sanfrancisco Update'
                              }, {
                                  'criteriaTypeId': 2,
                                  'value': 'marketing Update'
                              }, {
                                  'criteriaTypeId': 3,
                                  'value': 'AME Update'
                              }]
                            }
                        };
                        return LambdaTester(myLambda.update)
                            .event(evt)
                            .expectResult(function(result) {
                                expect(result.success).to.equal(false);
                            });
                    }).timeout(10000);
            });
            callback(null, campaignId);
        }],
        getAllForOrg: ['insert', function(result, callback) {
            [
                '1234'
            ].forEach(function(validOrgId) {

                it('successful getAllForOrg: =' + validOrgId,
                    function() {
                        var evnt = {
                            authorisedOrganization : true,
                            'path': {
                                'orgId': validOrgId
                            }
                        };
                        return LambdaTester(myLambda.getAllForOrg)
                            .event(evnt)
                            .expectResult(function(result) {
                                //console.log(result.success);
                                //console.log(result.data !== null);
                                expect(result.success).to.equal(true);
                                expect(result.data).to.not.be.null;

                            });
                    }).timeout(10000);
            });

            [
                '1234'
            ].forEach(function(validOrgId) {

                it('successful getAllForOrg with values: =' + validOrgId,
                    function() {
                        var evnt = {
                          authorisedOrganization : true,
                          'path': {
                              'orgId': validOrgId
                          },
                          'query': {
                              'values': '1,2'
                          }
                        };
                        return LambdaTester(myLambda.getAllForOrg)
                            .event(evnt)
                            .expectResult(function(result) {
                                expect(result.success).to.equal(true);
                                expect(result.data).to.not.be.null;

                            });
                    }).timeout(10000);
            });

            [
                '1234'
            ].forEach(function(validOrgId) {

                it('successful getAllForOrg with values: =' + validOrgId,
                    function() {
                        var evnt = {
                            authorisedOrganization : true,
                            'path': {
                                'orgId': validOrgId
                            },
                            'query': {
                                'values': '1,2',
                                'orgValues': '1,2'
                            }
                        };
                        return LambdaTester(myLambda.getAllForOrg)
                            .event(evnt)
                            .expectResult(function(result) {
                                expect(result.success).to.equal(true);
                                expect(result.data).to.not.be.null;

                            });
                    }).timeout(10000);
            });

            [
                '9758'
            ].forEach(function(validOrgId) {

                it('successful getAllForOrg with no results: =' + validOrgId,
                    function() {
                        var evnt = {
                            authorisedOrganization : true,
                            'path': {
                                'orgId': validOrgId
                            }
                        };
                        return LambdaTester(myLambda.getAllForOrg)
                            .event(evnt)
                            .expectResult(function(result) {
                                expect(result.success).to.equal(true);
                                expect(result.message).to.equal('No results');

                            });
                    }).timeout(10000);
            });

            [
                '1234'
            ].forEach(function(validOrgId) {

                it('Unsuccessful getAllForOrg: =' + validOrgId,
                    function() {
                        var evnt = {
                            authorisedOrganization : true,
                            'path': {}
                        };
                        return LambdaTester(myLambda.getAllForOrg)
                            .event(evnt)
                            .expectError();
                    }).timeout(10000);
            });
            callback(null, campaignId);
        }],
        getCampaign: ['insert', function(result, callback) {
            [
                '1234'
            ].forEach(function(validOrgId) {

                it('successful getCampaign: =' + campaignId,
                    function() {
                        var evnt = {
                            authorisedOrganization : true,
                            'path': {
                              'orgId' : validOrgId,
                              'campaignId': campaignId
                            }
                        };
                        return LambdaTester(myLambda.getCampaign)
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

                it('successful getCampaign with values: =' + campaignId,
                    function() {
                        var evnt = {
                            authorisedOrganization : true,
                            'path': {
                                'orgId' : validOrgId,
                                'campaignId': campaignId
                            },
                            'query': {
                                'values': '1,2'
                            }
                        };
                        return LambdaTester(myLambda.getCampaign)
                            .event(evnt)
                            .expectResult(function(result) {
                                //console.log(result);
                                expect(result.success).to.equal(true);
                                expect(result.data).to.not.be.null;

                            });
                    }).timeout(10000);
            });

            [
                '63'
            ].forEach(function(validCampaignId) {

                it('successful getCampaign with no results: =' + validCampaignId,
                    function() {
                        var evnt = {
                            authorisedOrganization : true,
                            'path': {
                                'orgId' : 1234,
                                'campaignId': validCampaignId
                            }
                        };
                        return LambdaTester(myLambda.getCampaign)
                            .event(evnt)
                            .expectResult(function(result) {
                                //console.log(result);
                                expect(result.success).to.equal(true);
                                expect(result.message).to.equal('No Campaign Found for the Organization');

                            });
                    }).timeout(10000);
            });

            [
                '1234'
            ].forEach(function(validOrgId) {

                it('Unsuccessful getCampaign',
                    function() {
                        var evnt = {
                            authorisedOrganization : true,
                            'path': {}
                        };
                        return LambdaTester(myLambda.getCampaign)
                            .event(evnt)
                            .expectError();
                    }).timeout(10000);
            });
            callback(null, campaignId);
        }],
        delete: ['insert', 'update', 'getAllForOrg', 'getCampaign', function(result, callback) {
            [
                '1'
            ].forEach(function(validId) {

                it('successful delete:',
                    function() {
                        var evnt = {
                            authorisedOrganization : true,
                            'path': {
                                'orgId': '1234',
                                'campaignId': campaignId,
                            }
                        };
                        return LambdaTester(myLambda.delete)
                            .event(evnt)
                            .expectResult(function(result) {
                                expect(result.success).to.equal(true);

                            });
                    }).timeout(10000);
            });
            [
                '1'
            ].forEach(function(validId) {

                it('Unsuccessful delete: - No CampaignId Found',
                    function() {
                        var evnt = {
                            authorisedOrganization : true,
                            'path': {
                                'orgId': '1234',
                                'campaignId': 1,
                            }
                        };
                        return LambdaTester(myLambda.delete)
                            .event(evnt)
                            .expectResult(function(result) {
                                expect(result.success).to.equal(false);

                            });
                    }).timeout(10000);
            });
            [
                '1'
            ].forEach(function(validId) {

                it('Unsuccessful delete:',
                    function() {
                        var evnt = {
                            authorisedOrganization : true,
                            'path': {}
                        };
                        return LambdaTester(myLambda.delete)
                            .event(evnt)
                            .expectError();
                    }).timeout(10000);
            });
            [
                '1'
            ].forEach(function(validId) {

                it('successful delete Missing OrgId:',
                    function() {
                        var evnt = {
                            authorisedOrganization : true,
                            'path': {
                                'campaignId': campaignId,
                            }
                        };
                        return LambdaTester(myLambda.delete)
                            .event(evnt)
                            .expectError();
                    }).timeout(10000);
            });

        }]
    }, function(err, result) {});
});
