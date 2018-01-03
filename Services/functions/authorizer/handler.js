'use strict';
//
// The MIT License
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the 'Software'), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom
// the Software is furnished to do so, subject to the following
// conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.

// Modules.
var async = require('async');
var request = require('request');
var jwtDecode = require('jwt-decode');
var config = require('../../config/config.json');
var WPUtil = require('../util/WPUtil');

// A function to extract the HTTP method and the resource path
// from event.methodArn.
function extractMethodAndPath(arn) {
    // The value of 'arn' follows the format shown below.
    //
    //   arn:aws:execute-api:<regionId>:<accountId>:<apiId>/<stage>/<method>/<resourcePath>'
    //
    // See 'Enable Amazon API Gateway Custom Authorization' for details.
    //
    //   http://docs.aws.amazon.com/apigateway/latest/developerguide/use-custom-authorizer.html
    //

    // Check if the value of 'arn' is available just in case.
    if (!arn) {
        // HTTP method and a resource path are not available.
        return [null, null];
    }

    var arnElements = arn.split(':', 6);
    var resourceElements = arnElements[5].split('/', 4);
    var httpMethod = resourceElements[2];
    var resourcePath = resourceElements[3];

    // Return the HTTP method and the resource path as a string array.
    return [httpMethod, resourcePath];
}

// A function to call WP Validate API.
//
// This function is used as a task for 'waterfall' method of 'async' module.
// See https://github.com/caolan/async#user-content-waterfalltasks-callback
// for details about 'waterfall' method.
//
//   * access_token (string) [REQUIRED]
//       An access token whose information you want to get.
//
//   * callback
//       A callback function that 'waterfall' of 'async' module passes to
//       a task function.
//
function validate(accessToken, callback) {
    request({
        // The URL of WP's validation API.
        url: config.http.authorizer.WPValidateURL,

        // HTTP method.
        method: 'POST',

        headers: {
            'Authorization': accessToken
        }
    }, function(error, response, body) { /*jshint unused:vars */
        //console.log('response=' +JSON.stringify(response));
        if (error) {
            callback(error);
        } else if (response.statusCode !== 200) {
            // The response indicates something wrong
            // has happened.
            callback(response);
        } else {
            callback(null, response);
        }
    });
}


// A function to generate a response from Authorizer to API Gateway.
function generatePolicy(principalId, effect, resource) {
    return {
        principalId: principalId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: resource
            }]
        }
    };
}


// An authorizer implementation
module.exports.authorize = function(event, context) {
    // Get information about the function that is requested to be invoked.
    // Extract the HTTP method and the resource path from event.methodArn.
    if (config.http.authorizer.enabled !== true) {
      console.log('Skipping Authorizer check');
      context.succeed(generatePolicy('Skip Authorizer', 'Allow', '*'));
      return;
    }
    var elements = extractMethodAndPath(event.methodArn);
    var httpMethod = elements[0];
    var resourcePath = elements[1];

    // The access token presented by the client application.
    var accessToken = WPUtil.extractAccessToken(event.authorizationToken);
    // If the request from the client does not contain an access token.
    if (!accessToken) {
        // Write a log message and tell API Gateway to return '401 Unauthorized'.
        console.log('[' + httpMethod + '] ' + resourcePath + ' -> No access token.');
        context.fail('Unauthorized');
        return;
    }
    async.waterfall([
        function(callback) {
            // Validate the access token by calling WP's validation API.
              validate(event.authorizationToken, callback);
        },
        function(response, callback) {
            // Write a log message about the result of the access token validation.
            //console.log('response=' + JSON.stringify(response));
            var body = JSON.parse(response.body);
            var jwtDecoded = jwtDecode(accessToken);
            console.log('[' + httpMethod + '] ' + resourcePath + ' -> ' +
                body.code);

            // The 'action' property contained in a response from WP's
            // validation API indicates the HTTP status that the caller
            // (= an implementation of protected resource endpoint) should
            // return to the client application. Therefore, dispatch based
            // on the value of 'action'.
            switch (body.code) {
                case 'jwt_auth_valid_token':
                    // The access token is valid. Tell API Gateway that the access
                    // to the resource is allowed. The value of 'subject' property
                    // contained in a response from WP's validation API is
                    // the subject (= unique identifier) of the user who is associated
                    // with the access token.
                    context.succeed(generatePolicy(jwtDecoded.data.user.id, 'Allow', '*'));
                    break;
                default:
                    // Tell API Gateway that the access to the resource should be denied.
                    context.succeed(generatePolicy(jwtDecoded.data.user.id, 'Deny', event.methodArn));
                    break;
            }

            callback(null);
        }
    ], function(error) {
        if (error) {
            // Something wrong has happened.
            context.fail(error);
        }
    });
};
