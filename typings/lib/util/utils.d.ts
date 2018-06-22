import { HttpOperationResponse } from "../httpOperationResponse";
import { RestError } from "../restError";
import { WebResource } from "../webResource";
/**
 * A constant that indicates whether the environment is node.js or browser based.
 */
export declare const isNode: boolean;
/**
 * Checks if a parsed URL is HTTPS
 *
 * @param {object} urlToCheck The url to check
 * @return {boolean} True if the URL is HTTPS; false otherwise.
 */
export declare function urlIsHTTPS(urlToCheck: {
    protocol: string;
}): boolean;
/**
 * Checks if a value is null or undefined.
 *
 * @param {object} value The value to check for null or undefined.
 * @return {boolean} True if the value is null or undefined, false otherwise.
 */
export declare function objectIsNull(value: any): boolean;
/**
 * Encodes an URI.
 *
 * @param {string} uri The URI to be encoded.
 * @return {string} The encoded URI.
 */
export declare function encodeUri(uri: string): string;
/**
 * Returns a stripped version of the Http Response which only contains body,
 * headers and the status.
 *
 * @param {HttpOperationResponse} response - The Http Response
 *
 * @return {object} strippedResponse - The stripped version of Http Response.
 */
export declare function stripResponse(response: HttpOperationResponse): any;
/**
 * Returns a stripped version of the Http Request that does not contain the
 * Authorization header.
 *
 * @param {object} request - The Http Request object
 *
 * @return {object} strippedRequest - The stripped version of Http Request.
 */
export declare function stripRequest(request: WebResource): WebResource;
/**
 * Validates the given uuid as a string
 *
 * @param {string} uuid - The uuid as a string that needs to be validated
 *
 * @return {boolean} result - True if the uuid is valid; false otherwise.
 */
export declare function isValidUuid(uuid: string): boolean;
/**
 * Provides an array of values of an object. For example
 * for a given object { "a": "foo", "b": "bar" }, the method returns ["foo", "bar"].
 *
 * @param {object} obj - An object whose properties need to be enumerated so that it"s values can be provided as an array
 *
 * @return {array} result - An array of values of the given object.
 */
export declare function objectValues(obj: {
    [key: string]: any;
}): any[];
/**
 * Generated UUID
 *
 * @return {string} RFC4122 v4 UUID.
 */
export declare function generateUuid(): string;
export declare function executePromisesSequentially(promiseFactories: Array<any>, kickstart: any): Promise<any>;
export declare function mergeObjects(source: {
    [key: string]: any;
}, target: {
    [key: string]: any;
}): {
    [key: string]: any;
};
/**
 * A wrapper for setTimeout that resolves a promise after t milliseconds.
 * @param {number} t - The number of milliseconds to be delayed.
 * @param {T} value - The value to be resolved with after a timeout of t milliseconds.
 * @returns {Promise<T>} - Resolved promise
 */
export declare function delay<T>(t: number, value?: T): Promise<T>;
/**
 * Service callback that is returned for REST requests initiated by the service client.
 *
 * @property {Error|RestError} err         - The error occurred if any, while executing the request; otherwise null
 * @property {TResult} result                 - The deserialized response body if an error did not occur.
 * @property {WebResource}  request           - The raw/actual request sent to the server if an error did not occur.
 * @property {HttpOperationResponse} response  - The raw/actual response from the server if an error did not occur.
 */
export interface ServiceCallback<TResult> {
    (err: Error | RestError, result?: TResult, request?: WebResource, response?: HttpOperationResponse): void;
}
/**
 * Converts a Promise to a callback.
 * @param {Promise<any>} promise - The Promise to be converted to a callback
 * @returns {Function} fn - A function that takes the callback (cb: Function): void
 */
export declare function promiseToCallback(promise: Promise<any>): Function;
/**
 * Converts a Promise to a service callback.
 * @param {Promise<HttpOperationResponse>} promise - The Promise of HttpOperationResponse to be converted to a service callback
 * @returns {Function} fn - A function that takes the service callback (cb: ServiceCallback<T>): void
 */
export declare function promiseToServiceCallback<T>(promise: Promise<HttpOperationResponse>): Function;
export declare function stringifyXML(obj: any, opts?: {
    rootName?: string;
}): string;
export declare function prepareXMLRootList(obj: any, elementName: string): {
    [x: string]: any;
};
/**
 * Applies the properties on the prototype of sourceCtors to the prototype of targetCtor
 * @param {object} targetCtor The target object on which the properties need to be applied.
 * @param {Array<object>} sourceCtors An array of source objects from which the properties need to be taken.
 */
export declare function applyMixins(targetCtor: any, sourceCtors: any[]): void;
/**
 * Indicates whether the given string is in ISO 8601 format.
 * @param {string} value - The value to be validated for ISO 8601 duration format.
 * @return {boolean} result - `true` if valid, `false` otherwise.
 */
export declare function isDuration(value: string): boolean;
/**
 * Replace all of the instances of searchValue in value with the provided replaceValue.
 */
export declare function replaceAll(value: string | undefined, searchValue: string, replaceValue: string): string | undefined;
