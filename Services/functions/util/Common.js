'use strict';
/**
 * CommonUtils
 */

var removeProp = require('js-remove-property');

function stripJSON(blacklistedProp, data) {
    for (var count = 0; count < blacklistedProp.length; count++) {
        removeProp(blacklistedProp[count], data);
    }
    return data;
}

function clone(obj) {
    var clonedObject;
    clonedObject = JSON.parse(JSON.stringify(obj));
    return clonedObject;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}



module.exports.stripJSON = stripJSON;
module.exports.clone = clone;
module.exports.replaceAll = replaceAll;
