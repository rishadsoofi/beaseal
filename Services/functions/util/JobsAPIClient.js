'use strict';
/**
 * Elastic Search Client
 */
var http = require('http');
var configuration = require('../../config/config.json');

function JobsAPIClient() {
    this.host = configuration.jobsapi.host;
    this.endPoint = configuration.jobsapi.endPoint;
    this.port = configuration.jobsapi.port;
}

JobsAPIClient.prototype.fetchJobDetails = function(queryData, cb) {
    if (configuration.jobsapi.method === 'GET') {
        fetchJobDetailsGET(queryData, function(jobs) {
            cb(jobs);
        });
    } else if (configuration.jobsapi.method === 'POST') {
        fetchJobDetailsPOST(queryData, function(jobs) {
            cb(jobs);
        });
    }
}

function fetchJobDetailsGET(endPointURL, cb) {
    var options, responseString, responseObject;
    options = {
        host: configuration.jobsapi.host,
        port: configuration.jobsapi.port,
        path: configuration.jobsapi.endPoint + endPointURL,
        method: 'GET',
    };
    try {
        http.request(options, function(result) {
            result.setEncoding('utf-8');
            responseString = '';

            result.on('data', function(data) {
                responseString += data;
            });

            result.on('end', function() {
                responseObject = JSON.parse(responseString);
                cb(responseObject);
            });
        }).end();
    } catch (ex) {
        console.log('EXCEPTION : ' + ex);
    }
}

function fetchJobDetailsPOST(data, cb) {
    var options, responseString, responseObject;
    options = {
        host: configuration.jobsapi.host,
        port: configuration.jobsapi.port,
        path: configuration.jobsapi.endPoint,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        var req = http.request(options, function(result) {
            result.setEncoding('utf-8');

            responseString = '';

            result.on('data', function(data) {
                responseString += data;
            });

            result.on('end', function() {
                responseObject = JSON.parse(responseString);
                cb(responseObject);
            });
        });
        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });
        req.write(JSON.stringify(data));
        req.end();
    } catch (ex) {
        console.log('EXCEPTION : ' + ex);
    }
}

module.exports = JobsAPIClient;