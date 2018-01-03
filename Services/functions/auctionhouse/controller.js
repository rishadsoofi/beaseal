'use strict';

/**
 * Serverless Module: Lambda Handler
 * - Your lambda functions should be a thin wrapper around your own separate
 * modules, to keep your code testable, reusable and AWS independent
 * - 'serverless-helpers-js' module is required for Serverless ENV var support.  Hopefully, AWS will add ENV support to Lambda soon :)
 */

// Require Serverless ENV vars
//var ServerlessHelpers = require('serverless-helpers-js').loadEnv();

// Require Logic
var auctionhouse = require('./model');

// Lambda Handler
module.exports.getSalesDetails = function(event, context, callback) {

    auctionhouse.getSalesDetails(event, context, function(error, response) {
        //context.callbackWaitsForEmptyEventLoop = false;
        return callback(error, response);
    });
};

// Lambda Handler
module.exports.addSales = function(event, context, callback) {

    auctionhouse.addSales(event, context, function(error, response) {
        //context.callbackWaitsForEmptyEventLoop = false;
        return callback(error, response);
    });
};