'use strict';

var expect = require('chai').expect;

var LambdaTester = require('lambda-tester');

var myLambda = require('../functions/rule/controller');

describe('default-success', function() {
  [
      "1962"
  ].forEach(function(validId) {

      it('successful invocation triggerRule : =' + validId,
          function() {
            var evnt = {
                "Records": [{
                    "EventSource": "aws:sns",
                    "EventVersion": "1.0",
                    "EventSubscriptionArn": "arn:aws:sns:us-east-1:534106927381:Robosource-Rule-Engine:7b3cd21a-85ce-45c2-a255-34f21da0365c",
                    "Sns": {
                        "Type": "Notification",
                        "MessageId": "f9f534fe-e238-5823-b0ac-6486b02b99b2",
                        "TopicArn": "arn:aws:sns:us-east-1:534106927381:devrishad-Robosource-Rule-Engine",
                        "Subject": "1962 Job Bucketing",
                        "Message": "{\n  \"orgId\": 1962,\n  \"operation\": \"Job Bucketing\"\n}",
                        "Timestamp": "2016-10-12T14:59:31.536Z",
                        "SignatureVersion": "1",
                        "Signature": "IFTySCUd5QNlM5NFebk4bSDBbR/50P+T5sJ5fNgSHfIEdeTpFuY2usu9zRnsQ9CLuZ3EymY3rh7qz5dNagtnw/PLPwPBqBvU/hfqidSgiwHORy1r2YfybRUuqCVp2F3bfynTYlOWKrj6XvcxxXtRkGnX7v5SV8Y6DVjyZJqQPBHKNaEh7vb0jZcV6wbgt006YgDaoMHbcNS90HaooNQAko30wbvAD1x1SRMu5xkKN3V9pAfRI0uqCiZi3bVhNTxJMcb4+3gshevoSrvkTsMJpoxdkIcd4pLAOPFcD7SVeBEe/n4r82/qjsWF0omO9tgqUYSLfPgQ9C9Ume/kaWKyqw==",
                        "SigningCertUrl": "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-b95095beb82e8f6a046b3aafc7f4149a.pem",
                        "UnsubscribeUrl": "https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:534106927381:Robosource-Job-Bucketing:7b3cd21a-85ce-45c2-a255-34f21da0365c",
                        "MessageAttributes": {}
                    }
                }]
            };
            return LambdaTester(myLambda.triggerRule)
                .event(evnt)
                .expectResult(function(result) {
                  expect(result.success).to.equals(true);

                });
          }).timeout(90000);
  });
  [
      "1962"
  ].forEach(function(validId) {

      it('Unsuccessful invocation triggerRule - Missing OrgId : =' + validId,
          function() {
            var evnt = {
                "Records": [{
                    "EventSource": "aws:sns",
                    "EventVersion": "1.0",
                    "EventSubscriptionArn": "arn:aws:sns:us-east-1:534106927381:Robosource-Rule-Engine:7b3cd21a-85ce-45c2-a255-34f21da0365c",
                    "Sns": {
                        "Type": "Notification",
                        "MessageId": "f9f534fe-e238-5823-b0ac-6486b02b99b2",
                        "TopicArn": "arn:aws:sns:us-east-1:534106927381:devrishad-Robosource-Rule-Engine",
                        "Subject": "1962 Job Bucketing",
                        "Message": "{\n  \"operation\": \"Job Bucketing\"\n}",
                        "Timestamp": "2016-10-12T14:59:31.536Z",
                        "SignatureVersion": "1",
                        "Signature": "IFTySCUd5QNlM5NFebk4bSDBbR/50P+T5sJ5fNgSHfIEdeTpFuY2usu9zRnsQ9CLuZ3EymY3rh7qz5dNagtnw/PLPwPBqBvU/hfqidSgiwHORy1r2YfybRUuqCVp2F3bfynTYlOWKrj6XvcxxXtRkGnX7v5SV8Y6DVjyZJqQPBHKNaEh7vb0jZcV6wbgt006YgDaoMHbcNS90HaooNQAko30wbvAD1x1SRMu5xkKN3V9pAfRI0uqCiZi3bVhNTxJMcb4+3gshevoSrvkTsMJpoxdkIcd4pLAOPFcD7SVeBEe/n4r82/qjsWF0omO9tgqUYSLfPgQ9C9Ume/kaWKyqw==",
                        "SigningCertUrl": "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-b95095beb82e8f6a046b3aafc7f4149a.pem",
                        "UnsubscribeUrl": "https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:534106927381:Robosource-Job-Bucketing:7b3cd21a-85ce-45c2-a255-34f21da0365c",
                        "MessageAttributes": {}
                    }
                }]
            };
            return LambdaTester(myLambda.triggerRule)
                .event(evnt)
                .expectError()
          }).timeout(90000);
  });
  [
      "123"
  ].forEach(function(validId) {

      it('Unsuccessful invocation triggerRule - Missing PublisherId : =' + validId,
          function() {
            var evnt = {
                "Records": [{
                    "EventSource": "aws:sns",
                    "EventVersion": "1.0",
                    "EventSubscriptionArn": "arn:aws:sns:us-east-1:534106927381:Robosource-Rule-Engine:7b3cd21a-85ce-45c2-a255-34f21da0365c",
                    "Sns": {
                        "Type": "Notification",
                        "MessageId": "f9f534fe-e238-5823-b0ac-6486b02b99b2",
                        "TopicArn": "arn:aws:sns:us-east-1:534106927381:devrishad-Robosource-Rule-Engine",
                        "Subject": "123 Job Bucketing",
                        "Message": "{\n  \"orgId\":123, \n  \"operation\": \"Job Bucketing\"\n}",
                        "Timestamp": "2016-10-12T14:59:31.536Z",
                        "SignatureVersion": "1",
                        "Signature": "IFTySCUd5QNlM5NFebk4bSDBbR/50P+T5sJ5fNgSHfIEdeTpFuY2usu9zRnsQ9CLuZ3EymY3rh7qz5dNagtnw/PLPwPBqBvU/hfqidSgiwHORy1r2YfybRUuqCVp2F3bfynTYlOWKrj6XvcxxXtRkGnX7v5SV8Y6DVjyZJqQPBHKNaEh7vb0jZcV6wbgt006YgDaoMHbcNS90HaooNQAko30wbvAD1x1SRMu5xkKN3V9pAfRI0uqCiZi3bVhNTxJMcb4+3gshevoSrvkTsMJpoxdkIcd4pLAOPFcD7SVeBEe/n4r82/qjsWF0omO9tgqUYSLfPgQ9C9Ume/kaWKyqw==",
                        "SigningCertUrl": "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-b95095beb82e8f6a046b3aafc7f4149a.pem",
                        "UnsubscribeUrl": "https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:534106927381:Robosource-Job-Bucketing:7b3cd21a-85ce-45c2-a255-34f21da0365c",
                        "MessageAttributes": {}
                    }
                }]
            };
            return LambdaTester(myLambda.triggerRule)
                .event(evnt)
                .expectResult(function(result) {
                  expect(result.success).to.equals(false);
                });
          }).timeout(90000);
  });
});
