'use strict';
/**
 * Authorize OrgId Interceptor
 */
var WPUtil = require('../util/WPUtil');
var config = require('../../config/config.json');

function authorizeOrgIds(error, invocation, proceed) {
    var startTime = new Date();
    if (config.http.interceptor.validateOrgId === true) {

        WPUtil.getUserDetailsFromWP(invocation.args[0].headers.Authorization, function(err, body) { /* jshint maxcomplexity:18 */ /* jshint maxstatements:36*/
            if (err) {
                //throw new Error('[401] Unauthorized');
                //throw new Error('[404] Not found');
                //thisContext = {'error': err};
                console.info('Execution time in authorizeOrgIds=: %dms', (new Date() - startTime));
                proceed(err);
            }
            var role, orgIds = [],
                authorizedOrgIds, lowerCaseRoles, invocOrgId = '';

            invocation.args[0].authorisedOrganization = false;

            if (body.body.roles === 'undefined' || body.body.roles === null || body.body.roles.length === 0) {
                console.info('Execution time in authorizeOrgIds=: %dms', (new Date() - startTime));
                return proceed();
            } else {
                role = body.body.roles; // Array of roles
            }

            if (body.body.description === 'undefined' || body.body.roles === null) {
                console.info('Execution time in authorizeOrgIds=: %dms', (new Date() - startTime));
                return proceed();
            } else {
                authorizedOrgIds = body.body.description.split(',');
            }

            if (invocation.args[0].method === 'GET' && invocation.args[0].path.orgId !== 'undefined' && invocation.args[0].path.orgId != null) {
                orgIds[0] = invocation.args[0].path.orgId; // GET always one orgId
            } else if (invocation.args[0].method === 'POST' && invocation.args[0].body.orgId !== 'undefined' && invocation.args[0].body.orgId != null) {
                invocOrgId = invocation.args[0].body.orgId.toString();
                orgIds = invocOrgId.split(';');
            }



            lowerCaseRoles = role.join('||').toLowerCase().split('||'); // convert the roles into lower case

            if (lowerCaseRoles.indexOf('administrator') >= 0 || lowerCaseRoles.indexOf('robosuperadmin') >= 0) {
                invocation.args[0].authorisedOrganization = true;
                console.info('Execution time in authorizeOrgIds=: %dms', (new Date() - startTime));
                return proceed();
            } else if (lowerCaseRoles.indexOf('roboadmin') >= 0) {
                invocation.args[0].authorisedOrganization = true;
                if (orgIds.length === 0) {
                    invocation.args[0].authorisedOrganization = false;
                }
                for (var orgsCounter = 0; orgsCounter < orgIds.length; orgsCounter++) {
                    if (authorizedOrgIds.indexOf(orgIds[orgsCounter]) === -1) {
                        invocation.args[0].authorisedOrganization = false;
                        break;
                    }
                }
                console.info('Execution time in authorizeOrgIds=: %dms', (new Date() - startTime));
                return proceed();
            } else if (lowerCaseRoles.indexOf('robouser') >= 0) {
                invocation.args[0].authorisedOrganization = true;
                if (orgIds.length !== 1 || authorizedOrgIds.indexOf(orgIds[0]) === -1) {
                    invocation.args[0].authorisedOrganization = false;
                }
            }
            console.info('Execution time in authorizeOrgIds=: %dms', (new Date() - startTime));
            proceed();
        });
    } else {
        console.info('Execution time in authorizeOrgIds=: %dms', (new Date() - startTime));
        invocation.args[0].authorisedOrganization = true;
        proceed();
    }
}

module.exports.authorizeOrgIds = authorizeOrgIds;