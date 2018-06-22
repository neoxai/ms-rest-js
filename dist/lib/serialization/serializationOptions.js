"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
var httpPipelineLogLevel_1 = require("../httpPipelineLogLevel");
/**
 * The different types of output that can be produced by serialization.
 */
var SerializationOutputType;
(function (SerializationOutputType) {
    SerializationOutputType[SerializationOutputType["JSON"] = 0] = "JSON";
    SerializationOutputType[SerializationOutputType["XML"] = 1] = "XML";
})(SerializationOutputType = exports.SerializationOutputType || (exports.SerializationOutputType = {}));
function failSerializeTypeCheck(options, propertyPath, value, expectedTypeDescription) {
    failTypeCheck(options && options.serializationStrictTypeChecking ? true : false, options, propertyPath, value, expectedTypeDescription);
}
exports.failSerializeTypeCheck = failSerializeTypeCheck;
function failDeserializeTypeCheck(options, propertyPath, value, expectedTypeDescription) {
    failTypeCheck(options && options.deserializationStrictTypeChecking ? true : false, options, propertyPath, value, expectedTypeDescription);
}
exports.failDeserializeTypeCheck = failDeserializeTypeCheck;
/**
 * Log (and possibly throw an Error) when a value failed to pass its type-checking validation.
 * @param isTypeCheckingStrict Whether or not type-checking is strict.
 * @param options The serialization options.
 * @param propertyPath The path to the property that is being serialized or deserialized.
 * @param value The value that is being serialized or deserialized.
 * @param expectedTypeDescription The description of the type that the value is expected to be.
 */
function failTypeCheck(isTypeCheckingStrict, options, propertyPath, value, expectedTypeDescription) {
    if (isTypeCheckingStrict) {
        throw logAndCreateError(options, "Property " + propertyPath + " with value " + JSON.stringify(value) + " must be " + expectedTypeDescription + ".");
    }
    else {
        log(options, httpPipelineLogLevel_1.HttpPipelineLogLevel.WARNING, "Property " + propertyPath + " with value " + JSON.stringify(value) + " should be " + expectedTypeDescription + ".");
    }
}
function failSerializeMissingRequiredPropertyCheck(options, childPropertyPath, childPropertyValueTypeName) {
    failMissingRequiredPropertyCheck(options && options.serializationStrictMissingProperties ? true : false, options, childPropertyPath, childPropertyValueTypeName);
}
exports.failSerializeMissingRequiredPropertyCheck = failSerializeMissingRequiredPropertyCheck;
function failDeserializeMissingRequiredPropertyCheck(options, childPropertyPath, childPropertyValueTypeName) {
    failMissingRequiredPropertyCheck(options && options.deserializationStrictMissingProperties ? true : false, options, childPropertyPath, childPropertyValueTypeName);
}
exports.failDeserializeMissingRequiredPropertyCheck = failDeserializeMissingRequiredPropertyCheck;
function failMissingRequiredPropertyCheck(isMissingRequiredPropertyCheckingStrict, options, childPropertyPath, childPropertyValueTypeName) {
    var message = "Missing non-constant " + childPropertyValueTypeName + " property at " + childPropertyPath + ".";
    if (isMissingRequiredPropertyCheckingStrict) {
        throw logAndCreateError(options, message);
    }
    else {
        log(options, httpPipelineLogLevel_1.HttpPipelineLogLevel.WARNING, message);
    }
}
/**
 * Get whether or not a log with the provided log level should be logged.
 * @param logLevel The log level of the log that will be logged.
 * @returns Whether or not a log with the provided log level should be logged.
 */
function shouldLog(serializationOptions, logLevel) {
    var logger = serializationOptions.logger;
    return logger != undefined &&
        logLevel !== httpPipelineLogLevel_1.HttpPipelineLogLevel.OFF &&
        logLevel <= logger.minimumLogLevel;
}
exports.shouldLog = shouldLog;
/**
 * Attempt to log the provided message to the provided logger. If no logger was provided or if
 * the log level does not meat the logger's threshold, then nothing will be logged.
 * @param logLevel The log level of this log.
 * @param message The message of this log.
 */
function log(serializationOptions, logLevel, message) {
    var logger = serializationOptions.logger;
    if (logger && shouldLog(serializationOptions, logLevel)) {
        logger.log(logLevel, message);
    }
}
exports.log = log;
/**
 * Log the provided error message and throw an error with the error message inside.
 * @param serializationOptions The serializationOptions to use to log the provided error message.
 * @param errorMessage The error message to log and throw inside of an Error.
 */
function logAndCreateError(serializationOptions, errorMessage) {
    log(serializationOptions, httpPipelineLogLevel_1.HttpPipelineLogLevel.ERROR, errorMessage);
    return new Error(errorMessage);
}
exports.logAndCreateError = logAndCreateError;
function resolveTypeSpec(serializationOptions, path, typeSpec) {
    var result;
    if (typeof typeSpec === "string") {
        if (!serializationOptions.compositeSpecDictionary || !serializationOptions.compositeSpecDictionary[typeSpec]) {
            throw logAndCreateError(serializationOptions, "Missing composite specification entry in composite type dictionary for type named \"" + typeSpec + "\" at " + path + ".");
        }
        else {
            result = serializationOptions.compositeSpecDictionary[typeSpec];
        }
    }
    else {
        result = typeSpec;
    }
    return result;
}
exports.resolveTypeSpec = resolveTypeSpec;
function resolveCompositeTypeSpec(serializationOptions, path, valueSpec) {
    return resolveTypeSpec(serializationOptions, path, valueSpec);
}
exports.resolveCompositeTypeSpec = resolveCompositeTypeSpec;
//# sourceMappingURL=serializationOptions.js.map