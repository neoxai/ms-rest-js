"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
var xml2js = require("xml2js");
var uuidv4 = require("uuid/v4");
var webResource_1 = require("../webResource");
var constants_1 = require("./constants");
/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
exports.isNode = typeof navigator === "undefined" && typeof process !== "undefined";
/**
 * Checks if a parsed URL is HTTPS
 *
 * @param {object} urlToCheck The url to check
 * @return {boolean} True if the URL is HTTPS; false otherwise.
 */
function urlIsHTTPS(urlToCheck) {
    return urlToCheck.protocol.toLowerCase() === constants_1.Constants.HTTPS;
}
exports.urlIsHTTPS = urlIsHTTPS;
/**
 * Checks if a value is null or undefined.
 *
 * @param {object} value The value to check for null or undefined.
 * @return {boolean} True if the value is null or undefined, false otherwise.
 */
// TODO: Audit the usages of this and remove them.
// Read: https://medium.com/@basarat/null-vs-undefined-in-typescript-land-dc0c7a5f240a
// https://github.com/Microsoft/TypeScript/issues/7426
function objectIsNull(value) {
    return value === null || value === undefined;
}
exports.objectIsNull = objectIsNull;
/**
 * Encodes an URI.
 *
 * @param {string} uri The URI to be encoded.
 * @return {string} The encoded URI.
 */
function encodeUri(uri) {
    return encodeURIComponent(uri)
        .replace(/!/g, "%21")
        .replace(/"/g, "%27")
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
        .replace(/\*/g, "%2A");
}
exports.encodeUri = encodeUri;
/**
 * Returns a stripped version of the Http Response which only contains body,
 * headers and the status.
 *
 * @param {HttpOperationResponse} response - The Http Response
 *
 * @return {object} strippedResponse - The stripped version of Http Response.
 */
function stripResponse(response) {
    var strippedResponse = {};
    strippedResponse.body = response.bodyAsText;
    strippedResponse.headers = response.headers;
    strippedResponse.status = response.status;
    return strippedResponse;
}
exports.stripResponse = stripResponse;
/**
 * Returns a stripped version of the Http Request that does not contain the
 * Authorization header.
 *
 * @param {object} request - The Http Request object
 *
 * @return {object} strippedRequest - The stripped version of Http Request.
 */
function stripRequest(request) {
    var strippedRequest = new webResource_1.WebResource();
    try {
        strippedRequest = request.clone();
        if (strippedRequest.headers) {
            strippedRequest.headers.remove("authorization");
        }
    }
    catch (err) {
        var errMsg = err.message;
        err.message = "Error - \"" + errMsg + "\" occured while creating a stripped version of the request object - \"" + request + "\".";
        return err;
    }
    return strippedRequest;
}
exports.stripRequest = stripRequest;
/**
 * Validates the given uuid as a string
 *
 * @param {string} uuid - The uuid as a string that needs to be validated
 *
 * @return {boolean} result - True if the uuid is valid; false otherwise.
 */
function isValidUuid(uuid) {
    var validUuidRegex = new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", "ig");
    return validUuidRegex.test(uuid);
}
exports.isValidUuid = isValidUuid;
/**
 * Provides an array of values of an object. For example
 * for a given object { "a": "foo", "b": "bar" }, the method returns ["foo", "bar"].
 *
 * @param {object} obj - An object whose properties need to be enumerated so that it"s values can be provided as an array
 *
 * @return {array} result - An array of values of the given object.
 */
function objectValues(obj) {
    var result = [];
    if (obj && obj instanceof Object) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(obj[key]);
            }
        }
    }
    else {
        throw new Error("The provided object " + JSON.stringify(obj, undefined, 2) + " is not a valid object that can be " +
            "enumerated to provide its values as an array.");
    }
    return result;
}
exports.objectValues = objectValues;
/**
 * Generated UUID
 *
 * @return {string} RFC4122 v4 UUID.
 */
function generateUuid() {
    return uuidv4();
}
exports.generateUuid = generateUuid;
/*
 * Executes an array of promises sequentially. Inspiration of this method is here:
 * https://pouchdb.com/2015/05/18/we-have-a-problem-with-promises.html. An awesome blog on promises!
 *
 * @param {Array} promiseFactories An array of promise factories(A function that return a promise)
 *
 * @param {any} [kickstart] Input to the first promise that is used to kickstart the promise chain.
 * If not provided then the promise chain starts with undefined.
 *
 * @return A chain of resolved or rejected promises
 */
