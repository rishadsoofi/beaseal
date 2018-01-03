'use strict';
/**
 * WPUtil
 */

var request = require('request');
var config = require('../../config/config.json');

function getUserDetailsFromWP(accessToken, callback) {
    request({
        // The URL of WP's validation API.
        url: config.http.interceptor.WPFetchUserDetailsURL,

        // HTTP method.
        method: 'GET',

        headers: {
            'Authorization': accessToken
        }
    }, function(error, response, body) { /*jshint unused:vars */
        var bodyContent = JSON.parse(body);
        if (error) {
            callback(error);
        } else if (bodyContent.body.code === 'jwt_auth_invalid_token') {
            // The response indicates something wrong
            // has happened.
            callback('Fetch user details from WP failed');
        } else {
            callback(null, bodyContent);
        }
    });
}


// A function to extract an access token from Authorization header.
//
// This function assumes the value complies with the format described
// in 'RFC 6750, 2.1. Authorization Request Header Field'. For example,
// if 'Bearer 123' is given to this function, '123' is returned.
function extractAccessToken(authorization) {
    // If the value of Authorization header is not available.
    if (!authorization) {
        // No access token.
        return null;
    }
    // Regular expression to extract an access token from
    // Authorization header.
    var BEARER_TOKEN_PATTERN = /^Bearer[ ]+([^ ]+)[ ]*$/i;
    // Check if it matches the pattern 'Bearer {access-token}'.
    var result = BEARER_TOKEN_PATTERN.exec(authorization);

    // If the Authorization header does not match the pattern.
    if (!result) {
        // No access token.
        return null;
    }

    // Return the access token.
    return result[1];
}

module.exports.getUserDetailsFromWP = getUserDetailsFromWP;
module.exports.extractAccessToken = extractAccessToken;
