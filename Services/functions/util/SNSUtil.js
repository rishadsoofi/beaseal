'use strict';

var AWS = require('aws-sdk');
var configuration = require('../../config/config.json');

function SNSUtil() {}

SNSUtil.prototype.publish = function(topicName, subject, data, context, cb) {

    try {
        var eventText = JSON.stringify(data, null, 2);
        var topicArn
        var awsRegion = context.invokedFunctionArn.split(':')[3];
        var awsAccountID = context.invokedFunctionArn.split(':')[4];
        topicArn = 'arn:aws:sns:' + awsRegion + ':' + awsAccountID + ':' + topicName;
        console.log('Received event:', eventText);
        console.log('Received topic ARN:', topicArn);
        if (configuration.env.name === 'dev') {
            topicArn = configuration.SNS.arnPrefix + topicName
            AWS.config.update({
                region: configuration.env.region
            });
            console.log('Overriding wtih Dev topic ARN:', topicArn);
        }
        var sns = new AWS.SNS();
        var params = {
            Message: eventText,
            Subject: subject,
            TopicArn: topicArn
        };
        sns.publish(params, function(err, data) {
            if (err) {
                console.error(err.stack);
                return cb(null, 'Error');
            }
            console.log('push sent');
            console.log(data);

            console.log('Data published to SNS topic successfully');
            return cb(null, 'Success');
        });

    } catch (ex) {
        console.log('EXCEPTION : ' + ex);
    }
}


module.exports = SNSUtil;