function executePromisesSequentially(promiseFactories, kickstart) {
    var result = Promise.resolve(kickstart);
    promiseFactories.forEach(function (promiseFactory) {
        result = result.then(promiseFactory);
    });
    return result;
}
exports.executePromisesSequentially = executePromisesSequentially;
/*
 * Merges source object into the target object
 * @param {object} source The object that needs to be merged
 *
 * @param {object} target The object to be merged into
 *
 * @returns {object} target - Returns the merged target object.
 */
function mergeObjects(source, target) {
    Object.keys(source).forEach(function (key) {
        target[key] = source[key];
    });
    return target;
}
exports.mergeObjects = mergeObjects;
/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param {number} t - The number of milliseconds to be delayed.
 * @param {T} value - The value to be resolved with after a timeout of t milliseconds.
 * @returns {Promise<T>} - Resolved promise
 */
function delay(t, value) {
    return new Promise(function (resolve) { return setTimeout(function () { return resolve(value); }, t); });
}
exports.delay = delay;
/**
 * Converts a Promise to a callback.
 * @param {Promise<any>} promise - The Promise to be converted to a callback
 * @returns {Function} fn - A function that takes the callback (cb: Function): void
 */
function promiseToCallback(promise) {
    if (typeof promise.then !== "function") {
        throw new Error("The provided input is not a Promise.");
    }
    return function (cb) {
        promise.then(function (data) {
            cb(undefined, data);
        }, function (err) {
            cb(err);
        });
    };
}
exports.promiseToCallback = promiseToCallback;
/**
 * Converts a Promise to a service callback.
 * @param {Promise<HttpOperationResponse>} promise - The Promise of HttpOperationResponse to be converted to a service callback
 * @returns {Function} fn - A function that takes the service callback (cb: ServiceCallback<T>): void
 */
function promiseToServiceCallback(promise) {
    if (typeof promise.then !== "function") {
        throw new Error("The provided input is not a Promise.");
    }
    return function (cb) {
        promise.then(function (data) {
            process.nextTick(cb, undefined, data.parsedBody, data.request, data);
        }, function (err) {
            process.nextTick(cb, err);
        });
    };
}
exports.promiseToServiceCallback = promiseToServiceCallback;
function stringifyXML(obj, opts) {
    var builder = new xml2js.Builder({
        explicitArray: false,
        explicitCharkey: false,
        rootName: (opts || {}).rootName
    });
    return builder.buildObject(obj);
}
exports.stringifyXML = stringifyXML;
function prepareXMLRootList(obj, elementName) {
    if (!Array.isArray(obj)) {
        obj = [obj];
    }
    return _a = {}, _a[elementName] = obj, _a;
    var _a;
}
exports.prepareXMLRootList = prepareXMLRootList;
/**
 * Applies the properties on the prototype of sourceCtors to the prototype of targetCtor
 * @param {object} targetCtor The target object on which the properties need to be applied.
 * @param {Array<object>} sourceCtors An array of source objects from which the properties need to be taken.
 */
function applyMixins(targetCtor, sourceCtors) {
    sourceCtors.forEach(function (sourceCtors) {
        Object.getOwnPropertyNames(sourceCtors.prototype).forEach(function (name) {
            targetCtor.prototype[name] = sourceCtors.prototype[name];
        });
    });
}
exports.applyMixins = applyMixins;
var validateISODuration = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
/**
 * Indicates whether the given string is in ISO 8601 format.
 * @param {string} value - The value to be validated for ISO 8601 duration format.
 * @return {boolean} result - `true` if valid, `false` otherwise.
 */
function isDuration(value) {
    return validateISODuration.test(value);
}
exports.isDuration = isDuration;
/**
 * Replace all of the instances of searchValue in value with the provided replaceValue.
 */
function replaceAll(value, searchValue, replaceValue) {
    return !value || !searchValue ? value : value.split(searchValue).join(replaceValue || "");
}
exports.replaceAll = replaceAll;
//# sourceMappingURL=utils.js.map